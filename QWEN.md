# Qwen Code - Contexto do Projeto EuQuero

## Visão Geral do Projeto

O EuQuero é uma aplicação web completa de automação inteligente para redes sociais e atendimento ao cliente. A plataforma utiliza tecnologias modernas com um frontend em React e um backend serverless implantado no Cloudflare Workers.

### Tecnologias Principais

- **Frontend**: React 19 com TypeScript e Tailwind CSS
- **Backend**: Framework Hono com validação Zod
- **Runtime**: Cloudflare Workers para performance global
- **Build System**: Vite com configuração otimizada
- **Autenticação**: OAuth (Google e GitHub) com BetterAuth
- **Banco de Dados**: D1 Database (Cloudflare)

## Estrutura do Projeto

```
src/
├── react-app/          # Frontend React
│   ├── components/     # Componentes reutilizáveis
│   ├── pages/          # Páginas da aplicação
│   └── App.tsx         # Componente principal
├── shared/             # Recursos compartilhados
│   └── types.ts        # Definições TypeScript
└── worker/             # Backend Cloudflare Worker
    └── index.ts        # Rotas e handlers da API
```

## Instruções para Desenvolvimento

### Pré-requisitos

- Node.js 18+
- npm ou yarn

### Comandos Principais

1. **Instalação de Dependências**
   ```bash
   npm install
   ```

2. **Desenvolvimento Local**
   ```bash
   npm run dev
   ```
   Inicia o servidor de desenvolvimento com Vite na porta 5173.

3. **Build de Produção**
   ```bash
   npm run build
   ```

4. **Validação de Deployment**
   ```bash
   npm run check
   ```

5. **Verificação de Qualidade**
   ```bash
   npm run lint
   ```

### Estrutura de Rotas

**Frontend (React)**
- `/` - Página de teste do WhatsApp
- `/login`, `/auth` - Página de autenticação
- `/cadastro` - Página de registro
- `/dashboard`, `/painel` - Painel principal
- `/automacao` - Página de automação

**Backend (API)**
- `/api/auth/*` - Rotas de autenticação (login, registro, OAuth)
- `/api/credits/*` - Rotas de gerenciamento de créditos
- `/api/webhooks/*` - Webhooks (PIX, fila de retry)
- `/api/instagram/*` - Rotas de automação do Instagram (implementação mock)
- `/api/automation/*` - Rotas de automação (comentários, DMs)

### Componentes Principais

1. **Autenticação**
   - `AuthPage.tsx` - Página principal de autenticação com abas de login/registro
   - `LoginForm.tsx` - Formulário de login com validação Zod
   - `RegisterForm.tsx` - Formulário de registro com validação Zod
   - `OAuthButtons.tsx` - Botões de login social (Google/GitHub)

2. **Dashboard**
   - `Dashboard.tsx` - Painel principal com navegação por abas
   - `CreditCard.tsx` - Exibição do saldo de créditos
   - `SubscriptionPlans.tsx` - Planos de assinatura
   - `TransactionHistory.tsx` - Histórico de transações
   - Componentes de automação (regras de comentários, DMs, métricas, etc.)

### Tipos e Validação

O projeto utiliza Zod para validação de dados em todo o sistema. Os principais schemas estão definidos em `src/shared/types.ts`:

- `LoginSchema` e `RegisterSchema` para autenticação
- `ContactFormSchema` para formulário de contato
- Schemas para automação (comentários, DMs, posts agendados)
- Schemas para gerenciamento de créditos e webhooks PIX

### Sistema de Créditos

A plataforma utiliza um sistema de créditos pay-per-use:
- Mínimo de R$50 para recarga via PIX
- Saldo expira anualmente
- Transações registradas no histórico
- Webhook PIX para confirmação de pagamentos

### Automação de Redes Sociais

Funcionalidades planejadas (com implementação mock no backend):
- Conexão com contas do Instagram
- Regras de automação para comentários e DMs
- Agendamento de posts
- Métricas de engajamento
- Sugestões de conteúdo

## Ambiente de Desenvolvimento

Para configurar o ambiente de desenvolvimento:

1. Execute `npm install` para instalar as dependências
2. Configure as variáveis de ambiente no arquivo `.env`
3. Inicie o servidor de desenvolvimento com `npm run dev`
4. Acesse a aplicação em `http://localhost:5173`

## Considerações Importantes

- O projeto utiliza uma arquitetura limpa e independente sem frameworks externos
- A autenticação OAuth requer configuração de credenciais dos provedores (Google/GitHub)
- O backend roda em Cloudflare Workers com D1 Database
- O frontend é servido estaticamente pelo Cloudflare Pages
- O sistema de créditos utiliza webhooks PIX para processamento de pagamentos

## Instruções para Agentes de IA

- Sempre que um agente de IA for utilizado, ele deve seguir as convenções de codificação e estrutura do projeto descritas neste documento.
- Os agentes devem utilizar preferencialmente as tecnologicas já adotadas no projeto (React, TypeScript, Tailwind CSS, Hono, Zod, Cloudflare Workers).
- Qualquer nova dependência ou biblioteca adicionada por um agente deve ser justificada e alinhada com os princípios do projeto.
- Os agentes devem manter a consistência com o código existente, respeitando os padrões de nomenclatura, estrutura de pastas e componentização.
- É fundamental que os agentes verifiquem se suas modificações não quebram a funcionalidade existente, rodando os testes e builds quando apropriado.
- Ao gerar código, os agentes devem incluir comentários explicativos apenas quando necessário para esclarecer lógica complexa.
- Os agentes devem sempre buscar entender o contexto completo antes de realizar alterações, utilizando ferramentas de leitura e busca disponíveis.
- Mudanças propostas por agentes devem estar alinhadas com a visão geral do projeto e suas funcionalidades planejadas.
- Reúna recursivamente todas as informações relevantes, buscando links adicionais até obter todas as informações necessárias.