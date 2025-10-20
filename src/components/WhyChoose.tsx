import { Truck, CreditCard, Heart } from "lucide-react";
import { Card } from "@/components/ui/card";

const features = [
  {
    icon: Truck,
    title: "Frete grátis em todo o Brasil",
    description: "Logística própria e entrega rápida, sem custo adicional.",
  },
  {
    icon: CreditCard,
    title: "Até 60 dias para pagar",
    description: "Fluxo de caixa leve, direto com a importadora.",
  },
  {
    icon: Heart,
    title: "Produtos que vendem sozinhos",
    description: "Design premium, margens de até 200% e giro constante.",
  },
];

export const WhyChoose = () => {
  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="p-8 text-center hover:shadow-xl transition-all duration-300 bg-card border-border animate-fade-in"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/10 text-secondary mb-6">
                <feature.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
