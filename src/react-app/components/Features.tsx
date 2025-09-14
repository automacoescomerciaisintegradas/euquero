import React from 'react';
import { MessageSquare, Instagram, TrendingUp, Bot, Shield, Clock } from 'lucide-react';

interface FeatureCard {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const features: FeatureCard[] = [
  {
    title: "Automação de Respostas",
    description: "Respostas automáticas inteligentes para comentários em posts, stories e reels",
    icon: <MessageSquare className="w-6 h-6" />
  },
  {
    title: "Gestão Multi-perfil",
    description: "Gerencie múltiplas contas do Instagram em uma única dashboard",
    icon: <Instagram className="w-6 h-6" />
  },
  {
    title: "Análise de Desempenho",
    description: "Métricas detalhadas e insights para otimizar sua estratégia",
    icon: <TrendingUp className="w-6 h-6" />
  },
  {
    title: "IA Avançada",
    description: "Inteligência artificial que aprende com suas interações",
    icon: <Bot className="w-6 h-6" />
  },
  {
    title: "Proteção Inteligente",
    description: "Sistema anti-spam e proteção contra violações",
    icon: <Shield className="w-6 h-6" />
  },
  {
    title: "Economia de Tempo",
    description: "Automatize tarefas repetitivas e foque no que importa",
    icon: <Clock className="w-6 h-6" />
  }
];

export default function Features() {
  return (
    <div className="bg-zinc-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Automatize seu
            <span className="bg-gradient-to-r from-[#CCFF00] to-green-400 text-transparent bg-clip-text"> Instagram</span>
          </h2>
          <p className="mt-6 text-lg leading-8 text-zinc-400">
            Economize horas todos os dias com nossa automação inteligente
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-7xl">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative rounded-3xl bg-zinc-800/50 p-8 hover:bg-zinc-800 transition-all duration-300"
              >
                <div className="relative">
                  <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-[#CCFF00] text-zinc-900 mb-6 transform group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>

                  <h3 className="text-xl font-semibold leading-7 text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-base leading-7 text-zinc-400">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}