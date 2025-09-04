import React from 'react';
import { Heart, MessageCircle, ThumbsUp, ThumbsDown, Meh } from 'lucide-react';

interface SentimentData {
  positive: number;
  negative: number;
  neutral: number;
  total: number;
}

interface SentimentAnalysisProps {
  sentiment: SentimentData;
}

const SentimentAnalysis: React.FC<SentimentAnalysisProps> = ({ sentiment }) => {
  const positivePercentage = Math.round((sentiment.positive / sentiment.total) * 100);
  const negativePercentage = Math.round((sentiment.negative / sentiment.total) * 100);
  const neutralPercentage = Math.round((sentiment.neutral / sentiment.total) * 100);

  const sentimentItems = [
    {
      icon: <ThumbsUp className="w-5 h-5 text-green-500" />,
      label: "Positivo",
      count: sentiment.positive,
      percentage: positivePercentage,
      color: "bg-green-500"
    },
    {
      icon: <Meh className="w-5 h-5 text-yellow-500" />,
      label: "Neutro",
      count: sentiment.neutral,
      percentage: neutralPercentage,
      color: "bg-yellow-500"
    },
    {
      icon: <ThumbsDown className="w-5 h-5 text-red-500" />,
      label: "Negativo",
      count: sentiment.negative,
      percentage: negativePercentage,
      color: "bg-red-500"
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <Heart className="w-5 h-5" />
          Análise de Sentimentos
        </h3>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-3 gap-6 mb-6">
          {sentimentItems.map((item, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-2">
                {item.icon}
              </div>
              <p className="text-2xl font-bold text-gray-800">{item.count}</p>
              <p className="text-sm text-gray-600">{item.label}</p>
              <p className="text-xs text-gray-500 mt-1">{item.percentage}%</p>
            </div>
          ))}
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center">
            <div className="w-24 text-sm text-gray-600">Positivo</div>
            <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-green-500 rounded-full" 
                style={{ width: `${positivePercentage}%` }}
              ></div>
            </div>
            <div className="w-12 text-right text-sm font-medium text-gray-800">
              {positivePercentage}%
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="w-24 text-sm text-gray-600">Neutro</div>
            <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-yellow-500 rounded-full" 
                style={{ width: `${neutralPercentage}%` }}
              ></div>
            </div>
            <div className="w-12 text-right text-sm font-medium text-gray-800">
              {neutralPercentage}%
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="w-24 text-sm text-gray-600">Negativo</div>
            <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-red-500 rounded-full" 
                style={{ width: `${negativePercentage}%` }}
              ></div>
            </div>
            <div className="w-12 text-right text-sm font-medium text-gray-800">
              {negativePercentage}%
            </div>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium text-gray-800 mb-2">Insights</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Maioria dos comentários é positiva ({positivePercentage}%)</li>
            <li>• {negativePercentage}% dos comentários expressam insatisfação</li>
            <li>• Recomendado responder comentários negativos em até 2 horas</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SentimentAnalysis;