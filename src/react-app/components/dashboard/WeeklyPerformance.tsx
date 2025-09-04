import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface WeeklyData {
  week: string;
  interactions: number;
  comments: number;
  dms: number;
  engagementRate: number;
}

interface WeeklyPerformanceProps {
  data: WeeklyData[];
}

const WeeklyPerformance: React.FC<WeeklyPerformanceProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">
          Desempenho Semanal
        </h3>
      </div>
      
      <div className="p-6">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="interactions" 
                name="Interações" 
                stroke="#3b82f6" 
                fill="#3b82f6"
                fillOpacity={0.2}
                strokeWidth={2}
              />
              <Area 
                type="monotone" 
                dataKey="comments" 
                name="Comentários" 
                stroke="#10b981" 
                fill="#10b981"
                fillOpacity={0.2}
                strokeWidth={2}
              />
              <Area 
                type="monotone" 
                dataKey="dms" 
                name="Mensagens" 
                stroke="#8b5cf6" 
                fill="#8b5cf6"
                fillOpacity={0.2}
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-800 mb-2">Taxa de Engajamento</h4>
            <div className="flex items-end justify-between">
              <p className="text-3xl font-bold text-blue-600">
                {data[data.length - 1].engagementRate}%
              </p>
              <div className="text-right">
                <p className="text-sm text-green-600">
                  +{(data[data.length - 1].engagementRate - data[0].engagementRate).toFixed(1)}%
                </p>
                <p className="text-xs text-gray-500">última semana</p>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-800 mb-2">Crescimento</h4>
            <div className="flex items-end justify-between">
              <p className="text-3xl font-bold text-green-600">
                +24%
              </p>
              <div className="text-right">
                <p className="text-sm text-green-600">
                  em relação ao mês anterior
                </p>
                <p className="text-xs text-gray-500">baseado em métricas</p>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-800 mb-2">Consistência</h4>
            <div className="flex items-end justify-between">
              <p className="text-3xl font-bold text-purple-600">
                92%
              </p>
              <div className="text-right">
                <p className="text-sm text-green-600">
                  de dias ativos
                </p>
                <p className="text-xs text-gray-500">nos últimos 30 dias</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklyPerformance;