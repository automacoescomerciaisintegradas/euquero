import React, { useState } from 'react';
import {
  Check, X, Lightbulb, AlertTriangle, Users, TrendingUp, TrendingDown, BarChart3, Target, Calendar, Filter, Search, Eye
} from 'lucide-react';

// ... (interfaces remain the same) ...
interface Competitor {
  id: string; username: string; fullName: string; profilePic: string; followers: number; following: number; posts: number; engagementRate: number; growth: number; category: string; lastActive: Date; strengths: string[]; weaknesses: string[]; opportunities: string[]; threats: string[]; metrics: { impressions: number; reach: number; saves: number; shares: number; comments: number; };
}
interface SWOTAnalysis {
  competitorId: string; strengths: string[]; weaknesses: string[]; opportunities: string[]; threats: string[];
}

const CompetitorAnalysis: React.FC = () => {
  const [competitors, setCompetitors] = useState<Competitor[]>([
    // ... mock data ...
  ]);

  const [swotAnalysis, setSwotAnalysis] = useState<SWOTAnalysis[]>([
    // ... mock data ...
  ]);

  const [timeframe, setTimeframe] = useState<'7d' | '30d' | '90d'>('30d');
  const [categoryFilter, setCategoryFilter] = useState<'all' | string>('all');
  const [sortBy, setSortBy] = useState<'followers' | 'engagement' | 'growth'>('followers');
  const [searchTerm, setSearchTerm] = useState('');

  const getGrowthIcon = (growth: number) => {
    if (growth > 0) return <TrendingUp className="w-4 h-4 text-green-500" />;
    if (growth < 0) return <TrendingDown className="w-4 h-4 text-red-500" />;
    return <BarChart3 className="w-4 h-4 text-gray-500" />;
  };

  const getGrowthColor = (growth: number) => {
    if (growth > 0) return 'text-green-600';
    if (growth < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'moda': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryLabel = (category: string) => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  const filteredAndSortedCompetitors = [...competitors]
    .filter(competitor => {
      const matchesSearch = searchTerm === '' || competitor.username.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || competitor.category === categoryFilter;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'followers') return b.followers - a.followers;
      if (sortBy === 'engagement') return b.engagementRate - a.engagementRate;
      if (sortBy === 'growth') return b.growth - a.growth;
      return 0;
    });

  const formatNumber = (num: number) => {
    if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
    return num.toString();
  };

  const getCompetitorAnalysis = (competitorId: string) => {
    return swotAnalysis.find(analysis => analysis.competitorId === competitorId);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">{/* ... */}</div>

      {/* Filters */}
      <div className="p-6 border-b border-gray-200">{/* ... */}</div>

      {/* Competitor List */}
      <div className="space-y-6 p-6">
        {filteredAndSortedCompetitors.map((competitor) => {
          const analysis = getCompetitorAnalysis(competitor.id);
          return (
            <div key={competitor.id} className="border border-gray-200 rounded-lg p-6">
              {/* Competitor Info */}
              <div className="flex items-start justify-between mb-6">{/* ... */}</div>
              {/* Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">{/* ... */}</div>
              
              {analysis && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* SWOT Analysis */}
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h5 className="font-medium text-green-800 mb-2">Pontos Fortes</h5>
                    <ul className="text-sm text-green-700 space-y-1">
                      {analysis.strengths.slice(0, 3).map((strength: string, index: number) => (
                        <li key={index}><Check className="inline w-3 h-3 mr-1" />{strength}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-4 bg-red-50 rounded-lg">
                    <h5 className="font-medium text-red-800 mb-2">Pontos Fracos</h5>
                    <ul className="text-sm text-red-700 space-y-1">
                      {analysis.weaknesses.slice(0, 3).map((weakness: string, index: number) => (
                        <li key={index}><X className="inline w-3 h-3 mr-1" />{weakness}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h5 className="font-medium text-blue-800 mb-2">Oportunidades</h5>
                    <ul className="text-sm text-blue-700 space-y-1">
                      {analysis.opportunities.slice(0, 3).map((opportunity: string, index: number) => (
                        <li key={index}><Lightbulb className="inline w-3 h-3 mr-1" />{opportunity}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <h5 className="font-medium text-yellow-800 mb-2">Ameaças</h5>
                    <ul className="text-sm text-yellow-700 space-y-1">
                      {analysis.threats.slice(0, 3).map((threat: string, index: number) => (
                        <li key={index}><AlertTriangle className="inline w-3 h-3 mr-1" />{threat}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="p-6 bg-gray-50 border-t border-gray-200">{/* ... */}</div>
    </div>
  );
};

export default CompetitorAnalysis;
