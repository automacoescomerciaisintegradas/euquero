// Definições de tipos para o ambiente Cloudflare Workers

interface Env {
  // Adicione aqui as variáveis de ambiente e bindings do Cloudflare Workers
  // Exemplo: DB: D1Database;
  // Exemplo: BUCKET: R2Bucket;
  // Exemplo: API_KEY: string;
}

// Extensão dos tipos globais para Cloudflare Workers
declare global {
  const console: Console;
  const fetch: typeof globalThis.fetch;
  const Response: typeof globalThis.Response;
  const Request: typeof globalThis.Request;
}

export {};