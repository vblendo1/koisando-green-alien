import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const RotatingSubtitles = () => {
  const subtitles = [
    "Frete grátis pra todo o Brasil.",
    "Produtos com até 200% de margem de lucro.",
    "Design que vende sozinho e faz tua vitrine trabalhar por você.",
    "Importadora parceira de +5500 lojas em todo o Brasil."
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % subtitles.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [subtitles.length]);

  return (
    <div className="h-16 md:h-20 flex items-center justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.p
          key={currentIndex}
          className="text-base md:text-xl lg:text-2xl text-white/95 font-medium text-center px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {subtitles[currentIndex]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
};

export default RotatingSubtitles;
