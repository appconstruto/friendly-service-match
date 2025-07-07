
import { useState } from "react";
import { Star, Calendar, MessageCircle, TrendingUp, Settings, Plus, Edit3, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";

const Prestador = () => {
  const [profileVisible, setProfileVisible] = useState(true);

  const stats = [
    { label: "Serviços Concluídos", value: "127", icon: "✅", color: "text-green-600" },
    { label: "Avaliação Média", value: "4.9", icon: "⭐", color: "text-yellow-600" },
    { label: "Taxa de Resposta", value: "98%", icon: "💬", color: "text-blue-600" },
    { label: "Ganhos Este Mês", value: "R$ 3.240", icon: "💰", color: "text-purple-600" }
  ];

  const recentServices = [
    {
      client: "Maria Santos",
      service: "Limpeza Residencial",
      date: "2024-12-15",
      status: "Concluído",
      value: "R$ 160",
      rating: 5
    },
    {
      client: "João Oliveira",
      service: "Limpeza Pós-Obra",
      date: "2024-12-12",
      status: "Concluído",
      value: "R$ 320",
      rating: 5
    },
    {
      client: "Ana Costa",
      service: "Limpeza Semanal",
      date: "2024-12-10",
      status: "Agendado",
      value: "R$ 120",
      rating: null
    }
  ];

  const upcomingServices = [
    {
      client: "Pedro Silva",
      service: "Limpeza Residencial",
      date: "2024-12-20",
      time: "14:00",
      address: "Rua das Flores, 123 - Centro"
    },
    {
      client: "Lucia Mendes",
      service: "Limpeza Comercial",
      date: "2024-12-22",
      time: "09:00",
      address: "Av. Principal, 456 - Sala 201"
    }
  ];

  const monthlyData = [
    { month: "Jul", earnings: 2800 },
    { month: "Ago", earnings: 3200 },
    { month: "Set", earnings: 2900 },
    { month: "Out", earnings: 3500 },
    { month: "Nov", earnings: 3100 },
    { month: "Dez", earnings: 3240 }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-blue-600">Dashboard Prestador</h1>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Perfil Ativo</span>
                <Switch 
                  checked={profileVisible} 
                  onCheckedChange={setProfileVisible}
                />
              </div>
              <Avatar>
                <AvatarImage src="https://images.unsplash.com/photo-1494790108755-2616c04e4e8e?w=40&h=40&fit=crop&crop=face" />
                <AvatarFallback>AS</AvatarFallback>
              </Avatar>
              <span className="text-gray-700">Ana Silva</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Olá, Ana!</h2>
          <p className="text-gray-600">Aqui está o resumo da sua atividade como prestadora de serviços.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">{stat.label}</p>
                        <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
                      </div>
                      <div className="text-3xl">{stat.icon}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Performance Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Ganhos dos Últimos 6 Meses
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {monthlyData.map((data, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600 w-12">{data.month}</span>
                      <div className="flex-1 mx-4">
                        <Progress 
                          value={(data.earnings / 4000) * 100} 
                          className="h-3"
                        />
                      </div>
                      <span className="text-sm font-semibold text-gray-900 w-20 text-right">
                        R$ {data.earnings.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Services */}
            <Card>
              <CardHeader>
                <CardTitle>Serviços Recentes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentServices.map((service, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <Avatar className="w-10 h-10">
                            <AvatarFallback>{service.client.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-gray-900">{service.client}</p>
                            <p className="text-sm text-gray-600">{service.service}</p>
                            <p className="text-xs text-gray-500">{new Date(service.date).toLocaleDateString('pt-BR')}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <Badge 
                          variant={service.status === 'Concluído' ? 'default' : 'secondary'}
                          className={service.status === 'Concluído' ? 'bg-green-100 text-green-800' : ''}
                        >
                          {service.status}
                        </Badge>
                      </div>
                      
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">{service.value}</p>
                        {service.rating && (
                          <div className="flex items-center justify-end">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="ml-1 text-sm">{service.rating}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Meu Perfil</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <Avatar className="w-20 h-20 mx-auto mb-4">
                    <AvatarImage src="https://images.unsplash.com/photo-1494790108755-2616c04e4e8e?w=80&h=80&fit=crop&crop=face" />
                    <AvatarFallback>AS</AvatarFallback>
                  </Avatar>
                  <h3 className="font-semibold text-gray-900">Ana Silva</h3>
                  <p className="text-sm text-gray-600">Limpeza Residencial</p>
                  <div className="flex items-center justify-center mt-2">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="ml-1 font-semibold">4.9</span>
                    <span className="text-gray-600 text-sm ml-1">(127 avaliações)</span>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" size="sm">
                      <Edit3 className="w-4 h-4 mr-2" />
                      Editar
                    </Button>
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      Visualizar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Ações Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Serviço
                </Button>
                <Button variant="outline" className="w-full">
                  <Calendar className="w-4 h-4 mr-2" />
                  Gerenciar Agenda
                </Button>
                <Button variant="outline" className="w-full">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Mensagens
                </Button>
                <Button variant="outline" className="w-full">
                  <Settings className="w-4 h-4 mr-2" />
                  Configurações
                </Button>
              </CardContent>
            </Card>

            {/* Upcoming Services */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Próximos Serviços</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingServices.map((service, index) => (
                    <div key={index} className="border-l-4 border-blue-600 pl-4">
                      <div className="space-y-1">
                        <p className="font-medium text-gray-900">{service.client}</p>
                        <p className="text-sm text-gray-600">{service.service}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(service.date).toLocaleDateString('pt-BR')} às {service.time}
                        </p>
                        <p className="text-xs text-gray-500">{service.address}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4">
                  Ver Agenda Completa
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prestador;
