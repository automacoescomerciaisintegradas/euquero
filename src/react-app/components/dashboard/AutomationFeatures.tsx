import React, { useState } from 'react';
import { 
  MessageSquare, 
  Bot, 
  Video, 
  Play, 
  Pause, 
  Settings,
  Plus,
  Edit,
  Trash2
} from 'lucide-react';

interface AutomationFeature {
  id: string;
  type: 'comment' | 'dm' | 'live' | 'story';
  name: string;
  status: 'active' | 'paused' | 'error';
  triggers: number;
  responses: number;
  lastRun?: Date;
}

const AutomationFeatures: React.FC = () => {
  const [features, setFeatures] = useState<AutomationFeature[]>([
    {
      id: '1',
      type: 'comment',
      name: 'Resposta para "preço"',
      status: 'active',
      triggers: 12,
      responses: 8,
      lastRun: new Date()
    },
    {
      id: '2',
      type: 'dm',
      name: 'Boas-vindas automáticas',
      status: 'active',
      triggers: 25,
      responses: 25,
      lastRun: new Date()
    },
    {
      id: '3',
      type: 'live',
      name: 'Respostas em lives',
      status: 'paused',
      triggers: 0,
      responses: 0
    }
  ]);

  const toggleFeatureStatus = (id: string) => {
    setFeatures(prev => 
      prev.map(feature => 
        feature.id === id 
          ? { 
              ...feature, 
              status: feature.status === 'active' ? 'paused' : 'active'
            } 
          : feature
      )
    );
  };

  const getFeatureIcon = (type: AutomationFeature['type']) => {
    switch (type) {
      case 'comment': return <MessageSquare className="w-5 h-5" />;
      case 'dm': return <Bot className="w-5 h-5" />;
      case 'live': return <Video className="w-5 h-5" />;
      case 'story': return <Play className="w-5 h-5" />;
      default: return <Settings className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status: AutomationFeature['status']) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'paused': return 'bg-gray-400';
      case 'error': return 'bg-red-500';
      default: return 'bg-gray-400';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800">Automações Ativas</h3>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Nova Automação
          </button>
        </div>
      </div>
      
      <div className="divide-y divide-gray-200">
        {features.map((feature) => (
          <div key={feature.id} className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-3 h-3 rounded-full ${getStatusColor(feature.status)}`}></div>
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                    {getFeatureIcon(feature.type)}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">{feature.name}</h4>
                    <p className="text-sm text-gray-600 capitalize">
                      {feature.type === 'comment' && 'Comentários'}
                      {feature.type === 'dm' && 'Mensagens Diretas'}
                      {feature.type === 'live' && 'Lives'}
                      {feature.type === 'story' && 'Stories'}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-800">{feature.triggers}</p>
                  <p className="text-xs text-gray-600">Acionamentos</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-800">{feature.responses}</p>
                  <p className="text-xs text-gray-600">Respostas</p>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                    onClick={() => console.log('Editar', feature.id)}
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button 
                    className="p-2 text-gray-400 hover:text-green-600 transition-colors"
                    onClick={() => toggleFeatureStatus(feature.id)}
                  >
                    {feature.status === 'active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                  <button 
                    className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                    onClick={() => console.log('Excluir', feature.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {features.length === 0 && (
        <div className="p-12 text-center">
          <Settings className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h4 className="text-lg font-medium text-gray-800 mb-2">Nenhuma automação configurada</h4>
          <p className="text-gray-600 mb-4">
            Comece criando sua primeira automação para economizar tempo
          </p>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Criar Primeira Automação
          </button>
        </div>
      )}
    </div>
  );
};

export default AutomationFeatures;