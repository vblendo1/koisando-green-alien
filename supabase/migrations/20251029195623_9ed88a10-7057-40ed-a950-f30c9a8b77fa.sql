-- Criar tabela user_metrics para métricas dos usuários
CREATE TABLE IF NOT EXISTS public.user_metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  weight_kg numeric(5, 2),
  chest_cm numeric(5, 2),
  waist_cm numeric(5, 2),
  hip_cm numeric(5, 2),
  arm_cm numeric(5, 2),
  thigh_cm numeric(5, 2),
  notes text,
  recorded_at timestamp with time zone NOT NULL DEFAULT now(),
  created_at timestamp with time zone DEFAULT now()
);

-- Habilitar RLS
ALTER TABLE public.user_metrics ENABLE ROW LEVEL SECURITY;

-- Políticas RLS: Usuários podem ver suas próprias métricas
CREATE POLICY "Users can view their own metrics"
  ON public.user_metrics
  FOR SELECT
  USING (auth.uid() = user_id);

-- Usuários podem inserir suas próprias métricas
CREATE POLICY "Users can insert their own metrics"
  ON public.user_metrics
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Usuários podem atualizar suas próprias métricas
CREATE POLICY "Users can update their own metrics"
  ON public.user_metrics
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Usuários podem deletar suas próprias métricas
CREATE POLICY "Users can delete their own metrics"
  ON public.user_metrics
  FOR DELETE
  USING (auth.uid() = user_id);

-- Criar índice para melhor performance
CREATE INDEX IF NOT EXISTS user_metrics_user_id_idx ON public.user_metrics(user_id);
CREATE INDEX IF NOT EXISTS user_metrics_recorded_at_idx ON public.user_metrics(recorded_at DESC);