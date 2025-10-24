import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection from './ui/AnimatedSection';

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
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-white via-[#f6f6f6] to-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-br from-[#6c256f]/30 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-gradient-to-br from-[#009bac]/30 to-transparent rounded-full blur-3xl"></div>
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        <AnimatedSection>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-center mb-3 sm:mb-4 md:mb-6 leading-tight">
            Perguntas{' '}
            <span className="bg-gradient-to-r from-[#6c256f] via-[#8c4091] to-[#009bac] bg-clip-text text-transparent">
              Frequentes
            </span>
          </h2>
          <p className="text-center text-gray-700 mb-8 sm:mb-12 md:mb-16 lg:mb-20 text-base sm:text-lg md:text-xl font-medium px-2">
            Tudo que você precisa saber antes de começar
          </p>
        </AnimatedSection>

        <motion.div
          className="space-y-3 sm:space-y-4 md:space-y-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.08
              }
            }
          }}
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              className="group bg-white border-2 border-gray-200 rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-transparent"
            >
              <motion.button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-4 sm:px-6 md:px-8 lg:px-10 py-4 sm:py-5 md:py-6 lg:py-7 flex items-center justify-between text-left gap-3"
                whileHover={{ backgroundColor: 'rgba(108, 37, 111, 0.02)' }}
              >
                <span className="text-base sm:text-lg md:text-xl font-bold text-gray-900 pr-2 sm:pr-4 md:pr-6 group-hover:bg-gradient-to-r group-hover:from-[#6c256f] group-hover:to-[#009bac] group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 leading-snug">
                  {faq.question}
                </span>
                <motion.div
                  className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center"
                  style={{
                    background: openIndex === index
                      ? 'linear-gradient(135deg, #009bac 0%, #4dbdc6 100%)'
                      : 'linear-gradient(135deg, #6c256f 0%, #8c4091 100%)'
                  }}
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3, type: 'spring' }}
                  whileHover={{ scale: 1.1 }}
                >
                  {openIndex === index ? (
                    <Minus className="text-white" size={20} strokeWidth={2.5} />
                  ) : (
                    <Plus className="text-white" size={20} strokeWidth={2.5} />
                  )}
                </motion.div>
              </motion.button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 sm:px-6 md:px-8 lg:px-10 pb-4 sm:pb-5 md:pb-6 lg:pb-7 pt-1 sm:pt-2">
                      <motion.p
                        initial={{ y: -10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="text-gray-700 leading-relaxed text-sm sm:text-base md:text-lg border-l-4 border-[#009bac] pl-3 sm:pl-4 md:pl-6"
                      >
                        {faq.answer}
                      </motion.p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
