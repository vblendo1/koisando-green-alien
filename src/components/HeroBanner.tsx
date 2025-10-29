import { Play, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface HeroBannerProps {
  name: string;
  description?: string;
  coverImage?: string;
  category?: string;
  onPlay: () => void;
  onInfo: () => void;
}

export const HeroBanner = ({
  name,
  description,
  coverImage,
  category,
  onPlay,
  onInfo,
}: HeroBannerProps) => {
  return (
    <section className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden -mt-4">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={coverImage || '/placeholder.svg'}
          alt={name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = '/placeholder.svg';
          }}
        />
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 h-full flex items-end pb-12 md:pb-20">
        <div className="max-w-2xl space-y-4 md:space-y-6 animate-fade-in">
          {category && (
            <Badge className="bg-primary/90 backdrop-blur-sm text-primary-foreground font-semibold">
              {category}
            </Badge>
          )}
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight drop-shadow-lg">
            {name}
          </h1>
          
          {description && (
            <p className="text-base md:text-lg text-foreground/90 line-clamp-3 leading-relaxed drop-shadow-md max-w-xl">
              {description}
            </p>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button
              size="lg"
              onClick={onPlay}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 h-12 text-base gap-2 shadow-lg hover:shadow-xl hover:scale-105 transition-all"
            >
              <Play className="w-5 h-5" fill="currentColor" />
              Assistir Agora
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              onClick={onInfo}
              className="bg-background/80 hover:bg-background/90 backdrop-blur-sm border-foreground/20 font-semibold px-8 h-12 text-base gap-2 hover:scale-105 transition-all"
            >
              <Info className="w-5 h-5" />
              Mais Informações
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
