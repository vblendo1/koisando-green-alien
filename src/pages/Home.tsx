import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { LogOut, Lock, Play } from 'lucide-react';

const Home = () => {
  const { user, signOut, loading } = useAuth();
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-primary text-xl">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-primary">Time Cacau</h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={signOut}
            className="text-foreground hover:text-primary"
          >
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-12">
        {!products || products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-6">
              <Play className="w-12 h-12 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Nenhum programa disponível
            </h2>
            <p className="text-muted-foreground max-w-md">
              Entre em contato com o administrador para obter acesso aos programas.
            </p>
          </div>
        ) : (
          <>
            {ownedProducts.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-6 text-foreground">Seus Programas</h2>
                <div className="grid grid-cols-1 gap-4">
                  {ownedProducts.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => handleProductClick(product)}
                      className="group relative overflow-hidden rounded-xl bg-card border border-border hover:border-primary transition-all duration-300"
                    >
                      <div className="aspect-video relative">
                        {product.cover_image ? (
                          <img
                            src={product.cover_image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                            <Play className="w-16 h-16 text-primary" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h3 className="text-xl font-bold text-foreground mb-2">{product.name}</h3>
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

            {lockedProducts.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-6 text-foreground">Outros Programas</h2>
                <div className="grid grid-cols-1 gap-4">
                  {lockedProducts.map((product) => (
                    <div
                      key={product.id}
                      className="relative overflow-hidden rounded-xl bg-card border border-border opacity-60"
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