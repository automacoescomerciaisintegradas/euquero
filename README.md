# EuQuero - Plataforma de Automação Inteligente

EuQuero é uma aplicação web completa construída com tecnologias modernas, apresentando um frontend React e backend Hono implantado no Cloudflare Workers. A plataforma oferece soluções de automação inteligente para redes sociais e atendimento ao cliente.

## Arquitetura Limpa e Independente

Este projeto utiliza uma arquitetura limpa e independente, sem dependências de frameworks externos:

- **Frontend**: React 19 com TypeScript e Tailwind CSS
- **Backend**: Hono framework com validação Zod
- **Runtime**: Cloudflare Workers para performance global
- **Build System**: Vite com configuração otimizada

## Configuração e Desenvolvimento

### Pré-requisitos

- Node.js 18+
- npm ou yarn

### Instalação

```bash
npm install
```

### Configuração do Sistema de Autenticação OAuth

Para que o sistema de autenticação OAuth funcione corretamente, você precisa configurar as credenciais dos provedores (Google e GitHub). Veja o guia completo em [docs/oauth-setup.md](docs/oauth-setup.md).

### Desenvolvimento Local

```bash
npm run dev
```

### Build de Produção

```bash
npm run build
```

### Validação de Deployment

```bash
npm run check
```

### Verificação de Qualidade

```bash
npm run lint
```

## Estrutura do Projeto

```
src/
├── react-app/          # Frontend React
│   ├── components/     # Componentes reutilizáveis
│   ├── pages/         # Páginas da aplicação
│   └── App.tsx        # Componente principal
├── shared/            # Recursos compartilhados
│   └── types.ts       # Definições TypeScript
└── worker/            # Backend Cloudflare Worker
    └── index.ts       # Rotas e handlers da API
```

## Funcionalidades

- ✅ Interface responsiva em português brasileiro
- ✅ Sistema de automação para redes sociais
- ✅ Autoatendimento inteligente
- ✅ Suporte para lives e transmissões
- ✅ Integração com WhatsApp, Telegram e email
- ✅ Arquitetura serverless escalável
- ✅ Sistema de autenticação OAuth (Google, GitHub, Facebook)
- ✅ Sistema de autenticação via WhatsApp
- ✅ Sistema de indicação e recompensas (Indique e Ganhe)

## Tecnologias Utilizadas

- **React 19**: Framework frontend moderno
- **TypeScript**: Tipagem estática
- **Tailwind CSS**: Framework CSS utilitário
- **Hono**: Framework web para Cloudflare Workers
- **Zod**: Validação de dados em runtime
- **Vite**: Build tool rápido e moderno
- **Cloudflare Workers**: Runtime serverless global

## API de Indicação e Recompensas

O sistema "Indique e Ganhe" permite que os usuários convidem amigos para a plataforma e recebam recompensas em créditos.

### Endpoints

- `POST /api/referrals/generate` - Gera um código de indicação para o usuário
- `GET /api/referrals/my-code` - Retorna o código de indicação do usuário
- `GET /api/referrals/stats` - Retorna estatísticas de indicações do usuário
- `POST /api/referrals/track` - Rastreia uma indicação quando um amigo se registra
- `POST /api/referrals/award-credits` - Concede créditos ao indicador
- `POST /api/referrals/complete` - Completa indicações pendentes quando um usuário confirma registro

Cada indicação bem-sucedida concede R$10 em créditos tanto para o indicador quanto para o indicado.
