import React from 'react';
import { Clock, TrendingUp, Calendar, Sun, Moon } from 'lucide-react';

interface TimeData {
  time: string;
  period: string;
  posts: number;
  engagements: number;
  reach: number;
  bestDay: string;
}

interface TimePerformanceProps {
  data: TimeData[];
}

const getTimeIcon = (period: string) => {
  switch (period.toLowerCase()) {
    case 'manhã':
      return <Sun className="w-5 h-5 text-yellow-500" />;
    case 'tarde':
      return <Sun className="w-5 h-5 text-orange-500" />;
    case 'noite':
      return <Moon className="w-5 h-5 text-blue-500" />;
    default:
      return <Clock className="w-5 h-5 text-gray-500" />;
  }
};

const TimePerformance: React.FC<TimePerformanceProps> = ({ data }) => {
  // Ordenar por número de engajamentos
  const sortedData = [...data].sort((a, b) => b.engagements - a.engagements);
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Desempenho por Horário
        </h3>
      </div>
      
      <div className="p-6">
        <div className="space-y-4">
          {sortedData.map((timeSlot, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full">
                  {getTimeIcon(timeSlot.period)}
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">{timeSlot.time}</h4>
                  <p className="text-sm text-gray-600">
                    {timeSlot.period} • {timeSlot.bestDay}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <p className="text-lg font-bold text-gray-800">
                    {timeSlot.posts}
                  </p>
                  <p className="text-xs text-gray-600">posts</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-blue-600">
                    {timeSlot.engagements.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-600">engajamentos</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-green-600">
                    {timeSlot.reach.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-600">alcance</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <p className="text-2xl font-bold text-blue-600">
              {data.reduce((sum, slot) => sum + slot.posts, 0)}
            </p>
            <p className="text-sm text-gray-600">Total de Posts</p>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <p className="text-2xl font-bold text-green-600">
              {data.reduce((sum, slot) => sum + slot.engagements, 0).toLocaleString()}
            </p>
            <p className="text-sm text-gray-600">Total de Engajamentos</p>
          </div>
          <div className="text-center p-3 bg-purple-50 rounded-lg">
            <p className="text-2xl font-bold text-purple-600">
              {Math.round(data.reduce((sum, slot) => sum + slot.reach, 0) / data.length).toLocaleString()}
            </p>
            <p className="text-sm text-gray-600">Média de Alcance</p>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
          <h4 className="font-medium text-yellow-800 mb-2 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Melhor Horário para Postar
          </h4>
          <p className="text-sm text-yellow-700">
            {sortedData[0]?.time} ({sortedData[0]?.period}) - 
            {sortedData[0]?.engagements.toLocaleString()} engajamentos
          </p>
        </div>
      </div>
    </div>
  );
};

export default TimePerformance;