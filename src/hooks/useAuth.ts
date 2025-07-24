import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/integrations/supabase/client'
import { UserProfile, AuthUser } from '@/lib/supabase'
import { useToast } from '@/hooks/use-toast'

export const useAuth = () => {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [authLoading, setAuthLoading] = useState(false)
  const navigate = useNavigate()
  const { toast } = useToast()

  // Verificar usuário atual
  useEffect(() => {
    const getUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        
        if (user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single()

          if (profile) {
            setUser({
              id: user.id,
              email: user.email!,
              role: profile.role as 'user' | 'provider'
            })
          }
        }
      } catch (error) {
        console.error('Erro ao buscar usuário:', error)
      } finally {
        setLoading(false)
      }
    }

    getUser()

    // Escutar mudanças de autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single()

          if (profile) {
            setUser({
              id: session.user.id,
              email: session.user.email!,
              role: profile.role as 'user' | 'provider'
            })
          }
        } else {
          setUser(null)
        }
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  // Login
  const signIn = async (email: string, password: string) => {
    setAuthLoading(true)
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) throw error

      if (data.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .single()

        if (profile) {
          setUser({
            id: data.user.id,
            email: data.user.email!,
            role: profile.role as 'user' | 'provider'
          })

          toast({
            title: "Login realizado com sucesso!",
            description: `Bem-vindo, ${profile.role === 'user' ? 'Usuário' : 'Prestador'}!`,
          })

          // Verificar se o perfil está completo
          if (!profile.profile_completed) {
            navigate('/profile-setup')
          } else {
            // Redirecionar baseado no role
            if (profile.role === 'user') {
              navigate('/cliente')
            } else {
              navigate('/prestador')
            }
          }
        }
      }
    } catch (error: any) {
      toast({
        title: "Erro no login",
        description: "Email ou senha incorretos",
        variant: "destructive",
      })
    } finally {
      setAuthLoading(false)
    }
  }

  // Cadastro
  const signUp = async (userData: {
    email: string
    password: string
    role: 'user' | 'provider'
    first_name: string
    last_name: string
    phone: string
    location: string
    services?: string
    description?: string
  }) => {
    setAuthLoading(true)
    try {
      const { data, error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            role: userData.role
          }
        }
      })

      if (error) throw error

      if (data.user) {
        toast({
          title: "Cadastro realizado com sucesso!",
          description: "Sua conta foi criada. Você pode fazer login agora.",
        })

        return true
      }
    } catch (error: any) {
      toast({
        title: "Erro no cadastro",
        description: error.message || "Erro ao criar conta",
        variant: "destructive",
      })
      return false
    } finally {
      setAuthLoading(false)
    }
  }

  // Logout
  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error

      setUser(null)
      navigate('/login')
      
      toast({
        title: "Logout realizado",
        description: "Você foi desconectado com sucesso.",
      })
    } catch (error: any) {
      toast({
        title: "Erro no logout",
        description: error.message || "Erro ao fazer logout",
        variant: "destructive",
      })
    }
  }

  return {
    user,
    loading,
    authLoading,
    signIn,
    signUp,
    signOut
  }
} 