// Definições de tipos para o ambiente Cloudflare Workers

// Extensão dos tipos globais para Cloudflare Workers
declare global {
  const console: Console;
  const fetch: typeof globalThis.fetch;
  const Response: typeof globalThis.Response;
  const Request: typeof globalThis.Request;
  
  // Variáveis de ambiente
  const GOOGLE_CLIENT_ID: string | undefined;
  const GOOGLE_CLIENT_SECRET: string | undefined;
  const GITHUB_CLIENT_ID: string | undefined;
  const GITHUB_CLIENT_SECRET: string | undefined;
}