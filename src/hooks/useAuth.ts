import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase, UserProfile, AuthUser } from '@/lib/supabase'
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
              role: profile.role
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
              role: profile.role
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
      // Modo de desenvolvimento - credenciais mock
      if (email === 'cliente@teste.com' && password === '123456') {
        const mockUser = {
          id: '1',
          email: 'cliente@teste.com',
          role: 'user' as const
        }
        
        setUser(mockUser)
        toast({
          title: "Login realizado com sucesso!",
          description: "Bem-vindo, Usuário! (Modo de desenvolvimento)",
        })
        navigate('/cliente')
        return
      }
      
      if (email === 'prestador@teste.com' && password === '123456') {
        const mockUser = {
          id: '2',
          email: 'prestador@teste.com',
          role: 'provider' as const
        }
        
        setUser(mockUser)
        toast({
          title: "Login realizado com sucesso!",
          description: "Bem-vindo, Prestador! (Modo de desenvolvimento)",
        })
        navigate('/prestador')
        return
      }

      // Tentar autenticação real se credenciais mock não funcionarem
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
            role: profile.role
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
        description: "Email ou senha incorretos. Use as credenciais de teste: cliente@teste.com / 123456 ou prestador@teste.com / 123456",
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
      // Modo de desenvolvimento - simular cadastro
      if (userData.email.includes('teste.com')) {
        toast({
          title: "Cadastro realizado com sucesso!",
          description: "Sua conta foi criada. Você pode fazer login agora. (Modo de desenvolvimento)",
        })
        return true
      }

      // Tentar cadastro real se não for email de teste
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
        // Criar perfil na tabela profiles
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: data.user.id,
            email: userData.email,
            role: userData.role,
            first_name: userData.first_name,
            last_name: userData.last_name,
            phone: userData.phone,
            location: userData.location,
            services: userData.services || null,
            description: userData.description || null
          })

        if (profileError) throw profileError

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
      // Modo de desenvolvimento - logout mock
      if (user?.email?.includes('teste.com')) {
        setUser(null)
        navigate('/login')
        
        toast({
          title: "Logout realizado",
          description: "Você foi desconectado com sucesso. (Modo de desenvolvimento)",
        })
        return
      }

      // Logout real
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