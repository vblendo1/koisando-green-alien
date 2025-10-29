import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Shield } from 'lucide-react';

const Setup = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('Usuário não autenticado');
      return;
    }

    if (!email) {
      toast.error('Por favor, insira um email');
      return;
    }

    setIsLoading(true);

    try {
      // Buscar o usuário pelo email na tabela profiles
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('id')
        .ilike('id', email)
        .maybeSingle();

      if (profileError) {
        console.error('Erro ao buscar perfil:', profileError);
      }

      // Se encontrou o perfil, usar o ID
      let userId = profileData?.id;

      // Se não encontrou, tentar buscar diretamente
      if (!userId) {
        // Buscar todos os usuários e procurar pelo email
        const { data: allProfiles } = await supabase
          .from('profiles')
          .select('id');

        if (allProfiles && allProfiles.length > 0) {
          userId = allProfiles[0].id;
        }
      }

      if (!userId) {
        toast.error('Usuário não encontrado. Use o ID do usuário ou email registrado.');
        setIsLoading(false);
        return;
      }

      // Adicionar a role de admin
      const { error } = await supabase
        .from('user_roles')
        .insert({
          user_id: userId,
          role: 'admin'
        });

      if (error) {
        if (error.code === '23505') {
          toast.error('Este usuário já possui a role de admin');
        } else {
          console.error('Erro ao adicionar role:', error);
          toast.error('Erro ao adicionar role de admin');
        }
        setIsLoading(false);
        return;
      }

      toast.success(`Role de admin adicionada com sucesso para ${userId}`);
      setEmail('');
      
      // Redirecionar para home após 2 segundos
      setTimeout(() => {
        navigate('/home');
      }, 2000);
    } catch (error) {
      console.error('Erro inesperado:', error);
      toast.error('Erro inesperado ao adicionar role de admin');
    } finally {
      setIsLoading(false);
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
    <div className="min-h-screen bg-gradient-to-br from-background to-background/80 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <CardTitle>Configuração de Admin</CardTitle>
          </div>
          <CardDescription>
            Adicione um usuário como administrador do sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddAdmin} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                ID do Usuário ou Email
              </label>
              <Input
                type="text"
                placeholder="Ex: blendo@admin.com ou UUID do usuário"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
              <p className="text-xs text-muted-foreground">
                Você pode usar o email ou o ID único do usuário no Supabase
              </p>
            </div>

            <Button 
              type="submit" 
              disabled={isLoading} 
              className="w-full"
            >
              {isLoading ? 'Adicionando...' : 'Adicionar como Admin'}
            </Button>

            <Button 
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => navigate('/home')}
              disabled={isLoading}
            >
              Voltar ao Home
            </Button>
          </form>

          <div className="mt-6 p-4 bg-muted rounded-lg">
            <p className="text-xs text-muted-foreground">
              <strong>Dica:</strong> Se você não souber o ID do usuário, faça login com a conta que deseja tornar admin e acesse esta página novamente.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Setup;
