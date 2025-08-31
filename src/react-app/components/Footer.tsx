import Container from './ui/Container';

const Footer = () => {
  return (
    <footer className="bg-black text-gray-400 py-6">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <p className="text-sm mb-4 md:mb-0">
            Copyright © 2024 - 2025 Todos os direitos reservados.
          </p>
          <div className="flex space-x-6">
            <a href="#termos" className="text-sm hover:text-white transition-colors">
              Termos de Uso
            </a>
            <a href="#privacidade" className="text-sm hover:text-white transition-colors">
              Política de Privacidade
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;