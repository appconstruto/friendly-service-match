
import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Star, Users, CheckCircle, ArrowRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const categories = [
    { name: "Limpeza", count: "1.2k profissionais", icon: "🧹" },
    { name: "Reformas", count: "850 profissionais", icon: "🔨" },
    { name: "Beleza", count: "650 profissionais", icon: "💄" },
    { name: "Tecnologia", count: "400 profissionais", icon: "💻" },
    { name: "Educação", count: "300 profissionais", icon: "📚" },
    { name: "Saúde", count: "200 profissionais", icon: "🏥" },
  ];

  const featuredProviders = [
    {
      name: "Ana Silva",
      service: "Limpeza Residencial",
      rating: 4.9,
      reviews: 127,
      price: "R$ 80/hora",
      image: "https://images.unsplash.com/photo-1494790108755-2616c04e4e8e?w=100&h=100&fit=crop&crop=face",
      location: "São Paulo, SP"
    },
    {
      name: "Carlos Santos",
      service: "Pedreiro",
      rating: 4.8,
      reviews: 95,
      price: "R$ 120/hora",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      location: "Rio de Janeiro, RJ"
    },
    {
      name: "Marina Costa",
      service: "Manicure e Pedicure",
      rating: 5.0,
      reviews: 203,
      price: "R$ 50/sessão",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      location: "Belo Horizonte, MG"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600">ServicesHub</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors">Início</Link>
              <Link to="/como-funciona" className="text-gray-600 hover:text-blue-600 transition-colors">Como Funciona</Link>
              <Link to="/categorias" className="text-gray-600 hover:text-blue-600 transition-colors">Categorias</Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Link to="/auth">
                <Button variant="outline" className="hover:bg-blue-50">Entrar</Button>
              </Link>
              <Link to="/auth">
                <Button className="bg-blue-600 hover:bg-blue-700">Cadastrar</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-6 animate-fade-in">
            Encontre o profissional ideal para o seu projeto
          </h2>
          <p className="text-xl text-gray-600 mb-12 animate-fade-in">
            Conectamos você aos melhores prestadores de serviço da sua região, 
            com segurança e qualidade garantida.
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto mb-8 animate-scale-in">
            <div className="flex">
              <Input
                type="text"
                placeholder="Qual serviço você precisa?"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 h-14 text-lg pl-6 pr-20 border-2 border-blue-200 focus:border-blue-400 rounded-l-full"
              />
              <Button className="h-14 px-8 bg-blue-600 hover:bg-blue-700 rounded-r-full">
                <Search className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center animate-fade-in">
              <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">15k+</h3>
              <p className="text-gray-600">Profissionais cadastrados</p>
            </div>
            <div className="text-center animate-fade-in">
              <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">50k+</h3>
              <p className="text-gray-600">Serviços realizados</p>
            </div>
            <div className="text-center animate-fade-in">
              <div className="flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full mx-auto mb-4">
                <Star className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">4.8</h3>
              <p className="text-gray-600">Avaliação média</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Categorias mais populares
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category, index) => (
              <Card key={category.name} className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-4">{category.icon}</div>
                  <h4 className="font-semibold text-gray-900 mb-2">{category.name}</h4>
                  <p className="text-sm text-gray-600">{category.count}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Providers */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Profissionais em destaque
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProviders.map((provider, index) => (
              <Card key={provider.name} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <img
                      src={provider.image}
                      alt={provider.name}
                      className="w-16 h-16 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900">{provider.name}</h4>
                      <p className="text-gray-600">{provider.service}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="ml-1 font-semibold">{provider.rating}</span>
                      <span className="text-gray-600 ml-1">({provider.reviews} avaliações)</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-gray-600 mb-3">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="text-sm">{provider.location}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-blue-600">{provider.price}</span>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      Ver Perfil
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-white mb-6">
            Pronto para encontrar o profissional ideal?
          </h3>
          <p className="text-xl text-blue-100 mb-8">
            Cadastre-se agora e tenha acesso aos melhores prestadores de serviço da sua região.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/cliente">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                Sou Cliente
              </Button>
            </Link>
            <Link to="/prestador">
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-white border-white hover:bg-white hover:text-blue-600">
                Sou Prestador
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-xl font-bold mb-4">ServicesHub</h4>
              <p className="text-gray-400">
                A plataforma que conecta clientes e prestadores de serviço com segurança e qualidade.
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Para Clientes</h5>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/cliente" className="hover:text-white transition-colors">Dashboard</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Buscar Serviços</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Histórico</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Para Prestadores</h5>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/prestador" className="hover:text-white transition-colors">Dashboard</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Meu Perfil</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Serviços</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Suporte</h5>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="#" className="hover:text-white transition-colors">Central de Ajuda</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Contato</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Termos de Uso</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 ServicesHub. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
