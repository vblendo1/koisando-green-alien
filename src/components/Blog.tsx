import { BookOpen, TrendingUp, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedSection from './ui/AnimatedSection';

interface BlogProps {
  onCTAClick: () => void;
}

const Blog = ({ onCTAClick }: BlogProps) => {
  const articles = [
    {
      icon: TrendingUp,
      title: 'Como aumentar o ticket médio na volta às aulas',
      excerpt: 'Estratégias práticas para maximizar suas vendas no período mais importante do ano para papelarias.',
      color: '#6c256f'
    },
    {
      icon: Eye,
      title: 'As tendências de papelaria que vão dominar 2026',
      excerpt: 'Descubra quais produtos estarão em alta e prepare seu estoque com antecedência.',
      color: '#009bac'
    },
    {
      icon: BookOpen,
      title: 'O segredo das vitrines que vendem sozinhas',
      excerpt: 'Técnicas de visual merchandising que transformam sua vitrine em uma verdadeira máquina de vendas.',
      color: '#8c4091'
    }
  ];

  return (
    <section id="blog" className="py-16 md:py-24 bg-gradient-to-br from-[#f6f6f6] via-white to-[#f6f6f6] relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-20 w-80 h-80 bg-gradient-to-br from-[#009bac]/40 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-br from-[#6c256f]/40 to-transparent rounded-full blur-3xl"></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <AnimatedSection>
          <div className="px-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-center mb-4 md:mb-6 leading-tight">
              Dicas que ajudam sua loja a{' '}
              <span className="bg-gradient-to-r from-[#6c256f] via-[#8c4091] to-[#009bac] bg-clip-text text-transparent">
                vender mais
              </span>
              {' '}(sem gastar mais)
            </h2>
            <p className="text-center text-gray-700 mb-12 md:mb-20 text-base md:text-xl font-medium max-w-2xl mx-auto">
              Conteúdos exclusivos para lojistas que querem crescer
            </p>
          </div>
        </AnimatedSection>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16"
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
          {articles.map((article, index) => {
            const Icon = article.icon;
            return (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: { opacity: 1, y: 0 }
                }}
                whileHover={{ y: -8 }}
                className="group relative bg-white rounded-2xl md:rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-gray-100 hover:border-transparent"
              >
                <motion.div
                  className="h-48 md:h-56 flex items-center justify-center relative overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${article.color}15 0%, ${article.color}30 100%)`
                  }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                  <motion.div
                    className="relative z-10 w-20 h-20 md:w-28 md:h-28 rounded-2xl flex items-center justify-center shadow-2xl"
                    style={{
                      background: `linear-gradient(135deg, ${article.color}40 0%, ${article.color}60 100%)`
                    }}
                    whileHover={{ rotate: [0, -12, 12, -12, 0], scale: 1.15 }}
                    transition={{ duration: 0.6, type: 'tween' }}
                  >
                    <Icon
                      size={48}
                      style={{ color: article.color }}
                      strokeWidth={2}
                      className="md:w-16 md:h-16"
                    />
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  <motion.div
                    className="absolute inset-0 bg-white/10"
                    initial={{ x: '-100%', skewX: -20 }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.8 }}
                  />
                </motion.div>

                <div className="p-6 md:p-8">
                  <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-gray-900 group-hover:bg-gradient-to-r group-hover:from-[#6c256f] group-hover:to-[#009bac] group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                    {article.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-6 text-sm md:text-base">
                    {article.excerpt}
                  </p>
                  <motion.button
                    onClick={onCTAClick}
                    className="inline-flex items-center gap-2 text-sm sm:text-base md:text-lg font-bold bg-gradient-to-r from-[#009bac] to-[#4dbdc6] bg-clip-text text-transparent group-hover:gap-4 transition-all duration-300 min-h-[44px] py-2"
                    whileHover={{ x: 5 }}
                  >
                    Receber conteúdos
                    <motion.span
                      className="inline-flex items-center justify-center w-7 h-7 md:w-8 md:h-8 rounded-full bg-gradient-to-r from-[#009bac] to-[#4dbdc6] text-white shadow-lg"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                    >
                      →
                    </motion.span>
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <AnimatedSection delay={0.3}>
          <div className="text-center px-4">
            <motion.button
              onClick={() => {
                const element = document.getElementById('contato');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="group relative inline-flex items-center gap-3 px-8 md:px-12 py-4 md:py-6 text-lg md:text-xl font-bold text-white bg-gradient-to-r from-[#009bac] via-[#4dbdc6] to-[#009bac] rounded-full shadow-2xl overflow-hidden touch-target"
              whileHover={{ scale: 1.05, boxShadow: '0 30px 60px -15px rgba(0, 155, 172, 0.6)' }}
              whileTap={{ scale: 0.98 }}
              style={{ backgroundSize: '200% 100%' }}
            >
              <span className="relative z-10">Entre em contato conosco</span>
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

export default Blog;
