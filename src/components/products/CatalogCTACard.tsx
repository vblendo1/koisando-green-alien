import { Lock, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface CatalogCTACardProps {
  lineName: string;
  benefits: string[];
  onClick: () => void;
}

export const CatalogCTACard = ({ lineName, benefits, onClick }: CatalogCTACardProps) => {
  return (
    <div className="bg-gradient-to-br from-[rgb(108,37,111)] via-[rgb(118,47,121)] to-[rgb(108,37,111)] rounded-lg shadow-[0_8px_30px_rgba(108,37,111,0.4)] hover:shadow-[0_12px_50px_rgba(108,37,111,0.5)] transition-all duration-300 h-[420px] flex flex-col p-4 md:p-6 justify-between border border-white/20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none"></div>
      
      <div className="relative z-10">
        <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4 animate-pulse">
          <Lock className="w-7 h-7 text-white" />
        </div>
        
        <h3 className="text-xl md:text-2xl font-extrabold text-white mb-2 leading-tight">
          Catálogo Completo
        </h3>
        
        <p className="text-xs md:text-sm text-white/90 mb-4 leading-tight">
          Acesse toda linha <strong className="text-white">{lineName}</strong> com preços e condições especiais
        </p>
        
        <ul className="space-y-1.5 mb-4">
          {benefits.map((benefit, index) => (
            <li key={index} className="flex items-start gap-2 text-xs md:text-sm text-white/90 leading-tight group/benefit hover:text-white transition-colors">
              <span className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check className="w-3 h-3 text-white" />
              </span>
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <Button 
        onClick={onClick}
        className="w-full bg-white text-[rgb(108,37,111)] hover:bg-white/90 font-bold shadow-lg relative z-10 transition-all duration-300"
      >
        Solicitar Catálogo
      </Button>
    </div>
  );
};
