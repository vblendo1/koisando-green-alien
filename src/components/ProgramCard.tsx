import { Play, Lock, TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface ProgramCardProps {
  id: string;
  name: string;
  description?: string;
  coverImage?: string;
  thumbnail?: string;
  slug: string;
  isLocked?: boolean;
  isNew?: boolean;
  progress?: number;
  category?: string;
  onClick: () => void;
}

export const ProgramCard = ({
  name,
  description,
  coverImage,
  thumbnail,
  isLocked = false,
  isNew = false,
  progress,
  category,
  onClick,
}: ProgramCardProps) => {
  const imageUrl = thumbnail || coverImage || '/placeholder.svg';

  return (
    <Card
      onClick={onClick}
      className="overflow-hidden group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20 border-border/50 bg-card/80 backdrop-blur-sm"
    >
      {/* Thumbnail 16:9 */}
      <div className="aspect-video relative bg-gradient-to-br from-primary/10 to-primary/5 overflow-hidden">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            e.currentTarget.src = '/placeholder.svg';
          }}
        />
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
        
        {/* Play Icon */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          {isLocked ? (
            <div className="w-16 h-16 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center border-2 border-muted">
              <Lock className="w-8 h-8 text-muted-foreground" />
            </div>
          ) : (
            <div className="w-16 h-16 rounded-full bg-primary/90 backdrop-blur-sm flex items-center justify-center transform scale-90 group-hover:scale-100 transition-transform">
              <Play className="w-8 h-8 text-primary-foreground ml-1" fill="currentColor" />
            </div>
          )}
        </div>

        {/* Badges */}
        <div className="absolute top-2 left-2 flex gap-2">
          {isNew && (
            <Badge className="bg-primary text-primary-foreground font-bold text-xs">
              NOVO
            </Badge>
          )}
          {category && (
            <Badge variant="secondary" className="text-xs backdrop-blur-sm bg-background/60">
              {category}
            </Badge>
          )}
        </div>

        {/* Progress Bar */}
        {progress !== undefined && progress > 0 && (
          <div className="absolute bottom-0 left-0 right-0 px-2 pb-2">
            <Progress value={progress} className="h-1 bg-muted/50" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
            {name}
          </h3>
          {progress !== undefined && progress > 0 && (
            <div className="flex items-center gap-1 text-xs text-primary shrink-0">
              <TrendingUp className="w-3 h-3" />
              <span className="font-medium">{Math.round(progress)}%</span>
            </div>
          )}
        </div>
        
        {description && (
          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {description}
          </p>
        )}

        {isLocked && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground pt-1">
            <Lock className="w-3 h-3" />
            <span>Programa bloqueado</span>
          </div>
        )}
      </div>
    </Card>
  );
};
