import { useState } from "react";
import Container from "./ui/Container";
import Button from "./ui/Button";
import { landingPageData } from "../../shared/landing-data";

const HeroSection = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { hero } = landingPageData;

  const handleCtaClick = () => {
    setIsLoading(true);
    // Simular navegação
    setTimeout(() => {
      window.location.href = hero.ctaLink;
    }, 300);
  };

  return (
    <section className="bg-gradient-to-br from-blue-50 via-white to-blue-50 py-20 lg:py-32">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Conteúdo Principal */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-blue-600 rounded-full mr-2 animate-pulse"></span>
              Plataforma #1 em Fidelização
            </div>

            {/* Título Principal */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              {hero.title.split(" ").map((word, index) => (
                <span
                  key={index}
                  className={index === 2 ? "text-blue-600" : ""}
                >
                  {word}{" "}
                </span>
              ))}
            </h1>

            {/* Subtítulo */}
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              {hero.subtitle}
            </p>

            {/* Estatísticas */}
            <div className="flex flex-col sm:flex-row gap-6 mb-8 justify-center lg:justify-start">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">+500</div>
                <div className="text-sm text-gray-600">Empresas Ativas</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">98%</div>
                <div className="text-sm text-gray-600">Satisfação</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">+1M</div>
                <div className="text-sm text-gray-600">
                  Clientes Fidelizados
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                variant="primary"
                size="lg"
                onClick={handleCtaClick}
                disabled={isLoading}
                className="text-lg px-8 py-4"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Carregando...
                  </div>
                ) : (
                  <>
                    {hero.ctaText}
                    <span className="ml-2">→</span>
                  </>
                )}
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={() => (window.location.href = "#features")}
                className="text-lg px-8 py-4"
              >
                Ver Funcionalidades
              </Button>
            </div>

            {/* Prova Social */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500 mb-4">
                Empresas que confiam no EuQuero:
              </p>
              <div className="flex items-center justify-center lg:justify-start space-x-6 opacity-60">
                {["TechCorp", "InovaBR", "StartupXYZ", "EmpresaABC"].map(
                  (company) => (
                    <div key={company} className="text-gray-400 font-medium">
                      {company}
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>

          {/* Imagem/Ilustração */}
          <div className="relative">
            <div className="relative z-10">
              {/* Placeholder para ilustração */}
              <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-8 shadow-2xl">
                <div className="bg-white rounded-xl p-6 mb-4 shadow-lg">
                  <div className="flex items-center mb-4">
                    <div className="w-3 h-3 bg-red-400 rounded-full mr-2"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full mr-2"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-blue-200 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-gray-600">
                      Fidelização Ativa
                    </span>
                    <span className="text-green-600 font-bold">+24%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full w-3/4"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Elementos decorativos */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-purple-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default HeroSection;
