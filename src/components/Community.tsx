import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Heart, MessageCircle, Plus, Send } from 'lucide-react';

interface CommunityPost {
  id: string;
  user_id: string;
  title: string;
  content: string;
  category: string;
  likes_count: number;
  created_at: string;
  profiles?: {
    name: string;
  };
  community_comments?: CommunityComment[];
}

interface CommunityComment {
  id: string;
  user_id: string;
  content: string;
  created_at: string;
  profiles?: {
    name: string;
  };
}

export const Community = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showNewPost, setShowNewPost] = useState(false);
  const [newPostData, setNewPostData] = useState({
    title: '',
    content: '',
    category: 'motivacao',
  });
  const [isSavingPost, setIsSavingPost] = useState(false);
  const [newCommentData, setNewCommentData] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('community_posts')
        .select(`
          *,
          profiles:user_id(name),
          community_comments(
            id,
            user_id,
            content,
            created_at,
            profiles:user_id(name)
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Erro ao buscar posts:', error);
      toast.error('Erro ao carregar comunidade');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreatePost = async () => {
    if (!user) {
      toast.error('Você precisa estar logado');
      return;
    }

    if (!newPostData.title || !newPostData.content) {
      toast.error('Título e conteúdo são obrigatórios');
      return;
    }

    setIsSavingPost(true);
    try {
      const { error } = await supabase
        .from('community_posts')
        .insert([
          {
            user_id: user.id,
            title: newPostData.title,
            content: newPostData.content,
            category: newPostData.category,
          },
        ]);

      if (error) throw error;

      toast.success('Post criado com sucesso!');
      setNewPostData({ title: '', content: '', category: 'motivacao' });
      setShowNewPost(false);
      fetchPosts();
    } catch (error) {
      console.error('Erro ao criar post:', error);
      toast.error('Erro ao criar post');
    } finally {
      setIsSavingPost(false);
    }
  };

  const handleAddComment = async (postId: string) => {
    if (!user) {
      toast.error('Você precisa estar logado');
      return;
    }

    const content = newCommentData[postId];
    if (!content) {
      toast.error('Escreva um comentário');
      return;
    }

    try {
      const { error } = await supabase
        .from('community_comments')
        .insert([
          {
            post_id: postId,
            user_id: user.id,
            content,
          },
        ]);

      if (error) throw error;

      toast.success('Comentário adicionado!');
      setNewCommentData({ ...newCommentData, [postId]: '' });
      fetchPosts();
    } catch (error) {
      console.error('Erro ao adicionar comentário:', error);
      toast.error('Erro ao adicionar comentário');
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      motivacao: 'bg-purple-500/10 text-purple-700 border-purple-500/20',
      duvida: 'bg-blue-500/10 text-blue-700 border-blue-500/20',
      receita: 'bg-green-500/10 text-green-700 border-green-500/20',
      treino: 'bg-orange-500/10 text-orange-700 border-orange-500/20',
      vitoria: 'bg-pink-500/10 text-pink-700 border-pink-500/20',
    };
    return colors[category] || colors.motivacao;
  };

  const getCategoryLabel = (category: string) => {
    const labels: { [key: string]: string } = {
      motivacao: 'Motivação',
      duvida: 'Dúvida',
      receita: 'Receita',
      treino: 'Treino',
      vitoria: 'Vitória',
    };
    return labels[category] || category;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">Comunidade</h2>
          <p className="text-muted-foreground mt-1">Compartilhe sua jornada com outras alunas</p>
        </div>
        <Button
          onClick={() => setShowNewPost(!showNewPost)}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Novo Post
        </Button>
      </div>

      {/* New Post Form */}
      {showNewPost && (
        <Card className="bg-gradient-to-br from-card to-card/50 border-border/50">
          <CardHeader>
            <CardTitle>Criar Novo Post</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Título</label>
              <Input
                placeholder="Qual é o assunto do seu post?"
                value={newPostData.title}
                onChange={(e) => setNewPostData({ ...newPostData, title: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Categoria</label>
              <select
                value={newPostData.category}
                onChange={(e) => setNewPostData({ ...newPostData, category: e.target.value })}
                className="w-full px-3 py-2 rounded-md border border-input bg-background text-foreground"
              >
                <option value="motivacao">💪 Motivação</option>
                <option value="duvida">❓ Dúvida</option>
                <option value="receita">🍽️ Receita</option>
                <option value="treino">🏋️ Treino</option>
                <option value="vitoria">🎉 Vitória</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Conteúdo</label>
              <Textarea
                placeholder="Compartilhe sua história, dúvida ou conquista..."
                value={newPostData.content}
                onChange={(e) => setNewPostData({ ...newPostData, content: e.target.value })}
                rows={4}
              />
            </div>

            <div className="flex gap-2">
              <Button
                onClick={handleCreatePost}
                disabled={isSavingPost}
                className="flex-1"
              >
                {isSavingPost ? 'Publicando...' : 'Publicar'}
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowNewPost(false)}
                className="flex-1"
              >
                Cancelar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Posts List */}
      {isLoading ? (
        <div className="text-center py-12 text-muted-foreground">
          Carregando comunidade...
        </div>
      ) : posts.length === 0 ? (
        <Card className="p-12 text-center">
          <p className="text-muted-foreground">
            Nenhum post ainda. Seja a primeira a compartilhar sua história!
          </p>
        </Card>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <Card key={post.id} className="bg-gradient-to-br from-card to-card/50 border-border/50 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-foreground">{post.title}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full border ${getCategoryColor(post.category)}`}>
                        {getCategoryLabel(post.category)}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      por {post.profiles?.name || 'Anônimo'} • {format(new Date(post.created_at), 'dd MMM yyyy', { locale: ptBR })}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-foreground">{post.content}</p>

                {/* Comments Section */}
                <div className="space-y-3 pt-4 border-t border-border/50">
                  <p className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <MessageCircle className="h-4 w-4" />
                    {post.community_comments?.length || 0} comentários
                  </p>

                  {/* Comments List */}
                  {post.community_comments && post.community_comments.length > 0 && (
                    <div className="space-y-2 pl-4 border-l border-border/50">
                      {post.community_comments.map((comment) => (
                        <div key={comment.id} className="space-y-1">
                          <p className="text-xs text-muted-foreground">
                            <strong>{comment.profiles?.name || 'Anônimo'}</strong> • {format(new Date(comment.created_at), 'dd MMM', { locale: ptBR })}
                          </p>
                          <p className="text-sm text-foreground">{comment.content}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Add Comment */}
                  <div className="flex gap-2 pt-2">
                    <Input
                      placeholder="Adicione um comentário..."
                      value={newCommentData[post.id] || ''}
                      onChange={(e) => setNewCommentData({ ...newCommentData, [post.id]: e.target.value })}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleAddComment(post.id);
                        }
                      }}
                    />
                    <Button
                      size="icon"
                      onClick={() => handleAddComment(post.id)}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
