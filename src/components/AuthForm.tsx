import { useState } from "react"
import { Eye, EyeOff, Mail, Lock, User, Phone, MapPin, Briefcase, Search, Tag, Check, ChevronsUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { cn } from "@/lib/utils"
import { AuthToggle } from "./AuthToggle"

interface AuthFormProps {
  mode: 'login' | 'register'
  onSubmit: (data: any) => void
  loading?: boolean
}

// Lista completa de serviços
const SERVICES_LIST = [
  "Contabilidade e Auditoria",
  "Advocacia",
  "Arquitetura",
  "Engenharia",
  "Design gráfico e web",
  "Diarista",
  "Serviços de limpeza e conservação predial",
  "Portaria e segurança privada",
  "Clínicas médicas e odontológicas",
  "Psicologia",
  "Fonoaudiologia",
  "Terapia Ocupacional",
  "Fisioterapia",
  "Cuidadores",
  "Motorista",
  "Professores",
  "Aulas de idiomas",
  "Aulas de música",
  "Aulas de dança",
  "Aulas de teatro",
  "Transporte urbano de passageiros",
  "Transporte escolar",
  "Entregadores e motofretes",
  "Motoristas de aplicativos",
  "Serviços de frete e mudança",
  "Desenvolvimento de software e aplicativo",
  "Manutenção de computadores",
  "Oficinas mecânicas",
  "Funilarias",
  "Reparos de eletrodomésticos",
  "Conserto de celulares",
  "Conserto de eletrônicos",
  "Serviços de chaveiro",
  "Pintura",
  "Pedreiro - Alvenaria e Reformas",
  "Encanadores",
  "Eletricistas",
  "Instalação de ar-condicionado",
  "Jardinagem",
  "Paisagismo",
  "Marcenaria",
  "Móveis planejados",
  "Cabeleireiras (os)",
  "Barbeiros",
  "Manicure",
  "Pedicure",
  "Esteticistas",
  "Dermopigmentadores",
  "Depiladores",
  "Maquiadores (as)",
  "Massoterapeutas",
  "Tatuadores (as) e Body piercers",
  "Personal trainers",
  "Instrutores (as) de yoga",
  "Instrutores (as) de pilates",
  "Produção de eventos",
  "DJs",
  "Músicos",
  "Bandas",
  "Atores",
  "Atrizes",
  "Artistas plásticos",
  "Organizadores de eventos",
  "Cerimonialistas",
  "Filmagem",
  "Fotografia",
  "Cozinheiros (as)",
  "Garçons",
  "Lavanderia",
  "Guias turísticos"
]

export const AuthForm = ({ mode, onSubmit, loading = false }: AuthFormProps) => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [userType, setUserType] = useState<'user' | 'provider'>('user')
  const [openServices, setOpenServices] = useState(false)
  
  // Estados do formulário
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    displayName: '',
    phone: '',
    cep: '',
    address: '',
    number: '',
    city: '',
    state: '',
    services: '',
    description: ''
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  // Função para buscar CEP
  const handleCepChange = async (cep: string) => {
    setFormData(prev => ({ ...prev, cep }))
    
    // Buscar CEP quando tiver 8 dígitos
    if (cep.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
        const data = await response.json()
        
        if (!data.erro) {
          setFormData(prev => ({
            ...prev,
            address: data.logradouro || '',
            city: data.localidade || '',
            state: data.uf || ''
          }))
        }
      } catch (error) {
        console.error('Erro ao buscar CEP:', error)
      }
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (mode === 'register') {
      if (formData.password !== formData.confirmPassword) {
        alert('As senhas não coincidem')
        return
      }
      
      if (formData.password.length < 6) {
        alert('A senha deve ter pelo menos 6 caracteres')
        return
      }
    }

    const submitData = mode === 'login' 
      ? { email: formData.email, password: formData.password }
      : { 
          ...formData, 
          role: userType,
          // Converter campos de endereço para location (compatibilidade)
          location: `${formData.address}, ${formData.number} - ${formData.city}, ${formData.state}`,
          // Converter nome completo para firstName e lastName
          firstName: formData.fullName.split(' ')[0] || '',
          lastName: formData.fullName.split(' ').slice(1).join(' ') || ''
        }

    onSubmit(submitData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {mode === 'register' && (
        <AuthToggle value={userType} onValueChange={setUserType} />
      )}

      {mode === 'register' && (
        <div className="space-y-2">
          <Label htmlFor="fullName">
            {userType === 'provider' ? 'Nome Completo ou da Empresa' : 'Nome Completo'}
          </Label>
          <div className="relative">
            <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              id="fullName"
              type="text"
              placeholder={userType === 'provider' ? 'Nome da empresa ou seu nome completo' : 'Seu nome completo'}
              className="pl-10"
              value={formData.fullName}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
              required={mode === 'register'}
            />
          </div>
        </div>
      )}

      {mode === 'register' && userType === 'provider' && (
        <div className="space-y-2">
          <Label htmlFor="displayName">Como quer se identificar no aplicativo</Label>
          <div className="relative">
            <Tag className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              id="displayName"
              type="text"
              placeholder="Nome que aparecerá para os clientes"
              className="pl-10"
              value={formData.displayName}
              onChange={(e) => handleInputChange('displayName', e.target.value)}
              required
            />
          </div>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="email">E-mail</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            id="email"
            type="email"
            placeholder="seu@email.com"
            className="pl-10"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            required
          />
        </div>
      </div>

      {mode === 'register' && (
        <>
          <div className="space-y-2">
            <Label htmlFor="phone">Telefone</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="phone"
                type="tel"
                placeholder="(11) 99999-9999"
                className="pl-10"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                required
              />
            </div>
          </div>

          {/* Campos de endereço */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cep">CEP</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="cep"
                  type="text"
                  placeholder="00000-000"
                  className="pl-10"
                  value={formData.cep}
                  onChange={(e) => handleCepChange(e.target.value.replace(/\D/g, ''))}
                  maxLength={8}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="address">Endereço</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="address"
                    type="text"
                    placeholder="Rua, Avenida, etc."
                    className="pl-10"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="number">Nº</Label>
                <Input
                  id="number"
                  type="text"
                  placeholder="123"
                  value={formData.number}
                  onChange={(e) => handleInputChange('number', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">Cidade</Label>
                <Input
                  id="city"
                  type="text"
                  placeholder="Sua cidade"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">Estado</Label>
                <Input
                  id="state"
                  type="text"
                  placeholder="SP"
                  value={formData.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          {userType === 'provider' && (
            <>
              <div className="space-y-2">
                <Label htmlFor="services">Serviços Oferecidos</Label>
                <Popover open={openServices} onOpenChange={setOpenServices}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={openServices}
                      className="w-full justify-between"
                    >
                      {formData.services
                        ? formData.services
                        : "Selecione o serviço que você oferece..."}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0" align="start">
                    <Command>
                      <CommandInput placeholder="Digite para buscar um serviço..." />
                      <CommandList>
                        <CommandEmpty>Nenhum serviço encontrado.</CommandEmpty>
                        <CommandGroup>
                          {SERVICES_LIST.map((service) => (
                            <CommandItem
                              key={service}
                              value={service}
                              onSelect={(currentValue) => {
                                handleInputChange('services', currentValue)
                                setOpenServices(false)
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  formData.services === service ? "opacity-100" : "opacity-0"
                                )}
                              />
                              {service}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Descrição do Perfil</Label>
                <Textarea
                  id="description"
                  placeholder="Descreva sua experiência e especialidades..."
                  rows={3}
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  required
                />
              </div>
            </>
          )}
        </>
      )}

      <div className="space-y-2">
        <Label htmlFor="password">Senha</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder={mode === 'login' ? "Sua senha" : "Mínimo 6 caracteres"}
            className="pl-10 pr-10"
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            required
          />
          <button
            type="button"
            className="absolute right-3 top-3"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4 text-gray-400" />
            ) : (
              <Eye className="h-4 w-4 text-gray-400" />
            )}
          </button>
        </div>
      </div>

      {mode === 'register' && (
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirmar Senha</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirme sua senha"
              className="pl-10 pr-10"
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute right-3 top-3"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4 text-gray-400" />
              ) : (
                <Eye className="h-4 w-4 text-gray-400" />
              )}
            </button>
          </div>
        </div>
      )}

      {mode === 'login' && (
        <div className="text-right">
          <a href="#" className="text-sm text-blue-600 hover:underline">
            Esqueceu sua senha?
          </a>
        </div>
      )}

      {mode === 'register' && (
        <div className="text-xs text-gray-600">
          Ao criar uma conta, você concorda com nossos{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Termos de Uso
          </a>{" "}
          e{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Política de Privacidade
          </a>
          .
        </div>
      )}

      <Button 
        type="submit" 
        className="w-full bg-blue-600 hover:bg-blue-700" 
        disabled={loading}
      >
        {loading ? (
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            {mode === 'login' ? 'Entrando...' : 'Criando conta...'}
          </div>
        ) : (
          mode === 'login' ? 'Entrar' : 'Criar Conta'
        )}
      </Button>
    </form>
  )
} 