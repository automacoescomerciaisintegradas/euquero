import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface DailyData {
  date: string;
  interactions: number;
  comments: number;
  dms: number;
  followers: number;
}

interface DailyPerformanceProps {
  data: DailyData[];
}

const DailyPerformance: React.FC<DailyPerformanceProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">
          Desempenho Diário
        </h3>
      </div>
      
      <div className="p-6">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="interactions" 
                name="Interações" 
                stroke="#3b82f6" 
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line 
                type="monotone" 
                dataKey="comments" 
                name="Comentários" 
                stroke="#10b981" 
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line 
                type="monotone" 
                dataKey="dms" 
                name="Mensagens" 
                stroke="#8b5cf6" 
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line 
                type="monotone" 
                dataKey="followers" 
                name="Seguidores" 
                stroke="#f59e0b" 
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <p className="text-2xl font-bold text-blue-600">
              {Math.round(data.reduce((sum, item) => sum + item.interactions, 0) / data.length)}
            </p>
            <p className="text-sm text-gray-600">Média de Interações</p>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <p className="text-2xl font-bold text-green-600">
              {Math.round(data.reduce((sum, item) => sum + item.comments, 0) / data.length)}
            </p>
            <p className="text-sm text-gray-600">Média de Comentários</p>
          </div>
          <div className="text-center p-3 bg-purple-50 rounded-lg">
            <p className="text-2xl font-bold text-purple-600">
              {Math.round(data.reduce((sum, item) => sum + item.dms, 0) / data.length)}
            </p>
            <p className="text-sm text-gray-600">Média de Mensagens</p>
          </div>
          <div className="text-center p-3 bg-yellow-50 rounded-lg">
            <p className="text-2xl font-bold text-yellow-600">
              {data[data.length - 1].followers - data[0].followers}
            </p>
            <p className="text-sm text-gray-600">Novos Seguidores</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyPerformance;