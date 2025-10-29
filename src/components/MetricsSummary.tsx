import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingDown, Target, Activity } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface Metric {
  recorded_at: string;
  weight_kg: number | null;
  waist_cm: number | null;
  hip_cm: number | null;
}

export const MetricsSummary = () => {
  const { user } = useAuth();
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [latestMetric, setLatestMetric] = useState<Metric | null>(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from('user_metrics')
          .select('recorded_at, weight_kg, waist_cm, hip_cm')
          .eq('user_id', user.id)
          .order('recorded_at', { ascending: true })
          .limit(30);

        if (error) throw error;

        if (data && data.length > 0) {
          setMetrics(data);
          setLatestMetric(data[data.length - 1]);
        }
      } catch (error) {
        console.error('Erro ao buscar métricas:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMetrics();
  }, [user]);

  if (isLoading) {
    return (
      <Card className="bg-gradient-to-br from-card to-card/50 border-border/50">
        <CardHeader>
          <CardTitle>Seu Progresso</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-muted-foreground py-8">
            Carregando dados...
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!latestMetric) {
    return (
      <Card className="bg-gradient-to-br from-card to-card/50 border-border/50">
        <CardHeader>
          <CardTitle>Seu Progresso</CardTitle>
          <CardDescription>Comece registrando suas métricas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center text-muted-foreground py-8">
            Nenhuma métrica registrada ainda. Acesse o Dashboard para começar!
          </div>
        </CardContent>
      </Card>
    );
  }

  const chartData = metrics.map((m) => ({
    date: format(new Date(m.recorded_at), 'dd/MM', { locale: ptBR }),
    weight: m.weight_kg,
    waist: m.waist_cm,
  }));

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Weight Card */}
        {latestMetric.weight_kg && (
          <Card className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-500/20">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">Peso Atual</CardTitle>
                <TrendingDown className="h-4 w-4 text-blue-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">
                {latestMetric.weight_kg.toFixed(1)}
                <span className="text-lg text-muted-foreground ml-1">kg</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Última atualização: {format(new Date(latestMetric.recorded_at), 'dd/MM/yyyy', { locale: ptBR })}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Waist Card */}
        {latestMetric.waist_cm && (
          <Card className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 border-purple-500/20">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">Cintura</CardTitle>
                <Target className="h-4 w-4 text-purple-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">
                {latestMetric.waist_cm.toFixed(1)}
                <span className="text-lg text-muted-foreground ml-1">cm</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Última atualização: {format(new Date(latestMetric.recorded_at), 'dd/MM/yyyy', { locale: ptBR })}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Hip Card */}
        {latestMetric.hip_cm && (
          <Card className="bg-gradient-to-br from-pink-500/10 to-pink-500/5 border-pink-500/20">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">Quadril</CardTitle>
                <Activity className="h-4 w-4 text-pink-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">
                {latestMetric.hip_cm.toFixed(1)}
                <span className="text-lg text-muted-foreground ml-1">cm</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Última atualização: {format(new Date(latestMetric.recorded_at), 'dd/MM/yyyy', { locale: ptBR })}
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Chart */}
      {chartData.length > 1 && (
        <Card className="bg-gradient-to-br from-card to-card/50 border-border/50">
          <CardHeader>
            <CardTitle>Evolução do Peso</CardTitle>
            <CardDescription>Últimas 30 medições</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="date" stroke="var(--muted-foreground)" />
                <YAxis stroke="var(--muted-foreground)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--card)',
                    border: '1px solid var(--border)',
                    borderRadius: '8px',
                  }}
                  labelStyle={{ color: 'var(--foreground)' }}
                />
                <Line
                  type="monotone"
                  dataKey="weight"
                  stroke="var(--primary)"
                  strokeWidth={2}
                  dot={{ fill: 'var(--primary)', r: 4 }}
                  activeDot={{ r: 6 }}
                  name="Peso (kg)"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
