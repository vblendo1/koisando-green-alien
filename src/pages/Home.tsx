import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useAdmin } from '@/hooks/useAdmin';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { LogOut, Lock, Play, BarChart3, Settings, BookOpen } from 'lucide-react';

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
    if (userProducts?.includes(product.id)) {
      navigate(`/product/${product.slug}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-background/80">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto animate-pulse">
            <Play className="w-6 h-6 text-primary" />
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
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Time Cacau
              </h1>
              <p className="text-xs text-muted-foreground mt-1">Sua jornada de transformação começa aqui</p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/metrics')}
                className="flex items-center gap-2"
                title="Acompanhe seu progresso"
              >
                <BarChart3 className="h-4 w-4" />
                <span className="hidden sm:inline">Dashboard</span>
              </Button>
              {isAdmin && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/admin')}
                  className="flex items-center gap-2"
                  title="Painel administrativo"
                >
                  <Settings className="h-4 w-4" />
                  <span className="hidden sm:inline">Admin</span>
                </Button>
              )}
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
      <main className="container mx-auto px-4 py-12 space-y-12">
        {!products || products.length === 0 ? (
          // Estado vazio com CTA
          <div className="space-y-8">
            <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/5 rounded-full blur-2xl" />
                <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border border-primary/20">
                  <Play className="w-12 h-12 text-primary" />
                </div>
              </div>
              <div className="space-y-2 max-w-md">
                <h2 className="text-3xl font-bold text-foreground">
                  Bem-vinda, {user?.email?.split('@')[0]}!
                </h2>
                <p className="text-muted-foreground text-lg">
                  Nenhum programa disponível no momento
                </p>
                <p className="text-sm text-muted-foreground">
                  Você será notificada assim que novos programas de emagrecimento e fitness forem adicionados à plataforma.
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

              {/* Info Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl pt-8">
                <div className="p-4 rounded-lg bg-card border border-border/50 hover:border-primary/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <BarChart3 className="h-5 w-5 text-primary" />
                    </div>
                    <div className="text-left">
                      <p className="text-xs text-muted-foreground">Dashboard</p>
                      <p className="text-sm font-semibold text-foreground">Acompanhe</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-card border border-border/50 hover:border-primary/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <BookOpen className="h-5 w-5 text-primary" />
                    </div>
                    <div className="text-left">
                      <p className="text-xs text-muted-foreground">Programas</p>
                      <p className="text-sm font-semibold text-foreground">Aprenda</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-card border border-border/50 hover:border-primary/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Play className="h-5 w-5 text-primary" />
                    </div>
                    <div className="text-left">
                      <p className="text-xs text-muted-foreground">Aulas</p>
                      <p className="text-sm font-semibold text-foreground">Transforme</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Owned Products Section */}
            {ownedProducts.length > 0 && (
              <section className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">Seus Programas</h2>
                  <p className="text-muted-foreground">Acesse os programas que você já tem acesso</p>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {ownedProducts.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => handleProductClick(product)}
                      className="group relative overflow-hidden rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
                    >
                      <div className="aspect-video relative">
                        {product.cover_image ? (
                          <img
                            src={product.cover_image}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                            <Play className="w-16 h-16 text-primary group-hover:scale-110 transition-transform duration-300" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                          {product.name}
                        </h3>
                        {product.description && (
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {product.description}
                          </p>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </section>
            )}

            {/* Locked Products Section */}
            {lockedProducts.length > 0 && (
              <section className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">Outros Programas</h2>
                  <p className="text-muted-foreground">Programas disponíveis (acesso restrito)</p>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {lockedProducts.map((product) => (
                    <div
                      key={product.id}
                      className="relative overflow-hidden rounded-xl bg-card border border-border/50 opacity-60 hover:opacity-75 transition-opacity"
                    >
                      <div className="aspect-video relative">
                        {product.cover_image ? (
                          <img
                            src={product.cover_image}
                            alt={product.name}
                            className="w-full h-full object-cover grayscale"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-muted to-background flex items-center justify-center">
                            <Lock className="w-16 h-16 text-muted-foreground" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
                          <div className="text-center">
                            <Lock className="w-12 h-12 text-foreground mx-auto mb-2" />
                            <p className="text-sm font-medium text-foreground">
                              Programa bloqueado
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-foreground mb-2">{product.name}</h3>
                        {product.description && (
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {product.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default Home;
