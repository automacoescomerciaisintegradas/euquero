import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { cors } from "hono/cors";
import { sign, verify } from "hono/jwt";
import { googleAuth } from "@hono/oauth-providers/google";
import { githubAuth } from "@hono/oauth-providers/github";
import * as bcrypt from "bcryptjs";

import type { D1Database } from "@cloudflare/workers-types";
import {
  LoginSchema,
  RegisterSchema,
  ContactFormSchema,
  CreditRechargeSchema,
  PixWebhookSchema,
  type AuthResponse,
  type User,
  type N8nNotificationPayload,
} from "@/shared/types";
import {
  initializeDatabase,
  createUser,
  getUserByEmail,
  createOrUpdateUserFromOAuth,
  getUserById,
  getCreditBalance,
  upsertCreditBalance,
  createCreditTransaction,
  getCreditTransactions,
  updateUserSubscriptionStatus,
} from "./db";
import {
  notifyN8n,
  addToRetryQueue,
  processRetryQueue,
  creditUserBalance,
  logAuditEvent,
} from "./webhook-utils";

// Define bindings and environment variables
interface Env {
  DB: D1Database;
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
  GITHUB_CLIENT_ID: string;
  GITHUB_CLIENT_SECRET: string;
  JWT_SECRET: string;
  N8N_WEBHOOK_URL: string;
  INTERNAL_SECRET: string;
}

const app = new Hono<{ Bindings: Env }>();

// --- MIDDLEWARE ---
app.use("*", async (c, next) => {
  try {
    await initializeDatabase(c.env.DB);
  } catch (error) {
    console.error("Falha ao inicializar o banco de dados:", error);
  }
  await next();
});
app.use("/api/*", cors());

// --- AUTHENTICATION ROUTES ---
app.post("/api/auth/register", zValidator("json", RegisterSchema), async (c) => {
  try {
    const { email, password, phone } = c.req.valid("json");
    const existingUser = await getUserByEmail(c.env.DB, email);
    if (existingUser) {
      return c.json({ success: false, message: "Um usuário com este email já existe." }, 409);
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await createUser(c.env.DB, { email, password_hash: passwordHash, phone, provider: "email", emailVerified: false });
    const response: AuthResponse = { success: true, message: "Cadastro realizado com sucesso!", user: newUser };
    return c.json(response, 201);
  } catch (error) {
    console.error("Erro no registro:", error);
    return c.json({ success: false, message: "Erro interno ao tentar se registrar." }, 500);
  }
});

app.post("/api/auth/login", zValidator("json", LoginSchema), async (c) => {
  try {
    const { email, password } = c.req.valid("json");
    const user = await getUserByEmail(c.env.DB, email);
    if (!user || !user.password_hash) {
      return c.json({ success: false, message: "Credenciais inválidas." }, 401);
    }
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      return c.json({ success: false, message: "Credenciais inválidas." }, 401);
    }
    const payload = { sub: user.id, exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7 };
    const token = await sign(payload, c.env.JWT_SECRET);
    const { password_hash, ...userWithoutPassword } = user;
    const response: AuthResponse = { success: true, message: "Login realizado com sucesso!", user: userWithoutPassword as User, token };
    return c.json(response);
  } catch (error) {
    console.error("Erro no login:", error);
    return c.json({ success: false, message: "Erro interno ao tentar fazer login." }, 500);
  }
});

const handleOAuthCallback = async (c: any, provider: 'google' | 'github') => {
    const userProfile = c.get(`user-${provider}`);
    if (!userProfile) return c.redirect("/login?error=oauth_failed");
    try {
        const user = await createOrUpdateUserFromOAuth(c.env.DB, { email: userProfile.email, name: userProfile.name, provider, providerId: userProfile.id });
        const payload = { sub: user.id, exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7 };
        const token = await sign(payload, c.env.JWT_SECRET);
        const url = new URL("/dashboard", c.req.url);
        url.searchParams.set("token", token);
        return c.redirect(url.toString());
    } catch (error: any) {
        console.error(`Erro no callback do ${provider}:`, error);
        return c.redirect(`/login?error=${encodeURIComponent(error.message)}`);
    }
};

app.use("/api/auth/google", (c, next) => googleAuth({ client_id: c.env.GOOGLE_CLIENT_ID, client_secret: c.env.GOOGLE_CLIENT_SECRET, scope: ["openid", "email", "profile"] })(c, next));
app.get("/api/auth/google/callback", (c) => handleOAuthCallback(c, 'google'));
app.use("/api/auth/github", (c, next) => githubAuth({ client_id: c.env.GITHUB_CLIENT_ID, client_secret: c.env.GITHUB_CLIENT_SECRET, scope: ["user:email"] })(c, next));
app.get("/api/auth/github/callback", (c) => handleOAuthCallback(c, 'github'));

// --- CREDIT SYSTEM ROUTES ---
app.get("/api/credits/balance/:userId", async (c) => { /* ... existing logic ... */ });
app.get("/api/credits/transactions/:userId", async (c) => { /* ... existing logic ... */ });
app.post("/api/credits/generate-pix", async (c) => { /* ... existing logic ... */ });
app.post("/api/credits/recharge", zValidator("json", CreditRechargeSchema), async (c) => { /* ... existing logic ... */ });

// --- WEBHOOK ROUTES ---
app.post("/api/webhooks/pix", zValidator("json", PixWebhookSchema), async (c) => {
  try {
    const body = c.req.valid("json");
    const paymentId = body.data?.id || body.payment_id;
    const userId = body.metadata?.user_id;
    const amount = body.transaction_amount;
    const status = body.status || "approved";
    if (!paymentId || !userId || !amount) return c.json({ error: "Dados inválidos" }, 400);

    if (status === "approved") {
      const creditSuccess = await creditUserBalance(c.env.DB, userId, amount);
      if (!creditSuccess) return c.json({ error: "Erro interno ao processar pagamento" }, 500);

      const n8nPayload: N8nNotificationPayload = { event: "PIX_PAYMENT_CONFIRMED", user_id: userId, payment_id: paymentId, amount, timestamp: new Date().toISOString() };
      const notificationSent = await notifyN8n(c.env, n8nPayload);
      if (!notificationSent) {
        addToRetryQueue({ user_id: userId, payment_id: paymentId, amount, status: 'pending', retries: 0, last_attempt: new Date() });
      }
      return c.json({ ok: true, credited: amount, notification_sent: notificationSent });
    }
    return c.json({ status: "aguardando", message: `Status: ${status}` });
  } catch (error) {
    console.error("Erro no webhook PIX:", error);
    return c.json({ error: "Erro interno do servidor" }, 500);
  }
});

app.get("/api/webhooks/retry-queue", async (c) => {
  try {
    const result = await processRetryQueue(c.env);
    return c.json({ message: "Fila de retry processada", ...result });
  } catch (error) {
    console.error("Erro ao processar fila de retry:", error);
    return c.json({ error: "Erro interno do servidor" }, 500);
  }
});

// --- INSTAGRAM AUTOMATION ROUTES (MOCK IMPLEMENTATION) ---
// These are kept from the original file. They are not production-ready.
async function executePythonScript(command: string, args: string[]): Promise<any> { return { success: true, data: { mock: true } }; }
const instagramConnections: any[] = [];
const commentAutomationRules: any[] = [];
const dmAutomationRules: any[] = [];

app.post("/api/instagram/connect", async (c) => { /* ... existing mock logic ... */ });
app.post("/api/instagram/upload-photo", async (c) => { /* ... existing mock logic ... */ });
app.get("/api/instagram/account/:userId", async (c) => { /* ... existing mock logic ... */ });
app.delete("/api/instagram/disconnect/:userId", async (c) => { /* ... existing mock logic ... */ });
app.post("/api/automation/comment-rules", async (c) => { /* ... existing mock logic ... */ });
app.get("/api/automation/comment-rules/:userId", async (c) => { /* ... existing mock logic ... */ });
app.post("/api/automation/dm-rules", async (c) => { /* ... existing mock logic ... */ });
app.get("/api/automation/dm-rules/:userId", async (c) => { /* ... existing mock logic ... */ });
app.put("/api/automation/dm-rules/:ruleId", async (c) => { /* ... existing mock logic ... */ });
app.delete("/api/automation/dm-rules/:ruleId", async (c) => { /* ... existing mock logic ... */ });

// --- FALLBACK ROUTE ---
app.get("*", (c) => c.text("Not found", 404));

export default app;
