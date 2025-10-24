import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const formSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres").max(100),
  email: z.string().email("Email inválido").max(255),
  storeName: z.string().min(2, "Nome da loja deve ter pelo menos 2 caracteres").max(100),
  whatsapp: z.string().min(10, "WhatsApp inválido").max(20),
  city: z.string().min(2, "Cidade deve ter pelo menos 2 caracteres").max(100),
  state: z.string().min(2, "Estado deve ter pelo menos 2 caracteres").max(50),
  message: z.string().min(10, "Mensagem deve ter pelo menos 10 caracteres").max(1000),
  productLine: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

interface LeadFormProps {
  productLine?: string;
}

export const LeadForm = ({ productLine }: LeadFormProps = {}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      storeName: "",
      whatsapp: "",
      city: "",
      state: "",
      message: "",
      productLine: productLine || "",
    },
  });

  const onSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    
    // Em produção, envie formData para seu backend
    // Exemplo: await api.post('/leads', formData)
    if (formData) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
    
    // Sucesso
    toast({
      title: "Inscrição realizada!",
      description: "Entraremos em contato em breve.",
    });
    
    form.reset();
    setIsSubmitting(false);
  };

  return (
    <div className="w-full max-w-md mx-auto p-8 bg-white rounded-2xl shadow-[0_10px_50px_rgba(0,0,0,0.3)] border-0">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-[rgb(108,37,111)] mb-2">Fale Conosco</h2>
        <p className="text-[rgb(108,37,111)]/70">Preencha o formulário e entraremos em contato</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome completo</FormLabel>
                <FormControl>
                  <Input placeholder="Seu nome" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="seu@email.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="storeName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome da loja</FormLabel>
                <FormControl>
                  <Input placeholder="Nome da sua loja" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="whatsapp"
            render={({ field }) => (
              <FormItem>
                <FormLabel>WhatsApp</FormLabel>
                <FormControl>
                  <Input placeholder="(00) 00000-0000" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cidade</FormLabel>
                  <FormControl>
                    <Input placeholder="Sua cidade" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estado</FormLabel>
                  <FormControl>
                    <Input placeholder="UF" maxLength={2} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mensagem</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Como podemos ajudar?" 
                    className="min-h-[120px]"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Enviando..." : "Enviar"}
          </Button>
        </form>
      </Form>
    </div>
  );
};
