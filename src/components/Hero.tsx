import { motion } from 'framer-motion'
import BubbleAnimation from './ui/BubbleAnimation'
import RotatingSubtitles from './RotatingSubtitles'
import RotatingMicrocopy from './RotatingMicrocopy'

interface HeroProps {
  onCTAClick: () => void;
}

const Hero = ({ onCTAClick }: HeroProps) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-[#6c256f] via-[#8c4091] to-[#6c256f]">
      {/* Animação de bolhas */}
      <BubbleAnimation />

      {/* Efeito de gradiente animado no fundo */}
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{
          background: 'radial-gradient(circle at 20% 50%, #009bac 0%, transparent 50%), radial-gradient(circle at 80% 80%, #4dbdc6 0%, transparent 50%)'
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <section id="hero" className="relative max-w-full mx-auto pt-20 md:pt-24">
        <div className="max-w-screen-xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-16 lg:py-20">
          <motion.div
            className="text-center space-y-6 md:space-y-8 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* Título Principal */}
            <h1 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl tracking-tight font-extrabold leading-[1.15] md:leading-tight px-2 md:px-0">
              <motion.span
                className="block text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                Venda hoje. Pague depois.
              </motion.span>
              <motion.span
                className="block text-white mt-1 md:mt-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                Até{' '}
                <span className="text-[#4dbdc6] relative inline-block">
                  60 dias
                  <motion.span
                    className="absolute -bottom-1 md:-bottom-2 left-0 w-full h-0.5 md:h-1 bg-[#4dbdc6]"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                  />
                </span>
                {' '}pra lucrar antes de investir
              </motion.span>
            </h1>

            {/* Subtítulos Rotativos */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <RotatingSubtitles />
            </motion.div>

            {/* CTA Button */}
            <motion.div
              className="pt-4 flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <motion.button
                onClick={onCTAClick}
                className="inline-flex items-center justify-center gap-2 px-6 md:px-12 py-3 md:py-5 text-sm md:text-lg font-bold text-[#6c256f] bg-white rounded-full shadow-2xl hover:shadow-[0_20px_60px_-15px_rgba(255,255,255,0.5)] transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Quero revender Onda Pro</span>
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  →
                </motion.span>
              </motion.button>
              <RotatingMicrocopy />
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Hero
