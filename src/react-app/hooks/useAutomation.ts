import { useState, useEffect } from 'react';

interface AutomationFeature {
  id: string;
  name: string;
  description: string;
  price: number;
  enabled: boolean;
  usageCount: number;
  lastUsed?: Date;
}

interface AutomationState {
  features: AutomationFeature[];
  loading: boolean;
  error: string | null;
}

const useAutomation = () => {
  const [state, setState] = useState<AutomationState>({
    features: [],
    loading: true,
    error: null
  });

  // Simular carregamento de dados
  useEffect(() => {
    const loadAutomationData = async () => {
      try {
        // Simular chamada API
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockFeatures: AutomationFeature[] = [
          {
            id: 'post-automation',
            name: 'Automação em Postagens',
            description: 'Respostas automáticas para comentários em posts, stories, reels e remixes',
            price: 0.5,
            enabled: true,
            usageCount: 24,
            lastUsed: new Date()
          },
          {
            id: 'auto-attendance',
            name: 'Automação de Autoatendimento',
            description: 'Mensagens de boas-vindas automáticas e fluxo de vendas no inbox',
            price: 0.5,
            enabled: false,
            usageCount: 0
          },
          {
            id: 'live-automation',
            name: 'Automação em Lives',
            description: 'Respostas automáticas durante lives e conversão de espectadores',
            price: 0.5,
            enabled: false,
            usageCount: 0
          }
        ];
        
        setState({
          features: mockFeatures,
          loading: false,
          error: null
        });
      } catch (err) {
        setState({
          features: [],
          loading: false,
          error: 'Falha ao carregar funcionalidades'
        });
      }
    };
    
    loadAutomationData();
  }, []);

  const enableFeature = (featureId: string) => {
    setState(prev => ({
      ...prev,
      features: prev.features.map(feature => 
        feature.id === featureId ? { ...feature, enabled: true } : feature
      )
    }));
  };

  const disableFeature = (featureId: string) => {
    setState(prev => ({
      ...prev,
      features: prev.features.map(feature => 
        feature.id === featureId ? { ...feature, enabled: false } : feature
      )
    }));
  };

  const updateUsage = (featureId: string) => {
    setState(prev => ({
      ...prev,
      features: prev.features.map(feature => 
        feature.id === featureId 
          ? { 
              ...feature, 
              usageCount: feature.usageCount + 1,
              lastUsed: new Date()
            } 
          : feature
      )
    }));
  };

  return {
    ...state,
    enableFeature,
    disableFeature,
    updateUsage
  };
};

export default useAutomation;