import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useAdmin } from '@/hooks/useAdmin';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { LogOut, Settings, BarChart3, Zap, Sparkles } from 'lucide-react';
import { HeroBanner } from '@/components/HeroBanner';
import { ContinueWatching } from '@/components/ContinueWatching';
import { ProgramRow } from '@/components/ProgramRow';
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

  const { data: userProducts, isLoading: isLoadingUserProducts } = useQuery({
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

  const { data: products, isLoading: isLoadingProducts } = useQuery({
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

  const isDataLoading = isLoadingUserProducts || isLoadingProducts;

  const ownedProducts = products?.filter(p => userProducts?.includes(p.id)) || [];
  const lockedProducts = products?.filter(p => !userProducts?.includes(p.id)) || [];
  const featuredProduct = products?.find(p => p.featured && userProducts?.includes(p.id)) || ownedProducts[0];
  const newProducts = products?.filter(p => {
    if (!p.created_at) return false;
    const created = new Date(p.created_at);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24));
    return diffDays <= 7;
  }) || [];

  // Group products by category
  const categorizedProducts = products?.reduce((acc: Record<string, any[]>, product) => {
    const category = product.category || 'Outros';
    if (!acc[category]) acc[category] = [];
    acc[category].push(product);
    return acc;
  }, {});

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
    <div className="min-h-screen pb-20 bg-background">
      {/* Navbar Netflix-style */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-background via-background/95 to-transparent backdrop-blur-sm transition-all">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary via-primary to-primary/70 bg-clip-text text-transparent">
                Time Cacau
              </h1>
              <nav className="hidden md:flex items-center gap-4 text-sm">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/home')}
                  className="text-foreground hover:text-primary"
                >
                  Início
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/dashboard')}
                  className="text-muted-foreground hover:text-primary"
                >
                  Meu Progresso
                </Button>
              </nav>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/dashboard')}
                className="flex items-center gap-2"
              >
                <BarChart3 className="h-4 w-4" />
                <span className="hidden sm:inline">Dashboard</span>
              </Button>
              {isAdmin && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/admin')}
                  className="flex items-center gap-2"
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
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-16">
        {/* Hero Banner - Featured Program */}
        {featuredProduct && !isDataLoading && (
          <HeroBanner
            name={featuredProduct.name}
            description={featuredProduct.description}
            coverImage={featuredProduct.cover_image}
            category={featuredProduct.category}
            onPlay={() => handleProductClick(featuredProduct)}
            onInfo={() => handleProductClick(featuredProduct)}
          />
        )}

        {/* Content Sections */}
        <div className="container mx-auto px-4 py-8 space-y-12">
          {/* Metrics Summary */}
          <section className="space-y-4 animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-foreground flex items-center gap-2">
                  <BarChart3 className="h-6 w-6 text-primary" />
                  Seu Progresso
                </h2>
                <p className="text-sm text-muted-foreground mt-1">Acompanhe sua jornada</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/dashboard')}
                className="flex items-center gap-2"
              >
                <Sparkles className="h-4 w-4" />
                Ver Detalhes
              </Button>
            </div>
            <MetricsSummary />
          </section>

          {/* Continue Watching */}
          <ContinueWatching onProductClick={handleProductClick} />

          {/* My Programs */}
          {ownedProducts.length > 0 && (
            <ProgramRow
              title="Meus Programas"
              description="Continue sua jornada de transformação"
              products={ownedProducts}
              isLoading={isDataLoading}
              onProductClick={handleProductClick}
            />
          )}

          {/* New Programs */}
          {newProducts.length > 0 && (
            <ProgramRow
              title="Novos Programas"
              description="Acabou de chegar!"
              products={newProducts}
              isLoading={isDataLoading}
              onProductClick={handleProductClick}
            />
          )}

          {/* Categories */}
          {categorizedProducts && Object.keys(categorizedProducts).map((category) => {
            const categoryProducts = categorizedProducts[category];
            const ownedInCategory = categoryProducts.filter(p => userProducts?.includes(p.id));
            const lockedInCategory = categoryProducts.filter(p => !userProducts?.includes(p.id));

            return (
              <div key={category} className="space-y-8">
                {ownedInCategory.length > 0 && (
                  <ProgramRow
                    title={category}
                    description={`Seus programas de ${category.toLowerCase()}`}
                    products={ownedInCategory}
                    isLoading={isDataLoading}
                    onProductClick={handleProductClick}
                  />
                )}
                {lockedInCategory.length > 0 && (
                  <ProgramRow
                    title={`Explore ${category}`}
                    description="Programas disponíveis"
                    products={lockedInCategory}
                    isLoading={isDataLoading}
                    onProductClick={handleProductClick}
                    isLocked={true}
                  />
                )}
              </div>
            );
          })}

          {/* Locked Programs */}
          {lockedProducts.length > 0 && !categorizedProducts && (
            <ProgramRow
              title="Outros Programas"
              description="Descubra mais conteúdos incríveis"
              products={lockedProducts}
              isLoading={isDataLoading}
              onProductClick={handleProductClick}
              isLocked={true}
            />
          )}

          {/* Empty State */}
          {!isDataLoading && (!products || products.length === 0) && (
            <div className="flex flex-col items-center justify-center py-20 text-center space-y-6 animate-fade-in">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/5 rounded-full blur-3xl" />
                <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border border-primary/20">
                  <Sparkles className="w-12 h-12 text-primary" />
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
                  Fique atenta! Em breve você terá acesso aos melhores programas.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button
                  onClick={() => navigate('/dashboard')}
                  size="lg"
                  className="flex items-center gap-2"
                >
                  <BarChart3 className="h-5 w-5" />
                  Ver Dashboard
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;
