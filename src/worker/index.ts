import { Hono } from "hono";
// import { cors } from "hono/cors";
import { zValidator } from "@hono/zod-validator";
import { ContactFormSchema } from "@/shared/types";

// Definição do tipo Env para o Cloudflare Workers
interface Env {
  // Adicione aqui as variáveis de ambiente e bindings do Cloudflare Workers
  // Exemplo: DB: D1Database;
}

const app = new Hono<{ Bindings: Env }>();

// Simple CORS middleware
app.use("/*", async (c, next) => {
  c.res.headers.set("Access-Control-Allow-Origin", "*");
  c.res.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  c.res.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  
  if (c.req.method === "OPTIONS") {
    return new Response("", { status: 204 });
  }
  
  await next();
});

app.post("/api/contact", zValidator("json", ContactFormSchema), async (c) => {
  try {
    const data = c.req.valid("json");
    
    // Send data to the webhook
    const webhookResponse = await fetch("https://n8n.iau2.com.br/webhook-test/euquero", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!webhookResponse.ok) {
      console.error("Webhook failed:", webhookResponse.status, webhookResponse.statusText);
      return c.json({ error: "Erro interno do servidor" }, 500);
    }

    return c.json({ success: true, message: "Mensagem enviada com sucesso!" });
  } catch (error) {
    console.error("Contact form error:", error);
    return c.json({ error: "Erro interno do servidor" }, 500);
  }
});

// Serve static files for the React app
app.get("*", (c) => {
  return c.text("Not found", 404);
});

export default app;
