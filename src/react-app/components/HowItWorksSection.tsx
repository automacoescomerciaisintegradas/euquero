import Button from "./ui/Button";

const HowItWorksSection = () => {
  const steps = [
    {
      number: "01",
      title: "Acesse o App",
      description: "Conecte sua conta do Instagram de forma simples e segura.",
    },
    {
      number: "02",
      title: "Personalize as Mensagens",
      description:
        "Crie as mensagens e links que serão enviados automaticamente.",
    },
    {
      number: "03",
      title: "Acompanhe os Resultados",
      description:
        "Monitore as estatísticas e o desempenho de suas automações.",
    },
  ];

  return (
    <section id="como-funciona" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            100% Automático. De Forma Muito Simples.
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          {steps.map((step) => (
            <div key={step.number} className="p-6">
              <div className="text-5xl font-bold text-primary mb-4">
                {step.number}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Button
            variant="primary"
            size="lg"
            onClick={() => (window.location.href = "#planos")}
          >
            Comece Já
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
