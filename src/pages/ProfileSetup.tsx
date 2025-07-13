import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuthContext } from "@/contexts/AuthContext"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { 
  User, 
  Phone, 
  MapPin, 
  Briefcase, 
  Camera, 
  Upload,
  Calendar,
  Star,
  Award,
  CheckCircle
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const ProfileSetup = () => {
  const navigate = useNavigate()
  const { user } = useAuthContext()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [avatar, setAvatar] = useState<File | null>(null)
  const [avatarPreview, setAvatarPreview] = useState<string>("")

  const [formData, setFormData] = useState({
    // Informações básicas
    first_name: "",
    last_name: "",
    phone: "",
    location: "",
    birth_date: "",
    
    // Informações profissionais (apenas para prestadores)
    services: "",
    description: "",
    experience_years: "",
    hourly_rate: "",
    availability: "",
    specializations: "",
    
    // Informações adicionais
    bio: "",
    website: "",
    social_media: "",
    
    // Preferências
    preferred_contact: "phone",
    notifications: true,
    public_profile: true
  })

  const totalSteps = user?.role === 'provider' ? 4 : 3
  const progress = (currentStep / totalSteps) * 100

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setAvatar(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setAvatarPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const uploadAvatar = async (): Promise<string | null> => {
    if (!avatar || !user) return null

    try {
      const fileExt = avatar.name.split('.').pop()
      const fileName = `${user.id}-${Date.now()}.${fileExt}`
      const filePath = `avatars/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, avatar)

      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath)

      return publicUrl
    } catch (error) {
      console.error('Erro ao fazer upload do avatar:', error)
      return null
    }
  }

  const saveProfile = async () => {
    setLoading(true)
    try {
      // Modo de desenvolvimento - simular salvamento
      if (user?.email?.includes('teste.com')) {
        toast({
          title: "Perfil atualizado com sucesso!",
          description: "Suas informações foram salvas. (Modo de desenvolvimento)",
        })

        // Redirecionar baseado no role
        if (user?.role === 'user') {
          navigate('/cliente')
        } else {
          navigate('/prestador')
        }
        return
      }

      let avatarUrl = null
      if (avatar) {
        avatarUrl = await uploadAvatar()
      }

      const { error } = await supabase
        .from('profiles')
        .update({
          ...formData,
          avatar_url: avatarUrl,
          profile_completed: true,
          updated_at: new Date().toISOString()
        })
        .eq('id', user?.id)

      if (error) throw error

      toast({
        title: "Perfil atualizado com sucesso!",
        description: "Suas informações foram salvas.",
      })

      // Redirecionar baseado no role
      if (user?.role === 'user') {
        navigate('/cliente')
      } else {
        navigate('/prestador')
      }
    } catch (error: any) {
      toast({
        title: "Erro ao salvar perfil",
        description: error.message || "Tente novamente",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Informações Básicas
        </h2>
        <p className="text-gray-600">
          Vamos começar com suas informações pessoais
        </p>
      </div>

      {/* Avatar */}
      <div className="text-center">
        <div className="relative inline-block">
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
            {avatarPreview ? (
              <img 
                src={avatarPreview} 
                alt="Avatar preview" 
                className="w-full h-full object-cover"
              />
            ) : (
              <Camera className="w-8 h-8 text-gray-400" />
            )}
          </div>
          <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700">
            <Upload className="w-4 h-4" />
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
            />
          </label>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          Clique para adicionar uma foto de perfil
        </p>
      </div>

      {/* Nome */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">Nome</Label>
          <div className="relative">
            <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              id="firstName"
              placeholder="Seu nome"
              className="pl-10"
              value={formData.first_name}
              onChange={(e) => handleInputChange('first_name', e.target.value)}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Sobrenome</Label>
          <Input
            id="lastName"
            placeholder="Seu sobrenome"
            value={formData.last_name}
            onChange={(e) => handleInputChange('last_name', e.target.value)}
          />
        </div>
      </div>

      {/* Telefone */}
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
          />
        </div>
      </div>

      {/* Localização */}
      <div className="space-y-2">
        <Label htmlFor="location">Localização</Label>
        <div className="relative">
          <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            id="location"
            placeholder="Cidade, Estado"
            className="pl-10"
            value={formData.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
          />
        </div>
      </div>

      {/* Data de nascimento */}
      <div className="space-y-2">
        <Label htmlFor="birthDate">Data de Nascimento</Label>
        <div className="relative">
          <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            id="birthDate"
            type="date"
            className="pl-10"
            value={formData.birth_date}
            onChange={(e) => handleInputChange('birth_date', e.target.value)}
          />
        </div>
      </div>
    </div>
  )

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {user?.role === 'provider' ? 'Informações Profissionais' : 'Sobre Você'}
        </h2>
        <p className="text-gray-600">
          {user?.role === 'provider' 
            ? 'Conte-nos sobre seus serviços e experiência'
            : 'Conte-nos um pouco sobre você'
          }
        </p>
      </div>

      {user?.role === 'provider' ? (
        <>
          {/* Serviços */}
          <div className="space-y-2">
            <Label htmlFor="services">Serviços Oferecidos</Label>
            <div className="relative">
              <Briefcase className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="services"
                placeholder="Ex: Limpeza, Jardinagem, Pintura"
                className="pl-10"
                value={formData.services}
                onChange={(e) => handleInputChange('services', e.target.value)}
              />
            </div>
          </div>

          {/* Anos de experiência */}
          <div className="space-y-2">
            <Label htmlFor="experience">Anos de Experiência</Label>
            <Input
              id="experience"
              type="number"
              placeholder="Ex: 5"
              value={formData.experience_years}
              onChange={(e) => handleInputChange('experience_years', e.target.value)}
            />
          </div>

          {/* Preço por hora */}
          <div className="space-y-2">
            <Label htmlFor="hourlyRate">Preço por Hora (R$)</Label>
            <Input
              id="hourlyRate"
              type="number"
              placeholder="Ex: 50"
              value={formData.hourly_rate}
              onChange={(e) => handleInputChange('hourly_rate', e.target.value)}
            />
          </div>

          {/* Disponibilidade */}
          <div className="space-y-2">
            <Label htmlFor="availability">Disponibilidade</Label>
            <Input
              id="availability"
              placeholder="Ex: Segunda a Sexta, 8h às 18h"
              value={formData.availability}
              onChange={(e) => handleInputChange('availability', e.target.value)}
            />
          </div>

          {/* Especializações */}
          <div className="space-y-2">
            <Label htmlFor="specializations">Especializações</Label>
            <Input
              id="specializations"
              placeholder="Ex: Limpeza residencial, Limpeza comercial"
              value={formData.specializations}
              onChange={(e) => handleInputChange('specializations', e.target.value)}
            />
          </div>
        </>
      ) : (
        <>
          {/* Bio para usuários */}
          <div className="space-y-2">
            <Label htmlFor="bio">Sobre Você</Label>
            <Textarea
              id="bio"
              placeholder="Conte-nos um pouco sobre você e seus interesses..."
              rows={4}
              value={formData.bio}
              onChange={(e) => handleInputChange('bio', e.target.value)}
            />
          </div>
        </>
      )}

      {/* Descrição */}
      <div className="space-y-2">
        <Label htmlFor="description">
          {user?.role === 'provider' ? 'Descrição do Perfil' : 'Descrição'}
        </Label>
        <Textarea
          id="description"
          placeholder={
            user?.role === 'provider' 
              ? "Descreva sua experiência, especialidades e como você pode ajudar..."
              : "Descreva o que você está procurando..."
          }
          rows={4}
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
        />
      </div>
    </div>
  )

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Informações Adicionais
        </h2>
        <p className="text-gray-600">
          Complete seu perfil com informações extras
        </p>
      </div>

      {/* Website */}
      <div className="space-y-2">
        <Label htmlFor="website">Website (opcional)</Label>
        <Input
          id="website"
          type="url"
          placeholder="https://seusite.com"
          value={formData.website}
          onChange={(e) => handleInputChange('website', e.target.value)}
        />
      </div>

      {/* Redes sociais */}
      <div className="space-y-2">
        <Label htmlFor="socialMedia">Redes Sociais (opcional)</Label>
        <Input
          id="socialMedia"
          placeholder="Instagram, LinkedIn, etc."
          value={formData.social_media}
          onChange={(e) => handleInputChange('social_media', e.target.value)}
        />
      </div>

      {/* Preferência de contato */}
      <div className="space-y-2">
        <Label>Preferência de Contato</Label>
        <div className="flex gap-4">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="contact"
              value="phone"
              checked={formData.preferred_contact === 'phone'}
              onChange={(e) => handleInputChange('preferred_contact', e.target.value)}
            />
            <span>Telefone</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="contact"
              value="email"
              checked={formData.preferred_contact === 'email'}
              onChange={(e) => handleInputChange('preferred_contact', e.target.value)}
            />
            <span>Email</span>
          </label>
        </div>
      </div>

      {/* Configurações */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <Label>Receber notificações</Label>
            <p className="text-sm text-gray-500">
              Receba atualizações sobre novos serviços
            </p>
          </div>
          <input
            type="checkbox"
            checked={formData.notifications}
            onChange={(e) => handleInputChange('notifications', e.target.checked)}
            className="w-4 h-4"
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label>Perfil público</Label>
            <p className="text-sm text-gray-500">
              Seu perfil será visível para outros usuários
            </p>
          </div>
          <input
            type="checkbox"
            checked={formData.public_profile}
            onChange={(e) => handleInputChange('public_profile', e.target.checked)}
            className="w-4 h-4"
          />
        </div>
      </div>
    </div>
  )

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Revisão Final
        </h2>
        <p className="text-gray-600">
          Revise suas informações antes de finalizar
        </p>
      </div>

      <div className="bg-gray-50 rounded-lg p-6 space-y-4">
        <div className="flex items-center space-x-3">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <span className="font-medium">Informações básicas completas</span>
        </div>
        <div className="flex items-center space-x-3">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <span className="font-medium">Perfil profissional configurado</span>
        </div>
        <div className="flex items-center space-x-3">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <span className="font-medium">Preferências definidas</span>
        </div>
      </div>

      <div className="text-center">
        <p className="text-gray-600 mb-4">
          Seu perfil está pronto! Clique em "Finalizar" para começar a usar a plataforma.
        </p>
      </div>
    </div>
  )

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderStep1()
      case 2:
        return renderStep2()
      case 3:
        return renderStep3()
      case 4:
        return renderStep4()
      default:
        return renderStep1()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-center">
              Configurar Perfil
            </CardTitle>
            
            {/* Progress bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Passo {currentStep} de {totalSteps}</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="w-full" />
            </div>
          </CardHeader>
          
          <CardContent>
            {renderCurrentStep()}

            {/* Botões de navegação */}
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
              >
                Anterior
              </Button>

              {currentStep < totalSteps ? (
                <Button onClick={nextStep}>
                  Próximo
                </Button>
              ) : (
                <Button 
                  onClick={saveProfile}
                  disabled={loading}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {loading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Salvando...
                    </div>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Finalizar
                    </>
                  )}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ProfileSetup 