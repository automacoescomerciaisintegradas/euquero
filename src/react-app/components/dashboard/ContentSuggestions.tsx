import React from 'react';
import { Lightbulb, TrendingUp, Hash, Clock } from 'lucide-react';

interface ContentSuggestion {
  id: string;
  title: string;
  description: string;
  hashtags: string[];
  bestTime: string;
  engagementPrediction: number;
}

interface ContentSuggestionsProps {
  suggestions: ContentSuggestion[];
}

const ContentSuggestions: React.FC<ContentSuggestionsProps> = ({ suggestions }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-yellow-500" />
          Sugestões de Conteúdo
        </h3>
      </div>
      
      <div className="divide-y divide-gray-200">
        {suggestions.length === 0 ? (
          <div className="p-12 text-center">
            <Lightbulb className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h4 className="text-lg font-medium text-gray-800 mb-2">Nenhuma sugestão disponível</h4>
            <p className="text-gray-600">
              Analisaremos seu perfil e forneceremos sugestões em breve
            </p>
          </div>
        ) : (
          suggestions.map((suggestion) => (
            <div key={suggestion.id} className="p-6">
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-800 mb-1">{suggestion.title}</h4>
                  <p className="text-sm text-gray-600 mb-3">{suggestion.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    {suggestion.hashtags.map((tag, index) => (
                      <span 
                        key={index} 
                        className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                      >
                        <Hash className="w-3 h-3 mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <div className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {suggestion.bestTime}
                      </div>
                      <div>
                        Engajamento previsto: <span className="font-medium text-green-600">{suggestion.engagementPrediction}%</span>
                      </div>
                    </div>
                    <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                      Usar sugestão
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ContentSuggestions;