import Button from './ui/Button';
import Container from './ui/Container';

const Hero = () => {
  return (
    <section id="inicio" className="bg-black text-white py-20 md:py-32">
      <Container className="text-center">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">
          Automação para Instagram
        </h1>
        <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-8">
          Pare de perder tempo e clientes respondendo manualmente. Automatize seu Instagram com a API Oficial e foque no que realmente importa: crescer seu negócio.
        </p>
        <div className="flex justify-center mb-8">
          <Button 
            variant="secondary" 
            size="lg"
            onClick={() => window.location.href = '#planos'}
          >
            Teste Grátis
          </Button>
        </div>
        <p className="text-sm text-gray-500">
          Suporte Global • Junte-se a milhares de usuários em PT, EN, ES, IT
        </p>
      </Container>
    </section>
  );
};

export default Hero;