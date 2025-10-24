import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import AnimatedSection from './ui/AnimatedSection';
import { StaggerTestimonials } from './ui/stagger-testimonials';

interface TestimonialsProps {
  onCTAClick: () => void;
}

const Testimonials = ({ onCTAClick }: TestimonialsProps) => {
  return (
    <section id="depoimentos" className="py-16 md:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        <AnimatedSection>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-center mb-6 md:mb-8">
            Histórias reais de quem viu o{' '}
            <span className="bg-gradient-to-r from-[#6c256f] via-[#8c4091] to-[#009bac] bg-clip-text text-transparent">
              estoque girar de verdade
            </span>
          </h2>
          <p className="text-center text-base sm:text-lg md:text-xl text-gray-600 mb-12 md:mb-16 max-w-3xl mx-auto font-medium">
            Lojistas como você já transformaram seus negócios com a Onda Pro
          </p>
        </AnimatedSection>

        <StaggerTestimonials />

        <AnimatedSection delay={0.3}>
          <div className="text-center mt-12 md:mt-16">
            <motion.button
              onClick={onCTAClick}
              className="group relative inline-flex items-center justify-center gap-3 px-12 md:px-16 py-5 md:py-6 text-base sm:text-lg md:text-xl font-semibold text-white bg-gradient-to-r from-[#6c256f] to-[#8c4091] rounded-2xl shadow-[0_10px_40px_-10px_rgba(108,37,111,0.4)] overflow-hidden border border-white/10 backdrop-blur-sm transition-all duration-300 hover:shadow-[0_20px_60px_-15px_rgba(108,37,111,0.6)] hover:border-white/20"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10 tracking-wide">Quero ter o mesmo resultado</span>
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

export default Testimonials;
