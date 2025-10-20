import logoWhite from "@/assets/logo-white.png";
import { Facebook, Instagram, Linkedin } from "lucide-react";

export const Footer = () => {
  return (
    <footer id="contato" className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          <div>
            <img src={logoWhite} alt="Onda Pro" className="h-12 mb-4" />
            <p className="text-sm opacity-90 font-medium">
              Produtos que movem negócios.
            </p>
          </div>

          <div className="text-center">
            <h3 className="font-bold mb-4">Links</h3>
            <div className="space-y-2">
              <a href="#sobre" className="block hover:opacity-80 transition-opacity">
                Sobre
              </a>
              <a href="#produtos" className="block hover:opacity-80 transition-opacity">
                Catálogo
              </a>
              <a href="#formulario" className="block hover:opacity-80 transition-opacity">
                Contato
              </a>
              <a href="#" className="block hover:opacity-80 transition-opacity">
                Política de Privacidade
              </a>
            </div>
          </div>

          <div className="md:text-right">
            <h3 className="font-bold mb-4">Redes Sociais</h3>
            <div className="flex gap-4 justify-start md:justify-end">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/10 text-center text-sm opacity-80">
          © 2025 Onda Pro — Importadora de materiais escolares e office. CNPJ 80.574.965/0001-27
        </div>
      </div>
    </footer>
  );
};
