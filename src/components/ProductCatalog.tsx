import { motion } from 'framer-motion';
import AnimatedSection from './ui/AnimatedSection';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface ProductCatalogProps {
  onCTAClick: () => void;
}

const ProductCatalog = ({ onCTAClick }: ProductCatalogProps) => {
  const products = [
    {
      name: 'Linha Cute',
      designation: 'Fofura que Vende Sozinha',
      description: 'Produtos encantadores, com apelo visual irresistível e giro altíssimo. Linha feita para papelarias e lojas que querem vender sem esforço.',
      src: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800&auto=format&fit=crop'
    },
    {
      name: 'Linha Prisma',
      designation: 'Marcadores que Pintam em Qualquer Superfície',
      description: 'Linha premium de marcadores vibrantes que pintam em papel, vidro, metal, madeira e plástico. Design desejado e desempenho profissional.',
      src: '/prisma-produto-new.gif'
    },
    {
      name: 'Materiais Office',
      designation: 'Organização que Vende Resultado',
      description: 'Planejadores e acessórios corporativos com design profissional e alta margem de lucro. Estética e funcionalidade garantidas.',
      src: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&auto=format&fit=crop'
    },
    {
      name: 'Materiais Escolares',
      designation: 'Praticidade que Gira o Ano Todo',
      description: 'Itens indispensáveis: úteis, bonitos e de alta saída. Forte apelo na volta às aulas e vendas constantes o ano inteiro.',
      src: 'https://images.unsplash.com/photo-1590935216541-8c769c0a8d69?w=800&auto=format&fit=crop'
    }
  ];

  return (
    <section id="produtos" className="py-12 md:py-16 bg-[#6c256f] relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <AnimatedSection>
          <div className="text-center mb-10 md:mb-16 px-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 md:mb-6 leading-tight text-white">
              Conheça os produtos que transformam{' '}
              <span className="text-[#4dbdc6]">
                prateleiras em lucro
              </span>
            </h2>
            <p className="text-base md:text-xl lg:text-2xl text-white/95 max-w-3xl mx-auto font-medium">
              Escolha entre linhas que unem qualidade, apelo visual e rentabilidade.
            </p>
          </div>
        </AnimatedSection>

        <div className="max-w-5xl mx-auto mb-16 md:mb-20">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {products.map((product, index) => (
                <CarouselItem key={index}>
                  <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
                    <div className="grid md:grid-cols-2 gap-0">
                      <div className="relative h-64 md:h-96">
                        <img
                          src={product.src}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-6 md:p-8 flex flex-col justify-center">
                        <h3 className="text-2xl md:text-3xl font-extrabold text-[#6c256f] mb-2">
                          {product.name}
                        </h3>
                        <p className="text-lg md:text-xl text-[#4dbdc6] font-semibold mb-4">
                          {product.designation}
                        </p>
                        <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                          {product.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden lg:block">
              <CarouselPrevious className="left-0 -translate-x-1/2 bg-white text-[#6c256f] hover:bg-white/90" />
              <CarouselNext className="right-0 translate-x-1/2 bg-white text-[#6c256f] hover:bg-white/90" />
            </div>
          </Carousel>
        </div>

        <AnimatedSection delay={0.4}>
          <div className="text-center px-4">
            <motion.button
              onClick={onCTAClick}
              className="inline-flex items-center justify-center gap-2 px-8 md:px-12 py-4 md:py-5 text-base md:text-lg font-bold text-[#6c256f] bg-white rounded-full shadow-2xl hover:shadow-[0_20px_60px_-15px_rgba(255,255,255,0.5)] transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Quero revender Onda Pro</span>
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                →
              </motion.span>
            </motion.button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default ProductCatalog;
