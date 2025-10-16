import { AlienHeader } from "@/components/AlienHeader";
import { BuracometroMeter } from "@/components/BuracometroMeter";

const Index = () => {
  return (
    <div className="min-h-screen font-space">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <AlienHeader />
        
        <main className="mt-12">
          <BuracometroMeter />
        </main>

        <footer className="text-center mt-16 pb-8">
          <p className="text-muted-foreground text-sm">
            © 2025 Koisando Memes - Tecnologia Alienígena 🛸
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
