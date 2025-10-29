import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface Metric {
  id: string;
  weight_kg: number | null;
  chest_cm: number | null;
  waist_cm: number | null;
  hip_cm: number | null;
  arm_cm: number | null;
  thigh_cm: number | null;
  notes: string | null;
  recorded_at: string;
}

interface MetricsHistoryProps {
  refreshTrigger?: number;
}

export const MetricsHistory = ({ refreshTrigger }: MetricsHistoryProps) => {
  const { user } = useAuth();
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMetrics = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('user_metrics')
        .select('*')
        .eq('user_id', user.id)
        .order('recorded_at', { ascending: false });

      if (error) {
        console.error('Erro ao buscar métricas:', error);
        toast.error('Erro ao carregar histórico de métricas');
        return;
      }

      setMetrics(data || []);
    } catch (error) {
      console.error('Erro inesperado:', error);
      toast.error('Erro ao carregar histórico de métricas');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
  }, [user, refreshTrigger]);

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('user_metrics')
        .delete()
        .eq('id', id);

      if (error) {
        toast.error('Erro ao deletar métrica');
        return;
      }

      toast.success('Métrica deletada com sucesso');
      fetchMetrics();
    } catch (error) {
      console.error('Erro ao deletar:', error);
      toast.error('Erro ao deletar métrica');
    }
  };

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Histórico de Métricas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-muted-foreground py-8">
            Carregando histórico...
          </div>
        </CardContent>
      </Card>
    );
  }

  if (metrics.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Histórico de Métricas</CardTitle>
          <CardDescription>
            Você ainda não registrou nenhuma métrica
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center text-muted-foreground py-8">
            Comece registrando suas métricas acima para acompanhar seu progresso
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Histórico de Métricas</CardTitle>
        <CardDescription>
          Seus registros de peso e medidas corporais
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Peso (kg)</TableHead>
                <TableHead>Cintura (cm)</TableHead>
                <TableHead>Quadril (cm)</TableHead>
                <TableHead>Peito (cm)</TableHead>
                <TableHead>Braço (cm)</TableHead>
                <TableHead>Coxa (cm)</TableHead>
                <TableHead>Notas</TableHead>
                <TableHead className="text-right">Ação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {metrics.map((metric) => (
                <TableRow key={metric.id}>
                  <TableCell className="font-medium">
                    {format(new Date(metric.recorded_at), 'dd/MM/yyyy', {
                      locale: ptBR,
                    })}
                  </TableCell>
                  <TableCell>
                    {metric.weight_kg ? `${metric.weight_kg.toFixed(1)}` : '-'}
                  </TableCell>
                  <TableCell>
                    {metric.waist_cm ? `${metric.waist_cm.toFixed(1)}` : '-'}
                  </TableCell>
                  <TableCell>
                    {metric.hip_cm ? `${metric.hip_cm.toFixed(1)}` : '-'}
                  </TableCell>
                  <TableCell>
                    {metric.chest_cm ? `${metric.chest_cm.toFixed(1)}` : '-'}
                  </TableCell>
                  <TableCell>
                    {metric.arm_cm ? `${metric.arm_cm.toFixed(1)}` : '-'}
                  </TableCell>
                  <TableCell>
                    {metric.thigh_cm ? `${metric.thigh_cm.toFixed(1)}` : '-'}
                  </TableCell>
                  <TableCell className="max-w-xs truncate text-sm text-muted-foreground">
                    {metric.notes || '-'}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(metric.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
