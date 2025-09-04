import React, { useState } from 'react';
import { Hash, TrendingUp, TrendingDown, Search, Plus, BarChart3 } from 'lucide-react';

interface Hashtag {
  id: string;
  tag: string;
  posts: number;
  impressions: number;
  engagements: number;
  reach: number;
  engagementRate: number;
  growth: number; // crescimento percentual
  category: 'brand' | 'industry' | 'campaign' | 'trending';
  lastUsed: Date;
}

const HashtagAnalytics: React.FC = () => {
  const [hashtags, setHashtags] = useState<Hashtag[]>([
    {
      id: '1',
      tag: 'marketingdigital',
      posts: 12450,
      impressions: 2345678,
      engagements: 45678,
      reach: 1234567,
      engagementRate: 3.9,
      growth: 15.2,
      category: 'industry',
      lastUsed: new Date()
    },
    {
      id: '2',
      tag: 'empreendedorismo',
      posts: 8900,
      impressions: 1890123,
      engagements: 34567,
      reach: 987654,
      engagementRate: 3.6,
      growth: 8.7,
      category: 'industry',
      lastUsed: new Date(Date.now() - 24 * 60 * 60 * 1000)
    },
    {
      id: '3',
      tag: 'produtonovo',
      posts: 1567,
      impressions: 345678,
      engagements: 12345,
      reach: 234567,
      engagementRate: 8.9,
      growth: 25.3,
      category: 'campaign',
      lastUsed: new Date()
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [newHashtag, setNewHashtag] = useState('');

  const handleAddHashtag = () => {
    if (newHashtag.trim()) {
      const cleanTag = newHashtag.replace('#', '').trim();
      const newHashtagObj: Hashtag = {
        id: `tag_${Date.now()}`,
        tag: cleanTag,
        posts: 0,
        impressions: 0,
        engagements: 0,
        reach: 0,
        engagementRate: 0,
        growth: 0,
        category: 'trending',
        lastUsed: new Date()
      };
      setHashtags(prev => [...prev, newHashtagObj]);
      setNewHashtag('');
      setShowForm(false);
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'brand': return 'bg-blue-100 text-blue-800';
      case 'industry': return 'bg-green-100 text-green-800';
      case 'campaign': return 'bg-purple-100 text-purple-800';
      case 'trending': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

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

  const filteredHashtags = hashtags.filter(hashtag =>
    hashtag.tag.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <Hash className="w-5 h-5" />
            Análise de Hashtags
          </h3>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar hashtags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
            >
              <Plus className="w-4 h-4" />
              Adicionar
            </button>
          </div>
        </div>
      </div>

      {showForm && (
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Digite uma hashtag (ex: #marketing)"
              value={newHashtag}
              onChange={(e) => setNewHashtag(e.target.value)}
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onKeyPress={(e) => e.key === 'Enter' && handleAddHashtag()}
            />
            <button
              onClick={handleAddHashtag}
              className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Adicionar
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      <div className="divide-y divide-gray-200">
        {filteredHashtags.length === 0 ? (
          <div className="p-12 text-center">
            <Hash className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h4 className="text-lg font-medium text-gray-800 mb-2">Nenhuma hashtag encontrada</h4>
            <p className="text-gray-600 mb-4">
              Adicione hashtags para começar a análise
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Adicionar Primeira Hashtag
            </button>
          </div>
        ) : (
          filteredHashtags.map((hashtag) => (
            <div key={hashtag.id} className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <h4 className="text-lg font-bold text-gray-800">#{hashtag.tag}</h4>
                  <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(hashtag.category)}`}>
                    {hashtag.category === 'brand' && 'Marca'}
                    {hashtag.category === 'industry' && 'Setor'}
                    {hashtag.category === 'campaign' && 'Campanha'}
                    {hashtag.category === 'trending' && 'Tendência'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {getGrowthIcon(hashtag.growth)}
                  <span className={`font-medium ${getGrowthColor(hashtag.growth)}`}>
                    {hashtag.growth > 0 ? '+' : ''}{hashtag.growth}%
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-lg font-bold text-gray-800">{hashtag.posts.toLocaleString()}</p>
                  <p className="text-xs text-gray-600">Posts</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-lg font-bold text-gray-800">{hashtag.impressions.toLocaleString()}</p>
                  <p className="text-xs text-gray-600">Impressões</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-lg font-bold text-gray-800">{hashtag.engagements.toLocaleString()}</p>
                  <p className="text-xs text-gray-600">Engajamentos</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-lg font-bold text-gray-800">{hashtag.reach.toLocaleString()}</p>
                  <p className="text-xs text-gray-600">Alcance</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-lg font-bold text-gray-800">{hashtag.engagementRate}%</p>
                  <p className="text-xs text-gray-600">Taxa Eng.</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  Último uso: {hashtag.lastUsed.toLocaleDateString('pt-BR')}
                </div>
                <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                  Ver detalhes
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="p-6 bg-gray-50 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Mostrando {filteredHashtags.length} de {hashtags.length} hashtags
          </div>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
            Exportar Relatório
          </button>
        </div>
      </div>
    </div>
  );
};

export default HashtagAnalytics;