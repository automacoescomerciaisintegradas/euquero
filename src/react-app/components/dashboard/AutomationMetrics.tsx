import React from 'react';
import { Send, Play, BarChart3 } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
  description?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, icon, color, description }) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm">{title}</p>
          <p className={`text-2xl font-bold ${color}`}>{value}</p>
          {description && (
            <p className="text-xs text-gray-500 mt-1">{description}</p>
          )}
        </div>
        <div className={`p-3 rounded-lg ${color.replace('text-', 'bg-').replace('-600', '-100')}`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

interface AutomationMetricsProps {
  metrics: {
    totalAutomations: number;
    activeAutomations: number;
    totalResponses: number;
    savedTime: string;
  };
}

const AutomationMetrics: React.FC<AutomationMetricsProps> = ({ metrics }) => {
  const metricCards = [
    {
      title: "Total de Automações",
      value: metrics.totalAutomations,
      icon: <BarChart3 className="w-6 h-6 text-blue-600" />,
      color: "text-blue-600"
    },
    {
      title: "Automações Ativas",
      value: metrics.activeAutomations,
      icon: <Play className="w-6 h-6 text-green-600" />,
      color: "text-green-600"
    },
    {
      title: "Respostas Enviadas",
      value: metrics.totalResponses,
      icon: <Send className="w-6 h-6 text-purple-600" />,
      color: "text-purple-600"
    },
    {
      title: "Tempo Economizado",
      value: metrics.savedTime,
      icon: <BarChart3 className="w-6 h-6 text-orange-600" />,
      color: "text-orange-600",
      description: "Horas por semana"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {metricCards.map((metric, index) => (
        <MetricCard key={index} {...metric} />
      ))}
    </div>
  );
};

export default AutomationMetrics;