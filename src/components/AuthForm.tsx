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
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useEffect } from 'react';

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
  "Guias turísticos",
  "Outros"
]

// Mapeamento de cidades para faixas de CEP (exemplo, ajuste conforme necessário)
const cityCepRanges = {
  'Mogi Guaçu': [/^1384[0-9]{3}$/],
  'Mogi Mirim': [/^1380[0-9]{3}$/],
  'Estiva Gerbi': [/^13857[0-9]{2}$/],
  'Espírito Santo do Pinhal': [/^1399[0-9]{3}$/],
  'Águas de Lindóia': [/^1394[0-9]{3}$/],
  'Lindóia': [/^1395[0-9]{3}$/],
  'Serra Negra': [/^1393[0-9]{3}$/],
  'Amparo': [/^1390[0-9]{3}$/],
  'Monte Alegre do Sul': [/^1391[0-9]{3}$/],
  'Socorro': [/^1396[0-9]{3}$/],
  'Pedreira': [/^1392[0-9]{3}$/],
  'Jacutinga': [/^3759[0-9]{3}$/],
  'Monte Sião': [/^3758[0-9]{3}$/],
};

export const AuthForm = ({ mode, onSubmit, loading = false }: AuthFormProps) => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [userType, setUserType] = useState<'user' | 'provider'>('user')
  const [openServices, setOpenServices] = useState(false)
  const [showOtherModal, setShowOtherModal] = useState(false);
  const [otherAcknowledged, setOtherAcknowledged] = useState(false);
  const [showCepModal, setShowCepModal] = useState(false);
  const [cepInput, setCepInput] = useState('');
  
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
    description: '',
    otherService: '' // Novo campo para serviço 'Outros'
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
          lastName: formData.fullName.split(' ').slice(1).join(' ') || '',
          // Adicionar o serviço 'Outros' ao array de serviços
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
  ];

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
            {/* Localização - ordem dinâmica */}
            {userType === 'provider' ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="state">Estado</Label>
                  <select
                    id="state"
                    className="w-full border rounded-md px-3 py-2 text-sm"
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
                  <Label htmlFor="city">Cidade</Label>
                  <select
                    id="city"
                    className="w-full border rounded-md px-3 py-2 text-sm"
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
              </>
            ) : null}
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
                    <Label htmlFor="otherService">Qual?</Label>
                    <Input
                      id="otherService"
                      placeholder="Digite o nome do serviço"
                      value={formData.otherService || ''}
                      onChange={e => handleInputChange('otherService', e.target.value)}
                      required
                    />
                  </div>
                )}
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
    </form>
  )
} 