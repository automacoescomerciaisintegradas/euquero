import React from 'react';
import { TrendingUp, Heart, MessageCircle, Share2, Eye } from 'lucide-react';

interface EngagementStatsProps {
  stats: {
    likes: number;
    comments: number;
    shares: number;
    views: number;
    engagementRate: number;
  };
}

const EngagementStats: React.FC<EngagementStatsProps> = ({ stats }) => {
  const statItems = [
    {
      icon: <Heart className="w-5 h-5 text-red-500" />,
      label: "Curtidas",
      value: stats.likes.toLocaleString(),
      change: "+12%"
    },
    {
      icon: <MessageCircle className="w-5 h-5 text-blue-500" />,
      label: "Comentários",
      value: stats.comments.toLocaleString(),
      change: "+8%"
    },
    {
      icon: <Share2 className="w-5 h-5 text-green-500" />,
      label: "Compartilhamentos",
      value: stats.shares.toLocaleString(),
      change: "+5%"
    },
    {
      icon: <Eye className="w-5 h-5 text-purple-500" />,
      label: "Visualizações",
      value: stats.views.toLocaleString(),
      change: "+15%"
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Estatísticas de Engajamento
        </h3>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
          {statItems.map((item, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-2">
                {item.icon}
              </div>
              <p className="text-2xl font-bold text-gray-800">{item.value}</p>
              <p className="text-sm text-gray-600">{item.label}</p>
              <p className="text-xs text-green-600 mt-1">{item.change}</p>
            </div>
          ))}
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Taxa de Engajamento</span>
            <span className="text-lg font-bold text-blue-600">{stats.engagementRate}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full" 
              style={{ width: `${stats.engagementRate}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            +2.3% em relação à semana anterior
          </p>
        </div>
      </div>
    </div>
  );
};

export default EngagementStats;