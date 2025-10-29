import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Plus, Edit2 } from 'lucide-react';

const productSchema = z.object({
  name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  description: z.string().optional(),
  slug: z.string().min(3, 'Slug deve ter pelo menos 3 caracteres'),
  cover_image: z.string().optional(),
  thumbnail: z.string().optional(),
  category: z.string().optional(),
  featured: z.boolean().optional(),
});

type ProductFormData = z.infer<typeof productSchema>;

interface ProductFormProps {
  product?: any;
  onSuccess?: () => void;
  mode?: 'create' | 'edit';
}

export const ProductForm = ({ product, onSuccess, mode = 'create' }: ProductFormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product?.name || '',
      description: product?.description || '',
      slug: product?.slug || '',
      cover_image: product?.cover_image || '',
      thumbnail: product?.thumbnail || '',
      category: product?.category || '',
      featured: product?.featured || false,
    },
  });

  const onSubmit = async (data: ProductFormData) => {
    setIsLoading(true);

    try {
      // Ensure required fields are present
      const productData = {
        name: data.name,
        slug: data.slug,
        description: data.description || null,
        cover_image: data.cover_image || null,
        thumbnail: data.thumbnail || null,
        category: data.category || null,
        featured: data.featured || false,
      };

      if (mode === 'create') {
        const { error } = await supabase
          .from('products')
          .insert([productData]);

        if (error) {
          toast.error('Erro ao criar produto');
          console.error(error);
          return;
        }

        toast.success('Produto criado com sucesso!');
      } else {
        const { error } = await supabase
          .from('products')
          .update(productData)
          .eq('id', product.id);

        if (error) {
          toast.error('Erro ao atualizar produto');
          console.error(error);
          return;
        }

        toast.success('Produto atualizado com sucesso!');
      }

      form.reset();
      setIsOpen(false);
      onSuccess?.();
    } catch (error) {
      console.error('Erro inesperado:', error);
      toast.error('Erro inesperado ao salvar produto');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant={mode === 'create' ? 'default' : 'ghost'}
          size={mode === 'create' ? 'default' : 'sm'}
          className="flex items-center gap-2"
        >
          {mode === 'create' ? (
            <>
              <Plus className="h-4 w-4" />
              Novo Produto
            </>
          ) : (
            <>
              <Edit2 className="h-4 w-4" />
              Editar
            </>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {mode === 'create' ? 'Novo Produto' : 'Editar Produto'}
          </DialogTitle>
          <DialogDescription>
            {mode === 'create'
              ? 'Adicione um novo programa à plataforma'
              : 'Atualize as informações do produto'}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Produto</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Programa de Emagrecimento 12 Semanas" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug (URL)</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: programa-emagrecimento-12" {...field} />
                  </FormControl>
                  <FormDescription>
                    Identificador único para a URL do produto
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Descreva o programa..."
                      {...field}
                      rows={4}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cover_image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL da Imagem de Capa</FormLabel>
                  <FormControl>
                    <Input placeholder="https://..." {...field} />
                  </FormControl>
                  <FormDescription>
                    Imagem principal (hero banner)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="thumbnail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL do Thumbnail</FormLabel>
                  <FormControl>
                    <Input placeholder="https://..." {...field} />
                  </FormControl>
                  <FormDescription>
                    Thumbnail para cards (opcional, usa cover_image se vazio)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoria</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Emagrecimento, Fitness..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? 'Salvando...' : mode === 'create' ? 'Criar Produto' : 'Atualizar Produto'}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
