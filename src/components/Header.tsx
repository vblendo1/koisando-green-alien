import alienMascot from "@/assets/alien-mascot.png";
import { Button } from "@/components/ui/button";
import { MapPin, List } from "lucide-react";

interface HeaderProps {
  onViewChange: (view: 'feed' | 'map') => void;
  currentView: 'feed' | 'map';
}

export const Header = ({ onViewChange, currentView }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 bg-card/98 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container mx-auto px-3 sm:px-4 py-2 sm:py-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <img 
              src={alienMascot} 
              alt="BuraKM Alien" 
              className="w-10 h-10 sm:w-12 sm:h-12 animate-float rounded-full flex-shrink-0"
            />
            <div className="min-w-0">
              <h1 className="text-lg sm:text-2xl md:text-3xl font-bold font-space text-primary truncate">
                BuraKM
              </h1>
              <p className="text-xs text-muted-foreground hidden sm:block">Manacapuru-AM 🛸</p>
            </div>
          </div>

          <div className="flex gap-1 sm:gap-2 flex-shrink-0">
            <Button
              variant={currentView === 'feed' ? 'default' : 'secondary'}
              size="sm"
              onClick={() => onViewChange('feed')}
              className="font-space text-xs sm:text-sm h-8 sm:h-9 px-2 sm:px-3"
            >
              <List className="w-3.5 h-3.5 sm:w-4 sm:h-4 sm:mr-2" />
              <span className="hidden sm:inline">Feed</span>
            </Button>
            <Button
              variant={currentView === 'map' ? 'default' : 'secondary'}
              size="sm"
              onClick={() => onViewChange('map')}
              className="font-space text-xs sm:text-sm h-8 sm:h-9 px-2 sm:px-3"
            >
              <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 sm:mr-2" />
              <span className="hidden sm:inline">Mapa</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
