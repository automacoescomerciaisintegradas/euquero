import React, { useState } from 'react';
import { ChevronRight, CheckCircle, Play, Zap, MessageSquare, Bot, Video, Heart } from 'lucide-react';

interface AutomationFeatureCardProps {
  title: string;
  description: string;
  features: string[];
  highlight?: string;
  icon: string;
  videoUrl?: string;
  onTry?: () => void;
}

const iconMap: Record<string, React.ReactNode> = {
  'MessageSquare': <MessageSquare className="w-6 h-6" />,
  'Bot': <Bot className="w-6 h-6" />,
  'Video': <Video className="w-6 h-6" />,
  'Heart': <Heart className="w-6 h-6" />,
  'Zap': <Zap className="w-6 h-6" />,
  'Play': <Play className="w-6 h-6" />,
  'CheckCircle': <CheckCircle className="w-6 h-6" />,
};

const AutomationFeatureCard: React.FC<AutomationFeatureCardProps> = ({
  title,
  description,
  features,
  highlight,
  icon,
  videoUrl,
  onTry
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl border border-gray-200">
      {/* Header */}
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
              {iconMap[icon] || <Bot className="w-6 h-6" />}
            </div>
            <h3 className="text-xl font-bold text-gray-900">{title}</h3>
          </div>
          {highlight && (
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              {highlight}
            </span>
          )}
        </div>
        
        <p className="mt-3 text-gray-600">{description}</p>
        
        {/* Features List */}
        <ul className="mt-4 space-y-2">
          {features.slice(0, isExpanded ? features.length : 3).map((feature, index) => (
            <li key={index} className="flex items-start">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0 mr-2" />
              <span className="text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>
        
        {features.length > 3 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-3 text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center"
          >
            {isExpanded ? 'Ver menos' : 'Ver mais recursos'}
            <ChevronRight className={`w-4 h-4 ml-1 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
          </button>
        )}
      </div>
      
      {/* Footer */}
      <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
        <div className="flex justify-between items-center">
          {videoUrl && (
            <a 
              href={videoUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center"
            >
              <Play className="w-4 h-4 mr-1" />
              Ver vídeo
            </a>
          )}
          <button
            onClick={onTry}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            Testar grátis
          </button>
        </div>
      </div>
    </div>
  );
};

export default AutomationFeatureCard;