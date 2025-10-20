import { Building2, Globe2, TrendingUp } from "lucide-react";

export const About = () => {
  return (
    <section id="sobre" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold">
              Sobre a Onda Pro
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Somos uma <strong>importadora nacional especializada</strong> em materiais escolares, 
              de escritório e produtos criativos com marca própria. Atendemos papelarias, escolas 
              e distribuidores em todo o Brasil com <strong>condições comerciais diferenciadas</strong>.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Nossa missão é <strong>fortalecer o varejo local</strong>, oferecendo produtos de qualidade, 
              estoque nacional e prazos que fazem a diferença no caixa do lojista.
            </p>
            
            <div className="grid sm:grid-cols-3 gap-6 pt-6">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-3">
                  <Building2 className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-lg mb-1">Estoque Nacional</h3>
                <p className="text-sm text-muted-foreground">Entrega rápida em todo Brasil</p>
              </div>
              
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/10 text-secondary mb-3">
                  <Globe2 className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-lg mb-1">Cobertura Nacional</h3>
                <p className="text-sm text-muted-foreground">Atendemos todo o território</p>
              </div>
              
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 text-accent-foreground mb-3">
                  <TrendingUp className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-lg mb-1">Margem Real</h3>
                <p className="text-sm text-muted-foreground">110% a 200% de lucro</p>
              </div>
            </div>
          </div>
          
          <div className="relative animate-float">
            <div className="aspect-square rounded-3xl bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 flex items-center justify-center overflow-hidden">
              <div className="text-center p-8">
                <p className="text-4xl md:text-6xl font-bold text-primary mb-4">10+</p>
                <p className="text-xl font-semibold">Anos no Mercado</p>
                <p className="text-muted-foreground mt-4">
                  Fornecendo qualidade e confiança para o varejo brasileiro
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
