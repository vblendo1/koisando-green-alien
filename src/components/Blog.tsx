import { BookOpen, TrendingUp, Eye } from 'lucide-react';

const Blog = () => {
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
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-6">
          Dicas que ajudam sua loja a{' '}
          <span className="bg-gradient-to-r from-[#6c256f] to-[#009bac] bg-clip-text text-transparent">
            vender mais
          </span>
          {' '}(sem gastar mais)
        </h2>
        <p className="text-center text-gray-600 mb-16 text-lg">
          Conteúdos exclusivos para lojistas que querem crescer
        </p>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {articles.map((article, index) => {
            const Icon = article.icon;
            return (
              <div
                key={index}
                className="group bg-gradient-to-br from-gray-50 to-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-200"
              >
                <div
                  className="h-48 flex items-center justify-center relative overflow-hidden"
                  style={{ backgroundColor: `${article.color}15` }}
                >
                  <Icon
                    size={80}
                    style={{ color: article.color }}
                    className="transform group-hover:scale-110 transition-transform duration-300"
                    strokeWidth={1.5}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-[#6c256f] transition-colors duration-300">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {article.excerpt}
                  </p>
                  <button className="text-[#009bac] font-semibold hover:underline inline-flex items-center gap-2">
                    Ler artigo
                    <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <a
            href="/blog"
            className="inline-block px-10 py-4 text-lg font-semibold text-[#6c256f] bg-white rounded-full shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-2 border-[#6c256f]"
          >
            Acessar o Blog da Onda Pro
          </a>
        </div>
      </div>
    </section>
  );
};

export default Blog;
