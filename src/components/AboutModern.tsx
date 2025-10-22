import { Target, Heart, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

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
    <section className="py-24 bg-gradient-to-br from-[#f6f6f6] to-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Mais que produtos. Uma importadora feita pra{' '}
            <span className="bg-gradient-to-r from-[#6c256f] to-[#009bac] bg-clip-text text-transparent">
              lojistas que pensam em crescimento
            </span>
          </h2>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl p-12 shadow-xl mb-12 border border-gray-100"
        >
          <p className="text-xl text-gray-700 leading-relaxed text-center max-w-4xl mx-auto">
            A Onda Pro nasceu com um propósito simples: ajudar papelarias e comércios a vender mais
            com produtos que chamam atenção, giram rápido e mantêm margem saudável. Do primeiro contato
            à entrega, nossa missão é facilitar o dia a dia de quem revende.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center group"
              >
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#6c256f] to-[#009bac] rounded-2xl mb-6 shadow-lg"
                >
                  <Icon className="text-white" size={36} strokeWidth={2} />
                </motion.div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center"
        >
          <motion.a
            href="/sobrenos"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-10 py-4 text-lg font-semibold text-[#6c256f] bg-white rounded-full shadow-md hover:shadow-xl transition-all duration-300 border-2 border-[#6c256f]"
          >
            Conhecer mais sobre a Onda Pro
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
