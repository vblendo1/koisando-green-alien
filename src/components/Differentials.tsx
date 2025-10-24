import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection from './ui/AnimatedSection';
import margensIcon from '@/assets/icons/margens.png';
import importadoraIcon from '@/assets/icons/importadora.png';
import freteIcon from '@/assets/icons/frete.png';
import descontosIcon from '@/assets/icons/descontos.png';
import prazoIcon from '@/assets/icons/prazo.png';
import atendimentoIcon from '@/assets/icons/atendimento.png';

interface DifferentialsProps {
  onCTAClick: () => void;
}

const Differentials = ({ onCTAClick }: DifferentialsProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const differentials = [
    {
      icon: margensIcon,
      title: 'Margens de até 200%',
      description: 'Lucro de verdade que faz seu negócio crescer',
      color: '#009bac'
    },
    {
      icon: importadoraIcon,
      title: 'Direto com a importadora',
      description: 'Sem atravessador, preço justo direto da fonte',
      color: '#6c256f'
    },
    {
      icon: freteIcon,
      title: 'Frete grátis',
      description: 'Frete grátis pra todo o Brasil acima do pedido mínimo',
      color: '#009bac'
    },
    {
      icon: descontosIcon,
      title: 'Descontos progressivos',
      description: 'Quanto mais você compra, mais você economiza',
      color: '#8c4091'
    },
    {
      icon: prazoIcon,
      title: '60 dias pra pagar',
      description: 'Venda hoje e pague só depois de lucrar',
      color: '#4dbdc6'
    },
    {
      icon: atendimentoIcon,
      title: 'Atendimento exclusivo',
      description: 'Atendimento humano, direto e rápido',
      color: '#6c256f'
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % differentials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + differentials.length) % differentials.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % differentials.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [differentials.length]);

  return (
    <section id="diferenciais" className="py-16 md:py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-[#6c256f] to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-[#009bac] to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <AnimatedSection>
          <div className="text-center mb-12 md:mb-20">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 md:mb-6 leading-tight px-4">
              Nossos diferenciais fazem o{' '}
              <span className="bg-gradient-to-r from-[#6c256f] via-[#8c4091] to-[#009bac] bg-clip-text text-transparent">
                lucro trabalhar
              </span>{' '}
              pra você.
            </h2>
            <p className="text-base md:text-xl text-gray-700 max-w-2xl mx-auto px-4">
              Condições exclusivas pensadas para proteger seu caixa e maximizar seus lucros
            </p>
          </div>
        </AnimatedSection>

        {/* Desktop Grid Layout */}
        <motion.div
          className="hidden md:grid md:grid-cols-3 gap-6 lg:gap-8 mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          {differentials.map((item, index) => {
            return (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 }
                }}
                className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-transparent overflow-hidden"
                whileHover={{ y: -8 }}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${item.color}08 0%, ${item.color}15 100%)`
                  }}
                />

                <div className="relative z-10 flex flex-col items-center text-center">
                  <motion.div
                    className="w-20 h-20 mb-6 flex items-center justify-center"
                    whileHover={{
                      scale: 1.1,
                      transition: { duration: 0.4 }
                    }}
                  >
                    <img src={item.icon} alt={item.title} className="w-16 h-16 object-contain" />
                  </motion.div>

                  <h3 className="text-xl font-extrabold text-gray-900 mb-2 tracking-tight">
                    {item.title}
                  </h3>

                  <p className="text-gray-600 leading-relaxed font-medium">
                    {item.description}
                  </p>
                </div>

                <motion.div
                  className="absolute -bottom-2 -right-2 w-24 h-24 rounded-full blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-500"
                  style={{ backgroundColor: item.color }}
                />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Mobile Carousel */}
        <div className="md:hidden mb-12 relative">
          <div className="overflow-hidden">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
                className="px-4"
              >
                {(() => {
                  const item = differentials[currentSlide];
                  return (
                    <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 min-h-[280px] flex flex-col items-center justify-center text-center">
                      <div className="w-24 h-24 mb-6 flex items-center justify-center">
                        <img src={item.icon} alt={item.title} className="w-20 h-20 object-contain" />
                      </div>

                      <h3 className="text-2xl font-extrabold text-gray-900 mb-3 tracking-tight">
                        {item.title}
                      </h3>

                      <p className="text-lg text-gray-600 leading-relaxed font-medium">
                        {item.description}
                      </p>
                    </div>
                  );
                })()}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <motion.button
              onClick={prevSlide}
              className="w-12 h-12 rounded-full bg-gradient-to-br from-[#6c256f] to-[#8c4091] flex items-center justify-center shadow-lg"
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
              aria-label="Anterior"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>

            <div className="flex gap-2">
              {differentials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? 'bg-gradient-to-r from-[#6c256f] to-[#009bac] w-8'
                      : 'bg-gray-300 w-2'
                  }`}
                  aria-label={`Ir para slide ${index + 1}`}
                />
              ))}
            </div>

            <motion.button
              onClick={nextSlide}
              className="w-12 h-12 rounded-full bg-gradient-to-br from-[#009bac] to-[#4dbdc6] flex items-center justify-center shadow-lg"
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
              aria-label="Próximo"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </div>
        </div>

        <AnimatedSection delay={0.3}>
          <div className="text-center px-4">
            <p className="text-lg md:text-xl text-gray-600 mb-6 md:mb-8 italic max-w-2xl mx-auto">
              Sem atravessador, sem enrolação. Só produto com giro rápido, boa apresentação e margem de verdade.
            </p>

            <motion.button
              onClick={onCTAClick}
              className="group relative inline-flex items-center justify-center gap-3 px-12 md:px-16 py-5 md:py-6 text-base sm:text-lg md:text-xl font-semibold text-white bg-gradient-to-r from-[#6c256f] to-[#8c4091] rounded-2xl shadow-[0_10px_40px_-10px_rgba(108,37,111,0.4)] overflow-hidden border border-white/10 backdrop-blur-sm transition-all duration-300 hover:shadow-[0_20px_60px_-15px_rgba(108,37,111,0.6)] hover:border-white/20"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10 tracking-wide">Quero condições exclusivas</span>
              <motion.div
                className="relative z-10"
                whileHover={{ x: 3 }}
                transition={{ duration: 0.2 }}
              >
                <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
              </motion.div>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#8c4091] to-[#009bac] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />
            </motion.button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Differentials;
