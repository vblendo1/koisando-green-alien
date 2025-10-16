import alienMascot from "@/assets/alien-mascot.png";
import { Button } from "@/components/ui/button";
import { MapPin, List } from "lucide-react";

interface HeaderProps {
  onViewChange: (view: 'feed' | 'map') => void;
  currentView: 'feed' | 'map';
}

export const Header = ({ onViewChange, currentView }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-primary/20 alien-glow">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img 
              src={alienMascot} 
              alt="BuraKM Alien" 
              className="w-12 h-12 animate-float alien-glow rounded-full"
            />
            <div>
              <h1 className="text-2xl md:text-3xl font-bold font-space text-primary alien-text-glow">
                BuraKM
              </h1>
              <p className="text-xs text-muted-foreground">Manacapuru-AM 🛸</p>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              variant={currentView === 'feed' ? 'default' : 'secondary'}
              size="sm"
              onClick={() => onViewChange('feed')}
              className="font-space"
            >
              <List className="w-4 h-4 mr-2" />
              Feed
            </Button>
            <Button
              variant={currentView === 'map' ? 'default' : 'secondary'}
              size="sm"
              onClick={() => onViewChange('map')}
              className="font-space"
            >
              <MapPin className="w-4 h-4 mr-2" />
              Mapa
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
