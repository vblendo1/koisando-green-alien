import { Mail, Phone, MapPin, Instagram, Facebook, Youtube } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-[#6c256f] via-[#8c4091] to-[#009bac] text-white overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
          >
            <h3 className="text-3xl font-extrabold mb-6 drop-shadow-lg">Onda Pro</h3>
            <p className="text-white/90 leading-relaxed text-lg font-medium">
              Importadora parceira de +5500 lojas em todo o Brasil.
            </p>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
          >
            <h4 className="text-xl font-bold mb-6">Contato</h4>
            <div className="space-y-4">
              <motion.a
                href="mailto:contato@ondapro.com.br"
                className="flex items-center gap-3 text-white/90 hover:text-white transition-colors duration-300 group"
                whileHover={{ x: 5 }}
              >
                <div className="w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center group-hover:bg-white/30 transition-colors">
                  <Mail size={18} />
                </div>
                <span className="font-medium">contato@ondapro.com.br</span>
              </motion.a>
              <motion.a
                href="tel:+5511999999999"
                className="flex items-center gap-3 text-white/90 hover:text-white transition-colors duration-300 group"
                whileHover={{ x: 5 }}
              >
                <div className="w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center group-hover:bg-white/30 transition-colors">
                  <Phone size={18} />
                </div>
                <span className="font-medium">(11) 99999-9999</span>
              </motion.a>
              <div className="flex items-start gap-3 text-white/90">
                <div className="w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center mt-0.5">
                  <MapPin size={18} className="flex-shrink-0" />
                </div>
                <span className="font-medium">Rua Exemplo, 123<br />São Paulo - SP, 01234-567</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
          >
            <h4 className="text-xl font-bold mb-6">CNPJ</h4>
            <p className="text-white/90 text-lg font-medium">12.345.678/0001-90</p>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
          >
            <h4 className="text-xl font-bold mb-6">Redes Sociais</h4>
            <div className="flex gap-4">
              <motion.a
                href="https://instagram.com/ondapro"
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center hover:bg-white/30 transition-all duration-300 shadow-lg"
                aria-label="Instagram"
                whileHover={{ scale: 1.15, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Instagram size={24} />
              </motion.a>
              <motion.a
                href="https://facebook.com/voudeonda"
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center hover:bg-white/30 transition-all duration-300 shadow-lg"
                aria-label="Facebook"
                whileHover={{ scale: 1.15, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Facebook size={24} />
              </motion.a>
              <motion.a
                href="https://youtube.com/@voudeonda"
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center hover:bg-white/30 transition-all duration-300 shadow-lg"
                aria-label="YouTube"
                whileHover={{ scale: 1.15, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Youtube size={24} />
              </motion.a>
            </div>
          </motion.div>
        </motion.div>

        <div className="border-t-2 border-white/20 pt-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-white/90 text-base font-medium">
              2025 © Onda Pro. Todos os direitos reservados.
            </p>
            <div className="flex flex-wrap justify-center gap-6 md:gap-8 text-sm md:text-base">
              <motion.button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="text-white/90 hover:text-white transition-colors duration-300 font-medium touch-target"
                whileHover={{ y: -2 }}
              >
                Política de Privacidade
              </motion.button>
              <motion.button
                onClick={() => {
                  const element = document.getElementById('contato');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="text-white/90 hover:text-white transition-colors duration-300 font-medium touch-target"
                whileHover={{ y: -2 }}
              >
                Termos Comerciais
              </motion.button>
              <motion.button
                onClick={() => {
                  const element = document.getElementById('blog');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="text-white/90 hover:text-white transition-colors duration-300 font-medium touch-target"
                whileHover={{ y: -2 }}
              >
                Blog
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
