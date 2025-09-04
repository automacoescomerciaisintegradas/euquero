import React from 'react';
import { Smartphone, Monitor, Tablet, BarChart3 } from 'lucide-react';

interface DeviceData {
  device: string;
  views: number;
  interactions: number;
  engagementRate: number;
  avgSessionTime: string;
}

interface DevicePerformanceProps {
  data: DeviceData[];
}

const getDeviceIcon = (device: string) => {
  switch (device.toLowerCase()) {
    case 'mobile':
      return <Smartphone className="w-5 h-5 text-blue-600" />;
    case 'desktop':
      return <Monitor className="w-5 h-5 text-green-600" />;
    case 'tablet':
      return <Tablet className="w-5 h-5 text-purple-600" />;
    default:
      return <BarChart3 className="w-5 h-5 text-gray-600" />;
  }
};

const DevicePerformance: React.FC<DevicePerformanceProps> = ({ data }) => {
  // Ordenar por número de visualizações
  const sortedData = [...data].sort((a, b) => b.views - a.views);
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <BarChart3 className="w-5 h-5" />
          Desempenho por Dispositivo
        </h3>
      </div>
      
      <div className="p-6">
        <div className="space-y-4">
          {sortedData.map((device, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full">
                  {getDeviceIcon(device.device)}
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 capitalize">
                    {device.device === 'mobile' ? 'Celular' : 
                     device.device === 'desktop' ? 'Computador' : 
                     device.device === 'tablet' ? 'Tablet' : device.device}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {device.avgSessionTime} tempo médio
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <p className="text-lg font-bold text-gray-800">
                    {device.views.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-600">visualizações</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-blue-600">
                    {device.interactions.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-600">interações</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-green-600">
                    {device.engagementRate}%
                  </p>
                  <p className="text-xs text-gray-600">engajamento</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <p className="text-2xl font-bold text-blue-600">
              {data.reduce((sum, device) => sum + device.views, 0).toLocaleString()}
            </p>
            <p className="text-sm text-gray-600">Total de Visualizações</p>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <p className="text-2xl font-bold text-green-600">
              {Math.round(data.reduce((sum, device) => sum + device.engagementRate, 0) / data.length)}%
            </p>
            <p className="text-sm text-gray-600">Média de Engajamento</p>
          </div>
          <div className="text-center p-3 bg-purple-50 rounded-lg">
            <p className="text-2xl font-bold text-purple-600">
              {data.reduce((sum, device) => sum + device.interactions, 0).toLocaleString()}
            </p>
            <p className="text-sm text-gray-600">Total de Interações</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DevicePerformance;