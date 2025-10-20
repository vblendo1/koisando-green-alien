import { Building2, Globe2, TrendingUp } from "lucide-react";

export const About = () => {
  return (
    <section id="sobre" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Sobre a Onda Pro
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Na Onda Pro, acreditamos que <strong>inovação e propósito movem o mercado</strong>. 
              Somos uma importadora especializada em materiais escolares, produtos para escritório 
              e soluções de home office que transformam a rotina de quem vende, trabalha e cria.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Mesmo sendo uma empresa jovem, <strong>nascemos com experiência de sobra</strong>. 
              Atuamos lado a lado com parceiros estratégicos no Brasil e no exterior para oferecer 
              um portfólio que combina qualidade, design e alto potencial de venda.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Nossa curadoria é guiada por um princípio simples: <strong>todo produto precisa inspirar 
              confiança e desejo</strong>. Por isso, cada item é selecionado com atenção ao desempenho 
              nas prateleiras, à estética das embalagens e à experiência do consumidor final.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Do primeiro contato à entrega, nossa missão é facilitar a vida de quem revende. 
              Trabalhamos com <strong>agilidade, negociações justas e suporte próximo</strong>, 
              ajudando papelarias, lojas e distribuidores a crescerem com consistência, margem e estoque sempre em dia.
            </p>
            <p className="text-lg font-semibold text-foreground leading-relaxed">
              Mais do que uma fornecedora, somos uma parceira de negócios comprometida com o seu resultado. 
              <span className="text-primary"> Onda Pro é mais que produto. É valor, confiança e movimento.</span>
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
            <div className="aspect-square rounded-3xl bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 flex items-center justify-center overflow-hidden p-8">
              <div className="text-center space-y-6">
                <div>
                  <p className="text-5xl md:text-7xl font-bold text-primary mb-2">+</p>
                  <p className="text-2xl md:text-3xl font-bold">Experiência</p>
                  <p className="text-lg font-semibold text-muted-foreground mt-2">
                    que Faz a Diferença
                  </p>
                </div>
                <p className="text-base text-muted-foreground leading-relaxed max-w-sm mx-auto">
                  Parceiros estratégicos no Brasil e exterior garantindo qualidade e resultado
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
