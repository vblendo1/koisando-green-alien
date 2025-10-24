import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const RotatingMicrocopy = () => {
  const microcopy = [
    "Atendimento exclusivo para lojistas",
    "Converse com representante oficial"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % microcopy.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [microcopy.length]);

  return (
    <div className="h-6 md:h-7 flex items-center justify-center overflow-hidden mt-3">
      <AnimatePresence mode="wait">
        <motion.p
          key={currentIndex}
          className="text-xs md:text-sm text-white/80 font-medium text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          {microcopy[currentIndex]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
};

export default RotatingMicrocopy;
