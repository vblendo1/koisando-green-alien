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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

const metricsSchema = z.object({
  weight_kg: z.coerce.number().positive('Peso deve ser um número positivo').optional().or(z.literal('')),
  chest_cm: z.coerce.number().positive('Peito deve ser um número positivo').optional().or(z.literal('')),
  waist_cm: z.coerce.number().positive('Cintura deve ser um número positivo').optional().or(z.literal('')),
  hip_cm: z.coerce.number().positive('Quadril deve ser um número positivo').optional().or(z.literal('')),
  arm_cm: z.coerce.number().positive('Braço deve ser um número positivo').optional().or(z.literal('')),
  thigh_cm: z.coerce.number().positive('Coxa deve ser um número positivo').optional().or(z.literal('')),
  notes: z.string().optional(),
});

type MetricsFormData = z.infer<typeof metricsSchema>;

interface MetricsFormProps {
  onSuccess?: () => void;
}

export const MetricsForm = ({ onSuccess }: MetricsFormProps) => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<MetricsFormData>({
    resolver: zodResolver(metricsSchema),
    defaultValues: {
      weight_kg: undefined,
      chest_cm: undefined,
      waist_cm: undefined,
      hip_cm: undefined,
      arm_cm: undefined,
      thigh_cm: undefined,
      notes: '',
    },
  });

  const onSubmit = async (data: MetricsFormData) => {
    if (!user) {
      toast.error('Usuário não autenticado');
      return;
    }

    setIsLoading(true);

    try {
      // Convert empty strings to null
      const metricsData = {
        user_id: user.id,
        weight_kg: data.weight_kg || null,
        chest_cm: data.chest_cm || null,
        waist_cm: data.waist_cm || null,
        hip_cm: data.hip_cm || null,
        arm_cm: data.arm_cm || null,
        thigh_cm: data.thigh_cm || null,
        notes: data.notes || null,
        recorded_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from('user_metrics')
        .insert([metricsData]);

      if (error) {
        console.error('Erro ao salvar métricas:', error);
        toast.error('Erro ao salvar métricas. Tente novamente.');
        return;
      }

      toast.success('Métricas registradas com sucesso!');
      form.reset();
      onSuccess?.();
    } catch (error) {
      console.error('Erro inesperado:', error);
      toast.error('Erro inesperado ao salvar métricas.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Registrar Métricas</CardTitle>
        <CardDescription>
          Registre seu peso e medidas corporais para acompanhar seu progresso
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Peso */}
            <FormField
              control={form.control}
              name="weight_kg"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Peso (kg)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.1"
                      placeholder="Ex: 75.5"
                      {...field}
                      value={field.value || ''}
                    />
                  </FormControl>
                  <FormDescription>Seu peso atual em quilogramas</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Medidas Corporais */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground">Medidas Corporais (cm)</h3>

              <FormField
                control={form.control}
                name="chest_cm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Peito</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.1"
                        placeholder="Ex: 90"
                        {...field}
                        value={field.value || ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="waist_cm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cintura</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.1"
                        placeholder="Ex: 75"
                        {...field}
                        value={field.value || ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="hip_cm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quadril</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.1"
                        placeholder="Ex: 95"
                        {...field}
                        value={field.value || ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="arm_cm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Braço</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.1"
                        placeholder="Ex: 28"
                        {...field}
                        value={field.value || ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="thigh_cm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Coxa</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.1"
                        placeholder="Ex: 55"
                        {...field}
                        value={field.value || ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Notas */}
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notas (opcional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Ex: Senti-me bem hoje, mantive a consistência com os treinos..."
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Adicione observações sobre como se sentiu ou qualquer detalhe importante
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? 'Salvando...' : 'Registrar Métricas'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
