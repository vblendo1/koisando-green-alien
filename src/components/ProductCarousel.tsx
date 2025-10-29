import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Lock, Play } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Product {
  id: string;
  name: string;
  description: string | null;
  cover_image: string | null;
  slug: string;
}

interface ProductCarouselProps {
  title: string;
  description?: string;
  products: Product[];
  onProductClick: (product: Product) => void;
  isLocked?: boolean;
}

export const ProductCarousel = ({
  title,
  description,
  products,
  onProductClick,
  isLocked = false,
}: ProductCarouselProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      const newScrollLeft =
        scrollContainerRef.current.scrollLeft +
        (direction === 'left' ? -scrollAmount : scrollAmount);

      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth',
      });

      setTimeout(checkScroll, 300);
    }
  };

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">{title}</h2>
        {description && <p className="text-muted-foreground mt-1">{description}</p>}
      </div>

      <div className="relative group">
        {/* Left Arrow */}
        {canScrollLeft && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/80 rounded-full h-12 w-12 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
        )}

        {/* Carousel Container */}
        <div
          ref={scrollContainerRef}
          onScroll={checkScroll}
          className="flex gap-4 overflow-x-auto scroll-smooth pb-4 scrollbar-hide"
          style={{ scrollBehavior: 'smooth' }}
        >
          {products.map((product) => (
            <button
              key={product.id}
              onClick={() => !isLocked && onProductClick(product)}
              disabled={isLocked}
              className={cn(
                'flex-shrink-0 w-80 group/card rounded-lg overflow-hidden transition-all duration-300',
                isLocked
                  ? 'opacity-60 cursor-not-allowed'
                  : 'hover:scale-105 hover:shadow-2xl hover:shadow-primary/20 cursor-pointer'
              )}
            >
              <div className="relative h-48 bg-gradient-to-br from-primary/20 to-primary/5 overflow-hidden">
                {product.cover_image ? (
                  <img
                    src={product.cover_image}
                    alt={product.name}
                    className={cn(
                      'w-full h-full object-cover transition-transform duration-300',
                      !isLocked && 'group-hover/card:scale-110'
                    )}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Play className="w-16 h-16 text-primary/50" />
                  </div>
                )}

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                {/* Lock Icon for Locked Products */}
                {isLocked && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <Lock className="w-12 h-12 text-white" />
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="bg-card border border-border/50 p-4 space-y-2">
                <h3 className={cn(
                  'font-bold text-lg line-clamp-2 transition-colors',
                  isLocked ? 'text-muted-foreground' : 'text-foreground group-hover/card:text-primary'
                )}>
                  {product.name}
                </h3>
                {product.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {product.description}
                  </p>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Right Arrow */}
        {canScrollRight && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/80 rounded-full h-12 w-12 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        )}
      </div>
    </section>
  );
};
