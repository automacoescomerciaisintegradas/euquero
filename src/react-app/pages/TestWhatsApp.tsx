import Header from "@/react-app/components/Header";
import HeroSection from "@/react-app/components/HeroSection";
import FeaturesSection from "@/react-app/components/FeaturesSection";
import WhatsAppFloat from "@/react-app/components/WhatsAppFloat";

export default function TestWhatsApp() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Component */}
      <Header />

      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* Componente WhatsApp Flutuante */}
      <WhatsAppFloat />
    </div>
  );
}
