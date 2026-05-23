-- Create custom schema tables for DEADPOOL AI

-- 1. Profiles Table (extending Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  full_name TEXT,
  avatar_url TEXT,
  subscription_tier TEXT NOT NULL DEFAULT 'free' CHECK (subscription_tier IN ('free', 'pro', 'enterprise')),
  subscription_status TEXT NOT NULL DEFAULT 'active' CHECK (subscription_status IN ('active', 'trailing', 'canceled'))
);

-- Enable RLS on Profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
CREATE POLICY "Users can view their own profile" 
  ON public.profiles FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
  ON public.profiles FOR UPDATE 
  USING (auth.uid() = id);

-- 2. Analyses Table
CREATE TABLE IF NOT EXISTS public.analyses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  source_file_name TEXT NOT NULL,
  source_file_type TEXT NOT NULL,
  source_file_size INTEGER NOT NULL,
  overall_failure_score INTEGER NOT NULL,
  category_scores JSONB NOT NULL,
  top_failure_reasons JSONB NOT NULL,
  startup_comparison JSONB NOT NULL,
  similarity_score INTEGER NOT NULL,
  recommendations JSONB NOT NULL,
  roast_mode_output TEXT NOT NULL,
  investor_readiness JSONB NOT NULL,
  market_analysis JSONB NOT NULL,
  funding_risk JSONB NOT NULL,
  status TEXT NOT NULL DEFAULT 'success' CHECK (status IN ('success', 'degraded'))
);

-- Enable RLS on Analyses
ALTER TABLE public.analyses ENABLE ROW LEVEL SECURITY;

-- Indexes for performance
CREATE INDEX IF NOT EXISTS analyses_user_id_idx ON public.analyses(user_id);
CREATE INDEX IF NOT EXISTS analyses_created_at_idx ON public.analyses(created_at DESC);

-- Analyses Policies
CREATE POLICY "Users can view their own analyses" 
  ON public.analyses FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own analyses" 
  ON public.analyses FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own analyses" 
  ON public.analyses FOR DELETE 
  USING (auth.uid() = user_id);

-- 3. API Usage Table
CREATE TABLE IF NOT EXISTS public.api_usage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  endpoint TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  status_code INTEGER NOT NULL,
  latency_ms INTEGER
);

-- Enable RLS on API Usage
ALTER TABLE public.api_usage ENABLE ROW LEVEL SECURITY;

-- API Usage Policies
CREATE POLICY "Users can view their own API usage logs" 
  ON public.api_usage FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "System can record API usage logs" 
  ON public.api_usage FOR INSERT 
  WITH CHECK (true);

-- 4. Automatically create profile when a new user signs up in Supabase Auth
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url, subscription_tier, subscription_status)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', 'Founder'),
    new.raw_user_meta_data->>'avatar_url',
    'free',
    'active'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger definition
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
