import { useState } from 'react'
import { AlertTriangle, X } from 'lucide-react'

export const DevModeBanner = () => {
  const [showBanner, setShowBanner] = useState(true)

  if (!showBanner) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-orange-50 border-b border-orange-200 p-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <AlertTriangle className="w-5 h-5 text-orange-600" />
          <div>
            <p className="text-sm font-medium text-orange-800">
              Modo de Desenvolvimento
            </p>
            <p className="text-xs text-orange-700">
              Usando credenciais de teste. Configure o Supabase para produção.
            </p>
          </div>
        </div>
        
        <button
          onClick={() => setShowBanner(false)}
          className="text-orange-600 hover:text-orange-700"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
} 