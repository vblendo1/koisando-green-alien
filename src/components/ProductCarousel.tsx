import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import productSchool from "@/assets/product-school.jpg";
import productOffice from "@/assets/product-office.jpg";
import prisma12Cores from "@/assets/prisma-12-cores.png";
import prismaTonsCinza from "@/assets/prisma-tons-cinza.png";
import prismaTonsPele from "@/assets/prisma-tons-pele.png";
import prismaTonsMetalicos from "@/assets/prisma-tons-metalicos.png";
import Autoplay from "embla-carousel-autoplay";

const prismaProducts = [
  {
    name: "PRISMA 12 cores",
    description: "Marcadores acrílicos com 12 cores vibrantes. Traço médio 03-05mm.",
    image: prisma12Cores,
  },
  {
    name: "PRISMA 6 cores — Tons de cinza",
    description: "Marcadores acrílicos tons de cinza. Traço médio 03-05mm.",
    image: prismaTonsCinza,
  },
  {
    name: "PRISMA 6 cores — Tons de pele",
    description: "Marcadores acrílicos tons de pele. Traço médio 03-05mm.",
    image: prismaTonsPele,
  },
  {
    name: "PRISMA 6 cores — Tons metálicos",
    description: "Marcadores acrílicos tons metálicos. Traço médio 03-05mm.",
    image: prismaTonsMetalicos,
  },
];

const escolarProducts = [
  {
    name: "Cadernos Espiral — Coloridos",
    description: "Capa dura e design moderno.",
    image: productSchool,
  },
  {
    name: "Lápis de Cor — 12 cores",
    description: "Pigmentação intensa e duradoura.",
    image: productSchool,
  },
  {
    name: "Canetas Gel — Sortidas",
    description: "Escrita suave e cores vibrantes.",
    image: productSchool,
  },
  {
    name: "Cadernos Brochura — A4",
    description: "Praticidade para o dia a dia escolar.",
    image: productSchool,
  },
  {
    name: "Estojo Triplo",
    description: "Organização e estilo para estudantes.",
    image: productSchool,
  },
  {
    name: "Régua e Esquadro — Kit",
    description: "Precisão e qualidade em medidas.",
    image: productSchool,
  },
  {
    name: "Borrachas e Apontadores",
    description: "Acessórios essenciais escolares.",
    image: productSchool,
  },
  {
    name: "Pasta Sanfonada",
    description: "Organização prática e colorida.",
    image: productSchool,
  },
];

const officeProducts = [
  {
    name: "Cadernos Executivos",
    description: "Sofisticação e elegância profissional.",
    image: productOffice,
  },
  {
    name: "Planners 2025",
    description: "Organização anual com estilo.",
    image: productOffice,
  },
  {
    name: "Canetas Premium",
    description: "Design refinado para executivos.",
    image: productOffice,
  },
  {
    name: "Agendas Corporativas",
    description: "Planejamento semanal elegante.",
    image: productOffice,
  },
  {
    name: "Post-its e Marcadores",
    description: "Organização visual no escritório.",
    image: productOffice,
  },
  {
    name: "Pastas Arquivo",
    description: "Armazenamento profissional.",
    image: productOffice,
  },
  {
    name: "Clips e Grampos — Kit Office",
    description: "Acessórios essenciais de mesa.",
    image: productOffice,
  },
  {
    name: "Etiquetas Adesivas",
    description: "Identificação prática e eficiente.",
    image: productOffice,
  },
];

const CarouselSection = ({ 
  title, 
  products 
}: { 
  title: string; 
  products: typeof prismaProducts 
}) => (
  <div className="mb-16">
    <h3 className="text-2xl md:text-3xl font-bold mb-8 text-center">{title}</h3>
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 3500,
        }),
      ]}
      className="w-full max-w-6xl mx-auto"
    >
      <CarouselContent>
        {products.map((product, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-contain bg-white"
              />
              <div className="p-6">
                <h4 className="text-xl font-bold mb-3">{product.name}</h4>
                <p className="text-muted-foreground">{product.description}</p>
              </div>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden md:flex" />
      <CarouselNext className="hidden md:flex" />
    </Carousel>
  </div>
);

export const ProductCarousel = () => {
  return (
    <section id="produtos" className="py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Produtos que inspiram, encantam e vendem
          </h2>
          <p className="text-lg text-muted-foreground">
            Conheça as linhas que estão conquistando papelarias em todo o país.
          </p>
        </div>

        <CarouselSection title="PRISMA — Marcadores Acrílicos Multiuso" products={prismaProducts} />
        <CarouselSection title="Linha Escolar — Cor, qualidade e diversão" products={escolarProducts} />
        <CarouselSection title="Linha Office — Organização e produtividade" products={officeProducts} />
      </div>
    </section>
  );
};
