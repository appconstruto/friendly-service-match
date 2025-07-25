
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Briefcase, Eye, EyeOff, Mail, Lock, Phone, MapPin } from "lucide-react";
import HamburgerMenu from "@/components/HamburgerMenu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const Auth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState("cliente");
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Credenciais de teste
  const testCredentials = {
    cliente: {
      email: "cliente@teste.com",
      password: "123456"
    },
    prestador: {
      email: "prestador@teste.com", 
      password: "123456"
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLogin) {
      // Verificar credenciais de teste
      if (email === testCredentials.cliente.email && password === testCredentials.cliente.password) {
        toast({
          title: "Login realizado com sucesso!",
          description: "Bem-vindo, Cliente!",
        });
        navigate("/cliente");
      } else if (email === testCredentials.prestador.email && password === testCredentials.prestador.password) {
        toast({
          title: "Login realizado com sucesso!",
          description: "Bem-vindo, Prestador!",
        });
        navigate("/prestador");
      } else {
        toast({
          title: "Erro no login",
          description: "Email ou senha incorretos. Use as credenciais de teste.",
          variant: "destructive",
        });
      }
    } else {
      // Simular cadastro bem-sucedido
      toast({
        title: "Cadastro realizado com sucesso!",
        description: "Sua conta foi criada. Você pode fazer login agora.",
      });
      setIsLogin(true);
    }
  };

  const fillTestCredentials = (type: 'cliente' | 'prestador') => {
    setEmail(testCredentials[type].email);
    setPassword(testCredentials[type].password);
  };

  return (
    <div className="min-h-screen h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-0">
      <HamburgerMenu />
      <div className="w-full max-w-4xl flex flex-col items-center justify-center min-h-[500px] h-full">
        <div className="w-full flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold text-blue-600 mb-2">ServicesHub</h1>
          <p className="text-gray-600 mb-6">
            {isLogin 
              ? "Entre na sua conta para continuar" 
              : "Crie sua conta e comece a usar nossa plataforma"
            }
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            {/* Login/Register Form */}
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl text-center">
                  {isLogin ? "Entrar" : "Criar Conta"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs value={isLogin ? "login" : "register"} className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
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
                    {/* Credenciais de Teste */}
                    <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <h4 className="font-semibold text-blue-800 mb-3">🧪 Credenciais de Teste</h4>
                      <div className="space-y-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="w-full justify-start"
                          onClick={() => fillTestCredentials('cliente')}
                        >
                          <User className="w-4 h-4 mr-2" />
                          Cliente: cliente@teste.com / 123456
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="w-full justify-start"
                          onClick={() => fillTestCredentials('prestador')}
                        >
                          <Briefcase className="w-4 h-4 mr-2" />
                          Prestador: prestador@teste.com / 123456
                        </Button>
                      </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">E-mail</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="email"
                            type="email"
                            placeholder="seu@email.com"
                            className="pl-10"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="password">Senha</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Sua senha"
                            className="pl-10 pr-10"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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

                      <div className="text-right">
                        <a href="#" className="text-sm text-blue-600 hover:underline">
                          Esqueceu sua senha?
                        </a>
                      </div>

                      <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                        Entrar
                      </Button>
                    </form>
                  </TabsContent>

                  <TabsContent value="register">
                    <form onSubmit={handleSubmit} className="space-y-4">
                      {/* User Type Selection */}
                      <div className="space-y-3">
                        <Label>Tipo de Conta</Label>
                        <RadioGroup value={userType} onValueChange={setUserType}>
                          <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                            <RadioGroupItem value="cliente" id="cliente" />
                            <Label htmlFor="cliente" className="flex items-center cursor-pointer flex-1">
                              <User className="w-5 h-5 mr-2 text-blue-600" />
                              <div>
                                <p className="font-medium">Cliente</p>
                                <p className="text-sm text-gray-600">Preciso contratar serviços</p>
                              </div>
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                            <RadioGroupItem value="prestador" id="prestador" />
                            <Label htmlFor="prestador" className="flex items-center cursor-pointer flex-1">
                              <Briefcase className="w-5 h-5 mr-2 text-green-600" />
                              <div>
                                <p className="font-medium">Prestador</p>
                                <p className="text-sm text-gray-600">Quero oferecer serviços</p>
                              </div>
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>

                      {/* Common Fields */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">Nome</Label>
                          <Input
                            id="firstName"
                            type="text"
                            placeholder="Seu nome"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Sobrenome</Label>
                          <Input
                            id="lastName"
                            type="text"
                            placeholder="Seu sobrenome"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="registerEmail">E-mail</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="registerEmail"
                            type="email"
                            placeholder="seu@email.com"
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Telefone</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="(11) 99999-9999"
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="location">Localização</Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="location"
                            type="text"
                            placeholder="Cidade, Estado"
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>

                      {userType === "prestador" && (
                        <>
                          <div className="space-y-2">
                            <Label htmlFor="services">Serviços Oferecidos</Label>
                            <Input
                              id="services"
                              type="text"
                              placeholder="Ex: Limpeza, Jardinagem, Pintura"
                              required
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="description">Descrição do Perfil</Label>
                            <Textarea
                              id="description"
                              placeholder="Descreva sua experiência e especialidades..."
                              rows={3}
                              required
                            />
                          </div>
                        </>
                      )}

                      <div className="space-y-2">
                        <Label htmlFor="registerPassword">Senha</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="registerPassword"
                            type={showPassword ? "text" : "password"}
                            placeholder="Mínimo 8 caracteres"
                            className="pl-10 pr-10"
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

                      <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                        Criar Conta
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Benefits/Features */}
            {/* Card removido conforme solicitado. */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
