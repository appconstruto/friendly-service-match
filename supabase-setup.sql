-- Criar tabela de perfis de usuário
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  role TEXT CHECK (role IN ('user', 'provider')) NOT NULL,
  first_name TEXT,
  last_name TEXT,
  display_name TEXT,
  phone TEXT,
  location TEXT,
  cep TEXT,
  address TEXT,
  number TEXT,
  city TEXT,
  state TEXT,
  birth_date DATE,
  avatar_url TEXT,
  
  -- Campos para prestadores
  services TEXT,
  description TEXT,
  experience_years INTEGER,
  hourly_rate DECIMAL(10,2),
  availability TEXT,
  specializations TEXT,
  
  -- Campos adicionais
  bio TEXT,
  website TEXT,
  social_media TEXT,
  
  -- Preferências
  preferred_contact TEXT DEFAULT 'phone',
  notifications BOOLEAN DEFAULT true,
  public_profile BOOLEAN DEFAULT true,
  profile_completed BOOLEAN DEFAULT false,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar RLS (Row Level Security)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Política para usuários verem apenas seu próprio perfil
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

-- Política para usuários editarem apenas seu próprio perfil
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Política para inserção de novos perfis
CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Função para atualizar o timestamp de updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para atualizar updated_at automaticamente
CREATE TRIGGER update_profiles_updated_at 
  BEFORE UPDATE ON profiles 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Função para criar perfil automaticamente após signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, role)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'role', 'user'));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger para criar perfil automaticamente
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user(); 