import { createClient } from '@supabase/supabase-js'

// Configuração temporária para desenvolvimento
// Em produção, use as variáveis de ambiente
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Verificar se as credenciais estão configuradas
let supabase: any

if (!supabaseUrl || !supabaseAnonKey || 
    supabaseUrl === 'your_supabase_project_url' || 
    supabaseAnonKey === 'your_supabase_anon_key') {
  console.warn('⚠️ Supabase não configurado. Usando modo de desenvolvimento com credenciais mock.')
  
  // Criar cliente mock para desenvolvimento
  supabase = {
    auth: {
      signInWithPassword: async () => ({ data: null, error: { message: 'Supabase não configurado' } }),
      signUp: async () => ({ data: null, error: { message: 'Supabase não configurado' } }),
      signOut: async () => ({ error: null }),
      getUser: async () => ({ data: { user: null } }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } })
    },
    from: () => ({
      select: () => ({
        eq: () => ({
          single: async () => ({ data: null, error: { message: 'Supabase não configurado' } })
        })
      }),
      insert: async () => ({ error: { message: 'Supabase não configurado' } }),
      update: () => ({
        eq: async () => ({ error: { message: 'Supabase não configurado' } })
      })
    }),
    storage: {
      from: () => ({
        upload: async () => ({ error: { message: 'Supabase não configurado' } }),
        getPublicUrl: () => ({ data: { publicUrl: null } })
      })
    }
  }
} else {
  try {
    supabase = createClient(supabaseUrl, supabaseAnonKey)
  } catch (error) {
    console.error('Erro ao criar cliente Supabase:', error)
    // Fallback para modo mock
    supabase = {
      auth: {
        signInWithPassword: async () => ({ data: null, error: { message: 'Erro na configuração do Supabase' } }),
        signUp: async () => ({ data: null, error: { message: 'Erro na configuração do Supabase' } }),
        signOut: async () => ({ error: null }),
        getUser: async () => ({ data: { user: null } }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } })
      },
      from: () => ({
        select: () => ({
          eq: () => ({
            single: async () => ({ data: null, error: { message: 'Erro na configuração do Supabase' } })
          })
        }),
        insert: async () => ({ error: { message: 'Erro na configuração do Supabase' } }),
        update: () => ({
          eq: async () => ({ error: { message: 'Erro na configuração do Supabase' } })
        })
      }),
      storage: {
        from: () => ({
          upload: async () => ({ error: { message: 'Erro na configuração do Supabase' } }),
          getPublicUrl: () => ({ data: { publicUrl: null } })
        })
      }
    }
  }
}

export { supabase }

// Tipos para o usuário
export interface UserProfile {
  id: string
  email: string
  role: 'user' | 'provider'
  first_name?: string
  last_name?: string
  phone?: string
  location?: string
  birth_date?: string
  avatar_url?: string
  services?: string
  description?: string
  experience_years?: number
  hourly_rate?: number
  availability?: string
  specializations?: string
  bio?: string
  website?: string
  social_media?: string
  preferred_contact?: string
  notifications?: boolean
  public_profile?: boolean
  profile_completed?: boolean
  created_at: string
  updated_at: string
}

// Tipos para autenticação
export interface AuthUser {
  id: string
  email: string
  role: 'user' | 'provider'
} 