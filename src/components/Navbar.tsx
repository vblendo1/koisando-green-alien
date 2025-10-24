<<<<<<< HEAD
import { motion, useScroll, useTransform } from 'framer-motion';

const Navbar = () => {
  const { scrollY } = useScroll();
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ['rgba(108, 37, 111, 0.3)', 'rgba(108, 37, 111, 0.95)']
  );
  const backdropBlur = useTransform(
    scrollY,
    [0, 100],
    ['blur(8px)', 'blur(16px)']
  );

=======
import { useState, useEffect } from 'react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
>>>>>>> c49edcd5df47ba19e8b4a9b14029260d7fa70a83
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { label: 'Diferenciais', id: 'diferenciais' },
    { label: 'Produtos', id: 'produtos' },
    { label: 'Depoimentos', id: 'depoimentos' },
    { label: 'Blog', id: 'blog' },
    { label: 'Contato', id: 'contato' }
  ];

  return (
<<<<<<< HEAD
    <>
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/10"
      style={{
        backgroundColor,
        backdropFilter: backdropBlur,
        WebkitBackdropFilter: backdropBlur
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 md:h-16">
          <motion.div
            className="flex items-center cursor-pointer mx-auto md:mx-0 md:mr-auto"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img src="/BRANCA.png" alt="Onda Pro" className="h-8 md:h-10" />
          </motion.div>
=======
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#6c256f]/95 backdrop-blur-md shadow-xl py-3' : 'bg-[#6c256f] shadow-lg py-4'}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <img src="/AZUL.png" alt="Onda Pro" className="h-12 md:h-14" />
          </div>
>>>>>>> c49edcd5df47ba19e8b4a9b14029260d7fa70a83

          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navItems.map((item, index) => (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-white/90 hover:text-white font-medium transition-colors duration-300 relative group text-sm lg:text-base"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.label}
                <motion.span
                  className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-[#4dbdc6] to-[#009bac]"
                  initial={{ width: 0 }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </motion.nav>
    </>
  );
};

export default Navbar;
