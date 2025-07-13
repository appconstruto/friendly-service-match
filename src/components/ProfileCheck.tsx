import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase'

interface ProfileCheckProps {
  children: React.ReactNode
  redirectToSetup?: boolean
}

export const ProfileCheck = ({ children, redirectToSetup = true }: ProfileCheckProps) => {
  const { user, loading } = useAuthContext()
  const navigate = useNavigate()

  useEffect(() => {
    const checkProfile = async () => {
      if (!user || loading) return

      // Modo de desenvolvimento - pular verificação de perfil
      if (user.email?.includes('teste.com')) {
        return
      }

      try {
        const { data: profile } = await supabase
          .from('profiles')
          .select('profile_completed')
          .eq('id', user.id)
          .single()

        if (profile && !profile.profile_completed && redirectToSetup) {
          navigate('/profile-setup')
        }
      } catch (error) {
        console.error('Erro ao verificar perfil:', error)
      }
    }

    checkProfile()
  }, [user, loading, navigate, redirectToSetup])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return <>{children}</>
} 