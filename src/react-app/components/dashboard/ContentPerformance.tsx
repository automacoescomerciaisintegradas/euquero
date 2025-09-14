import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

type NameType = string;
type ValueType = number;

interface ContentData {
  type: string;
  count: number;
  engagement: number;
}

interface ContentPerformanceProps {
  data: ContentData[];
}

const COLORS = ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b', '#ef4444'];

const ContentPerformance: React.FC<ContentPerformanceProps> = ({ data }) => {
  // Calcular totais
  const totalContent = data.reduce((sum, item) => sum + item.count, 0);
  const totalEngagement = data.reduce((sum, item) => sum + item.engagement, 0);
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">
          Desempenho por Tipo de Conteúdo
        </h3>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="h-64">
            <h4 className="text-center font-medium text-gray-800 mb-4">Distribuição de Conteúdo</h4>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                  label={({ name, percent }: { name: NameType; percent: number }) => `${name}: ${percent ? (percent * 100).toFixed(0) : '0'}%`}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: ValueType) => [value, 'Quantidade']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="h-64">
            <h4 className="text-center font-medium text-gray-800 mb-4">Engajamento por Tipo</h4>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="engagement"
                  label={({ name, percent }: { name: NameType; percent: number }) => `${name}: ${percent ? (percent * 100).toFixed(0) : '0'}%`}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: ValueType) => [value, 'Engajamento']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <p className="text-2xl font-bold text-blue-600">{totalContent}</p>
            <p className="text-sm text-gray-600">Total de Posts</p>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <p className="text-2xl font-bold text-green-600">{totalEngagement.toLocaleString()}</p>
            <p className="text-sm text-gray-600">Total de Engajamentos</p>
          </div>
          <div className="text-center p-3 bg-purple-50 rounded-lg">
            <p className="text-2xl font-bold text-purple-600">
              {totalContent > 0 ? Math.round(totalEngagement / totalContent) : 0}
            </p>
            <p className="text-sm text-gray-600">Média por Post</p>
          </div>
          <div className="text-center p-3 bg-yellow-50 rounded-lg">
            <p className="text-2xl font-bold text-yellow-600">
              {totalContent > 0 ? Math.round((data.find(d => d.type === 'Carrossel')?.count || 0) / totalContent * 100) : 0}%
            </p>
            <p className="text-sm text-gray-600">Carrossel</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentPerformance;