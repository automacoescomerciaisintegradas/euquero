import React from 'react';
import { Users, Star, ArrowUpRight, CheckCircle } from 'lucide-react';

interface MetricCard {
  label: string;
  value: string;
  description: string;
  trend: string;
  icon: React.ReactNode;
}

const metrics: MetricCard[] = [
  {
    label: "Empresas Ativas",
    value: "+500",
    description: "empresas usando nossa plataforma",
    trend: "+12% este mês",
    icon: <Users className="w-6 h-6" />
  },
  {
    label: "Satisfação",
    value: "98%",
    description: "dos clientes satisfeitos",
    trend: "+2% desde o último mês",
    icon: <Star className="w-6 h-6" />
  },
  {
    label: "Taxa de Crescimento",
    value: "24%",
    description: "média de crescimento mensal",
    trend: "+5% comparado ao mês anterior",
    icon: <ArrowUpRight className="w-6 h-6" />
  },
  {
    label: "Fidelização",
    value: "85%",
    description: "taxa de retenção de clientes",
    trend: "Mantendo excelência",
    icon: <CheckCircle className="w-6 h-6" />
  }
];

export default function Metrics() {
  return (
    <div className="bg-zinc-900 py-24 sm:py-32 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,#CCFF00_1px,transparent_1px)] bg-[size:24px_24px] opacity-5"></div>
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-4">
            Resultados 
            <span className="bg-gradient-to-r from-[#CCFF00] to-green-400 text-transparent bg-clip-text"> comprovados</span>
          </h2>
          <p className="text-lg leading-8 text-zinc-400">
            Métricas que comprovam a eficiência da nossa plataforma
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-7xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="group relative rounded-3xl bg-zinc-800/50 p-8 hover:bg-zinc-800 transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-[#CCFF00] text-zinc-900 transform group-hover:scale-110 transition-transform duration-300">
                  {metric.icon}
                </div>
                <div className="text-4xl font-bold text-white">
                  {metric.value}
                </div>
              </div>

              <h3 className="text-lg font-semibold text-white mb-2">
                {metric.label}
              </h3>
              
              <p className="text-sm text-zinc-400 mb-4">
                {metric.description}
              </p>

              <div className="text-sm text-[#CCFF00] font-medium">
                {metric.trend}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}