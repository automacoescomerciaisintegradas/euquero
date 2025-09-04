import React from 'react';
import { TrendingUp, Users, Calendar, BarChart3 } from 'lucide-react';

interface GrowthMetric {
  id: string;
  title: string;
  currentValue: number;
  previousValue: number;
  period: string;
  trend: 'up' | 'down' | 'stable';
}

interface GrowthMetricsProps {
  metrics: GrowthMetric[];
}

const GrowthMetrics: React.FC<GrowthMetricsProps> = ({ metrics }) => {
  const calculateGrowth = (current: number, previous: number) => {
    if (previous === 0) return current > 0 ? 100 : 0;
    return Math.round(((current - previous) / previous) * 100);
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down': return <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />;
      default: return <BarChart3 className="w-4 h-4 text-gray-500" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Métricas de Crescimento
        </h3>
      </div>
      
      <div className="divide-y divide-gray-200">
        {metrics.length === 0 ? (
          <div className="p-12 text-center">
            <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h4 className="text-lg font-medium text-gray-800 mb-2">Nenhuma métrica disponível</h4>
            <p className="text-gray-600">
              As métricas de crescimento serão exibidas após algumas semanas de automação
            </p>
          </div>
        ) : (
          metrics.map((metric) => {
            const growth = calculateGrowth(metric.currentValue, metric.previousValue);
            const isPositive = growth >= 0;
            
            return (
              <div key={metric.id} className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-800">{metric.title}</h4>
                  <div className="flex items-center gap-1">
                    {getTrendIcon(metric.trend)}
                    <span className={`text-sm font-medium ${getTrendColor(metric.trend)}`}>
                      {isPositive ? '+' : ''}{growth}%
                    </span>
                  </div>
                </div>
                
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-2xl font-bold text-gray-800">
                      {metric.currentValue.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {metric.period}
                    </p>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-sm text-gray-600">
                      Anterior: {metric.previousValue.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-500">
                      {isPositive ? 'Crescimento' : 'Redução'} de {Math.abs(growth)}%
                    </p>
                  </div>
                </div>
                
                <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${isPositive ? 'bg-green-500' : 'bg-red-500'}`} 
                    style={{ width: `${Math.min(100, Math.abs(growth))}%` }}
                  ></div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default GrowthMetrics;