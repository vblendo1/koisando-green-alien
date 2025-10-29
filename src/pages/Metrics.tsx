import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { MetricsForm } from '@/components/MetricsForm';
import { MetricsHistory } from '@/components/MetricsHistory';

const Metrics = () => {
  const { user, signOut, loading } = useAuth();
  const navigate = useNavigate();
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-primary text-xl">Carregando...</div>
      </div>
    );
  }

  const handleMetricsSuccess = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="min-h-screen pb-20">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-primary">Time Cacau</h1>
            <p className="text-sm text-muted-foreground">Dashboard de Acompanhamento</p>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => navigate('/home')}
            >
              Voltar aos Programas
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={signOut}
              className="text-foreground hover:text-primary"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Introdução */}
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-foreground">
              Acompanhe seu Progresso
            </h2>
            <p className="text-muted-foreground">
              Registre suas métricas regularmente para visualizar seu progresso ao longo do tempo.
              Lembre-se: o progresso vai além da balança!
            </p>
          </div>

          {/* Grid com formulário e histórico */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Coluna esquerda: Formulário */}
            <div className="lg:col-span-1">
              <MetricsForm onSuccess={handleMetricsSuccess} />
            </div>

            {/* Coluna direita: Histórico */}
            <div className="lg:col-span-2">
              <MetricsHistory refreshTrigger={refreshTrigger} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Metrics;
