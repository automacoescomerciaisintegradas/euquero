import { Hono } from "hono";
import { cors } from "hono/cors";
import { BetterAuth, createAdapter } from "better-auth";
import { github, google } from "better-auth/providers";
import { facebookAuth } from "@hono/oauth-providers/facebook";
import { createOrUpdateUser, getUserByEmail, getUserById } from "./db";
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
import { getSupabaseClient } from "./supabase";
import { createResume } from "./supabase-resumes";
import type { Env } from "./env";
import type { FacebookUser } from "@hono/oauth-providers/facebook/types";

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

app.post("/api/resumes", async (c) => {
  const supabase = getSupabaseClient(c.env);
  const formData = await c.req.formData();
  const userId = formData.get("userId") as string;
  const file = formData.get("file") as File;

  if (!userId || !file) {
    return c.json({ error: "Missing userId or file" }, 400);
  }

  const fileExtension = file.name.split('.').pop();
  const fileName = `${userId}_${Date.now()}.${fileExtension}`;
  const filePath = `resumes/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from("resumes")
    .upload(filePath, file);

  if (uploadError) {
    return c.json({ error: uploadError.message }, 500);
  }

  try {
    const resume = await createResume(c.env, {
      userId,
      fileName: file.name,
      filePath,
    });

    return c.json(resume);
  } catch (error: any) {
    // If resume record creation fails, try to delete the uploaded file
    await supabase.storage.from("resumes").remove([filePath]);
    return c.json({ error: error.message }, 500);
  }
});


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

// --- FACEBOOK AUTHENTICATION ROUTE ---
// Rota de autenticação do Facebook
app.use("/api/auth/facebook", facebookAuth({
  client_id: c.env.FACEBOOK_CLIENT_ID,
  client_secret: c.env.FACEBOOK_CLIENT_SECRET,
  redirect_uri: c.env.FACEBOOK_REDIRECT_URI,
  scope: ["email", "public_profile"],
  fields: ["id", "name", "email", "picture"]
}));

app.get("/api/auth/facebook/callback", async (c) => {
  const user = c.get("user-facebook") as FacebookUser | undefined;
  
  if (!user) {
    return c.json({ error: "Falha na autenticação com Facebook" }, 400);
  }

  try {
    // Criar ou atualizar usuário no banco de dados
    const dbUser = await createOrUpdateUser(c.env.DB, {
      email: user.email || `${user.id}@facebook.com`,
      name: user.name,
      provider: "facebook",
      providerId: user.id,
    });

    // Redirecionar para o dashboard após login bem-sucedido
    return c.redirect("/dashboard");
  } catch (error) {
    console.error("Erro ao criar/atualizar usuário do Facebook:", error);
    return c.json({ error: "Erro interno do servidor" }, 500);
  }
});

// --- FALLBACK ROUTE ---
app.get("*", (c) => c.text("Not found", 404));

export default app;