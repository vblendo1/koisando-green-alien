import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface TestimonialsProps {
  onCTAClick: () => void;
}

const Testimonials = ({ onCTAClick }: TestimonialsProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      text: 'Antes eu comprava tudo no marketplace. Com a Onda Pro, o giro triplicou e pago só depois de vender.',
      author: 'Papelaria Criativa',
      location: 'MG',
      gradient: 'from-[#6c256f]/10 to-[#8c4091]/10'
    },
    {
      text: 'Comecei com 1 kit, hoje já trabalho com 4 linhas da marca.',
      author: 'Arte & Papel',
      location: 'SP',
      gradient: 'from-[#009bac]/10 to-[#4dbdc6]/10'
    },
    {
      text: 'Frete grátis e 60 dias no boleto me salvaram no início da temporada.',
      author: 'Papelaria Esquina',
      location: 'RS',
      gradient: 'from-[#8c4091]/10 to-[#009bac]/10'
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const interval = setInterval(nextTestimonial, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-gradient-to-br from-[#f6f6f6] to-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          Histórias reais de quem viu o{' '}
          <span className="bg-gradient-to-r from-[#6c256f] to-[#009bac] bg-clip-text text-transparent">
            estoque girar de verdade
          </span>
        </h2>

        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="min-w-full px-4">
                  <div className={`bg-gradient-to-br ${testimonial.gradient} rounded-3xl p-12 shadow-xl border border-gray-200`}>
                    <Quote className="text-[#009bac] mb-6" size={48} />
                    <p className="text-2xl md:text-3xl font-medium text-gray-800 mb-8 leading-relaxed">
                      "{testimonial.text}"
                    </p>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-lg font-semibold text-[#6c256f]">
                          {testimonial.author}
                        </p>
                        <p className="text-gray-600">{testimonial.location}</p>
                      </div>
                      <div className="flex gap-2">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className="text-yellow-400 text-2xl">★</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300"
            aria-label="Anterior"
          >
            <ChevronLeft className="text-[#6c256f]" size={24} />
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300"
            aria-label="Próximo"
          >
            <ChevronRight className="text-[#6c256f]" size={24} />
          </button>

          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-[#009bac] w-8' : 'bg-gray-300'
                }`}
                aria-label={`Ir para depoimento ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <button
            onClick={onCTAClick}
            className="px-10 py-4 text-lg font-semibold text-[#6c256f] bg-white rounded-full shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-2 border-[#6c256f]"
          >
            Quero ter o mesmo resultado
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
