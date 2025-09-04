import React, { useState, useEffect } from 'react';
import { Activity, MessageSquare, Send, Eye, Heart } from 'lucide-react';

interface RealTimeMetric {
  id: string;
  icon: React.ReactNode;
  label: string;
  value: number;
  change: number;
  color: string;
}

interface RealTimeMetricsProps {
  onRefresh: () => void;
}

const RealTimeMetrics: React.FC<RealTimeMetricsProps> = ({ onRefresh }) => {
  const [metrics, setMetrics] = useState<RealTimeMetric[]>([
    {
      id: 'interactions',
      icon: <Activity className="w-5 h-5" />,
      label: 'Interações',
      value: 24,
      change: 12,
      color: 'text-blue-600'
    },
    {
      id: 'comments',
      icon: <MessageSquare className="w-5 h-5" />,
      label: 'Comentários',
      value: 8,
      change: 3,
      color: 'text-green-600'
    },
    {
      id: 'dms',
      icon: <Send className="w-5 h-5" />,
      label: 'Mensagens',
      value: 15,
      change: 7,
      color: 'text-purple-600'
    },
    {
      id: 'views',
      icon: <Eye className="w-5 h-5" />,
      label: 'Visualizações',
      value: 127,
      change: 45,
      color: 'text-orange-600'
    }
  ]);

  // Simular atualização em tempo real
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => prev.map(metric => ({
        ...metric,
        value: metric.value + Math.floor(Math.random() * 5),
        change: Math.floor(Math.random() * 10)
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Métricas em Tempo Real
          </h3>
          <button
            onClick={onRefresh}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            Atualizar
          </button>
        </div>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {metrics.map((metric) => (
            <div key={metric.id} className="text-center">
              <div className={`flex justify-center mb-2 ${metric.color}`}>
                {metric.icon}
              </div>
              <p className="text-2xl font-bold text-gray-800">{metric.value}</p>
              <p className="text-sm text-gray-600">{metric.label}</p>
              <p className="text-xs text-green-600 mt-1">
                +{metric.change} nos últimos 5 min
              </p>
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">
            <Heart className="w-4 h-4 inline mr-1 text-red-500" />
            Última atualização: {new Date().toLocaleTimeString('pt-BR')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RealTimeMetrics;