import { createContext, useContext, ReactNode } from 'react'
import { useAuth } from '@/hooks/useAuth'

interface AuthUser {
  id: string
  email: string
  role: 'user' | 'provider'
}

interface AuthContextType {
  user: AuthUser | null
  loading: boolean
  authLoading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (userData: any) => Promise<boolean>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const auth = useAuth()

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider')
  }
  return context
} 