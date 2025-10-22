import { Truck, Calendar, TrendingUp, Users, Sparkles } from 'lucide-react';

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

  return (
    <section className="py-20 bg-[#f6f6f6]">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-20">
          Nossos diferenciais fazem o{' '}
          <span className="bg-gradient-to-r from-[#6c256f] to-[#009bac] bg-clip-text text-transparent">
            lucro trabalhar pra você
          </span>
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {differentials.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="group bg-white rounded-2xl p-8 shadow-md hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100"
              >
                <div
                  className="w-16 h-16 rounded-xl mb-6 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300"
                  style={{ backgroundColor: `${item.color}15` }}
                >
                  <Icon size={32} style={{ color: item.color }} strokeWidth={2.5} />
                </div>
                <p className="text-lg font-semibold text-gray-800 leading-relaxed">
                  {item.text}
                </p>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <p className="text-xl text-gray-600 mb-8 italic">
            Sem atravessador, sem enrolação.<br />
            Só produto com giro rápido, boa apresentação e margem de verdade.
          </p>

          <button
            onClick={onCTAClick}
            className="inline-flex items-center gap-3 px-10 py-4 text-lg font-semibold text-white bg-gradient-to-r from-[#009bac] to-[#4dbdc6] rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            <span className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></span>
            Quero ver os produtos campeões de venda
          </button>
        </div>
      </div>
    </section>
  );
};

export default Differentials;
