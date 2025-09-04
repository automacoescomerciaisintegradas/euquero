import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Line, LineChart } from 'recharts';

interface MonthlyData {
  month: string;
  interactions: number;
  comments: number;
  dms: number;
  followers: number;
  engagementRate: number;
}

interface MonthlyPerformanceProps {
  data: MonthlyData[];
}

const MonthlyPerformance: React.FC<MonthlyPerformanceProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">
          Desempenho Mensal
        </h3>
      </div>
      
      <div className="p-6">
        <div className="h-80 mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar 
                dataKey="interactions" 
                name="Interações" 
                fill="#3b82f6" 
                radius={[4, 4, 0, 0]}
              />
              <Bar 
                dataKey="comments" 
                name="Comentários" 
                fill="#10b981" 
                radius={[4, 4, 0, 0]}
              />
              <Bar 
                dataKey="dms" 
                name="Mensagens" 
                fill="#8b5cf6" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="h-60">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="followers" 
                name="Seguidores" 
                stroke="#f59e0b" 
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line 
                type="monotone" 
                dataKey="engagementRate" 
                name="Taxa de Engajamento (%)" 
                stroke="#ef4444" 
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
              {data.reduce((sum, item) => sum + item.interactions, 0).toLocaleString()}
            </p>
            <p className="text-sm text-gray-600">Total de Interações</p>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <p className="text-2xl font-bold text-green-600">
              {data.reduce((sum, item) => sum + item.comments, 0).toLocaleString()}
            </p>
            <p className="text-sm text-gray-600">Total de Comentários</p>
          </div>
          <div className="text-center p-3 bg-purple-50 rounded-lg">
            <p className="text-2xl font-bold text-purple-600">
              {data.reduce((sum, item) => sum + item.dms, 0).toLocaleString()}
            </p>
            <p className="text-sm text-gray-600">Total de Mensagens</p>
          </div>
          <div className="text-center p-3 bg-yellow-50 rounded-lg">
            <p className="text-2xl font-bold text-yellow-600">
              +{data[data.length - 1].followers - data[0].followers}
            </p>
            <p className="text-sm text-gray-600">Novos Seguidores</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonthlyPerformance;