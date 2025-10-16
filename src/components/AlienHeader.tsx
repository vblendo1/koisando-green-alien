import alienMascot from "@/assets/alien-mascot.png";

export const AlienHeader = () => {
  return (
    <header className="text-center space-y-6 py-12">
      <div className="inline-block animate-float">
        <img 
          src={alienMascot} 
          alt="Alien Mascot Koisando" 
          className="w-32 h-32 mx-auto alien-glow rounded-full"
        />
      </div>
      
      <div className="space-y-4">
        <h1 className="text-5xl md:text-7xl font-bold font-space text-primary alien-text-glow">
          BURACÔMETRO
        </h1>
        <p className="text-2xl md:text-3xl font-space text-foreground/90">
          Koisando Memes
        </p>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          Tecnologia alienígena avançada para medir o nível de buraco com precisão intergaláctica! 🛸
        </p>
      </div>
    </header>
  );
};
