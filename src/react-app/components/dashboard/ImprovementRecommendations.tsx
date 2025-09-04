import React from 'react';
import { Lightbulb, CheckCircle, Clock, TrendingUp } from 'lucide-react';

interface Recommendation {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  estimatedImpact: number;
  completed: boolean;
}

interface ImprovementRecommendationsProps {
  recommendations: Recommendation[];
}

const ImprovementRecommendations: React.FC<ImprovementRecommendationsProps> = ({ recommendations }) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-yellow-500" />
          Recomendações de Melhoria
        </h3>
      </div>
      
      <div className="divide-y divide-gray-200">
        {recommendations.length === 0 ? (
          <div className="p-12 text-center">
            <Lightbulb className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h4 className="text-lg font-medium text-gray-800 mb-2">Nenhuma recomendação disponível</h4>
            <p className="text-gray-600">
              Analisaremos seu perfil e forneceremos recomendações em breve
            </p>
          </div>
        ) : (
          recommendations.map((recommendation) => (
            <div key={recommendation.id} className="p-6">
              <div className="flex items-start gap-4">
                <div className="mt-1">
                  {recommendation.completed ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className={`font-medium ${recommendation.completed ? 'text-gray-500 line-through' : 'text-gray-800'}`}>
                      {recommendation.title}
                    </h4>
                    <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(recommendation.priority)}`}>
                      {recommendation.priority === 'high' && 'Alta prioridade'}
                      {recommendation.priority === 'medium' && 'Média prioridade'}
                      {recommendation.priority === 'low' && 'Baixa prioridade'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{recommendation.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <div className="flex items-center">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        Impacto estimado: <span className="font-medium text-green-600">{recommendation.estimatedImpact}%</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {recommendation.completed ? 'Concluído' : 'Pendente'}
                      </div>
                    </div>
                    {!recommendation.completed && (
                      <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                        Implementar
                      </button>
                    )}
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

export default ImprovementRecommendations;