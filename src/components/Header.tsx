import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import logoAzul from "@/assets/logo-azul.png";

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background shadow-lg" : "bg-background/95 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <img src={logoAzul} alt="Onda Pro" className="h-10 md:h-12" />
        
        <nav className="hidden md:flex items-center gap-8">
          <button
            onClick={() => scrollToSection("produtos")}
            className="text-foreground hover:text-secondary transition-colors font-medium"
          >
            Produtos
          </button>
          <button
            onClick={() => scrollToSection("formulario")}
            className="text-foreground hover:text-secondary transition-colors font-medium"
          >
            Contato
          </button>
        </nav>

        <Button
          onClick={() => scrollToSection("formulario")}
          className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6 shadow-lg hover:shadow-xl transition-all"
        >
          Receber Catálogo
        </Button>
      </div>
    </header>
  );
};
