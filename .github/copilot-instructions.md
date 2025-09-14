# Instruções para Agentes de IA - EuQuero

Este documento orienta agentes de IA (ex: GitHub Copilot, Claude, Cursor) para serem produtivos rapidamente neste repositório.

## Visão Geral da Arquitetura
- **Frontend:** React 19 + TypeScript + Tailwind CSS em `src/react-app/`, com roteamento via `react-router-dom` e autenticação via `better-auth` + OAuth.
- **Backend:** Hono em Cloudflare Workers (`src/worker/`), com validação Zod, ORM Drizzle para SQLite (`src/worker/db/`), e integração Supabase para dados como resumes (`src/worker/supabase.ts`).
- **Compartilhados:** Tipos TypeScript e dados em `src/shared/types.ts` e `src/shared/landing-data.ts`, usados para comunicação frontend-backend via API REST.
- **Build e Deploy:** Vite para frontend (`vite.config.ts`), Wrangler para workers (`wrangler.toml`); dados fluem de automações (scripts Python) para DB via backend APIs.
- **Automação:** Scripts Python em `scripts/` para integrações Instagram/Pix, processando webhooks e atualizando DB.

## Fluxos de Desenvolvimento
- Instalação: `npm install`
- Desenvolvimento local: `npm run dev` (roda Vite para frontend e worker local via Wrangler se configurado).
- Build produção: `npm run build` (compila TS e bundla com Vite).
- Lint e TypeCheck: `npm run lint` (ESLint em todo projeto).
- Gerenciamento DB: `npm run db:generate` (Drizzle schema), `npm run db:migrate` (aplica migrações), `npm run db:studio` (UI para inspecionar DB).
- Testes: Rode scripts Node/Python em `scripts/` (ex: `node scripts/test-webhook-pix.js`); testes React em `src/react-app/components/__tests__/`.

## Convenções e Padrões
- **Componentes React:** Funcionais com hooks em `src/react-app/hooks/` (ex: `useAutomation.ts` para regras de automação); dashboard em `src/react-app/components/dashboard/` com subcomponentes como `CampaignManager.tsx` para gerenciamento de campanhas.
- **Páginas:** Em `src/react-app/pages/` (ex: `AutomationDashboard.tsx` integra métricas de `AutomationMetrics.tsx`).
- **Backend Routes:** Em `src/worker/index.ts`, handlers Hono usam Zod para validação e Drizzle para queries (ex: webhooks Pix em `webhook-utils.ts`).
- **Comunicação:** Frontend chama APIs backend via fetch/axios implícito; use tipos compartilhados para payloads (ex: eventos de automação).
- **Integrações Externas:** Documentadas em `docs/`; OAuth em vars de ambiente (`docs/oauth-setup.md`); padrões: hooks para estado local, context para auth global.
- **DB Schema:** Definido em `src/worker/db/schema.ts`, migrado via Drizzle; Supabase para storage externo.

## Integrações e Dependências
- **Pagamentos:** MercadoPago (`mercadopago`) para Pix/qr-codes, testado via `scripts/test-webhook-pix.js` e `public/pix-qrcode.png`.
- **Social/Mensagens:** WhatsApp/Instagram via scripts Python (`scripts/instagram-automation.py`); docs em `docs/whatsapp-integration.md` e `docs/INSTAGRAM_SETUP.md`.
- **DB/Cloud:** Drizzle + better-sqlite3 para local/prod; Supabase client em `src/worker/supabase.ts`; Cloudflare via `wrangler.jsonc`.
- **Autenticação:** `better-auth` com OAuth providers, configurado em backend e frontend auth components (`src/react-app/components/auth/`).

## Exemplos de Comandos Úteis
- Automação Instagram: `python scripts/instagram-automation.py` (requer env Python via `setup-python-env.bat`).
- Teste Pix Webhook: `node scripts/test-webhook-pix.js`.
- Deploy Worker: `npx wrangler deploy` (após build).
- Inspecionar DB: `npm run db:studio` (abre UI para schema/queries).

## Recomendações para Agentes
- Priorize hooks reutilizáveis para automação (ex: `useAutomationRules.ts` para regras de comentários).
- Mantenha tipagem forte: estenda `src/shared/types.ts` para novas entities.
- Para integrações, adicione handlers Hono e atualize schema Drizzle; teste com scripts em `scripts/`.
- Consulte `vite.config.ts` para aliases (ex: `@/components`), `wrangler.toml` para bindings env.
- Documente features em `docs/FUNCIONALIDADES_IMPLEMENTADAS.md` e estrutura em `README.md`.

## Referências
- Estrutura detalhada: Seção "Estrutura do Projeto" em `README.md`.
- OAuth e Webhooks: `docs/oauth-setup.md` e `docs/webhook-pix-setup.md`.
- Funcionalidades: `docs/FUNCIONALIDADES_// Versão simplificada
<Tooltip formatter={(value: number) => [value, 'Quantidade']} />