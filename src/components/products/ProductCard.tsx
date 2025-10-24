import { Check } from "lucide-react";

export interface ProductCardProps {
  imageSrc: string;
  title: string;
  tags: string[];
  bullets: string[];
}

export const ProductCard = ({ imageSrc, title, bullets }: ProductCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-[0_8px_30px_rgba(108,37,111,0.25)] hover:shadow-[0_12px_40px_rgba(108,37,111,0.35)] transition-all duration-300 overflow-hidden h-[420px] flex flex-col border border-white/20 border-t-4 border-t-[rgb(108,37,111)]">
      <div className="relative w-full aspect-[4/3] overflow-hidden group">
        <img
          src={imageSrc}
          alt={title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[rgba(108,37,111,0.15)] to-transparent pointer-events-none"></div>
      </div>
      
      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
      
      <div className="p-3 md:p-4 flex flex-col flex-1 bg-gradient-to-b from-white to-[rgba(108,37,111,0.02)]">
        <h3 className="text-xl md:text-2xl font-extrabold text-[rgb(108,37,111)] mb-2 leading-tight">
          {title}
        </h3>
        
        <ul className="space-y-1.5">
          {bullets.slice(0, 3).map((bullet, index) => (
            <li key={index} className="flex items-start gap-2 text-xs md:text-sm text-muted-foreground leading-tight group/bullet hover:text-foreground transition-colors">
              <span className="w-4 h-4 rounded-full bg-[rgba(108,37,111,0.1)] flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check className="w-3 h-3 text-[rgb(108,37,111)]" />
              </span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
