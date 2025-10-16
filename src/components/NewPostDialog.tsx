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
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg alien-glow font-space z-40"
          size="icon"
        >
          <Plus className="w-6 h-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-card border-primary/30">
        <DialogHeader>
          <DialogTitle className="font-space text-primary alien-text-glow">
            Denunciar Buraco 🕳️
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-space text-foreground">Seu nome</label>
            <Input
              placeholder="Ex: João Silva"
              value={autor}
              onChange={(e) => setAutor(e.target.value)}
              className="bg-background/50 border-primary/20"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-space text-foreground">Descrição</label>
            <Textarea
              placeholder="Descreva o buraco..."
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              className="bg-background/50 border-primary/20 min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-space text-foreground flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Localização
            </label>
            <Input
              placeholder="Ex: Rua das Flores, próximo ao mercado"
              value={localizacao}
              onChange={(e) => setLocalizacao(e.target.value)}
              className="bg-background/50 border-primary/20"
            />
          </div>

          <div className="flex gap-2 pt-2">
            <Button
              variant="secondary"
              className="flex-1 font-space"
              onClick={() => toast.info("Em breve: adicionar foto!")}
            >
              <Camera className="w-4 h-4 mr-2" />
              Foto
            </Button>
          </div>

          <Button 
            onClick={handleSubmit}
            className="w-full font-space"
          >
            Postar Denúncia
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
