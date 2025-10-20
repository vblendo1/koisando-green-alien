import { PostCard } from "./PostCard";
import { Buraco } from "@/types/buraco";

interface BuracosFeedProps {
  buracos: Buraco[];
  onLike: (id: string) => void;
  onComment: (id: string, comentario: string) => void;
  onShare: (id: string) => void;
}

export const BuracosFeed = ({ buracos, onLike, onComment, onShare }: BuracosFeedProps) => {
  return (
    <div className="space-y-3 sm:space-y-4 pb-20 sm:pb-4">
      <div className="bg-card p-3 sm:p-4 rounded-lg border border-border shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xl sm:text-2xl font-bold font-space text-primary">
              {buracos.length}
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground">Buracos denunciados</p>
          </div>
          <div className="text-3xl sm:text-4xl">🕳️</div>
        </div>
      </div>

      {buracos.length === 0 ? (
        <div className="text-center py-8 sm:py-12">
          <p className="text-muted-foreground text-sm sm:text-base">Nenhum buraco denunciado ainda.</p>
          <p className="text-xs sm:text-sm text-muted-foreground mt-2">Seja o primeiro a denunciar! 👽</p>
        </div>
      ) : (
        buracos.map((buraco) => (
          <PostCard 
            key={buraco.id} 
            buraco={buraco} 
            onLike={onLike}
            onComment={onComment}
            onShare={onShare}
          />
        ))
      )}
    </div>
  );
};
