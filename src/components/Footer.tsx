import { Mail, Phone, MapPin, Instagram, Facebook, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-[#6c256f] to-[#009bac] text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div>
            <h3 className="text-2xl font-bold mb-6">Onda Pro</h3>
            <p className="text-white/80 leading-relaxed">
              Importadora parceira de +5500 lojas em todo o Brasil.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contato</h4>
            <div className="space-y-3">
              <a href="mailto:contato@ondapro.com.br" className="flex items-center gap-3 text-white/80 hover:text-white transition-colors duration-300">
                <Mail size={18} />
                <span>contato@ondapro.com.br</span>
              </a>
              <a href="tel:+5511999999999" className="flex items-center gap-3 text-white/80 hover:text-white transition-colors duration-300">
                <Phone size={18} />
                <span>(11) 99999-9999</span>
              </a>
              <div className="flex items-start gap-3 text-white/80">
                <MapPin size={18} className="mt-1 flex-shrink-0" />
                <span>Rua Exemplo, 123<br />São Paulo - SP, 01234-567</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">CNPJ</h4>
            <p className="text-white/80">12.345.678/0001-90</p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Redes Sociais</h4>
            <div className="flex gap-4">
              <a
                href="https://instagram.com/ondapro"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 transform hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://facebook.com/voudeonda"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 transform hover:scale-110"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://youtube.com/@voudeonda"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 transform hover:scale-110"
                aria-label="YouTube"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/80 text-sm">
              2025 © Onda Pro. Todos os direitos reservados.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="/privacidade" className="text-white/80 hover:text-white transition-colors duration-300">
                Política de Privacidade
              </a>
              <a href="/termos" className="text-white/80 hover:text-white transition-colors duration-300">
                Termos Comerciais
              </a>
              <a href="/blog" className="text-white/80 hover:text-white transition-colors duration-300">
                Blog
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
