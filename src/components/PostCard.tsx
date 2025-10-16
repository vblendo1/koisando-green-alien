import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThumbsUp, MapPin, Clock, MessageCircle, Share2, Send } from "lucide-react";
import { Buraco, Comment } from "@/types/buraco";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

interface PostCardProps {
  buraco: Buraco;
  onLike: (id: string) => void;
  onComment: (id: string, comentario: string) => void;
  onShare: (id: string) => void;
}

export const PostCard = ({ buraco, onLike, onComment, onShare }: PostCardProps) => {
  const [showComments, setShowComments] = useState(false);
  const [comentario, setComentario] = useState("");

  const handleSubmitComment = () => {
    if (comentario.trim()) {
      onComment(buraco.id, comentario);
      setComentario("");
    }
  };

  return (
    <Card className="bg-card border-border hover:shadow-md transition-all">
      <div className="p-3 sm:p-4 space-y-3">
        {/* Header */}
        <div className="flex items-start gap-2 sm:gap-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <span className="text-lg sm:text-xl">👽</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="font-space font-semibold text-foreground text-sm sm:text-base">{buraco.autor}</p>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" />
                {formatDistanceToNow(buraco.timestamp, { addSuffix: true, locale: ptBR })}
              </div>
            </div>
            
            <p className="text-foreground mt-1 text-sm sm:text-base break-words">{buraco.descricao}</p>
            
            <div className="flex items-center gap-1 text-xs sm:text-sm text-muted-foreground mt-1">
              <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
              <span className="truncate">{buraco.localizacao}</span>
            </div>
          </div>
        </div>

        {/* Image */}
        {buraco.foto && (
          <img 
            src={buraco.foto} 
            alt="Foto do buraco" 
            className="w-full rounded-lg max-h-60 sm:max-h-80 object-cover border border-border"
          />
        )}

        {/* Actions */}
        <div className="flex items-center gap-1 sm:gap-2 pt-1 border-t border-border">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onLike(buraco.id)}
            className="gap-1 sm:gap-2 text-muted-foreground hover:text-primary flex-1 sm:flex-none text-xs sm:text-sm h-8 sm:h-9"
          >
            <ThumbsUp className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="font-space">{buraco.likes}</span>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowComments(!showComments)}
            className="gap-1 sm:gap-2 text-muted-foreground hover:text-primary flex-1 sm:flex-none text-xs sm:text-sm h-8 sm:h-9"
          >
            <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="font-space">{buraco.comentarios.length}</span>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onShare(buraco.id)}
            className="gap-1 sm:gap-2 text-muted-foreground hover:text-primary flex-1 sm:flex-none text-xs sm:text-sm h-8 sm:h-9"
          >
            <Share2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="font-space">{buraco.compartilhamentos}</span>
          </Button>
        </div>

        {/* Comments Section */}
        {showComments && (
          <div className="space-y-2 sm:space-y-3 pt-2 border-t border-border">
            {/* Comment Input */}
            <div className="flex gap-2">
              <Input
                placeholder="Adicione um comentário..."
                value={comentario}
                onChange={(e) => setComentario(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSubmitComment()}
                className="flex-1 text-sm h-9"
              />
              <Button
                size="sm"
                onClick={handleSubmitComment}
                disabled={!comentario.trim()}
                className="h-9 px-3"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>

            {/* Comments List */}
            {buraco.comentarios.map((comment) => (
              <div key={comment.id} className="flex gap-2 pl-2 sm:pl-4">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs sm:text-sm">👽</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="bg-muted rounded-lg p-2 sm:p-3">
                    <p className="font-semibold text-xs sm:text-sm">{comment.autor}</p>
                    <p className="text-xs sm:text-sm text-foreground/90 break-words">{comment.texto}</p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 ml-2">
                    {formatDistanceToNow(comment.timestamp, { addSuffix: true, locale: ptBR })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};
