import { useState } from "react";
import Container from "./ui/Container";
import Button from "./ui/Button";
import Icon from "./ui/Icon";

const navigationItems = [
  { name: "Como Funciona", href: "#como-funciona" },
  { name: "Benefícios", href: "#beneficios" },
  { name: "Dúvidas Frequentes", href: "#faq" },
  { name: "Blog", href: "#blog" },
];

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-black text-white shadow-md sticky top-0 z-50">
      <Container>
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="/" className="text-2xl font-bold">
            Insta<span className="text-primary">Ninja</span>
          </a>

          {/* Navegação Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="font-semibold hover:text-primary transition-colors duration-200"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Botão Login Desktop */}
          <div className="hidden md:block">
            <Button
              variant="primary"
              onClick={() => (window.location.href = "/login")}
            >
              LOGIN
            </Button>
          </div>

          {/* Botão Menu Mobile */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:text-primary focus:outline-none"
              aria-label="Abrir menu"
            >
              <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={28} />
            </button>
          </div>
        </div>

        {/* Menu Mobile */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-black py-4">
            <nav className="flex flex-col items-center space-y-4">
              {navigationItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="font-semibold hover:text-primary transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <Button
                variant="primary"
                className="w-full max-w-xs mt-4"
                onClick={() => (window.location.href = "/login")}
              >
                LOGIN
              </Button>
            </nav>
          </div>
        )}
      </Container>
    </header>
  );
};

export default Header;
