import { ProductCard, ProductCardProps } from "./ProductCard";
import { CatalogCTACard } from "./CatalogCTACard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { motion } from "framer-motion";

export interface ProductCarouselSectionProps {
  sectionTitle: string;
  sectionSubtitle: string;
  products: ProductCardProps[];
  ctaCardProps: {
    lineName: string;
    benefits: string[];
  };
  onCTAClick: (lineName: string) => void;
  backgroundColor?: "white" | "gray";
}

export const ProductCarouselSection = ({
  sectionTitle,
  sectionSubtitle,
  products,
  ctaCardProps,
  onCTAClick,
  backgroundColor = "white",
}: ProductCarouselSectionProps) => {
  const bgClass = backgroundColor === "white" ? "bg-white" : "bg-[rgb(108,37,111)]";
  const titleClass = backgroundColor === "white" ? "text-[rgb(108,37,111)]" : "text-white";
  const subtitleClass = backgroundColor === "white" ? "text-[rgb(108,37,111)]/70" : "text-white/80";
  
  return (
    <section className={`py-8 md:py-10 lg:py-12 ${bgClass}`}>
      <div className="w-full px-4 md:px-6 lg:px-8">
        <div className="text-center mb-6 md:mb-8 max-w-7xl mx-auto">
          <h2 className={`text-2xl md:text-3xl lg:text-4xl font-extrabold ${titleClass} mb-2 leading-tight`}>
            {sectionTitle}
          </h2>
          <p className={`text-sm md:text-base ${subtitleClass} max-w-2xl mx-auto leading-snug`}>
            {sectionSubtitle}
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <Carousel
            opts={{
              align: "start",
              loop: false,
              slidesToScroll: 1,
            }}
            className="w-full"
          >
          <CarouselContent className="-ml-2 md:-ml-3 py-4">
            {products.map((product, index) => (
              <CarouselItem
                key={index}
                className="pl-2 md:pl-3 basis-[95%] sm:basis-[48%] md:basis-[48%] lg:basis-[32%] xl:basis-[24%] 2xl:basis-[19%]"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <ProductCard {...product} />
                </motion.div>
              </CarouselItem>
            ))}
            
            <CarouselItem className="pl-2 md:pl-3 basis-[95%] sm:basis-[48%] md:basis-[48%] lg:basis-[32%] xl:basis-[24%] 2xl:basis-[19%]">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: products.length * 0.1 }}
              >
                <CatalogCTACard
                  {...ctaCardProps}
                  onClick={() => onCTAClick(ctaCardProps.lineName)}
                />
              </motion.div>
            </CarouselItem>
          </CarouselContent>

          <div className="hidden lg:block">
            <CarouselPrevious className={`left-0 -translate-x-1/2 ${backgroundColor === "white" ? "bg-[rgb(108,37,111)] text-white hover:bg-[rgb(90,22,93)]" : "bg-white text-[rgb(108,37,111)] hover:bg-white/90"}`} />
            <CarouselNext className={`right-0 translate-x-1/2 ${backgroundColor === "white" ? "bg-[rgb(108,37,111)] text-white hover:bg-[rgb(90,22,93)]" : "bg-white text-[rgb(108,37,111)] hover:bg-white/90"}`} />
          </div>
        </Carousel>
        </div>
      </div>
    </section>
  );
};
