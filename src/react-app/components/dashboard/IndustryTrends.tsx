import React from 'react';
import { TrendingUp, TrendingDown, Activity, Hash, ArrowRight } from 'lucide-react';

interface IndustryTrend {
  id: string;
  title: string;
  description: string;
  growth: number;
  posts: number;
}

interface IndustryTrendsProps {
  trends: IndustryTrend[];
}

const IndustryTrends: React.FC<IndustryTrendsProps> = ({ trends }) => {
  const getTrendIcon = (growth: number) => {
    if (growth > 0) return <TrendingUp className="w-5 h-5 text-green-500" />;
    if (growth < 0) return <TrendingDown className="w-5 h-5 text-red-500" />;
    return <Activity className="w-5 h-5 text-gray-500" />;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Tendências do Setor</h3>
      <div className="space-y-4">
        {trends.map((trend) => (
          <div key={trend.id} className="p-4 border border-gray-200 rounded-lg">
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-bold text-gray-800">{trend.title}</h4>
              <div className="flex items-center gap-2 text-sm">
                {getTrendIcon(trend.growth)}
                <span className={trend.growth > 0 ? 'text-green-600' : 'text-red-600'}>
                  {trend.growth > 0 ? '+' : ''}{trend.growth}%
                </span>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-3">{trend.description}</p>
            <div className="text-xs text-gray-500">
              <span>{trend.posts.toLocaleString()} posts</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IndustryTrends;