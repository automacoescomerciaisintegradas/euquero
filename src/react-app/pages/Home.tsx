import Header from '@/react-app/components/Header';
import Hero from '@/react-app/components/Hero';
import FeaturesSection from '@/react-app/components/FeaturesSection';
import PricingSection from '@/react-app/components/PricingSection';
import HowItWorksSection from '@/react-app/components/HowItWorksSection';
import Faq from '@/react-app/components/Faq';
import Footer from '@/react-app/components/Footer';
import WhatsAppFloat from '@/react-app/components/WhatsAppFloat';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <FeaturesSection />
      <PricingSection />
      <HowItWorksSection />
      <Faq />
      <Footer />
      
      {/* Botão flutuante do WhatsApp */}
      <WhatsAppFloat />
    </div>
  );
}
