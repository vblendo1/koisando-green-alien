import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface ProductCatalogProps {
  onCTAClick: () => void;
}

const ProductCatalog = ({ onCTAClick }: ProductCatalogProps) => {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const products = [
    {
      title: 'Linha Escolar Premium',
      shortDesc: 'Cadernos, agendas e materiais com design exclusivo',
      fullDesc: 'Produtos desenvolvidos especialmente para o período escolar, com acabamento premium e designs que chamam atenção nas prateleiras. Margens de até 180%.',
      gradient: 'from-[#6c256f] to-[#8c4091]',
      icon: '📚'
    },
    {
      title: 'Organização & Escritório',
      shortDesc: 'Planejadores, organizadores e acessórios corporativos',
      fullDesc: 'Linha completa para organização pessoal e profissional. Produtos com alta rotatividade e ótima margem de lucro. Perfeitos para vendas corporativas.',
      gradient: 'from-[#009bac] to-[#4dbdc6]',
      icon: '💼'
    },
    {
      title: 'Presentes & Papelaria Criativa',
      shortDesc: 'Itens diferenciados para datas especiais',
      fullDesc: 'Produtos únicos que transformam sua vitrine. Ideal para datas comemorativas com margens excelentes e alto giro. Design que vende sozinho.',
      gradient: 'from-[#8c4091] to-[#009bac]',
      icon: '🎁'
    },
    {
      title: 'Decoração & Casa',
      shortDesc: 'Itens decorativos e funcionais para o lar',
      fullDesc: 'Linha de produtos para decoração de ambientes. Quadros, organizadores decorativos e itens que unem funcionalidade e estética. Margem superior a 150%.',
      gradient: 'from-[#4dbdc6] to-[#77c8d2]',
      icon: '🏠'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Conheça os produtos que transformam{' '}
            <span className="bg-gradient-to-r from-[#6c256f] to-[#009bac] bg-clip-text text-transparent">
              prateleiras em lucro
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Escolha entre linhas que unem qualidade, apelo visual e rentabilidade.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {products.map((product, index) => (
            <div
              key={index}
              className={`relative bg-gradient-to-br ${product.gradient} rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 ${
                expandedCard === index ? 'md:col-span-2 min-h-[400px]' : 'min-h-[280px]'
              }`}
              onClick={() => setExpandedCard(expandedCard === index ? null : index)}
            >
              <div className="absolute inset-0 bg-black/20"></div>

              <div className="relative z-10 p-8 h-full flex flex-col justify-between text-white">
                <div>
                  <div className="text-6xl mb-4">{product.icon}</div>
                  <h3 className="text-3xl font-bold mb-4">{product.title}</h3>
                  <p className="text-lg opacity-90 mb-4">{product.shortDesc}</p>

                  <div
                    className={`overflow-hidden transition-all duration-500 ${
                      expandedCard === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="text-lg leading-relaxed mt-4 border-t border-white/30 pt-4">
                      {product.fullDesc}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-6">
                  <span className="text-sm font-medium">
                    {expandedCard === index ? 'Clique para minimizar' : 'Clique para saber mais'}
                  </span>
                  <ChevronDown
                    className={`transform transition-transform duration-300 ${
                      expandedCard === index ? 'rotate-180' : ''
                    }`}
                    size={24}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={onCTAClick}
            className="inline-flex items-center gap-3 px-10 py-4 text-lg font-semibold text-white bg-gradient-to-r from-[#009bac] to-[#4dbdc6] rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            <span className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></span>
            Quero um atendimento exclusivo
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductCatalog;
