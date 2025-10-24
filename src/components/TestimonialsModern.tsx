import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TestimonialsProps {
  onCTAClick: () => void;
}

const Testimonials = ({ onCTAClick }: TestimonialsProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const testimonials = [
    {
      text: 'Antes eu comprava tudo no marketplace. Com a Onda Pro, o giro triplicou e pago só depois de vender.',
      author: 'Papelaria Criativa',
      location: 'MG',
      gradient: 'from-[#6c256f]/10 to-[#8c4091]/10'
    },
    {
      text: 'Comecei com 1 kit, hoje já trabalho com 4 linhas da marca.',
      author: 'Arte & Papel',
      location: 'SP',
      gradient: 'from-[#009bac]/10 to-[#4dbdc6]/10'
    },
    {
      text: 'Frete grátis e 60 dias no boleto me salvaram no início da temporada.',
      author: 'Papelaria Esquina',
      location: 'RS',
      gradient: 'from-[#8c4091]/10 to-[#009bac]/10'
    }
  ];

  const nextTestimonial = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const interval = setInterval(nextTestimonial, 5000);
    return () => clearInterval(interval);
  }, []);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <section className="py-20 bg-gradient-to-br from-[#f6f6f6] to-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold text-center mb-16"
        >
          Histórias reais de quem viu o{' '}
          <span className="bg-gradient-to-r from-[#6c256f] to-[#009bac] bg-clip-text text-transparent">
            estoque girar de verdade
          </span>
        </motion.h2>

        <div className="relative">
          <div className="overflow-hidden">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
              >
                <div className={`bg-gradient-to-br ${testimonials[currentIndex].gradient} rounded-3xl p-12 shadow-xl border border-gray-200`}>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Quote className="text-[#009bac] mb-6" size={48} />
                  </motion.div>
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-2xl md:text-3xl font-medium text-gray-800 mb-8 leading-relaxed"
                  >
                    "{testimonials[currentIndex].text}"
                  </motion.p>
                  <div className="flex items-center justify-between">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <p className="text-lg font-semibold text-[#6c256f]">
                        {testimonials[currentIndex].author}
                      </p>
                      <p className="text-gray-600">{testimonials[currentIndex].location}</p>
                    </motion.div>
                    <motion.div 
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 }}
                      className="flex gap-2"
                    >
                      {[...Array(5)].map((_, i) => (
                        <motion.span 
                          key={i}
                          initial={{ opacity: 0, rotate: -180 }}
                          animate={{ opacity: 1, rotate: 0 }}
                          transition={{ delay: 0.6 + i * 0.1 }}
                          className="text-yellow-400 text-2xl"
                        >
                          ★
                        </motion.span>
                      ))}
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <motion.button
            onClick={prevTestimonial}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300"
            aria-label="Anterior"
          >
            <ChevronLeft className="text-[#6c256f]" size={24} />
          </motion.button>

          <motion.button
            onClick={nextTestimonial}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300"
            aria-label="Próximo"
          >
            <ChevronRight className="text-[#6c256f]" size={24} />
          </motion.button>

          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                whileHover={{ scale: 1.2 }}
                className={`h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-[#009bac] w-8' : 'bg-gray-300 w-3'
                }`}
                aria-label={`Ir para depoimento ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <motion.button
            onClick={onCTAClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 text-lg font-semibold text-[#6c256f] bg-white rounded-full shadow-md hover:shadow-xl transition-all duration-300 border-2 border-[#6c256f]"
          >
            Quero ter o mesmo resultado
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
