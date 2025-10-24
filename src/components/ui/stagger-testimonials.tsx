import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const SQRT_5000 = Math.sqrt(5000);

const testimonials = [
  {
    tempId: 0,
    testimonial: "Fiz o primeiro pedido meio desconfiada, mas a qualidade dos produtos e o prazo de entrega me surpreenderam. Os marcadores PRISMA saem que nem água. Já fiz reposição duas vezes em menos de um mês.",
    by: "Papelaria Helena — São Paulo/SP",
    stars: 5
  },
  {
    tempId: 1,
    testimonial: "A Onda Pro realmente entende o lojista. Margens boas, frete rápido e atendimento que resolve. Finalmente uma importadora que não some depois da venda.",
    by: "Livraria e Papelaria Brasil — Goiânia/GO",
    stars: 5
  },
  {
    tempId: 2,
    testimonial: "Os produtos têm ótima apresentação e chegam bem embalados. Só demorou um dia a mais no transporte, mas o suporte avisou antes. Atendimento nota 10.",
    by: "Casa do Papel — Belo Horizonte/MG",
    stars: 4
  },
  {
    tempId: 3,
    testimonial: "A linha PRISMA virou sucesso na vitrine. O design chama atenção e o markup é excelente. A equipe comercial da Onda é super ágil.",
    by: "Kalunga (revenda local)",
    stars: 5
  },
  {
    tempId: 4,
    testimonial: "Os kits metálicos e pastéis são lindos. Vendo muito bem na parte de presentes. A marca passa uma imagem premium mesmo sendo acessível.",
    by: "Papel Craft — Rio de Janeiro/RJ",
    stars: 4
  },
  {
    tempId: 5,
    testimonial: "O diferencial está no mix de produtos. Itens que giram rápido e ainda ajudam a deixar a loja mais bonita. O catálogo digital é muito prático.",
    by: "Papelex — Campinas/SP",
    stars: 5
  },
  {
    tempId: 6,
    testimonial: "Trabalho com eles há 6 meses e nunca tive problema. A reposição é fácil e o suporte responde até fora do horário comercial. Dá gosto fazer pedido.",
    by: "Prolar — Duque de Caxias/RJ",
    stars: 5
  },
  {
    tempId: 7,
    testimonial: "Adorei a condição de 60 dias no boleto. Isso me ajudou muito no fluxo de caixa. Já indiquei pra outras duas lojas parceiras.",
    by: "Imperial Papelaria — Salto/SP",
    stars: 4
  },
  {
    tempId: 8,
    testimonial: "Produtos com ótimo custo-benefício e design que chama atenção. Meus clientes sempre perguntam pelos marcadores PRISMA.",
    by: "Rede Papelaria — Aparecida de Goiânia/GO",
    stars: 5
  },
  {
    tempId: 9,
    testimonial: "Nunca vi uma marca nacional investir tanto em estética e embalagem. Parece importado, mas o preço permite trabalhar com margem alta. Perfeito.",
    by: "Papelaria Judá — Campinas/SP",
    stars: 5
  }
];

interface TestimonialCardProps {
  position: number;
  testimonial: typeof testimonials[0];
  handleMove: (steps: number) => void;
  cardSize: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  position,
  testimonial,
  handleMove,
  cardSize
}) => {
  const isCenter = position === 0;

  return (
    <div
      onClick={() => handleMove(position)}
      className={cn(
        "absolute left-1/2 top-1/2 cursor-pointer border-2 p-6 sm:p-8 transition-all duration-500 ease-in-out",
        isCenter
          ? "z-10 bg-gradient-to-br from-[#6c256f] to-[#009bac] text-white border-[#6c256f]"
          : "z-0 bg-white text-gray-900 border-gray-200 hover:border-[#009bac]/50"
      )}
      style={{
        width: cardSize,
        height: cardSize,
        clipPath: `polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)`,
        transform: `
          translate(-50%, -50%)
          translateX(${(cardSize / 1.5) * position}px)
          translateY(${isCenter ? -65 : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
        `,
        boxShadow: isCenter ? "0px 8px 0px 4px rgba(108, 37, 111, 0.3)" : "0px 0px 0px 0px transparent"
      }}
    >
      <span
        className={cn(
          "absolute block origin-top-right rotate-45",
          isCenter ? "bg-[#6c256f]" : "bg-gray-200"
        )}
        style={{
          right: -2,
          top: 48,
          width: SQRT_5000,
          height: 2
        }}
      />
      <div className="mb-3 flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            className={cn(
              "text-base sm:text-lg",
              i < testimonial.stars
                ? isCenter ? "text-yellow-300" : "text-yellow-400"
                : isCenter ? "text-white/30" : "text-gray-300"
            )}
          >
            ★
          </span>
        ))}
      </div>
      <h3 className={cn(
        "text-sm sm:text-base md:text-lg font-semibold leading-snug mb-4",
        isCenter ? "text-white" : "text-gray-900"
      )}>
        "{testimonial.testimonial}"
      </h3>
      <p className={cn(
        "absolute bottom-6 sm:bottom-8 left-6 sm:left-8 right-6 sm:right-8 text-xs sm:text-sm font-bold",
        isCenter ? "text-white/95" : "text-gray-900"
      )}>
        {testimonial.by}
      </p>
    </div>
  );
};

export const StaggerTestimonials: React.FC = () => {
  const [cardSize, setCardSize] = useState(365);
  const [testimonialsList, setTestimonialsList] = useState(testimonials);

  const handleMove = (steps: number) => {
    const newList = [...testimonialsList];
    if (steps > 0) {
      for (let i = steps; i > 0; i--) {
        const item = newList.shift();
        if (!item) return;
        newList.push({ ...item, tempId: Math.random() });
      }
    } else {
      for (let i = steps; i < 0; i++) {
        const item = newList.pop();
        if (!item) return;
        newList.unshift({ ...item, tempId: Math.random() });
      }
    }
    setTestimonialsList(newList);
  };

  useEffect(() => {
    const updateSize = () => {
      const { matches } = window.matchMedia("(min-width: 640px)");
      setCardSize(matches ? 365 : 290);
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    const autoplayInterval = setInterval(() => {
      handleMove(1);
    }, 4000);

    return () => clearInterval(autoplayInterval);
  }, [testimonialsList]);

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ height: 600 }}
    >

      {testimonialsList.map((testimonial, index) => {
        const position = testimonialsList.length % 2
          ? index - (testimonialsList.length + 1) / 2
          : index - testimonialsList.length / 2;
        return (
          <TestimonialCard
            key={testimonial.tempId}
            testimonial={testimonial}
            handleMove={handleMove}
            position={position}
            cardSize={cardSize}
          />
        );
      })}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 z-20">
        <button
          onClick={() => handleMove(-1)}
          className={cn(
            "flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center text-2xl transition-all duration-300",
            "bg-white border-2 border-[#6c256f] text-[#6c256f] hover:bg-gradient-to-br hover:from-[#6c256f] hover:to-[#8c4091] hover:text-white shadow-lg",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#009bac] focus-visible:ring-offset-2"
          )}
          aria-label="Depoimento anterior"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={() => handleMove(1)}
          className={cn(
            "flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center text-2xl transition-all duration-300",
            "bg-white border-2 border-[#009bac] text-[#009bac] hover:bg-gradient-to-br hover:from-[#009bac] hover:to-[#4dbdc6] hover:text-white shadow-lg",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6c256f] focus-visible:ring-offset-2"
          )}
          aria-label="Próximo depoimento"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};
