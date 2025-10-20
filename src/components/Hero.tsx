import { Button } from "@/components/ui/button";
import heroProducts from "@/assets/hero-products-v2.jpg";

export const Hero = () => {
  const scrollToForm = () => {
    const element = document.getElementById("formulario");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="pt-24 pb-12 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Produtos que encantam.{" "}
              <span className="text-secondary">Condições que fazem o lojista crescer.</span>
            </h1>
            <h2 className="text-xl md:text-2xl text-muted-foreground font-medium">
              A Onda Pro é a importadora de marca própria que abastece papelarias e comércios em todo o Brasil.
            </h2>
            <div className="space-y-4">
              <Button
                onClick={scrollToForm}
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 py-6 text-lg shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
              >
                Ver Catálogo Profissional
              </Button>
              <p className="text-sm text-muted-foreground">
                Fornecedor de confiança para quem vive de revenda.
              </p>
            </div>
          </div>
          
          <div className="relative animate-float">
            <img
              src={heroProducts}
              alt="Produtos Onda Pro"
              className="rounded-3xl shadow-2xl w-full"
            />
            <div className="absolute -bottom-6 -left-6 bg-accent text-accent-foreground rounded-2xl p-4 shadow-xl">
              <p className="text-2xl font-bold">110% a 200%</p>
              <p className="text-sm">de margem real</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
