import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProgramCard } from './ProgramCard';
import { SkeletonProgramCard } from './SkeletonProgramCard';
import { useRef, useState, useEffect } from 'react';

interface Product {
  id: string;
  name: string;
  description?: string;
  cover_image?: string;
  thumbnail?: string;
  slug: string;
  category?: string;
  featured?: boolean;
  created_at?: string;
}

interface ProgramRowProps {
  title: string;
  description?: string;
  products: Product[];
  isLocked?: boolean;
  isLoading?: boolean;
  onProductClick: (product: Product) => void;
  showProgress?: boolean;
  userProgress?: Record<string, number>;
}

export const ProgramRow = ({
  title,
  description,
  products,
  isLocked = false,
  isLoading = false,
  onProductClick,
  userProgress = {},
}: ProgramRowProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    const container = scrollContainerRef.current;
    if (container) {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(
        container.scrollLeft < container.scrollWidth - container.clientWidth - 10
      );
    }
  };

  useEffect(() => {
    checkScroll();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScroll);
      window.addEventListener('resize', checkScroll);
      return () => {
        container.removeEventListener('scroll', checkScroll);
        window.removeEventListener('resize', checkScroll);
      };
    }
  }, [products]);

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = container.clientWidth * 0.8;
      const targetScroll =
        direction === 'left'
          ? container.scrollLeft - scrollAmount
          : container.scrollLeft + scrollAmount;

      container.scrollTo({
        left: targetScroll,
        behavior: 'smooth',
      });
    }
  };

  const isNewProgram = (createdAt?: string) => {
    if (!createdAt) return false;
    const created = new Date(createdAt);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24));
    return diffDays <= 7; // Consider "new" if created within 7 days
  };

  if (isLoading) {
    return (
      <section className="space-y-4 animate-fade-in">
        <div className="space-y-1">
          <h2 className="text-xl md:text-2xl font-bold text-foreground">{title}</h2>
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {[...Array(5)].map((_, i) => (
            <SkeletonProgramCard key={i} />
          ))}
        </div>
      </section>
    );
  }

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section className="space-y-4 group/section animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-xl md:text-2xl font-bold text-foreground flex items-center gap-2">
            {title}
            <span className="text-sm font-normal text-muted-foreground">
              ({products.length})
            </span>
          </h2>
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
      </div>

      {/* Carousel Container */}
      <div className="relative">
        {/* Left Arrow */}
        {canScrollLeft && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-full w-12 rounded-none bg-gradient-to-r from-background to-transparent opacity-0 group-hover/section:opacity-100 transition-opacity hover:from-background/95"
          >
            <ChevronLeft className="h-8 w-8" />
          </Button>
        )}

        {/* Scrollable Content */}
        <div
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory pb-2"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="flex-none w-[calc(50%-0.5rem)] sm:w-[calc(33.333%-0.667rem)] lg:w-[calc(25%-0.75rem)] xl:w-[calc(20%-0.8rem)] snap-start"
            >
              <ProgramCard
                id={product.id}
                name={product.name}
                description={product.description}
                coverImage={product.cover_image}
                thumbnail={product.thumbnail}
                slug={product.slug}
                isLocked={isLocked}
                isNew={isNewProgram(product.created_at)}
                progress={userProgress[product.id]}
                category={product.category}
                onClick={() => onProductClick(product)}
              />
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        {canScrollRight && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-full w-12 rounded-none bg-gradient-to-l from-background to-transparent opacity-0 group-hover/section:opacity-100 transition-opacity hover:from-background/95"
          >
            <ChevronRight className="h-8 w-8" />
          </Button>
        )}
      </div>
    </section>
  );
};
