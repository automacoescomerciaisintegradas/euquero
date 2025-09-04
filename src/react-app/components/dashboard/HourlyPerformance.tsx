import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface HourlyData {
  hour: string;
  interactions: number;
  comments: number;
  dms: number;
}

interface HourlyPerformanceProps {
  data: HourlyData[];
}

const HourlyPerformance: React.FC<HourlyPerformanceProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">
          Desempenho por Hora
        </h3>
      </div>
      
      <div className="p-6">
        <div className="h-80">
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
              <XAxis dataKey="hour" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="interactions" name="Interações" fill="#3b82f6" />
              <Bar dataKey="comments" name="Comentários" fill="#10b981" />
              <Bar dataKey="dms" name="Mensagens" fill="#8b5cf6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <p className="text-2xl font-bold text-blue-600">
              {data.reduce((sum, item) => sum + item.interactions, 0)}
            </p>
            <p className="text-sm text-gray-600">Total de Interações</p>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <p className="text-2xl font-bold text-green-600">
              {data.reduce((sum, item) => sum + item.comments, 0)}
            </p>
            <p className="text-sm text-gray-600">Total de Comentários</p>
          </div>
          <div className="text-center p-3 bg-purple-50 rounded-lg">
            <p className="text-2xl font-bold text-purple-600">
              {data.reduce((sum, item) => sum + item.dms, 0)}
            </p>
            <p className="text-sm text-gray-600">Total de Mensagens</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HourlyPerformance;