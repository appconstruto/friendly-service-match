import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AuthForm } from "@/components/AuthForm"
import { useAuth } from "@/hooks/useAuth"
import { useNavigate } from "react-router-dom"

const Register = () => {
  const { signUp, authLoading } = useAuth()
  const navigate = useNavigate()

  const handleRegister = async (data: any) => {
    const success = await signUp(data)
    if (success) {
      navigate('/login')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-600 mb-2">ServicesHub</h1>
          <p className="text-gray-600">
            Crie sua conta e comece a usar nossa plataforma
          </p>
        </div>

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              Criar Conta
            </CardTitle>
          </CardHeader>
          <CardContent>
            <AuthForm 
              mode="register" 
              onSubmit={handleRegister}
              loading={authLoading}
            />

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Já tem uma conta?{" "}
                <Button 
                  variant="link" 
                  className="p-0 h-auto text-blue-600 hover:text-blue-700"
                  onClick={() => navigate('/login')}
                >
                  Fazer login
                </Button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Register 