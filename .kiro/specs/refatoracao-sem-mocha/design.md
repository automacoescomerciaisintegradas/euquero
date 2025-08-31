# Documento de Design - Refatoração EuQuero sem Mocha Framework

## Visão Geral

Esta refatoração transformará o projeto EuQuero de uma aplicação baseada no Mocha Framework para uma aplicação independente e limpa, mantendo a mesma funcionalidade mas com controle total sobre a arquitetura. O objetivo é criar um projeto mais leve, performático e fácil de manter.

## Arquitetura

### Arquitetura Atual vs Nova Arquitetura

**Atual (com Mocha):**

```
EuQuero App
├── @getmocha/vite-plugins (framework layer)
├── @getmocha/users-service (auth service)
├── React Frontend
├── Hono Backend
└── Cloudflare Workers Runtime
```

**Nova (independente):**

```
EuQuero App
├── React Frontend (puro)
├── Hono Backend (puro)
├── Vite Build System (configuração limpa)
└── Cloudflare Workers Runtime
```

### Princípios da Nova Arquitetura

1. **Independência**: Sem dependências de frameworks externos
2. **Simplicidade**: Configuração mínima e clara
3. **Performance**: Apenas dependências essenciais
4. **Manutenibilidade**: Código mais fácil de entender e modificar
5. **Flexibilidade**: Controle total sobre todas as decisões arquiteturais

## Componentes e Interfaces

### 1. Sistema de Build (Vite)

**Configuração Limpa:**

```typescript
// vite.config.ts - Nova versão
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig({
  plugins: [react(), cloudflare()],
  // ... resto da configuração
});
```

**Funcionalidades Mantidas:**

- Hot Module Replacement (HMR)
- TypeScript compilation
- Cloudflare Workers integration
- Path aliases (@/ para src/)
- Build optimization

### 2. Frontend React

**Estrutura Mantida:**

```
src/react-app/
├── components/     # Componentes reutilizáveis
├── pages/         # Páginas da aplicação
├── App.tsx        # Componente principal
└── main.tsx       # Entry point
```

**Funcionalidades Preservadas:**

- Todos os componentes existentes (Header, Hero, Features, etc.)
- Sistema de roteamento com React Router
- Integração com Tailwind CSS
- Componentes UI customizados

### 3. Backend Hono

**Estrutura Mantida:**

```
src/worker/
├── index.ts       # API routes e handlers
└── types.ts       # Worker-specific types
```

**Funcionalidades Preservadas:**

- Todas as rotas API existentes
- Validação com Zod
- Integração com Cloudflare Workers
- Sistema de middleware

### 4. Shared Resources

**Estrutura Mantida:**

```
src/shared/
├── types.ts       # Tipos compartilhados
└── landing-data.ts # Dados da landing page
```

## Modelos de Dados

### Package.json Atualizado

```json
{
  "name": "euquero-app",
  "version": "1.0.0",
  "description": "EuQuero - Plataforma de Automação Inteligente",
  "type": "module",
  "dependencies": {
    "@hono/zod-validator": "^0.5.0",
    "hono": "4.7.7",
    "lucide-react": "^0.510.0",
    "react": "19.0.0",
    "react-dom": "19.0.0",
    "react-router": "^7.5.3",
    "zod": "^3.24.3"
  },
  "devDependencies": {
    "@cloudflare/vite-plugin": "^1.12.0",
    "@eslint/js": "9.25.1",
    "@types/node": "22.14.1",
    "@types/react": "19.0.10",
    "@types/react-dom": "19.0.4",
    "@vitejs/plugin-react": "4.4.1",
    "autoprefixer": "^10.4.21",
    "eslint": "9.25.1",
    "eslint-plugin-react-hooks": "5.2.0",
    "eslint-plugin-react-refresh": "0.4.19",
    "globals": "15.15.0",
    "postcss": "^8.5.3",
    "tailwindcss": "^3.4.17",
    "typescript": "5.8.3",
    "typescript-eslint": "8.31.0",
    "vite": "^7.1.3",
    "wrangler": "^4.33.0"
  }
}
```

### HTML Template Atualizado

```html
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>EuQuero - Automação Inteligente</title>
    <meta
      name="description"
      content="Plataforma de automação inteligente para redes sociais e atendimento"
    />

    <!-- Open Graph -->
    <meta property="og:title" content="EuQuero - Automação Inteligente" />
    <meta
      property="og:description"
      content="Plataforma de automação inteligente para redes sociais e atendimento"
    />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://euquero.com" />

    <!-- Favicon (será criado posteriormente) -->
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/react-app/main.tsx"></script>
  </body>
</html>
```

## Tratamento de Erros

### Estratégia de Migração

1. **Backup**: Criar backup dos arquivos atuais
2. **Remoção Gradual**: Remover dependências Mocha uma por vez
3. **Teste Contínuo**: Verificar funcionamento após cada mudança
4. **Rollback Plan**: Possibilidade de reverter se necessário

### Pontos de Atenção

1. **Dependências Ocultas**: Verificar se algum código depende indiretamente do Mocha
2. **Configurações de Build**: Garantir que todas as configurações sejam migradas
3. **Environment Variables**: Verificar se há variáveis específicas do Mocha
4. **Deployment**: Testar deployment após refatoração

## Estratégia de Testes

### Testes de Funcionalidade

1. **Frontend Tests**:
   - Renderização de todos os componentes
   - Navegação entre páginas
   - Responsividade
   - Interações do usuário

2. **Backend Tests**:
   - Todas as rotas API
   - Validação de dados
   - Tratamento de erros
   - Integração com Cloudflare Workers

3. **Build Tests**:
   - Compilação TypeScript
   - Build de produção
   - Deployment dry-run
   - Performance metrics

### Testes de Regressão

1. **Comparação Visual**: Screenshots antes/depois
2. **Performance**: Métricas de bundle size e load time
3. **Funcionalidade**: Todos os fluxos principais
4. **Compatibilidade**: Diferentes browsers e dispositivos

## Plano de Implementação

### Fase 1: Preparação

- Backup do projeto atual
- Análise de dependências
- Criação de branch para refatoração

### Fase 2: Remoção do Mocha

- Atualização do package.json
- Refatoração do vite.config.ts
- Remoção de imports e referências

### Fase 3: Limpeza e Otimização

- Atualização do HTML template
- Limpeza da documentação
- Otimização das configurações

### Fase 4: Testes e Validação

- Testes de funcionalidade
- Testes de build e deployment
- Validação de performance

### Fase 5: Finalização

- Atualização da documentação
- Commit das mudanças
- Deploy de teste

## Benefícios Esperados

1. **Performance**: Bundle menor e mais rápido
2. **Manutenibilidade**: Código mais limpo e simples
3. **Independência**: Sem dependências de frameworks externos
4. **Flexibilidade**: Controle total sobre a arquitetura
5. **Debugging**: Mais fácil de debugar sem camadas extras
6. **Atualizações**: Mais fácil de manter atualizado
