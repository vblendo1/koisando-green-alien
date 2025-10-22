import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'Qual o valor mínimo de pedido?',
      answer: 'Não trabalhamos com valor mínimo. Você pode começar com a quantidade que fizer sentido para o seu negócio. Oferecemos frete grátis para todo o Brasil independente do valor do pedido.'
    },
    {
      question: 'Como funciona o prazo de pagamento de 60 dias?',
      answer: 'Você recebe os produtos, vende para seus clientes e tem até 60 dias para pagar via boleto bancário. Isso protege seu caixa e permite que você lucre antes de investir.'
    },
    {
      question: 'Preciso ter CNPJ para comprar?',
      answer: 'Sim, nosso atendimento é exclusivo para CNPJ varejista. Trabalhamos diretamente com lojistas, papelarias e comércios que querem revender nossos produtos.'
    },
    {
      question: 'Quanto tempo leva para receber os produtos?',
      answer: 'O prazo de entrega varia conforme sua região, mas geralmente é de 5 a 15 dias úteis. O frete é totalmente gratuito para todo o Brasil.'
    },
    {
      question: 'Qual a margem de lucro real dos produtos?',
      answer: 'Nossos produtos oferecem margens entre 110% e 200%, dependendo da linha escolhida. São produtos com design que vendem sozinhos e alto giro, garantindo rentabilidade real para sua loja.'
    },
    {
      question: 'Posso trocar produtos que não venderam?',
      answer: 'Trabalhamos com produtos de alto giro e testados no mercado. Nossa equipe comercial ajuda você a escolher os produtos ideais para o seu perfil de clientes, minimizando esse risco.'
    },
    {
      question: 'Como funciona o atendimento exclusivo?',
      answer: 'Cada lojista tem um representante comercial dedicado que conhece seu negócio, auxilia nas escolhas de produtos e oferece suporte contínuo para maximizar suas vendas.'
    },
    {
      question: 'Vocês oferecem material de divulgação?',
      answer: 'Sim! Fornecemos material de apoio para vitrine, redes sociais e divulgação dos produtos. Queremos que sua loja venda mais.'
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-6">
          Perguntas{' '}
          <span className="bg-gradient-to-r from-[#6c256f] to-[#009bac] bg-clip-text text-transparent">
            Frequentes
          </span>
        </h2>
        <p className="text-center text-gray-600 mb-16 text-lg">
          Tudo que você precisa saber antes de começar
        </p>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-8 py-6 flex items-center justify-between text-left transition-colors duration-300"
              >
                <span className="text-lg font-semibold text-gray-800 pr-4">
                  {faq.question}
                </span>
                <div className="flex-shrink-0">
                  {openIndex === index ? (
                    <Minus className="text-[#009bac]" size={24} />
                  ) : (
                    <Plus className="text-[#6c256f]" size={24} />
                  )}
                </div>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-8 pb-6 text-gray-600 leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
