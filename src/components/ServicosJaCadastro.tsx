import { useState } from "react"
import { Eye, EyeOff, ArrowLeft, User, Phone, MapPin, Check, ChevronsUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { AuthToggle } from "./AuthToggle"
import { cn } from "@/lib/utils"

interface ServicosJaCadastroProps {
  onSubmit: (data: any) => void
  loading?: boolean
  onBack?: () => void
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
  "Guias turísticos",
  "Outros"
]

export const ServicosJaCadastro = ({ onSubmit, loading = false, onBack }: ServicosJaCadastroProps) => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [userType, setUserType] = useState<'user' | 'provider'>('user')
  const [openServices, setOpenServices] = useState(false)
  const [showOtherModal, setShowOtherModal] = useState(false)
  const [otherAcknowledged, setOtherAcknowledged] = useState(false)
  
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
    description: '',
    otherService: ''
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (formData.password !== formData.confirmPassword) {
      alert('As senhas não coincidem')
      return
    }
    
    if (formData.password.length < 6) {
      alert('A senha deve ter pelo menos 6 caracteres')
      return
    }

    const submitData = { 
      ...formData, 
      role: userType,
      location: `${formData.address}, ${formData.number} - ${formData.city}, ${formData.state}`,
      firstName: formData.fullName.split(' ')[0] || '',
      lastName: formData.fullName.split(' ').slice(1).join(' ') || '',
      services: formData.otherService ? [...formData.services.split(','), formData.otherService].filter(s => s) : formData.services.split(',').filter(s => s)
    }

    onSubmit(submitData)
  }

  const providerCities = [
    'Mogi Guaçu',
    'Mogi Mirim',
    'Itapira',
    'Estiva Gerbi',
    'Espírito Santo do Pinhal',
    'Águas de Lindóia',
    'Lindóia',
    'Serra Negra',
    'Amparo',
    'Monte Alegre do Sul',
    'Socorro',
    'Pedreira',
    'Jacutinga',
    'Monte Sião'
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 via-blue-50 to-blue-100 flex flex-col">
      {/* Header com seta de voltar */}
      <div className="flex items-center p-4 pt-12">
        {onBack && (
          <button onClick={onBack} className="p-2">
            <ArrowLeft className="h-6 w-6 text-gray-700" />
          </button>
        )}
      </div>

      {/* Container principal */}
      <div className="flex-1 flex flex-col items-center px-6 pt-4">
        {/* Logo */}
        <div className="mb-8">
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
        <h1 className="text-2xl font-semibold text-gray-800 mb-8">Criar Conta</h1>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
          {/* Toggle de tipo de usuário */}
          <AuthToggle value={userType} onValueChange={setUserType} />

          {/* Nome Completo */}
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-gray-600 text-sm font-normal">
              {userType === 'provider' ? 'Nome Completo ou da Empresa' : 'Nome Completo'}
            </Label>
            <Input
              id="fullName"
              type="text"
              placeholder={userType === 'provider' ? 'Nome da empresa ou seu nome completo' : 'Seu nome completo'}
              className="w-full h-12 px-4 bg-white border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              value={formData.fullName}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
              required
            />
          </div>

          {/* Nome de exibição para prestadores */}
          {userType === 'provider' && (
            <div className="space-y-2">
              <Label htmlFor="displayName" className="text-gray-600 text-sm font-normal">
                Como quer se identificar no aplicativo
              </Label>
              <Input
                id="displayName"
                type="text"
                placeholder="Nome que aparecerá para os clientes"
                className="w-full h-12 px-4 bg-white border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                value={formData.displayName}
                onChange={(e) => handleInputChange('displayName', e.target.value)}
                required
              />
            </div>
          )}

          {/* E-mail */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-600 text-sm font-normal">
              E-mail
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              className="w-full h-12 px-4 bg-white border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              required
            />
          </div>

          {/* Telefone */}
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-gray-600 text-sm font-normal">
              Telefone
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="(11) 99999-9999"
              className="w-full h-12 px-4 bg-white border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              required
            />
          </div>

          {/* Localização para prestadores */}
          {userType === 'provider' && (
            <>
              <div className="space-y-2">
                <Label htmlFor="state" className="text-gray-600 text-sm font-normal">
                  Estado
                </Label>
                <select
                  id="state"
                  className="w-full h-12 px-4 bg-white border border-gray-200 rounded-xl text-gray-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  value={formData.state}
                  onChange={e => handleInputChange('state', e.target.value)}
                  required
                >
                  <option value="">Selecione o estado</option>
                  <option value="SP">SP</option>
                  <option value="MG">MG</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="city" className="text-gray-600 text-sm font-normal">
                  Cidade
                </Label>
                <select
                  id="city"
                  className="w-full h-12 px-4 bg-white border border-gray-200 rounded-xl text-gray-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  value={formData.city}
                  onChange={e => handleInputChange('city', e.target.value)}
                  required
                >
                  <option value="">Selecione a cidade</option>
                  {providerCities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              {/* Serviços oferecidos */}
              <div className="space-y-2">
                <Label htmlFor="services" className="text-gray-600 text-sm font-normal">
                  Serviços Oferecidos
                </Label>
                <Popover open={openServices} onOpenChange={setOpenServices}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={openServices}
                      className="w-full h-12 justify-between bg-white border border-gray-200 rounded-xl text-gray-800 hover:bg-gray-50 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    >
                      {formData.services || "Selecione o serviço que você oferece..."}
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
                                if (currentValue === 'Outros') {
                                  setShowOtherModal(true)
                                  setOtherAcknowledged(false)
                                }
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
                
                {/* Campo extra para 'Outros' */}
                {formData.services === 'Outros' && otherAcknowledged && (
                  <div className="space-y-2 mt-2">
                    <Label htmlFor="otherService" className="text-gray-600 text-sm font-normal">
                      Qual?
                    </Label>
                    <Input
                      id="otherService"
                      placeholder="Digite o nome do serviço"
                      className="w-full h-12 px-4 bg-white border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      value={formData.otherService || ''}
                      onChange={e => handleInputChange('otherService', e.target.value)}
                      required
                    />
                  </div>
                )}
              </div>
            </>
          )}

          {/* Senha */}
          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-600 text-sm font-normal">
              Senha
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Mínimo 6 caracteres"
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

          {/* Confirmar Senha */}
          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-gray-600 text-sm font-normal">
              Confirmar Senha
            </Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirme sua senha"
                className="w-full h-12 px-4 pr-12 bg-white border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 transform -translate-y-1/2"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          {/* Termos de uso */}
          <div className="text-xs text-gray-600 text-center pt-2">
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
        </form>

        {/* Espaço flexível */}
        <div className="flex-1 min-h-[20px]"></div>

        {/* Botão Criar Conta */}
        <div className="w-full max-w-sm pb-8 pt-4">
          <Button 
            type="submit" 
            onClick={handleSubmit}
            className="w-full h-14 bg-gray-700 hover:bg-gray-800 text-white text-lg font-medium rounded-2xl"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Criando conta...
              </div>
            ) : (
              'Criar Conta'
            )}
          </Button>
        </div>
      </div>

      {/* Modal de aviso para 'Outros' */}
      <Dialog open={showOtherModal} onOpenChange={setShowOtherModal}>
        <DialogContent className="max-w-md text-center">
          <h2 className="text-lg font-bold mb-4">AVISO!</h2>
          <p className="mb-6">
            Como essa categoria de serviço ainda não está registrada em nosso aplicativo, seu perfil passará por uma análise para aprovação. Assim que o cadastro for aprovado, você será avisado por e-mail.
          </p>
          <Button className="w-full" onClick={() => { setShowOtherModal(false); setOtherAcknowledged(true); }}>
            Entendi
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  )
}