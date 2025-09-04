import React, { useState } from 'react';
import { Play, BookOpen, CheckCircle, ChevronRight, Video } from 'lucide-react';

interface Tutorial {
  id: string;
  title: string;
  description: string;
  duration: string;
  completed: boolean;
  videoUrl: string;
}

const AutomationTutorials: React.FC = () => {
  const [tutorials, setTutorials] = useState<Tutorial[]>([
    {
      id: '1',
      title: 'Configurando sua primeira automação',
      description: 'Aprenda a configurar sua primeira regra de automação de comentários',
      duration: '5:30',
      completed: true,
      videoUrl: '#'
    },
    {
      id: '2',
      title: 'Automatizando mensagens diretas',
      description: 'Como configurar mensagens automáticas de boas-vindas',
      duration: '7:15',
      completed: false,
      videoUrl: '#'
    },
    {
      id: '3',
      title: 'Automação em lives',
      description: 'Respostas automáticas durante transmissões ao vivo',
      duration: '6:45',
      completed: false,
      videoUrl: '#'
    },
    {
      id: '4',
      title: 'Configurações avançadas',
      description: 'Personalize suas automações com configurações avançadas',
      duration: '8:20',
      completed: false,
      videoUrl: '#'
    }
  ]);

  const markAsCompleted = (id: string) => {
    setTutorials(prev => 
      prev.map(tutorial => 
        tutorial.id === id 
          ? { ...tutorial, completed: true } 
          : tutorial
      )
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <BookOpen className="w-5 h-5" />
          Tutoriais de Automação
        </h3>
      </div>
      
      <div className="divide-y divide-gray-200">
        {tutorials.map((tutorial) => (
          <div key={tutorial.id} className="p-6">
            <div className="flex items-start gap-4">
              <div className="relative">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Play className="w-6 h-6 text-white bg-black bg-opacity-70 rounded-full p-1" />
                </div>
                <div className="absolute bottom-1 right-1 bg-black bg-opacity-70 text-white text-xs px-1 rounded">
                  {tutorial.duration}
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <h4 className="font-medium text-gray-800">{tutorial.title}</h4>
                  {tutorial.completed ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <button
                      onClick={() => markAsCompleted(tutorial.id)}
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      Marcar como concluído
                    </button>
                  )}
                </div>
                <p className="text-sm text-gray-600 mt-1">{tutorial.description}</p>
                <div className="mt-3 flex items-center gap-2">
                  <Video className="w-4 h-4 text-gray-500" />
                  <span className="text-xs text-gray-500">Vídeo tutorial</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-6 bg-gray-50 border-t border-gray-200">
        <button className="w-full flex items-center justify-center gap-2 text-blue-600 hover:text-blue-800 font-medium">
          Ver todos os tutoriais
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default AutomationTutorials;