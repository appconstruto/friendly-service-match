import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/integrations/supabase/client'
import { useToast } from '@/hooks/use-toast'

interface AuthUser {
  id: string
  email: string
  role: 'user' | 'provider'
}

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
      // Sistema mock para desenvolvimento - qualquer email/senha redireciona para busca
      console.log('Tentando login com:', email, password)
      
      // Simular delay de autenticação
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Simular usuário logado
      setUser({
        id: 'mock-user-id',
        email: email,
        role: 'user'
      })

      toast({
        title: "Login realizado com sucesso!",
        description: "Bem-vindo!",
      })

      // Sempre redirecionar para a página de busca
      navigate('/busca')
      
    } catch (error: any) {
      console.error('Erro no login:', error)
      toast({
        title: "Erro no login",
        description: "Tente novamente",
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
    display_name?: string
    cep?: string
    address?: string
    number?: string
    city?: string
    state?: string
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
        // Aguardar a criação do perfil pelo trigger
        setTimeout(async () => {
          try {
            // Atualizar o perfil com dados adicionais
            const { error: profileError } = await supabase
              .from('profiles')
              .update({
                first_name: userData.first_name,
                last_name: userData.last_name,
                phone: userData.phone,
                display_name: userData.display_name,
                cep: userData.cep,
                address: userData.address,
                number: userData.number,
                city: userData.city,
                state: userData.state,
                location: userData.location,
                services: userData.services,
                description: userData.description
              })
              .eq('id', data.user.id)

            if (profileError) {
              console.error('Erro ao atualizar perfil:', profileError)
            }
          } catch (error) {
            console.error('Erro ao processar perfil:', error)
          }
        }, 1000)

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