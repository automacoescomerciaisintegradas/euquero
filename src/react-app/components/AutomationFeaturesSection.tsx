import React from 'react';
import AutomationFeatureCard from './AutomationFeatureCard';
import { landingPageData } from '../../shared/landing-data';

const AutomationFeaturesSection: React.FC = () => {
  const handleTryFeature = (featureName: string) => {
    console.log(`Testar funcionalidade: ${featureName}`);
    // Aqui você pode redirecionar para a página de teste ou abrir um modal
    alert(`Você está testando: ${featureName}`);
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Automatize seu Instagram
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Economize horas todos os dias com nossa automação inteligente
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {landingPageData.features.map((feature, index) => (
            <AutomationFeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              features={feature.details || []}
              highlight={feature.highlight}
              icon={feature.icon}
              videoUrl={feature.videoUrl}
              onTry={() => handleTryFeature(feature.title)}
            />
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-6">
            Todas as funcionalidades incluem integração segura com o Instagram
          </p>
          <div className="inline-flex items-center space-x-4">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">API Oficial</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">Seguro</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">24/7</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AutomationFeaturesSection;