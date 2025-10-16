import { useState } from "react";
import { Header } from "@/components/Header";
import { BuracosFeed } from "@/components/BuracosFeed";
import { BuracosMap } from "@/components/BuracosMap";
import { NewPostDialog } from "@/components/NewPostDialog";
import { Buraco } from "@/types/buraco";

const Index = () => {
  const [view, setView] = useState<'feed' | 'map'>('feed');
  const [buracos, setBuracos] = useState<Buraco[]>([
    {
      id: "1",
      autor: "Maria Santos",
      descricao: "Buraco enorme na entrada da cidade! Cuidado ao passar!",
      localizacao: "Av. Principal, próximo ao posto",
      latitude: -3.2994,
      longitude: -60.6206,
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      likes: 12,
    },
    {
      id: "2",
      autor: "João Silva",
      descricao: "Buraco perigoso, já danificou vários pneus",
      localizacao: "Rua das Flores, em frente à escola",
      latitude: -3.3010,
      longitude: -60.6190,
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
      likes: 8,
    },
  ]);

  const handleNewPost = (post: { autor: string; descricao: string; localizacao: string }) => {
    const newBuraco: Buraco = {
      id: Date.now().toString(),
      ...post,
      timestamp: new Date(),
      likes: 0,
      // Coordenadas aleatórias próximas ao centro de Manacapuru
      latitude: -3.2994 + (Math.random() - 0.5) * 0.02,
      longitude: -60.6206 + (Math.random() - 0.5) * 0.02,
    };
    setBuracos([newBuraco, ...buracos]);
  };

  const handleLike = (id: string) => {
    setBuracos(buracos.map(b => 
      b.id === id ? { ...b, likes: b.likes + 1 } : b
    ));
  };

  return (
    <div className="min-h-screen font-space">
      <Header onViewChange={setView} currentView={view} />
      
      <main className="container mx-auto px-4 py-6 max-w-4xl">
        {view === 'feed' ? (
          <BuracosFeed buracos={buracos} onLike={handleLike} />
        ) : (
          <BuracosMap buracos={buracos} />
        )}
      </main>

      <NewPostDialog onSubmit={handleNewPost} />

      <footer className="text-center py-8 mt-12 border-t border-primary/20">
        <p className="text-muted-foreground text-sm">
          © 2025 BuraKM - Koisando Memes 🛸
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Ajudando Manacapuru-AM
        </p>
      </footer>
    </div>
  );
};

export default Index;
