import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LogOut, BarChart3, BookOpen, Users } from 'lucide-react';
import { MetricsHistory } from '@/components/MetricsHistory';
import { MetricsForm } from '@/components/MetricsForm';
import { DailyDiary } from '@/components/DailyDiary';
import { Community } from '@/components/Community';

const Dashboard = () => {
  const { user, signOut, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-background/50">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto animate-pulse">
            <BarChart3 className="w-6 h-6 text-primary" />
          </div>
          <div className="text-primary text-xl font-semibold">Carregando...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20 bg-gradient-to-br from-background via-background to-background/50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary via-primary to-primary/70 bg-clip-text text-transparent">
                Seu Dashboard
              </h1>
              <p className="text-xs md:text-sm text-muted-foreground">
                Acompanhe sua jornada de transformação
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={signOut}
                className="text-foreground hover:text-primary"
                title="Sair"
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <Tabs defaultValue="metrics" className="w-full">
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-4">
            <TabsTrigger value="metrics" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Métricas</span>
            </TabsTrigger>
            <TabsTrigger value="diary" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Diário</span>
            </TabsTrigger>
            <TabsTrigger value="community" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Comunidade</span>
            </TabsTrigger>
          </TabsList>

          {/* Metrics Tab */}
          <TabsContent value="metrics" className="space-y-6 mt-6">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Registrar Métricas</h2>
                <p className="text-muted-foreground">Acompanhe seu peso e medidas corporais</p>
              </div>
              <MetricsForm />
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Histórico de Métricas</h2>
                <p className="text-muted-foreground">Veja todos os seus registros anteriores</p>
              </div>
              <MetricsHistory />
            </div>
          </TabsContent>

          {/* Diary Tab */}
          <TabsContent value="diary" className="mt-6">
            <DailyDiary />
          </TabsContent>

          {/* Community Tab */}
          <TabsContent value="community" className="mt-6">
            <Community />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;
