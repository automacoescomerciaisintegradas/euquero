import React, { useState } from 'react';
import {
  User, Hash, Smile, Frown, Meh, Heart, MessageCircle, ThumbsUp, ThumbsDown, TrendingUp, BarChart3, Filter, Search, Clock
} from 'lucide-react';

// ... (interfaces remain the same) ...
interface SentimentAnalysis { id: string; text: string; sentiment: 'positive' | 'negative' | 'neutral'; confidence: number; timestamp: Date; username: string; postId: string; engagement: number; keywords: string[]; }
interface SentimentSummary { positive: number; negative: number; neutral: number; total: number; trend: 'improving' | 'declining' | 'stable'; keywords: { word: string; count: number; sentiment: 'positive' | 'negative' | 'neutral'; }[]; }

const SentimentAnalyzer: React.FC = () => {
  const [sentiments, setSentiments] = useState<SentimentAnalysis[]>([
    // ... mock data ...
  ]);

  const [summary] = useState<SentimentSummary>({
    positive: 65, negative: 20, neutral: 15, total: 100, trend: 'improving',
    keywords: [ { word: 'excelente', count: 24, sentiment: 'positive' }, { word: 'demora', count: 15, sentiment: 'negative' } ]
  });

  const [filter, setFilter] = useState<'all' | 'positive' | 'negative' | 'neutral'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [timeframe, setTimeframe] = useState<'7d' | '30d' | '90d'>('30d');

  const getSentimentIcon = (sentiment: string) => {
    if (sentiment === 'positive') return <ThumbsUp className="w-5 h-5 text-green-500" />;
    if (sentiment === 'negative') return <ThumbsDown className="w-5 h-5 text-red-500" />;
    return <Meh className="w-5 h-5 text-yellow-500" />;
  };

  const getSentimentColor = (sentiment: string) => {
    if (sentiment === 'positive') return 'bg-green-100 text-green-800';
    if (sentiment === 'negative') return 'bg-red-100 text-red-800';
    return 'bg-yellow-100 text-yellow-800';
  };

  const getSentimentLabel = (sentiment: string) => {
    if (sentiment === 'positive') return 'Positivo';
    if (sentiment === 'negative') return 'Negativo';
    return 'Neutro';
  };

  const filteredSentiments = sentiments.filter((sentiment: SentimentAnalysis) => {
    const matchesFilter = filter === 'all' || sentiment.sentiment === filter;
    const matchesSearch = searchTerm === '' || sentiment.text.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const positivePercentage = Math.round((summary.positive / summary.total) * 100);
  const negativePercentage = Math.round((summary.negative / summary.total) * 100);
  const neutralPercentage = Math.round((summary.neutral / summary.total) * 100);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Header and Summary */}
      <div className="p-6 border-b border-gray-200">{/* ... */}</div>
      <div className="p-6 border-b border-gray-200">{/* ... */}</div>

      {/* Filters and Keywords */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-4 mb-6">{/* ... */}</div>
        <div className="mb-6">
          <h4 className="font-medium text-gray-800 mb-3">Palavras-Chave Mais Frequentes</h4>
          <div className="flex flex-wrap gap-2">
            {summary.keywords.map((keyword: { word: string; count: number; sentiment: string; }, index: number) => (
              <span key={index} className={`inline-flex items-center px-3 py-1 text-sm rounded-full ${getSentimentColor(keyword.sentiment)}`}>
                {keyword.word} ({keyword.count})
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Analysis */}
      <div className="p-6">
        <div className="space-y-4">
          {filteredSentiments.map((sentiment: SentimentAnalysis) => (
            <div key={sentiment.id} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-start gap-4">
                <div>{getSentimentIcon(sentiment.sentiment)}</div>
                <div className="flex-1">
                  <p className="text-gray-800 mb-3">{sentiment.text}</p>
                  <div className="flex flex-wrap gap-2">
                    {sentiment.keywords.map((keyword: string, index: number) => (
                      <span key={index} className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                        <Hash className="w-3 h-3 mr-1" />
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="p-6 bg-gray-50 border-t border-gray-200">{/* ... */}</div>
    </div>
  );
};

export default SentimentAnalyzer;
