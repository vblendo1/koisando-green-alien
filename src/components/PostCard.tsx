import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ThumbsUp, MapPin, Clock } from "lucide-react";
import { Buraco } from "@/types/buraco";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

interface PostCardProps {
  buraco: Buraco;
  onLike: (id: string) => void;
}

export const PostCard = ({ buraco, onLike }: PostCardProps) => {
  return (
    <Card className="p-4 bg-card/80 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all">
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-sm">👽</span>
              </div>
              <div>
                <p className="font-space font-semibold text-foreground">{buraco.autor}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  {formatDistanceToNow(buraco.timestamp, { addSuffix: true, locale: ptBR })}
                </div>
              </div>
            </div>
            
            <p className="text-foreground/90 mb-2">{buraco.descricao}</p>
            
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4 text-primary" />
              <span>{buraco.localizacao}</span>
            </div>
          </div>
        </div>

        {buraco.foto && (
          <img 
            src={buraco.foto} 
            alt="Foto do buraco" 
            className="w-full rounded-lg max-h-64 object-cover border border-primary/20"
          />
        )}

        <div className="flex items-center gap-4 pt-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onLike(buraco.id)}
            className="gap-2 text-muted-foreground hover:text-primary"
          >
            <ThumbsUp className="w-4 h-4" />
            <span className="font-space">{buraco.likes}</span>
          </Button>
        </div>
      </div>
    </Card>
  );
};
