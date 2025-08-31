import Card from "@/react-app/components/ui/Card";
import Icon from "@/react-app/components/ui/Icon";
import Button from "./ui/Button";

const PricingSection = () => {
  return (
    <section id="planos" className="py-20 bg-black text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Planos a Partir de R$ 39,90/mês</h2>
        <div className="flex flex-wrap justify-center gap-8">
          {/* Plano Grátis */}
          <Card className="max-w-sm w-full lg:w-1/3 bg-gray-900 text-white">
            <div className="p-8">
              <h3 className="text-2xl font-bold mb-4">Plano Grátis</h3>
              <p className="text-gray-400 mb-6">Para você que quer testar</p>
              <div className="mb-6">
                <span className="text-4xl font-bold">R$0</span>
              </div>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <Icon name="CheckCircle" className="text-secondary mr-2" />
                  <span>03 testes</span>
                </li>
              </ul>
            </div>
          </Card>

          {/* Plano Mensal */}
          <Card className="max-w-sm w-full lg:w-1/3 bg-primary text-white shadow-lg shadow-primary/30">
            <div className="p-8">
              <h3 className="text-2xl font-bold mb-4">Plano Mensal</h3>
              <p className="text-gray-200 mb-6">Ideal para um crescimento constante</p>
              <div className="mb-6">
                <span className="text-4xl font-bold">R$39,90</span>
                <span className="text-gray-300">/mês</span>
              </div>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <Icon name="CheckCircle" className="text-white mr-2" />
                  <span>Automações Ilimitadas</span>
                </li>
                <li className="flex items-center">
                  <Icon name="CheckCircle" className="text-white mr-2" />
                  <span>Suporte Prioritário</span>
                </li>
              </ul>
            </div>
          </Card>

          {/* Plano Pay-per-use */}
          <Card className="max-w-sm w-full lg:w-1/3 bg-gray-900 text-white">
            <div className="p-8">
              <h3 className="text-2xl font-bold mb-4">Plano Pay-per-use</h3>
              <p className="text-gray-400 mb-6">Pague apenas pelo que usar</p>
              <div className="mb-6">
                <span className="text-4xl font-bold">Pix</span>
              </div>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <Icon name="CheckCircle" className="text-secondary mr-2" />
                  <span>Créditos pré-pagos</span>
                </li>
                <li className="flex items-center">
                  <Icon name="CheckCircle" className="text-secondary mr-2" />
                  <span>Sem mensalidade</span>
                </li>
              </ul>
            </div>
          </Card>
        </div>
        <div className="text-center mt-16">
            <h3 className="text-3xl font-bold mb-4">
              Pronto para começar?
            </h3>
            <p className="text-xl mb-8 opacity-90">
              Junte-se a milhares de negócios que já estão economizando tempo e vendendo mais.
            </p>
            <Button 
              variant="secondary"
              size="lg"
              onClick={() => window.location.href = '#'}
            >
              Comece Agora
            </Button>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;