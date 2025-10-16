import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Camera, MapPin } from "lucide-react";
import { toast } from "sonner";

interface NewPostDialogProps {
  onSubmit: (post: { autor: string; descricao: string; localizacao: string }) => void;
}

export const NewPostDialog = ({ onSubmit }: NewPostDialogProps) => {
  const [open, setOpen] = useState(false);
  const [autor, setAutor] = useState("");
  const [descricao, setDescricao] = useState("");
  const [localizacao, setLocalizacao] = useState("");

  const handleSubmit = () => {
    if (!autor || !descricao || !localizacao) {
      toast.error("Preencha todos os campos!");
      return;
    }

    onSubmit({ autor, descricao, localizacao });
    setAutor("");
    setDescricao("");
    setLocalizacao("");
    setOpen(false);
    toast.success("Buraco denunciado! 🛸");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-lg font-space z-40"
          size="icon"
        >
          <Plus className="w-5 h-5 sm:w-6 sm:h-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-card border-border w-[95vw] max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="font-space text-primary text-base sm:text-lg">
            Denunciar Buraco 🕳️
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-3 sm:space-y-4 py-2 sm:py-4">
          <div className="space-y-2">
            <label className="text-xs sm:text-sm font-space text-foreground">Seu nome</label>
            <Input
              placeholder="Ex: João Silva"
              value={autor}
              onChange={(e) => setAutor(e.target.value)}
              className="text-sm h-9 sm:h-10"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs sm:text-sm font-space text-foreground">Descrição</label>
            <Textarea
              placeholder="Descreva o buraco..."
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              className="min-h-[80px] sm:min-h-[100px] text-sm"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs sm:text-sm font-space text-foreground flex items-center gap-2">
              <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
              Localização
            </label>
            <Input
              placeholder="Ex: Rua das Flores, próximo ao mercado"
              value={localizacao}
              onChange={(e) => setLocalizacao(e.target.value)}
              className="text-sm h-9 sm:h-10"
            />
          </div>

          <div className="flex gap-2 pt-2">
            <Button
              variant="secondary"
              className="flex-1 font-space text-xs sm:text-sm h-9"
              onClick={() => toast.info("Em breve: adicionar foto!")}
            >
              <Camera className="w-3.5 h-3.5 sm:w-4 sm:h-4 sm:mr-2" />
              <span className="hidden sm:inline">Foto</span>
            </Button>
          </div>

          <Button 
            onClick={handleSubmit}
            className="w-full font-space text-sm h-9 sm:h-10"
          >
            Postar Denúncia
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
