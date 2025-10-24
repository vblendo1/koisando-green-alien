import { Target, Heart, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedSection from './ui/AnimatedSection';

const About = () => {
  const values = [
    {
      icon: Target,
      title: 'Foco no Lojista',
      description: 'Entendemos as necessidades reais de quem vende'
    },
    {
      icon: Heart,
      title: 'Parceria de Verdade',
      description: 'Seu sucesso é o nosso sucesso'
    },
    {
      icon: TrendingUp,
      title: 'Crescimento Sustentável',
      description: 'Produtos e condições que protegem seu caixa'
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-[#f6f6f6] via-white to-[#f6f6f6] relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-[#8c4091]/30 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-[#4dbdc6]/30 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-6 relative z-10">
        <AnimatedSection>
          <div className="text-center mb-12 md:mb-20 px-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 md:mb-6 leading-tight">
              Mais que produtos. Uma importadora feita pra{' '}
              <span className="bg-gradient-to-r from-[#6c256f] via-[#8c4091] to-[#009bac] bg-clip-text text-transparent">
                lojistas que pensam em crescimento
              </span>
            </h2>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <motion.div
            className="relative bg-white rounded-2xl md:rounded-3xl p-8 md:p-12 lg:p-16 shadow-2xl mb-12 md:mb-16 border-2 border-gray-100 overflow-hidden"
            whileHover={{ scale: 1.02, boxShadow: '0 30px 60px -15px rgba(0, 0, 0, 0.2)' }}
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#6c256f]/5 to-transparent rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-br from-[#009bac]/5 to-transparent rounded-full blur-3xl"></div>
            <p className="relative z-10 text-base md:text-xl lg:text-2xl text-gray-800 leading-relaxed text-center max-w-4xl mx-auto font-medium">
              A Onda Pro nasceu com um propósito simples: ajudar papelarias e comércios a vender mais
              com produtos que chamam atenção, giram rápido e mantêm margem saudável. Do primeiro contato
              à entrega, nossa missão é facilitar o dia a dia de quem revende.
            </p>
          </motion.div>
        </AnimatedSection>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.15
              }
            }
          }}
        >
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={index}
                className="text-center group"
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 }
                }}
              >
                <motion.div
                  className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-[#6c256f] via-[#8c4091] to-[#009bac] rounded-2xl mb-6 shadow-2xl"
                  whileHover={{ scale: 1.15, rotate: [0, -5, 5, -5, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <Icon className="text-white" size={44} strokeWidth={2.5} />
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-700 leading-relaxed text-lg font-medium">
                  {value.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        <AnimatedSection delay={0.4}>
          <div className="text-center px-4">
            <motion.button
              onClick={() => {
                const element = document.getElementById('contato');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="group relative inline-flex items-center gap-3 px-8 md:px-12 py-4 md:py-6 text-lg md:text-xl font-bold text-white bg-gradient-to-r from-[#6c256f] via-[#8c4091] to-[#6c256f] rounded-full shadow-2xl overflow-hidden touch-target"
              whileHover={{ scale: 1.05, boxShadow: '0 30px 60px -15px rgba(108, 37, 111, 0.6)' }}
              whileTap={{ scale: 0.98 }}
              style={{ backgroundSize: '200% 100%' }}
            >
              <span className="relative z-10">Fale com nosso time comercial</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6 }}
              />
            </motion.button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default About;
