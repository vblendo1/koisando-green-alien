import { PostCard } from "./PostCard";
import { Buraco } from "@/types/buraco";

interface BuracosFeedProps {
  buracos: Buraco[];
  onLike: (id: string) => void;
}

export const BuracosFeed = ({ buracos, onLike }: BuracosFeedProps) => {
  return (
    <div className="space-y-4">
      <div className="bg-card/60 backdrop-blur-sm p-4 rounded-lg border border-primary/20">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold font-space text-primary alien-text-glow">
              {buracos.length}
            </p>
            <p className="text-sm text-muted-foreground">Buracos denunciados</p>
          </div>
          <div className="text-4xl">🕳️</div>
        </div>
      </div>

      {buracos.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Nenhum buraco denunciado ainda.</p>
          <p className="text-sm text-muted-foreground mt-2">Seja o primeiro a denunciar! 👽</p>
        </div>
      ) : (
        buracos.map((buraco) => (
          <PostCard key={buraco.id} buraco={buraco} onLike={onLike} />
        ))
      )}
    </div>
  );
};
