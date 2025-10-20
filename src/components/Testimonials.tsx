import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    id: 1,
    name: "Maria Silva",
    company: "Papelaria Estrela - São Paulo/SP",
    text: "A Onda Pro revolucionou minha papelaria. Com as margens que eles oferecem e a qualidade dos produtos, consegui aumentar meu faturamento em 40% no último ano.",
    rating: 5,
  },
  {
    id: 2,
    name: "João Santos",
    company: "Distribuidora Escolar - Rio de Janeiro/RJ",
    text: "Parceria séria, produtos de qualidade e prazos de pagamento que realmente ajudam. Estoque nacional faz toda diferença na entrega rápida.",
    rating: 5,
  },
  {
    id: 3,
    name: "Ana Costa",
    company: "Papelaria Criativa - Minas Gerais/MG",
    text: "Trabalho com a Onda Pro há 3 anos e sempre tive excelente atendimento. Os produtos PRISMA são sucesso de vendas na minha loja!",
    rating: 5,
  },
];

const clientLogos = [
  { name: "Cliente 1", initials: "PC" },
  { name: "Cliente 2", initials: "PE" },
  { name: "Cliente 3", initials: "DM" },
  { name: "Cliente 4", initials: "LC" },
];

export const Testimonials = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Quem confia na Onda Pro
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Centenas de papelarias e distribuidoras em todo Brasil já crescem com nossos produtos.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={testimonial.id}
              className="relative animate-fade-in hover:shadow-xl transition-shadow"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <Quote className="w-10 h-10 text-primary/20 mb-4" />
                
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                  ))}
                </div>

                <p className="text-muted-foreground mb-6 leading-relaxed">
                  "{testimonial.text}"
                </p>

                <div className="border-t pt-4">
                  <p className="font-bold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-6">Parceiros de confiança:</p>
          <div className="flex flex-wrap justify-center gap-6">
            {clientLogos.map((logo, index) => (
              <div
                key={index}
                className="w-20 h-20 rounded-full bg-muted flex items-center justify-center font-bold text-xl text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {logo.initials}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
