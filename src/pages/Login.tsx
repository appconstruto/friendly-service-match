import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { AuthForm } from "@/components/AuthForm"
import { ServicosJaLogin } from "@/components/ServicosJaLogin"
import { ServicosJaCadastro } from "@/components/ServicosJaCadastro"
import { useAuth } from "@/hooks/useAuth"

const Login = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [showServicosJaInterface, setShowServicosJaInterface] = useState(true)
  const [showCadastro, setShowCadastro] = useState(false)
  const { signIn, signUp, authLoading } = useAuth()

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