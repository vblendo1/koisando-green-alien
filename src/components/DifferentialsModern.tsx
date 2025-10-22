import { Truck, Calendar, TrendingUp, Users, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface DifferentialsProps {
  onCTAClick: () => void;
}

const Differentials = ({ onCTAClick }: DifferentialsProps) => {
  const differentials = [
    {
      icon: Truck,
      text: 'Frete grátis para todo o Brasil',
      color: '#009bac'
    },
    {
      icon: Calendar,
      text: 'Até 60 dias para pagar no boleto bancário',
      color: '#6c256f'
    },
    {
      icon: TrendingUp,
      text: 'Produtos com margens de 110% a 200%',
      color: '#009bac'
    },
    {
      icon: Users,
      text: 'Atendimento exclusivo para lojistas',
      color: '#8c4091'
    },
    {
      icon: Sparkles,
      text: 'Produtos com design que vendem sozinhos',
      color: '#4dbdc6'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section className="py-20 bg-[#f6f6f6]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold text-center mb-20"
        >
          Nossos diferenciais fazem o{' '}
          <span className="bg-gradient-to-r from-[#6c256f] to-[#009bac] bg-clip-text text-transparent">
            lucro trabalhar pra você
          </span>
        </motion.h2>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {differentials.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group bg-white rounded-2xl p-8 shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 cursor-pointer"
              >
                <motion.div
                  className="w-16 h-16 rounded-xl mb-6 flex items-center justify-center"
                  style={{ backgroundColor: `${item.color}15` }}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Icon size={32} style={{ color: item.color }} strokeWidth={2.5} />
                </motion.div>
                <p className="text-lg font-semibold text-gray-800 leading-relaxed">
                  {item.text}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center"
        >
          <p className="text-xl text-gray-600 mb-8 italic">
            Sem atravessador, sem enrolação.<br />
            Só produto com giro rápido, boa apresentação e margem de verdade.
          </p>

          <motion.button
            onClick={onCTAClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-10 py-4 text-lg font-semibold text-white bg-gradient-to-r from-[#009bac] to-[#4dbdc6] rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <span className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></span>
            Quero ver os produtos campeões de venda
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Differentials;
