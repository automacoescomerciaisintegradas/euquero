import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WhatsAppFloat from '../components/WhatsAppFloat';
import AutomationFeaturesSection from '../components/AutomationFeaturesSection';
import { InstagramSetup } from '../components/InstagramSetup';

const AutomationPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Automatize seu Instagram
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8 opacity-90">
            Economize horas todos os dias com nossa automação inteligente
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="bg-white/20 px-4 py-2 rounded-full text-sm">
              ✅ API Oficial
            </div>
            <div className="bg-white/20 px-4 py-2 rounded-full text-sm">
              ✅ Totalmente Seguro
            </div>
            <div className="bg-white/20 px-4 py-2 rounded-full text-sm">
              ✅ Funciona 24/7
            </div>
          </div>
        </div>
      </section>
      
      {/* Automation Features */}
      <AutomationFeaturesSection />
      
      {/* Instagram Setup */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Conecte sua conta do Instagram
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Para começar a automatizar, conecte sua conta do Instagram Business
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <InstagramSetup 
              userId="user_123" 
              onConnectionChange={(connected) => console.log('Conexão alterada:', connected)} 
            />
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Pronto para economizar horas todos os dias?
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Junte-se a milhares de empreendedores que já automatizaram seus perfis
          </p>
          <button 
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105"
            onClick={() => window.location.href = '/dashboard'}
          >
            Começar Agora
          </button>
        </div>
      </section>
      
      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default AutomationPage;