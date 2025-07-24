import { useState } from "react"
import { Eye, EyeOff, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface ServicosJaLoginProps {
  onSubmit: (data: { email: string; password: string }) => void
  loading?: boolean
  onBack?: () => void
}

export const ServicosJaLogin = ({ onSubmit, loading = false, onBack }: ServicosJaLoginProps) => {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Header com seta de voltar */}
      <div className="flex items-center p-4 pt-12">
        {onBack && (
          <button onClick={onBack} className="p-2">
            <ArrowLeft className="h-6 w-6 text-gray-700" />
          </button>
        )}
      </div>

      {/* Container principal */}
      <div className="flex-1 flex flex-col items-center px-6 pt-8">
        {/* Logo */}
        <div className="mb-12">
          <div className="flex items-center justify-center mb-2">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
              <div className="w-4 h-4 bg-white rounded-full"></div>
            </div>
            <span className="text-2xl font-bold">
              <span className="text-blue-600">Serviços</span>
              <span className="text-cyan-400"> Já</span>
            </span>
          </div>
        </div>

        {/* Título */}
        <h1 className="text-2xl font-semibold text-gray-800 mb-12">Login</h1>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-6">
          {/* Campo Celular ou e-mail */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-600 text-sm font-normal">
              Celular ou e-mail
            </Label>
            <Input
              id="email"
              type="text"
              placeholder="Digite seu telefone ou e-mail"
              className="w-full h-12 px-4 bg-white border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              required
            />
          </div>

          {/* Campo Senha */}
          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-600 text-sm font-normal">
              Senha
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Digite sua senha"
                className="w-full h-12 px-4 pr-12 bg-white border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 transform -translate-y-1/2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          {/* Link Esqueci minha senha */}
          <div className="text-center pt-2">
            <a href="#" className="text-gray-500 text-sm hover:text-gray-700">
              Esqueci minha senha.
            </a>
          </div>
        </form>

        {/* Espaço flexível para empurrar o botão para baixo */}
        <div className="flex-1 min-h-[40px]"></div>

        {/* Botão Entrar */}
        <div className="w-full max-w-sm pb-8 pt-2">
          <Button
            type="submit"
            onClick={handleSubmit}
            className="w-full h-14 bg-gray-700 hover:bg-gray-800 text-white text-lg font-medium rounded-2xl"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Entrando...
              </div>
            ) : (
              'Entrar'
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}