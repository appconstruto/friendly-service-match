import { useState } from "react";
import { Search, Filter, Star, MapPin, Clock, Heart, MessageCircle, Calendar } from "lucide-react";
import HamburgerMenu from "@/components/HamburgerMenu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Cliente = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [favorites, setFavorites] = useState<string[]>([]);

  const providers = [
    {
      id: "1",
      name: "Ana Silva",
      service: "Limpeza Residencial",
      description: "Especialista em limpeza completa de residências, com 8 anos de experiência.",
      rating: 4.9,
      reviews: 127,
      price: "R$ 80/hora",
      image: "https://images.unsplash.com/photo-1494790108755-2616c04e4e8e?w=100&h=100&fit=crop&crop=face",
      location: "São Paulo, SP",
      distance: "2.5 km",
      verified: true,
      availability: "Disponível hoje",
      tags: ["Limpeza", "Organização", "Confiável"]
    },
    {
      id: "2",
      name: "Carlos Santos",
      service: "Pedreiro e Reformas",
      description: "Pedreiro especializado em reformas residenciais e comerciais.",
      rating: 4.8,
      reviews: 95,
      price: "R$ 120/hora",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      location: "Rio de Janeiro, RJ",
      distance: "1.8 km",
      verified: true,
      availability: "Disponível amanhã",
      tags: ["Reforma", "Construção", "Experiência"]
    },
    {
      id: "3",
      name: "Marina Costa",
      service: "Manicure e Pedicure",
      description: "Manicure profissional com atendimento domiciliar.",
      rating: 5.0,
      reviews: 203,
      price: "R$ 50/sessão",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      location: "Belo Horizonte, MG",
      distance: "3.2 km",
      verified: true,
      availability: "Disponível hoje",
      tags: ["Beleza", "Domiciliar", "Qualidade"]
    },
    {
      id: "4",
      name: "Roberto Lima",
      service: "Eletricista",
      description: "Eletricista certificado com 15 anos de experiência em instalações.",
      rating: 4.7,
      reviews: 78,
      price: "R$ 100/hora",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      location: "São Paulo, SP",
      distance: "4.1 km",
      verified: true,
      availability: "Disponível após 14h",
      tags: ["Elétrica", "Certificado", "Emergência"]
    }
  ];

  const recentServices = [
    {
      provider: "Ana Silva",
      service: "Limpeza Residencial",
      date: "15/12/2024",
      status: "Concluído",
      rating: 5
    },
    {
      provider: "Carlos Santos",
      service: "Reparo na Parede",
      date: "10/12/2024",
      status: "Concluído",
      rating: 4
    }
  ];

  const toggleFavorite = (providerId: string) => {
    setFavorites(prev => 
      prev.includes(providerId) 
        ? prev.filter(id => id !== providerId)
        : [...prev, providerId]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 via-blue-50 to-blue-100">
      <HamburgerMenu />
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-blue-600">Dashboard Cliente</h1>
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <span className="text-gray-700">João Silva</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Filtros</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Categoria</label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Todas as categorias" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas as categorias</SelectItem>
                      <SelectItem value="limpeza">Limpeza</SelectItem>
                      <SelectItem value="reforma">Reformas</SelectItem>
                      <SelectItem value="beleza">Beleza</SelectItem>
                      <SelectItem value="eletrica">Elétrica</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Distância</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Até 5 km" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Até 1 km</SelectItem>
                      <SelectItem value="5">Até 5 km</SelectItem>
                      <SelectItem value="10">Até 10 km</SelectItem>
                      <SelectItem value="20">Até 20 km</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Avaliação</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Todas" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 estrelas</SelectItem>
                      <SelectItem value="4">4+ estrelas</SelectItem>
                      <SelectItem value="3">3+ estrelas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  <Filter className="w-4 h-4 mr-2" />
                  Aplicar Filtros
                </Button>
              </CardContent>
            </Card>

            {/* Recent Services */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Serviços Recentes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentServices.map((service, index) => (
                    <div key={index} className="border-l-4 border-blue-600 pl-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-gray-900">{service.provider}</p>
                          <p className="text-sm text-gray-600">{service.service}</p>
                          <p className="text-xs text-gray-500">{service.date}</p>
                        </div>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="ml-1 text-sm">{service.rating}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <Input
                      type="text"
                      placeholder="Buscar por serviço, profissional ou localização..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="h-12"
                    />
                  </div>
                  <Button className="h-12 px-6 bg-blue-600 hover:bg-blue-700">
                    <Search className="w-5 h-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Results Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Prestadores de Serviço ({providers.length} encontrados)
              </h2>
              <Select>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Ordenar por relevância" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevância</SelectItem>
                  <SelectItem value="rating">Melhor avaliação</SelectItem>
                  <SelectItem value="price">Menor preço</SelectItem>
                  <SelectItem value="distance">Mais próximo</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Providers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {providers.map((provider) => (
                <Card key={provider.id} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <Avatar className="w-16 h-16">
                          <AvatarImage src={provider.image} alt={provider.name} />
                          <AvatarFallback>{provider.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center">
                            <h3 className="font-semibold text-gray-900">{provider.name}</h3>
                            {provider.verified && (
                              <Badge variant="secondary" className="ml-2 bg-green-100 text-green-800">
                                Verificado
                              </Badge>
                            )}
                          </div>
                          <p className="text-blue-600 font-medium">{provider.service}</p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleFavorite(provider.id)}
                        className="p-2"
                      >
                        <Heart 
                          className={`w-5 h-5 ${
                            favorites.includes(provider.id) 
                              ? 'text-red-500 fill-current' 
                              : 'text-gray-400'
                          }`} 
                        />
                      </Button>
                    </div>

                    <p className="text-gray-600 text-sm mb-4">{provider.description}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {provider.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                          <span className="font-semibold">{provider.rating}</span>
                          <span className="text-gray-600 text-sm ml-1">({provider.reviews} avaliações)</span>
                        </div>
                        <span className="text-lg font-semibold text-blue-600">{provider.price}</span>
                      </div>
                      
                      <div className="flex items-center text-gray-600 text-sm">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span>{provider.location} • {provider.distance}</span>
                      </div>
                      
                      <div className="flex items-center text-green-600 text-sm">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>{provider.availability}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                        <Calendar className="w-4 h-4 mr-2" />
                        Agendar
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Conversar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-8">
              <Button variant="outline" size="lg">
                Carregar mais prestadores
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cliente;
