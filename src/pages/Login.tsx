import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { AuthForm } from "@/components/AuthForm"
import { ServicosJaLogin } from "@/components/ServicosJaLogin"
import { ServicosJaCadastro } from "@/components/ServicosJaCadastro"
import { useAuth } from "@/hooks/useAuth"
import { Menu, X, Home, Search, User, Settings, LogOut } from "lucide-react"
import { useNavigate } from "react-router-dom"

const Login = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [showServicosJaInterface, setShowServicosJaInterface] = useState(true)
  const [showCadastro, setShowCadastro] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { signIn, signUp, authLoading } = useAuth()
  const navigate = useNavigate()

  const menuItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Search, label: "Busca", path: "/busca" },
    { icon: User, label: "Perfil", path: "/cliente" },
    { icon: Settings, label: "Configurações", path: "/configuracoes" },
  ]

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleMenuItemClick = (path: string) => {
    navigate(path)
    setIsMenuOpen(false)
  }

  // Componente do Menu Hamburger
  const HamburgerMenu = () => (
    <>
      {/* Menu Hamburger fixo no topo */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <div className="flex items-center justify-between px-6 py-4">
          {/* Menu Hamburger à esquerda */}
          <button
            onClick={toggleMenu}
            className="flex flex-col items-center justify-center w-8 h-8 space-y-1 hover:bg-gray-100 rounded-lg p-1 transition-colors"
          >
            <div className="w-6 h-0.5 bg-gray-600 rounded-full transition-all duration-300"></div>
            <div className="w-6 h-0.5 bg-gray-600 rounded-full transition-all duration-300"></div>
            <div className="w-6 h-0.5 bg-gray-600 rounded-full transition-all duration-300"></div>
          </button>

          {/* Avatar do usuário à direita */}
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-200 to-blue-400 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
              <User className="w-5 h-5 text-gray-700" />
            </div>
          </div>
        </div>
      </div>

      {/* Menu Lateral Deslizante */}
      <div className={`fixed inset-0 z-50 transition-opacity duration-300 ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        {/* Overlay */}
        <div 
          className="absolute inset-0 bg-black bg-opacity-50"
          onClick={() => setIsMenuOpen(false)}
        ></div>
        
        {/* Menu Content */}
        <div className={`absolute left-0 top-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex flex-col h-full">
            {/* Header do Menu */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">Menu</h2>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Informações do Usuário */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-200 to-blue-400 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-gray-700" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">Visitante</p>
                  <p className="text-sm text-gray-600">Faça login para acessar</p>
                </div>
              </div>
            </div>

            {/* Itens do Menu */}
            <div className="flex-1 py-4">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.path}
                    onClick={() => handleMenuItemClick(item.path)}
                    className="w-full flex items-center space-x-3 px-6 py-4 text-left hover:bg-gray-50 transition-colors"
                  >
                    <Icon className="w-5 h-5 text-gray-600" />
                    <span className="font-medium text-gray-800">{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Botão de Login */}
            <div className="p-6 border-t border-gray-200">
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  // Já estamos na página de login
                }}
                className="w-full flex items-center space-x-3 px-4 py-3 text-left text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Fazer Login</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Espaçamento para o header fixo */}
      <div className="h-16"></div>
    </>
  )

  const handleAuthSubmit = async (data: any) => {
    if (isLogin) {
      await signIn(data.email, data.password)
    } else {
      const success = await signUp(data)
      if (success) {
        setIsLogin(true)
      }
    }
  }

  const handleServicosJaLogin = async (data: { email: string; password: string }) => {
    await signIn(data.email, data.password)
  }

  const handleServicosJaCadastro = async (data: any) => {
    const success = await signUp(data)
    if (success) {
      setShowCadastro(false)
      setIsLogin(true)
    }
  }

  // Mostrar a tela de cadastro ServicosJa
  if (showCadastro) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-100 via-blue-50 to-blue-100 flex flex-col">
        <HamburgerMenu />
        <ServicosJaCadastro 
          onSubmit={handleServicosJaCadastro}
          loading={authLoading}
          onBack={() => setShowCadastro(false)}
        />
        
        {/* Link para fazer login */}
        <div className="absolute bottom-16 left-0 right-0 px-6">
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Já tem uma conta?{" "}
              <button 
                className="text-blue-600 hover:text-blue-700 font-medium"
                onClick={() => setShowCadastro(false)}
              >
                Fazer login
              </button>
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Mostrar a tela de login ServicosJa por padrão
  if (showServicosJaInterface) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-100 via-blue-50 to-blue-100 flex flex-col">
        <HamburgerMenu />
        <ServicosJaLogin 
          onSubmit={handleServicosJaLogin}
          loading={authLoading}
          onBack={() => setShowServicosJaInterface(false)}
        />
        
        {/* Link para criar conta */}
        <div className="absolute bottom-16 left-0 right-0 px-6">
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Não tem uma conta?{" "}
              <button 
                className="text-blue-600 hover:text-blue-700 font-medium"
                onClick={() => setShowCadastro(true)}
              >
                Criar nova conta
              </button>
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <HamburgerMenu />
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-600 mb-2">ServicesHub</h1>
          <p className="text-gray-600">
            {isLogin 
              ? "Entre na sua conta para continuar" 
              : "Crie sua conta e comece a usar nossa plataforma"
            }
          </p>
        </div>

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              {isLogin ? "Entrar" : "Criar Conta"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={isLogin ? "login" : "register"} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger 
                  value="login" 
                  onClick={() => setIsLogin(true)}
                >
                  Entrar
                </TabsTrigger>
                <TabsTrigger 
                  value="register" 
                  onClick={() => setIsLogin(false)}
                >
                  Cadastrar
                </TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <AuthForm 
                  mode="login" 
                  onSubmit={handleAuthSubmit}
                  loading={authLoading}
                />
              </TabsContent>

              <TabsContent value="register">
                <AuthForm 
                  mode="register" 
                  onSubmit={handleAuthSubmit}
                  loading={authLoading}
                />
              </TabsContent>
            </Tabs>

            {isLogin && (
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Não tem uma conta?{" "}
                  <Button 
                    variant="link" 
                    className="p-0 h-auto text-blue-600 hover:text-blue-700"
                    onClick={() => setIsLogin(false)}
                  >
                    Criar nova conta
                  </Button>
                </p>
              </div>
            )}

            {!isLogin && (
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Já tem uma conta?{" "}
                  <Button 
                    variant="link" 
                    className="p-0 h-auto text-blue-600 hover:text-blue-700"
                    onClick={() => setIsLogin(true)}
                  >
                    Fazer login
                  </Button>
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Login 