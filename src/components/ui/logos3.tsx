import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';

export const Logos3 = () => {
  const logos = [
    { name: 'ONDA PRO Azul', src: '/AZUL.png' },
    { name: 'ONDA PRO Roxa', src: '/ROXA.png' },
    { name: 'ONDA PRO Azul', src: '/AZUL.png' },
    { name: 'ONDA PRO Roxa', src: '/ROXA.png' },
    { name: 'ONDA PRO Azul', src: '/AZUL.png' },
    { name: 'ONDA PRO Roxa', src: '/ROXA.png' },
    { name: 'ONDA PRO Azul', src: '/AZUL.png' },
    { name: 'ONDA PRO Roxa', src: '/ROXA.png' },
  ];

  const tripleLogos = [...logos, ...logos, ...logos];

  return (
    <section className="pt-8 pb-10 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedSection>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            <span className="text-[#6c256f]">+5500 lojas</span> em todo o Brasil já abastecem com a Onda Pro
          </h2>
        </AnimatedSection>

        <div className="my-8 relative">
          <div
            className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"
          />
          <div
            className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"
          />

          <div className="relative overflow-hidden">
            <motion.div
              className="flex gap-12 items-center"
              animate={{
                x: [0, -100 * logos.length * 0.85],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 20,
                  ease: "linear",
                },
              }}
              style={{ width: 'max-content' }}
            >
              {tripleLogos.map((logo, index) => (
                <motion.div
                  key={index}
                  whileHover={{
                    scale: 1.05,
                    y: -5,
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="flex items-center justify-center w-24 h-16 md:w-32 md:h-20"
                >
                  <img
                    src={logo.src}
                    alt={logo.name}
                    className="w-auto h-full max-w-full object-contain"
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        <AnimatedSection delay={0.2}>
          <div className="text-center max-w-3xl mx-auto px-4">
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 mb-2 leading-snug">
              De pequenas empresas a redes internacionais
            </p>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold bg-gradient-to-r from-[#6c256f] to-[#009bac] bg-clip-text text-transparent leading-snug">
              todos com o mesmo resultado: mais giro, mais margem, menos preocupação
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};
