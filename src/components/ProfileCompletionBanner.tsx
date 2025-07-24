import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '@/contexts/AuthContext'
import { supabase } from '@/integrations/supabase/client'
import { Button } from '@/components/ui/button'
import { X, User, AlertCircle } from 'lucide-react'

export const ProfileCompletionBanner = () => {
  const { user } = useAuthContext()
  const navigate = useNavigate()
  const [showBanner, setShowBanner] = useState(false)
  const [profileCompleted, setProfileCompleted] = useState(true)

  useEffect(() => {
    const checkProfileCompletion = async () => {
      if (!user) return

      try {
        const { data: profile } = await supabase
          .from('profiles')
          .select('profile_completed')
          .eq('id', user.id)
          .single()

        if (profile && !profile.profile_completed) {
          setProfileCompleted(false)
          setShowBanner(true)
        }
      } catch (error) {
        console.error('Erro ao verificar perfil:', error)
      }
    }

    checkProfileCompletion()
  }, [user])

  if (!showBanner || profileCompleted) {
    return null
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-yellow-50 border-b border-yellow-200 p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <AlertCircle className="w-5 h-5 text-yellow-600" />
          <div>
            <p className="text-sm font-medium text-yellow-800">
              Complete seu perfil
            </p>
            <p className="text-xs text-yellow-700">
              Adicione suas informações para aproveitar melhor a plataforma
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            size="sm"
            onClick={() => navigate('/profile-setup')}
            className="bg-yellow-600 hover:bg-yellow-700 text-white"
          >
            <User className="w-4 h-4 mr-1" />
            Completar Perfil
          </Button>
          
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setShowBanner(false)}
            className="text-yellow-600 hover:text-yellow-700"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
} 