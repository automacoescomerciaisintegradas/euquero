import type { LandingPageConfig, WhatsAppConfig } from "./types";

export const landingPageData: LandingPageConfig = {
  hero: {
    title: "Fidelize seus clientes com inteligência",
    subtitle:
      "Plataforma completa de fidelização e marketing automático para impulsionar seu negócio",
    ctaText: "Comece Agora",
    ctaLink: "/cadastro",
  },
  features: [
    {
      icon: "MessageSquare",
      title: "Automação em Postagens",
      description:
        "Configure respostas automáticas para comentários em posts, Stories, Reels e Remixes",
      details: [
        "Respostas automáticas para comentários",
        "Envio de mensagens via DM automatizado",
        "Múltiplos links e imagens no inbox",
        "Configuração em 3 passos simples",
      ],
      highlight: "Teste GRÁTIS com 10 créditos",
      videoUrl: "https://youtu.be/yjKN7Cc7uiw",
    },
    {
      icon: "Bot",
      title: "Automação de Autoatendimento",
      description:
        "Mensagens de boas-vindas automáticas e fluxo de vendas no inbox",
      details: [
        "Mensagens de boas-vindas automáticas",
        "Fluxo de vendas automático no inbox",
        "Respostas para perguntas frequentes",
        "Atendimento 24/7 sem parar",
      ],
      highlight: "1.000 créditos de cortesia",
      videoUrl: "https://youtu.be/yjKN7Cc7uiw",
    },
    {
      icon: "Video",
      title: "Automação em Lives",
      description:
        "Respostas automáticas durante lives e conversão de espectadores em clientes",
      details: [
        "Respostas automáticas em lives",
        "Envio de links de compra automático",
        "Cupons de desconto no chat ao vivo",
        "Máquina de conversão 100% automática",
      ],
      highlight: "Venda mais ao vivo",
      videoUrl: "https://youtu.be/Zy2bSpZtULI",
    },
  ],
  pricing: [
    {
      name: "Plano Grátis",
      price: 0,
      period: "sempre",
      features: [
        "3 testes gratuitos",
        "Automação básica em postagens",
        "Suporte por email",
        "Acesso limitado às funcionalidades",
      ],
      ctaText: "Começar Grátis",
      highlighted: false,
      badge: "Teste Grátis",
    },
    {
      name: "Pay-per-Use",
      price: 0.5,
      period: "por uso",
      features: [
        "Pague apenas pelo que usar",
        "Todas as funcionalidades disponíveis",
        "Automação completa",
        "Pagamento via PIX",
        "Sem mensalidade fixa",
      ],
      ctaText: "Usar Agora",
      highlighted: true,
      badge: "Mais Flexível",
    },
    {
      name: "Plano Mensal",
      price: 97.0,
      period: "mês",
      features: [
        "Uso ilimitado",
        "Todas as automações",
        "Suporte prioritário",
        "Relatórios avançados",
        "Integrações completas",
      ],
      ctaText: "Assinar Agora",
      highlighted: false,
      badge: "Melhor Custo-Benefício",
    },
  ],
  contact: [
    {
      type: "email",
      label: "📧 Email",
      value: "contato@fcaq.com.br",
      link: "mailto:contato@fcaq.com.br",
    },
    {
      type: "telegram",
      label: "💬 Telegram",
      value: "https://t.me/+9cdym9gvPQ9iOWNh",
      link: "https://t.me/+9cdym9gvPQ9iOWNh",
    },
    {
      type: "whatsapp",
      label: "📱 WhatsApp",
      value: "+55 88 988712711",
      link: "https://wa.me/5588988712711",
    },
  ],
};

export const whatsappConfig: WhatsAppConfig = {
  phoneNumber: "5588988712711",
  defaultMessage:
    "Olá! Gostaria de saber mais sobre o EuQuero. Podem me ajudar?",
  teamName: "Equipe EuQuero",
  welcomeMessage:
    "Olá! Tem dúvidas sobre nossa plataforma? Estamos aqui para ajudar!",
};
