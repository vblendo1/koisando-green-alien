import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Lesson = () => {
  const { id } = useParams();
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  const { data: lesson } = useQuery({
    queryKey: ['lesson', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('lessons')
        .select(`
          *,
          module:modules (
            product:products (*)
          )
        `)
        .eq('id', id)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  const { data: progress } = useQuery({
    queryKey: ['lesson-progress', id, user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('user_progress')
        .select('*')
        .eq('lesson_id', id || '')
        .eq('user_id', user?.id || '')
        .maybeSingle();
      if (error) throw error;
      return data;
    },
    enabled: !!id && !!user?.id,
  });

  useEffect(() => {
    if (progress) {
      setIsCompleted(progress.completed || false);
    }
  }, [progress]);

  const toggleCompleteMutation = useMutation({
    mutationFn: async (completed: boolean) => {
      if (progress) {
        const { error } = await supabase
          .from('user_progress')
          .update({ 
            completed, 
            completed_at: completed ? new Date().toISOString() : null 
          })
          .eq('id', progress.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('user_progress')
          .insert({
            user_id: user?.id,
            lesson_id: id,
            completed,
            completed_at: completed ? new Date().toISOString() : null,
          });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lesson-progress'] });
      queryClient.invalidateQueries({ queryKey: ['user-progress'] });
      toast({
        title: isCompleted ? 'Aula desmarcada' : 'Aula concluída!',
        description: isCompleted 
          ? 'Você pode marcar novamente quando terminar.' 
          : 'Continue assim!',
      });
      setIsCompleted(!isCompleted);
    },
  });

  const handleToggleComplete = () => {
    toggleCompleteMutation.mutate(!isCompleted);
  };

  const getYouTubeEmbedUrl = (url: string) => {
    const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/)?.[1];
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  };

  return (
    <div className="min-h-screen pb-20">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              const productSlug = (lesson as any)?.module?.product?.slug;
              if (productSlug) {
                navigate(`/product/${productSlug}`);
              } else {
                navigate('/home');
              }
            }}
            className="text-foreground hover:text-primary"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{lesson?.title}</h1>
            {lesson?.description && (
              <p className="text-muted-foreground">{lesson.description}</p>
            )}
          </div>

          <div className="aspect-video rounded-xl overflow-hidden bg-black">
            {lesson?.video_url && (
              <iframe
                src={getYouTubeEmbedUrl(lesson.video_url)}
                title={lesson.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>

          <Button
            onClick={handleToggleComplete}
            className={`w-full ${
              isCompleted
                ? 'bg-primary/20 hover:bg-primary/30 text-primary border border-primary'
                : 'bg-primary hover:bg-primary/90 text-primary-foreground'
            }`}
            disabled={toggleCompleteMutation.isPending}
          >
            {isCompleted ? (
              <>
                <CheckCircle2 className="mr-2 h-5 w-5" />
                Aula concluída
              </>
            ) : (
              'Marcar como concluído'
            )}
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Lesson;