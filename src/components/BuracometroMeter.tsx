import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const getBuracoLevel = (value: number) => {
  if (value < 20) return { level: "Alien Inteligente 🛸", desc: "Você está no nível máximo de QI alienígena!", color: "text-primary" };
  if (value < 40) return { level: "Sabichão Espacial 🌟", desc: "Sua inteligência brilha mais que uma estrela!", color: "text-primary" };
  if (value < 60) return { level: "Terráqueo Comum 🌍", desc: "Normal, nada demais por aqui.", color: "text-muted-foreground" };
  if (value < 80) return { level: "Buraco Médio 🕳️", desc: "Cuidado, está entrando na zona de perigo!", color: "text-orange-400" };
  return { level: "BURACO SUPREMO 💀", desc: "Nível crítico detectado! Precisa de ajuda alienígena urgente!", color: "text-destructive" };
};

export const BuracometroMeter = () => {
  const [value, setValue] = useState([50]);
  const result = getBuracoLevel(value[0]);

  return (
    <Card className="p-8 bg-card/80 backdrop-blur-sm border-primary/30 alien-glow">
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold font-space text-primary alien-text-glow mb-2">
            Medidor Alienígena
          </h2>
          <p className="text-muted-foreground">Arraste para descobrir seu nível</p>
        </div>

        <div className="space-y-6">
          <div className="relative">
            <Slider
              value={value}
              onValueChange={setValue}
              max={100}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>🧠 Einstein</span>
              <span>💀 Buraco</span>
            </div>
          </div>

          <div className="text-center space-y-4 py-6">
            <div className={`text-5xl font-bold font-space ${result.color} alien-text-glow transition-all duration-300`}>
              {value[0]}%
            </div>
            <div className="space-y-2">
              <div className={`text-2xl font-bold ${result.color} transition-all duration-300`}>
                {result.level}
              </div>
              <p className="text-muted-foreground max-w-md mx-auto">
                {result.desc}
              </p>
            </div>
          </div>

          <Button 
            onClick={() => setValue([Math.floor(Math.random() * 100)])}
            className="w-full font-space font-bold text-lg"
            size="lg"
          >
            🎲 Medição Aleatória
          </Button>
        </div>
      </div>
    </Card>
  );
};
