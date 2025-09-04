import Container from "./ui/Container";
import NewsletterSignup from "./NewsletterSignup";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-400 py-8">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Informações de Suporte */}
          <div>
            <h3 className="text-white font-semibold mb-4 flex items-center">
              📞 Suporte
            </h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span>📧</span>
                <a
                  href="mailto:contato@fcaq.com.br"
                  className="hover:text-white transition-colors"
                >
                  contato@fcaq.com.br
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <span>💬</span>
                <a
                  href="https://t.me/+9cdym9gvPQ9iOWNh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Telegram
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <span>📱</span>
                <a
                  href="https://wa.me/5588988712711"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  +55 88 988712711
                </a>
              </div>
            </div>
          </div>

          {/* Links Úteis */}
          <div>
            <h3 className="text-white font-semibold mb-4">Links Úteis</h3>
            <div className="space-y-2">
              <a
                href="/"
                className="block hover:text-white transition-colors"
              >
                Início
              </a>
              <a
                href="/auth"
                className="block hover:text-white transition-colors"
              >
                Entrar
              </a>
              <a
                href="#contato"
                className="block hover:text-white transition-colors"
              >
                Contato
              </a>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div>
            <NewsletterSignup />
          </div>

          {/* Informações Legais */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <div className="space-y-2">
              <a
                href="#termos"
                className="block hover:text-white transition-colors"
              >
                Termos de Uso
              </a>
              <a
                href="#privacidade"
                className="block hover:text-white transition-colors"
              >
                Política de Privacidade
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-6 text-center">
          <p className="text-sm">
            Copyright © 2024 - 2025 EuQuero. Todos os direitos reservados.
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
