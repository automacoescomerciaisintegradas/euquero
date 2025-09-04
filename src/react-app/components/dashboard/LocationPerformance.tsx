import React from 'react';
import { MapPin, Users, TrendingUp, Globe } from 'lucide-react';

interface LocationData {
  location: string;
  followers: number;
  engagementRate: number;
  posts: number;
  reach: number;
}

interface LocationPerformanceProps {
  data: LocationData[];
}

const LocationPerformance: React.FC<LocationPerformanceProps> = ({ data }) => {
  // Ordenar por número de seguidores
  const sortedData = [...data].sort((a, b) => b.followers - a.followers);
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          Desempenho por Localização
        </h3>
      </div>
      
      <div className="p-6">
        <div className="space-y-4">
          {sortedData.map((location, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full">
                  <Globe className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">{location.location}</h4>
                  <p className="text-sm text-gray-600">
                    {location.posts} posts • {location.reach.toLocaleString()} alcance
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <p className="text-lg font-bold text-gray-800">
                    {location.followers.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-600">seguidores</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-green-600">
                    {location.engagementRate}%
                  </p>
                  <p className="text-xs text-gray-600">engajamento</p>
                </div>
                <div className="flex items-center">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm font-medium text-green-600">
                    {Math.round(location.engagementRate / 100 * location.followers).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <p className="text-2xl font-bold text-blue-600">
              {data.length}
            </p>
            <p className="text-sm text-gray-600">Localizações</p>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <p className="text-2xl font-bold text-green-600">
              {data.reduce((sum, loc) => sum + loc.followers, 0).toLocaleString()}
            </p>
            <p className="text-sm text-gray-600">Total de Seguidores</p>
          </div>
          <div className="text-center p-3 bg-purple-50 rounded-lg">
            <p className="text-2xl font-bold text-purple-600">
              {Math.round(data.reduce((sum, loc) => sum + loc.engagementRate, 0) / data.length)}%
            </p>
            <p className="text-sm text-gray-600">Média de Engajamento</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationPerformance;