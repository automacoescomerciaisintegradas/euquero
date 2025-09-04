import { Hono } from "hono";
// import { cors } from "hono/cors";
import { zValidator } from "@hono/zod-validator";
import { googleAuth } from "@hono/oauth-providers/google";
import { githubAuth } from "@hono/oauth-providers/github";
import {
  ContactFormSchema,
  LoginSchema,
  RegisterSchema,
  CreditRechargeSchema,
  type AuthResponse,
} from "@/shared/types";
import { 
  GOOGLE_CLIENT_ID, 
  GOOGLE_CLIENT_SECRET, 
  GITHUB_CLIENT_ID, 
  GITHUB_CLIENT_SECRET 
} from "./config";

const app = new Hono();

// Simple CORS middleware
app.use("/*", async (c, next) => {
  c.res.headers.set("Access-Control-Allow-Origin", "*");
  c.res.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS",
  );
  c.res.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization",
  );

  if (c.req.method === "OPTIONS") {
    return new Response("", { status: 204 });
  }

  await next();
});

// Rota de contato
app.post("/api/contact", zValidator("json", ContactFormSchema), async (c) => {
  try {
    const data = c.req.valid("json");

    // Send data to the webhook
    const webhookResponse = await fetch(
      "https://n8n.iau2.com.br/webhook-test/euquero",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );

    if (!webhookResponse.ok) {
      console.error(
        "Webhook failed:",
        webhookResponse.status,
        webhookResponse.statusText,
      );
      return c.json({ error: "Erro interno do servidor" }, 500);
    }

    return c.json({ success: true, message: "Mensagem enviada com sucesso!" });
  } catch (error) {
    console.error("Contact form error:", error);
    return c.json({ error: "Erro interno do servidor" }, 500);
  }
});

// Rotas de autenticação
app.post("/api/auth/login", zValidator("json", LoginSchema), async (c) => {
  try {
    const data = c.req.valid("json");

    // TODO: Implementar validação de credenciais
    // Por enquanto, simulando uma resposta de sucesso
    const response: AuthResponse = {
      success: true,
      message: "Login realizado com sucesso!",
      user: {
        id: "1",
        email: data.email,
        provider: "email",
        emailVerified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      token: "jwt-token-placeholder",
    };

    return c.json(response);
  } catch (error) {
    console.error("Login error:", error);
    const response: AuthResponse = {
      success: false,
      message: "Erro ao fazer login",
    };
    return c.json(response, 400);
  }
});

app.post(
  "/api/auth/register",
  zValidator("json", RegisterSchema),
  async (c) => {
    try {
      const data = c.req.valid("json");

      // TODO: Implementar criação de usuário e envio de email
      // Por enquanto, simulando uma resposta de sucesso
      const response: AuthResponse = {
        success: true,
        message:
          "Cadastro realizado com sucesso! Verifique seu email para confirmar a conta.",
        user: {
          id: "1",
          email: data.email,
          phone: data.phone,
          provider: "email",
          emailVerified: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      };

      return c.json(response);
    } catch (error) {
      console.error("Register error:", error);
      const response: AuthResponse = {
        success: false,
        message: "Erro ao fazer cadastro",
      };
      return c.json(response, 400);
    }
  },
);

app.post("/api/auth/logout", async (c) => {
  try {
    // TODO: Implementar invalidação de token
    const response: AuthResponse = {
      success: true,
      message: "Logout realizado com sucesso!",
    };

    return c.json(response);
  } catch (error) {
    console.error("Logout error:", error);
    const response: AuthResponse = {
      success: false,
      message: "Erro ao fazer logout",
    };
    return c.json(response, 400);
  }
});

// OAuth routes
app.use(
  "/api/auth/google",
  googleAuth({
    client_id: GOOGLE_CLIENT_ID,
    client_secret: GOOGLE_CLIENT_SECRET,
    scope: ["openid", "email", "profile"],
    redirect_uri: "http://localhost:5173/api/auth/google/callback",
  })
);

app.get("/api/auth/google", (c) => {
  // const token = c.get("token");
  const user = c.get("user-google");

  // TODO: Implementar a lógica de login/cadastro com os dados do usuário
  // Ex: encontrar ou criar usuário no banco de dados
  console.log("Google user:", user);

  // Por enquanto, redirecionando para o dashboard com um token de sucesso
  return c.redirect("/dashboard?status=success");
});

app.use(
  "/api/auth/github",
  githubAuth({
    client_id: GITHUB_CLIENT_ID,
    client_secret: GITHUB_CLIENT_SECRET,
    scope: ["user:email"],
    redirect_uri: "http://localhost:5173/api/auth/github/callback",
    oauthApp: true,
  })
);

app.get("/api/auth/github", (c) => {
  // const token = c.get("token");
  const user = c.get("user-github");

  // TODO: Implementar a lógica de login/cadastro com os dados do usuário
  console.log("GitHub user:", user);

  // Redirecionando para o dashboard
  return c.redirect("/dashboard?status=success");
});

app.post("/api/auth/verify-email", async (c) => {
  try {
    // TODO: Implementar verificação de email
    const response: AuthResponse = {
      success: true,
      message: "Email verificado com sucesso!",
    };

    return c.json(response);
  } catch (error) {
    console.error("Email verification error:", error);
    const response: AuthResponse = {
      success: false,
      message: "Erro ao verificar email",
    };
    return c.json(response, 400);
  }
});

// Rotas do sistema de créditos
app.get("/api/credits/balance", async (c) => {
  try {
    // TODO: Buscar saldo real do usuário
    const mockBalance = {
      userId: "1",
      balance: 25.5,
      currency: "BRL",
      lastUpdated: new Date(),
      expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 ano
    };

    return c.json(mockBalance);
  } catch (error) {
    console.error("Balance error:", error);
    return c.json({ error: "Erro ao buscar saldo" }, 500);
  }
});

app.get("/api/credits/transactions", async (c) => {
  try {
    // TODO: Buscar transações reais do usuário
    const mockTransactions = [
      {
        id: "1",
        userId: "1",
        type: "credit" as const,
        amount: 50.0,
        description: "Recarga via PIX",
        service: "Recarga",
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      },
      {
        id: "2",
        userId: "1",
        type: "debit" as const,
        amount: 5.5,
        description: "Geração de conteúdo IA",
        service: "IA Content",
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      },
      {
        id: "3",
        userId: "1",
        type: "debit" as const,
        amount: 2.0,
        description: "Análise de tendências",
        service: "Analytics",
        createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
      },
    ];

    return c.json(mockTransactions);
  } catch (error) {
    console.error("Transactions error:", error);
    return c.json({ error: "Erro ao buscar transações" }, 500);
  }
});

app.post(
  "/api/credits/recharge",
  zValidator("json", CreditRechargeSchema),
  async (c) => {
    try {
      const data = c.req.valid("json");

      // TODO: Implementar integração com gateway de pagamento PIX
      const mockRecharge = {
        id: "recharge_" + Date.now(),
        userId: "1",
        amount: data.amount,
        method: data.paymentMethod,
        status: "pending" as const,
        createdAt: new Date(),
        pixEmail: "pix@automacoescomerciais.com.br",
        pixKey: "857e068a-f857-43be-aba7-b70f083b611d",
      };

      // Resposta para PIX
      return c.json({
        success: true,
        message: "PIX gerado com sucesso!",
        recharge: mockRecharge,
        pixCode:
          "00020126580014BR.GOV.BCB.PIX0136857e068a-f857-43be-aba7-b70f083b611d5204000053039865802BR5925AUTOMACOES COMERCIAIS LTDA6009SAO PAULO62070503***6304",
        pixEmail: "pix@automacoescomerciais.com.br",
        pixKey: "857e068a-f857-43be-aba7-b70f083b611d",
        qrCode: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",
      });
    } catch (error) {
      console.error("Recharge error:", error);
      return c.json(
        {
          success: false,
          message: "Erro ao processar recarga",
        },
        400,
      );
    }
  },
);

// Serve static files for the React app
app.get("*", (c) => {
  return c.text("Not found", 404);
});

export default app;
