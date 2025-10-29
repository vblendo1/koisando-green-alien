import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Play, CheckCircle2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const Product = () => {
  const { slug } = useParams();
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  const { data: product } = useQuery({
    queryKey: ['product', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('slug', slug)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!slug,
  });

  const { data: hasAccess } = useQuery({
    queryKey: ['has-access', product?.id, user?.id],
    queryFn: async () => {
      const { data } = await supabase
        .from('user_products')
        .select('id')
        .eq('user_id', user?.id || '')
        .eq('product_id', product?.id || '')
        .maybeSingle();
      return !!data;
    },
    enabled: !!product?.id && !!user?.id,
  });

  const { data: modules } = useQuery({
    queryKey: ['modules', product?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('modules')
        .select(`
          *,
          lessons (*)
        `)
        .eq('product_id', product?.id || '')
        .order('order_index', { ascending: true });
      if (error) throw error;
      return data;
    },
    enabled: !!product?.id && hasAccess,
  });

  const { data: userProgress } = useQuery({
    queryKey: ['user-progress', user?.id, product?.id],
    queryFn: async () => {
      if (!modules) return [];
      const lessonIds = modules.flatMap(m => m.lessons?.map(l => l.id) || []);
      const { data, error } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user?.id || '')
        .in('lesson_id', lessonIds);
      if (error) throw error;
      return data || [];
    },
    enabled: !!user?.id && !!modules && hasAccess,
  });

  if (!hasAccess && !authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Acesso negado</h1>
          <p className="text-muted-foreground mb-6">Você não tem acesso a este programa.</p>
          <Button onClick={() => navigate('/home')}>Voltar para Home</Button>
        </div>
      </div>
    );
  }

  const totalLessons = modules?.reduce((acc, m) => acc + (m.lessons?.length || 0), 0) || 0;
  const completedLessons = userProgress?.filter(p => p.completed).length || 0;
  const progressPercent = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

  return (
    <div className="min-h-screen pb-20">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/home')}
            className="text-foreground hover:text-primary"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">{product?.name}</h1>
          {product?.description && (
            <p className="text-muted-foreground mb-4">{product.description}</p>
          )}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Progresso</span>
              <span className="text-foreground font-semibold">
                {completedLessons}/{totalLessons} aulas
              </span>
            </div>
            <Progress value={progressPercent} className="h-2" />
          </div>
        </div>

        <div className="space-y-8">
          {modules?.map((module: any) => (
            <div key={module.id} className="space-y-4">
              <div>
                <h2 className="text-2xl font-bold text-foreground">{module.title}</h2>
                {module.description && (
                  <p className="text-sm text-muted-foreground mt-1">{module.description}</p>
                )}
              </div>

              <div className="space-y-3">
                {module.lessons?.sort((a: any, b: any) => a.order_index - b.order_index).map((lesson: any) => {
                  const isCompleted = userProgress?.some(
                    p => p.lesson_id === lesson.id && p.completed
                  );

                  return (
                    <button
                      key={lesson.id}
                      onClick={() => navigate(`/lesson/${lesson.id}`)}
                      className="w-full group relative overflow-hidden rounded-lg bg-card border border-border hover:border-primary transition-all duration-300 p-4 flex items-center gap-4"
                    >
                      <div className="flex-shrink-0">
                        {lesson.thumbnail ? (
                          <img
                            src={lesson.thumbnail}
                            alt={lesson.title}
                            className="w-24 h-16 object-cover rounded"
                          />
                        ) : (
                          <div className="w-24 h-16 bg-muted rounded flex items-center justify-center">
                            <Play className="w-8 h-8 text-primary" />
                          </div>
                        )}
                      </div>

                      <div className="flex-1 text-left">
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                          {lesson.title}
                        </h3>
                        {lesson.description && (
                          <p className="text-sm text-muted-foreground line-clamp-1 mt-1">
                            {lesson.description}
                          </p>
                        )}
                        {lesson.duration && (
                          <p className="text-xs text-muted-foreground mt-1">
                            {Math.floor(lesson.duration / 60)}min
                          </p>
                        )}
                      </div>

                      {isCompleted && (
                        <div className="flex-shrink-0">
                          <CheckCircle2 className="w-6 h-6 text-primary" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Product;