import { Hono } from "hono";
import { cors } from "hono/cors";
import { BetterAuth, createAdapter } from "better-auth";
import { github, google } from "better-auth/providers";
import { createOrUpdateUser, getUserByEmail, getUserById } from "./db";
import type { D1Database } from "@cloudflare/workers-types";
import {
  type AuthResponse,
  type User,
  type N8nNotificationPayload,
} from "@/shared/types";
import {
  initializeDatabase,
  createUser,
  getUserByEmail,
  createOrUpdateUserFromOAuth,
} from "./db";
import {
  notifyN8n,
  addToRetryQueue,
  processRetryQueue,
  creditUserBalance,
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

const app = new Hono<{
  Bindings: Env;
  Variables: {
    user: any;
    session: any;
    auth: any;
  };
}>();

const customAdapter = (DB: D1Database) => createAdapter({
  createUser: (user) => createOrUpdateUser(DB, user),
  getUserByEmail: (email) => getUserByEmail(DB, email),
  getUserById: (id) => getUserById(DB, id),
});

app.use("*", async (c, next) => {
  await initializeDatabase(c.env.DB);
  const auth = c.get("auth");
  if (auth) {
    const session = await auth.api.getSession({
      headers: c.req.raw.headers,
    });
    if (!session) {
      c.set("user", null);
      c.set("session", null);
      return next();
    }
    c.set("user", session.user);
    c.set("session", session.session);
  }
  await next();
});

app.use("/api/auth/*", async (c, next) => {
  const auth = new BetterAuth({
    adapter: customAdapter(c.env.DB),
    providers: {
      github: github({
        clientId: c.env.GITHUB_CLIENT_ID,
        clientSecret: c.env.GITHUB_CLIENT_SECRET,
      }),
      google: google({
        clientId: c.env.GOOGLE_CLIENT_ID,
        clientSecret: c.env.GOOGLE_CLIENT_SECRET,
      }),
    },
  });
  c.set("auth", auth);
  await next();
});

app.on(["POST", "GET"], "/api/auth/*", async (c) => {
  const auth = c.get("auth");
  return auth.handler(c.req.raw);
});

app.use("/api/auth/*", async (c, next) => {
  const auth = new BetterAuth({
    adapter: customAdapter(c.env.DB),
    providers: {
      github: github({
        clientId: c.env.GITHUB_CLIENT_ID,
        clientSecret: c.env.GITHUB_CLIENT_SECRET,
      }),
      google: google({
        clientId: c.env.GOOGLE_CLIENT_ID,
        clientSecret: c.env.GOOGLE_CLIENT_SECRET,
      }),
    },
  });
  c.set("auth", auth);
  await next();
});

app.on(["POST", "GET"], "/api/auth/*", async (c) => {
  const auth = c.get("auth");
  return auth.handler(c.req.raw);
});
app.get("/api/credits/balance/:userId", async (_c) => { /* ... existing logic ... */ });
app.get("/api/credits/transactions/:userId", async (_c) => { /* ... existing logic ... */ });
app.post("/api/credits/generate-pix", async (_c) => { /* ... existing logic ... */ });
app.post("/api/credits/recharge", async (_c) => { /* ... existing logic ... */ });

// --- WEBHOOK ROUTES ---
app.post("/api/webhooks/pix", async (c) => {
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
app.post("/api/instagram/connect", async (_c) => { /* ... existing logic ... */ });
app.post("/api/instagram/upload-photo", async (_c) => { /* ... existing logic ... */ });
app.get("/api/instagram/account/:userId", async (_c) => { /* ... existing mock logic ... */ });
app.delete("/api/instagram/disconnect/:userId", async (_c) => { /* ... existing mock logic ... */ });
app.post("/api/automation/comment-rules", async (_c) => { /* ... existing mock logic ... */ });
app.get("/api/automation/comment-rules/:userId", async (_c) => { /* ... existing mock logic ... */ });
app.post("/api/automation/dm-rules", async (_c) => { /* ... existing mock logic ... */ });
app.get("/api/automation/dm-rules/:userId", async (_c) => { /* ... existing mock logic ... */ });
app.put("/api/automation/dm-rules/:ruleId", async (_c) => { /* ... existing mock logic ... */ });
app.delete("/api/automation/dm-rules/:ruleId", async (_c) => { /* ... existing mock logic ... */ });

// --- FALLBACK ROUTE ---
app.get("*", (c) => c.text("Not found", 404));

export default app;