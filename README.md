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

## Tecnologias Utilizadas

- **React 19**: Framework frontend moderno
- **TypeScript**: Tipagem estática
- **Tailwind CSS**: Framework CSS utilitário
- **Hono**: Framework web para Cloudflare Workers
- **Zod**: Validação de dados em runtime
- **Vite**: Build tool rápido e moderno
- **Cloudflare Workers**: Runtime serverless global
