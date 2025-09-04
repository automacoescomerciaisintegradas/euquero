import React from 'react';
import { MessageSquare, Bot, Video } from 'lucide-react';
import Button from './ui/Button';

const AutomationPreviewSection: React.FC = () => {
  const features = [
    {
      icon: <MessageSquare className="w-8 h-8 text-blue-600" />,
      title: "Automação em Postagens",
      description: "Respostas automáticas para comentários em posts, stories, reels e remixes"
    },
    {
      icon: <Bot className="w-8 h-8 text-purple-600" />,
      title: "Automação de Autoatendimento",
      description: "Mensagens de boas-vindas automáticas e fluxo de vendas no inbox"
    },
    {
      icon: <Video className="w-8 h-8 text-green-600" />,
      title: "Automação em Lives",
      description: "Respostas automáticas durante lives e conversão de espectadores"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Automatize seu Instagram
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Economize horas todos os dias com nossa automação inteligente
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-200"
            >
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 p-3 rounded-lg mr-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900">{feature.title}</h3>
              </div>
              <p className="text-gray-600 mb-4">{feature.description}</p>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => window.location.href = '/automacao'}
              >
                Saiba mais
              </Button>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button 
            variant="primary" 
            size="lg"
            onClick={() => window.location.href = '/automacao'}
          >
            Ver todas as funcionalidades
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AutomationPreviewSection;