import { useState } from "react"
import { ArrowLeft, Eye, EyeOff, Check } from "lucide-react"
import HamburgerMenu from "@/components/HamburgerMenu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { cn } from "@/lib/utils"
import { AuthToggle } from "@/components/AuthToggle"
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { useAuth } from "@/hooks/useAuth"
import { useNavigate } from "react-router-dom"

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

const Register = () => {
  const { signUp, authLoading } = useAuth()
  const navigate = useNavigate()
  
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [userType, setUserType] = useState<'user' | 'provider'>('user')
  const [openServices, setOpenServices] = useState(false)
  const [showOtherModal, setShowOtherModal] = useState(false)
  const [otherAcknowledged, setOtherAcknowledged] = useState(false)
  const [documentType, setDocumentType] = useState<'cpf' | 'cnpj'>('cpf')
  const [contactMethod, setContactMethod] = useState<'telefone' | 'email'>('telefone')
  
  // Estados do formulário
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    displayName: '',
    phone: '',
    cpf: '',
    cnpj: '',
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

  // Função para buscar CEP
  const handleCepChange = async (cep: string) => {
    setFormData(prev => ({ ...prev, cep }))
    
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

  const handleRegister = async (e: React.FormEvent) => {
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
      fullName: `${formData.firstName} ${formData.lastName}`,
      location: `${formData.address}, ${formData.number} - ${formData.city}, ${formData.state}`,
      services: formData.otherService ? [...formData.services.split(','), formData.otherService].filter(s => s) : formData.services.split(',').filter(s => s)
    }

    const success = await signUp(submitData)
    if (success) {
      navigate('/login')
    }
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
      <HamburgerMenu />
      {/* Header com seta de voltar */}
      <div className="flex items-center p-4 pt-12">
        <button 
          onClick={() => navigate('/login')}
          className="p-2"
        >
          <ArrowLeft className="h-6 w-6 text-gray-700" />
        </button>
      </div>

      {/* Container principal */}
      <div className="flex-1 flex flex-col items-center px-6 pt-4 overflow-y-auto">
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
        <h1 className="text-2xl font-semibold text-gray-800 mb-8">Criar conta</h1>
        
        {/* Formulário */}
        <form onSubmit={handleRegister} className="w-full max-w-sm space-y-6 pb-32">
          {/* Tipo de usuário */}
          <AuthToggle value={userType} onValueChange={setUserType} />

          {/* Nome */}
          <div className="space-y-2">
            <Label className="text-gray-600 font-medium">Nome</Label>
            <Input
              placeholder="Nome"
              className="bg-white border-gray-200 rounded-xl h-12 px-4"
              value={formData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              required
            />
          </div>

          {/* Sobrenome */}
          <div className="space-y-2">
            <Label className="text-gray-600 font-medium">Sobrenome</Label>
            <Input
              placeholder="Sobrenome"
              className="bg-white border-gray-200 rounded-xl h-12 px-4"
              value={formData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              required
            />
          </div>

          {/* Nome de exibição para prestadores */}
          {userType === 'provider' && (
            <div className="space-y-2">
              <Label className="text-gray-600 font-medium">Como quer se identificar no aplicativo</Label>
              <Input
                placeholder="Nome que aparecerá para os clientes"
                className="bg-white border-gray-200 rounded-xl h-12 px-4"
                value={formData.displayName}
                onChange={(e) => handleInputChange('displayName', e.target.value)}
                required
              />
            </div>
          )}

          {/* CPF/CNPJ Toggle */}
          <div className="space-y-4">
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => setDocumentType('cpf')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                  documentType === 'cpf' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                  documentType === 'cpf' 
                    ? 'bg-green-500 border-green-500' 
                    : 'border-gray-300'
                }`}>
                  {documentType === 'cpf' && <Check className="w-3 h-3 text-white" />}
                </div>
                <span>CPF</span>
              </button>
              
              <button
                type="button"
                onClick={() => setDocumentType('cnpj')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                  documentType === 'cnpj' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                  documentType === 'cnpj' 
                    ? 'bg-green-500 border-green-500' 
                    : 'border-gray-300'
                }`}>
                  {documentType === 'cnpj' && <Check className="w-3 h-3 text-white" />}
                </div>
                <span>CNPJ</span>
              </button>
            </div>

            {/* Campo CPF/CNPJ */}
            <div className="space-y-2">
              <Label className="text-gray-600 font-medium">{documentType.toUpperCase()}</Label>
              <Input
                placeholder={documentType === 'cpf' ? '000.000.000-00' : '00.000.000/0000-00'}
                className="bg-white border-gray-200 rounded-xl h-12 px-4"
                value={documentType === 'cpf' ? formData.cpf : formData.cnpj}
                onChange={(e) => handleInputChange(documentType, e.target.value)}
                required
              />
            </div>
          </div>

          {/* Método de contato */}
          <div className="space-y-4">
            <p className="text-gray-600 text-sm">
              Selecione abaixo por onde você irá receber seu código de segurança e realizar seu login!
            </p>
            
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => setContactMethod('telefone')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                  contactMethod === 'telefone' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                  contactMethod === 'telefone' 
                    ? 'bg-green-500 border-green-500' 
                    : 'border-gray-300'
                }`}>
                  {contactMethod === 'telefone' && <Check className="w-3 h-3 text-white" />}
                </div>
                <span>Telefone</span>
              </button>
              
              <button
                type="button"
                onClick={() => setContactMethod('email')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                  contactMethod === 'email' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                  contactMethod === 'email' 
                    ? 'bg-green-500 border-green-500' 
                    : 'border-gray-300'
                }`}>
                  {contactMethod === 'email' && <Check className="w-3 h-3 text-white" />}
                </div>
                <span>Email</span>
              </button>
            </div>
          </div>

          {/* Campo de contato */}
          {contactMethod === 'telefone' ? (
            <div className="space-y-2">
              <Label className="text-gray-600 font-medium">Celular</Label>
              <Input
                placeholder="Digite o número do seu celular"
                className="bg-white border-gray-200 rounded-xl h-12 px-4"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                required
              />
            </div>
          ) : (
            <div className="space-y-2">
              <Label className="text-gray-600 font-medium">Email</Label>
              <Input
                type="email"
                placeholder="Digite seu email"
                className="bg-white border-gray-200 rounded-xl h-12 px-4"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
              />
            </div>
          )}

          {/* Campos adicionais para prestadores */}
          {userType === 'provider' && (
            <>
              {/* Localização */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-gray-600 font-medium">Estado</Label>
                  <select
                    className="w-full bg-white border border-gray-200 rounded-xl h-12 px-4"
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
                  <Label className="text-gray-600 font-medium">Cidade</Label>
                  <select
                    className="w-full bg-white border border-gray-200 rounded-xl h-12 px-4"
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
              </div>

              {/* Serviços */}
              <div className="space-y-2">
                <Label className="text-gray-600 font-medium">Serviços Oferecidos</Label>
                <Popover open={openServices} onOpenChange={setOpenServices}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={openServices}
                      className="w-full justify-between bg-white border-gray-200 rounded-xl h-12 px-4"
                    >
                      {formData.services || "Selecione o serviço que você oferece..."}
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
                
                {formData.services === 'Outros' && otherAcknowledged && (
                  <div className="space-y-2 mt-2">
                    <Label className="text-gray-600 font-medium">Qual?</Label>
                    <Input
                      placeholder="Digite o nome do serviço"
                      className="bg-white border-gray-200 rounded-xl h-12 px-4"
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
            <Label className="text-gray-600 font-medium">Senha</Label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Mínimo 6 caracteres"
                className="bg-white border-gray-200 rounded-xl h-12 px-4 pr-12"
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
            <Label className="text-gray-600 font-medium">Confirmar Senha</Label>
            <div className="relative">
              <Input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirme sua senha"
                className="bg-white border-gray-200 rounded-xl h-12 px-4 pr-12"
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

          {/* Espaço flexível para empurrar o botão para baixo */}
          <div className="flex-1 min-h-[40px]"></div>

          {/* Botão Próximo */}
          <div className="w-full pb-8 pt-2">
            <Button 
              type="submit" 
              className="w-full h-14 bg-gray-700 hover:bg-gray-800 text-white text-lg font-medium rounded-2xl"
              disabled={authLoading}
            >
              {authLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Criando conta...
                </div>
              ) : (
                'Próximo'
              )}
            </Button>
          </div>
        </form>
      </div>

      {/* Link para login */}
      <div className="absolute bottom-16 left-0 right-0 px-6">
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Já tem uma conta?{" "}
            <button 
              type="button"
              className="text-blue-600 hover:text-blue-700 font-medium"
              onClick={() => navigate('/login')}
            >
              Fazer login
            </button>
          </p>
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

export default Register 