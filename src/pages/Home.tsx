import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useAdmin } from '@/hooks/useAdmin';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { LogOut, Settings, BookOpen, BarChart3, Zap } from 'lucide-react';
import { ProductCarousel } from '@/components/ProductCarousel';
import { MetricsSummary } from '@/components/MetricsSummary';

const Home = () => {
  const { user, signOut, loading } = useAuth();
  const { isAdmin } = useAdmin();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  const { data: userProducts } = useQuery({
    queryKey: ['user-products', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('user_products')
        .select('product_id')
        .eq('user_id', user?.id || '');
      if (error) throw error;
      return data?.map(up => up.product_id) || [];
    },
    enabled: !!user,
  });

  const { data: products } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const ownedProducts = products?.filter(p => userProducts?.includes(p.id)) || [];
  const lockedProducts = products?.filter(p => !userProducts?.includes(p.id)) || [];

  const handleProductClick = (product: any) => {
    navigate(`/product/${product.slug}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-background/50">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto animate-pulse">
            <Zap className="w-6 h-6 text-primary" />
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
                Time Cacau
              </h1>
              <p className="text-xs md:text-sm text-muted-foreground">
                Sua transformação começa aqui ✨
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/metrics')}
                className="flex items-center gap-2 hidden sm:flex"
              >
                <BarChart3 className="h-4 w-4" />
                Dashboard
              </Button>
              {isAdmin && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/admin')}
                  className="flex items-center gap-2 hidden sm:flex"
                >
                  <Settings className="h-4 w-4" />
                  Admin
                </Button>
              )}
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
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 space-y-16">
        {/* Metrics Summary Section */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground flex items-center gap-2">
                <BarChart3 className="h-8 w-8 text-primary" />
                Seu Progresso
              </h2>
              <p className="text-muted-foreground mt-1">Acompanhe sua jornada de transformação</p>
            </div>
            <Button
              onClick={() => navigate('/metrics')}
              className="flex items-center gap-2"
            >
              <Zap className="h-4 w-4" />
              Registrar Métricas
            </Button>
          </div>
          <MetricsSummary />
        </section>

        {/* Products Section */}
        {products && products.length > 0 ? (
          <div className="space-y-12">
            {/* Owned Products Carousel */}
            {ownedProducts.length > 0 && (
              <ProductCarousel
                title="Meus Programas"
                description="Acesse os programas que você já tem acesso"
                products={ownedProducts}
                onProductClick={handleProductClick}
              />
            )}

            {/* Locked Products Carousel */}
            {lockedProducts.length > 0 && (
              <ProductCarousel
                title="Outros Programas"
                description="Programas disponíveis na plataforma"
                products={lockedProducts}
                onProductClick={handleProductClick}
                isLocked={true}
              />
            )}
          </div>
        ) : (
          // Empty State
          <div className="space-y-8">
            <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/5 rounded-full blur-3xl" />
                <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border border-primary/20">
                  <BookOpen className="w-12 h-12 text-primary" />
                </div>
              </div>
              <div className="space-y-2 max-w-md">
                <h2 className="text-3xl font-bold text-foreground">
                  Bem-vinda ao Time Cacau! 🎉
                </h2>
                <p className="text-muted-foreground text-lg">
                  Nenhum programa disponível no momento
                </p>
                <p className="text-sm text-muted-foreground">
                  Fique atenta! Em breve você terá acesso aos melhores programas de emagrecimento e fitness.
                </p>
              </div>

              {/* Quick Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button
                  onClick={() => navigate('/metrics')}
                  className="flex items-center gap-2"
                  size="lg"
                >
                  <BarChart3 className="h-5 w-5" />
                  Acompanhar Progresso
                </Button>
                {!isAdmin && (
                  <Button
                    onClick={() => navigate('/setup')}
                    variant="outline"
                    size="lg"
                    className="flex items-center gap-2"
                  >
                    <Settings className="h-5 w-5" />
                    Configuração
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
