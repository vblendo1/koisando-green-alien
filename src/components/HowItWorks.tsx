import { FileText, Package, ShoppingCart, Truck } from "lucide-react";

const steps = [
  {
    number: "1",
    icon: FileText,
    title: "Preencha o formulário",
    description: "Cadastre sua empresa em menos de 2 minutos",
  },
  {
    number: "2",
    icon: Package,
    title: "Receba o catálogo",
    description: "Condições exclusivas direto no seu e-mail",
  },
  {
    number: "3",
    icon: ShoppingCart,
    title: "Faça seu pedido",
    description: "Direto com a importadora, sem intermediários",
  },
  {
    number: "4",
    icon: Truck,
    title: "Receba com benefícios",
    description: "Frete grátis e 60 dias para pagar",
  },
];

export const HowItWorks = () => {
  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Da importadora direto pra sua loja — simples assim
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={index}
              className="text-center animate-fade-in"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="relative mb-6">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-secondary to-primary text-white text-2xl font-bold shadow-lg">
                  {step.number}
                </div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-secondary/10 rounded-full p-3">
                  <step.icon className="w-6 h-6 text-secondary" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
