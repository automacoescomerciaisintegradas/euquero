# Documento de Design - Landing Page EuQuero

## Visão Geral

A landing page do EuQuero será uma página moderna e responsiva que apresenta a plataforma de fidelização e marketing automático. O design seguirá os princípios de UX/UI modernos com foco na conversão e experiência do usuário brasileiro.

## Arquitetura

### Estrutura da Página
```
┌─────────────────────────────────────┐
│              Header                 │
├─────────────────────────────────────┤
│            Hero Section             │
├─────────────────────────────────────┤
│           Features Section          │
├─────────────────────────────────────┤
│           Pricing Section           │
├─────────────────────────────────────┤
│              Footer                 │
└─────────────────────────────────────┘
```

### Tecnologias Utilizadas
- **React 19** com TypeScript
- **Tailwind CSS** para estilização
- **Lucide React** para ícones
- **React Router** para navegação
- **Componentes responsivos** para diferentes dispositivos

## Componentes e Interfaces

### 1. Header Component
```tsx
interface HeaderProps {
  currentPage?: string;
}

// Estrutura:
// - Logo/Marca EuQuero (lado esquerdo)
// - Navegação: Início | Serviços | Blog | Sobre | Contato
// - Botão "Entrar" (lado direito)
// - Menu hambúrguer para mobile
```

### 2. Hero Section Component
```tsx
interface HeroSectionProps {
  title: string;
  subtitle: string;
  ctaText: string;
  onCtaClick: () => void;
}

// Estrutura:
// - Título principal: "Fidelize seus clientes com inteligência"
// - Subtítulo explicativo sobre a plataforma
// - Botão CTA "Comece Agora"
// - Imagem/ilustração representativa (lado direito)
```

### 3. Features Section Component
```tsx
interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface FeaturesSectionProps {
  features: Feature[];
}

// Features principais:
// 1. Fidelização Personalizada (ícone: Heart)
// 2. Marketing Automático (ícone: Zap)
// 3. Análise de Dados (ícone: BarChart3)
```

### 4. Pricing Section Component
```tsx
interface PricingPlan {
  name: string;
  price: number;
  period: string;
  features: string[];
  highlighted?: boolean;
  ctaText: string;
}

interface PricingSectionProps {
  plans: PricingPlan[];
}

// Planos sugeridos:
// - Básico: R$ 49,90/mês
// - Profissional: R$ 99,90/mês (destacado)
// - Empresarial: R$ 199,90/mês
```

### 5. Footer Component
```tsx
interface ContactInfo {
  type: 'email' | 'telegram' | 'whatsapp';
  label: string;
  value: string;
  link: string;
}

// Informações de contato obrigatórias:
// - Email: contato@fcaq.com.br
// - Telegram: https://t.me/+9cdym9gvPQ9iOWNh
// - WhatsApp: +55 88 988712711
```

## Modelos de Dados

### Configuração da Landing Page
```typescript
// src/shared/types.ts
export interface LandingPageConfig {
  hero: {
    title: string;
    subtitle: string;
    ctaText: string;
    ctaLink: string;
  };
  features: Feature[];
  pricing: PricingPlan[];
  contact: ContactInfo[];
}
```

### Dados Estáticos
```typescript
// src/shared/landing-data.ts
export const landingPageData: LandingPageConfig = {
  hero: {
    title: "Fidelize seus clientes com inteligência",
    subtitle: "Plataforma completa de fidelização e marketing automático para impulsionar seu negócio",
    ctaText: "Comece Agora",
    ctaLink: "/cadastro"
  },
  // ... demais configurações
};
```

## Tratamento de Erros

### Estratégias de Error Handling
1. **Fallbacks Graceful**: Componentes com dados padrão caso falhe o carregamento
2. **Loading States**: Indicadores de carregamento para seções dinâmicas
3. **Error Boundaries**: Captura de erros React para evitar quebra da página
4. **Retry Logic**: Tentativas automáticas para recursos que falharam

### Mensagens de Erro em Português
```typescript
export const errorMessages = {
  loadingFailed: "Erro ao carregar conteúdo. Tente novamente.",
  networkError: "Problema de conexão. Verifique sua internet.",
  genericError: "Algo deu errado. Nossa equipe foi notificada."
};
```

## Estratégia de Testes

### Testes de Componentes
1. **Header**: Navegação funcional, responsividade
2. **Hero Section**: CTA redirecionamento, conteúdo correto
3. **Features**: Renderização de ícones e textos
4. **Pricing**: Formatação de preços, botões funcionais
5. **Footer**: Links de contato funcionais

### Testes de Integração
1. **Navegação completa**: Fluxo entre seções
2. **Responsividade**: Diferentes tamanhos de tela
3. **Performance**: Tempo de carregamento
4. **Acessibilidade**: Navegação por teclado, screen readers

### Testes de Usabilidade
1. **Conversão**: Taxa de cliques no CTA
2. **Engajamento**: Tempo na página, scroll depth
3. **Mobile**: Experiência em dispositivos móveis
4. **Cross-browser**: Compatibilidade entre navegadores

## Design System

### Paleta de Cores
```css
:root {
  --primary: #3B82F6;      /* Azul principal */
  --primary-dark: #1E40AF;  /* Azul escuro */
  --secondary: #10B981;     /* Verde sucesso */
  --accent: #F59E0B;        /* Amarelo destaque */
  --neutral-50: #F9FAFB;    /* Fundo claro */
  --neutral-900: #111827;   /* Texto escuro */
}
```

### Tipografia
- **Títulos**: font-bold, text-3xl/4xl/5xl
- **Subtítulos**: font-semibold, text-xl/2xl
- **Corpo**: font-normal, text-base/lg
- **Botões**: font-medium, text-sm/base

### Espaçamento
- **Seções**: py-16 md:py-24
- **Containers**: max-w-7xl mx-auto px-4
- **Elementos**: space-y-8, gap-6/8/12

### Componentes Reutilizáveis
1. **Button**: Variações primary, secondary, outline
2. **Card**: Container padrão para features e pricing
3. **Container**: Wrapper responsivo para seções
4. **Icon**: Wrapper padronizado para Lucide icons