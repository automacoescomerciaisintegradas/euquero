import React from 'react';
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface YearlyData {
  year: string;
  interactions: number;
  comments: number;
  dms: number;
  followers: number;
  engagementRate: number;
  growthRate: number;
}

interface YearlyPerformanceProps {
  data: YearlyData[];
}

const YearlyPerformance: React.FC<YearlyPerformanceProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">
          Desempenho Anual
        </h3>
      </div>
      
      <div className="p-6">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" domain={[0, 100]} />
              <Tooltip />
              <Legend />
              <Bar 
                yAxisId="left"
                dataKey="interactions" 
                name="Interações" 
                fill="#3b82f6" 
                radius={[4, 4, 0, 0]}
              />
              <Bar 
                yAxisId="left"
                dataKey="comments" 
                name="Comentários" 
                fill="#10b981" 
                radius={[4, 4, 0, 0]}
              />
              <Bar 
                yAxisId="left"
                dataKey="dms" 
                name="Mensagens" 
                fill="#8b5cf6" 
                radius={[4, 4, 0, 0]}
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="engagementRate" 
                name="Taxa de Engajamento (%)" 
                stroke="#ef4444" 
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="growthRate" 
                name="Taxa de Crescimento (%)" 
                stroke="#f59e0b" 
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-800 mb-2">Crescimento Total</h4>
            <p className="text-3xl font-bold text-green-600">
              +{(data[data.length - 1].followers - data[0].followers).toLocaleString()}
            </p>
            <p className="text-sm text-gray-600">
              seguidores nos últimos {data.length} anos
            </p>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-800 mb-2">Engajamento Médio</h4>
            <p className="text-3xl font-bold text-blue-600">
              {Math.round(data.reduce((sum, item) => sum + item.engagementRate, 0) / data.length)}%
            </p>
            <p className="text-sm text-gray-600">
              taxa de engajamento média
            </p>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-800 mb-2">Interações Totais</h4>
            <p className="text-3xl font-bold text-purple-600">
              {data.reduce((sum, item) => sum + item.interactions, 0).toLocaleString()}
            </p>
            <p className="text-sm text-gray-600">
              interações acumuladas
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YearlyPerformance;