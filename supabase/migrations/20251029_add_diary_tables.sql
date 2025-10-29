-- Create daily_log table for food and workout tracking
CREATE TABLE public.daily_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  log_date DATE NOT NULL,
  
  -- Food tracking
  breakfast TEXT,
  lunch TEXT,
  dinner TEXT,
  snacks TEXT,
  water_intake_liters DECIMAL(3, 1),
  
  -- Workout tracking
  workout_type TEXT,
  workout_duration_minutes INTEGER,
  workout_intensity TEXT,
  workout_notes TEXT,
  
  -- General notes
  notes TEXT,
  mood TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, log_date)
);

ALTER TABLE public.daily_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own daily logs"
  ON public.daily_log FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own daily logs"
  ON public.daily_log FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own daily logs"
  ON public.daily_log FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own daily logs"
  ON public.daily_log FOR DELETE
  USING (auth.uid() = user_id);

-- Create community_posts table for forum
CREATE TABLE public.community_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT,
  likes_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.community_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view community posts"
  ON public.community_posts FOR SELECT
  USING (true);

CREATE POLICY "Users can insert their own posts"
  ON public.community_posts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own posts"
  ON public.community_posts FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own posts"
  ON public.community_posts FOR DELETE
  USING (auth.uid() = user_id);

-- Create community_comments table
CREATE TABLE public.community_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID REFERENCES public.community_posts(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.community_comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view community comments"
  ON public.community_comments FOR SELECT
  USING (true);

CREATE POLICY "Users can insert their own comments"
  ON public.community_comments FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own comments"
  ON public.community_comments FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own comments"
  ON public.community_comments FOR DELETE
  USING (auth.uid() = user_id);
