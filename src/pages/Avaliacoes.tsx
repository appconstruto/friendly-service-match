
import { useState } from "react";
import { Star, Filter, TrendingUp, Award, Users } from "lucide-react";
import HamburgerMenu from "@/components/HamburgerMenu";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import ReviewCard from "@/components/ReviewCard";

const Avaliacoes = () => {
  const [filterRating, setFilterRating] = useState("");
  const [sortBy, setSortBy] = useState("recent");

  const stats = {
    totalReviews: 127,
    averageRating: 4.9,
    ratingDistribution: [
      { stars: 5, count: 98, percentage: 77 },
      { stars: 4, count: 20, percentage: 16 },
      { stars: 3, count: 6, percentage: 5 },
      { stars: 2, count: 2, percentage: 1 },
      { stars: 1, count: 1, percentage: 1 }
    ]
  };

  const reviews = [
    {
      id: "1",
      client: "Maria Santos",
      clientImage: "https://images.unsplash.com/photo-1494790108755-2616c04e4e8e?w=40&h=40&fit=crop&crop=face",
      rating: 5,
      date: "2024-12-15",
      service: "Limpeza Residencial",
      comment: "Excelente trabalho! Ana foi muito profissional, pontual e deixou minha casa impecável. Super recomendo seus serviços!",
      helpful: 12,
      providerResponse: "Muito obrigada pelo feedback, Maria! Foi um prazer trabalhar na sua casa. Fico muito feliz que tenha ficado satisfeita com o resultado!"
    },
    {
      id: "2",
      client: "João Oliveira",
      clientImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      rating: 5,
      date: "2024-12-12",
      service: "Limpeza Pós-Obra",
      comment: "Serviço impecável! A Ana conseguiu deixar meu apartamento que estava em reforma completamente limpo. Trabalho de qualidade e preço justo.",
      helpful: 8
    },
    {
      id: "3",
      client: "Carla Mendes",
      clientImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
      rating: 4,
      date: "2024-12-08",
      service: "Limpeza Semanal",
      comment: "Muito boa profissional! Sempre pontual e faz um ótimo trabalho. Único ponto é que às vezes demora um pouco mais do que o combinado, mas o resultado sempre compensa.",
      helpful: 5,
      providerResponse: "Obrigada pelo feedback, Carla! Vou me atentar melhor aos horários para otimizar ainda mais nosso tempo."
    },
    {
      id: "4",
      client: "Pedro Silva",
      rating: 5,
      date: "2024-12-05",
      service: "Limpeza Comercial",
      comment: "Contratei a Ana para limpeza do meu escritório e superou todas as expectativas. Muito atenciosa aos detalhes e confiável.",
      helpful: 15
    },
    {
      id: "5",
      client: "Ana Costa",
      rating: 5,
      date: "2024-12-01",
      service: "Limpeza Residencial",
      comment: "Profissional excepcional! Trabalho de alta qualidade, pontualidade e preço justo. Já agendei os próximos atendimentos.",
      helpful: 9
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${
          index < rating
            ? "text-yellow-400 fill-current"
            : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 via-blue-50 to-blue-100">
      <HamburgerMenu />
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-blue-600">Sistema de Avaliações</h1>
            <nav className="flex space-x-6">
              <a href="/" className="text-gray-600 hover:text-blue-600 transition-colors">Início</a>
              <a href="/cliente" className="text-gray-600 hover:text-blue-600 transition-colors">Cliente</a>
              <a href="/prestador" className="text-gray-600 hover:text-blue-600 transition-colors">Prestador</a>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Statistics */}
          <div className="lg:col-span-1">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg">Resumo de Avaliações</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    {stats.averageRating}
                  </div>
                  <div className="flex justify-center mb-2">
                    {renderStars(Math.round(stats.averageRating))}
                  </div>
                  <p className="text-gray-600 text-sm">
                    Baseado em {stats.totalReviews} avaliações
                  </p>
                </div>

                <div className="space-y-3">
                  {stats.ratingDistribution.map((dist) => (
                    <div key={dist.stars} className="flex items-center space-x-3">
                      <span className="text-sm font-medium w-8">{dist.stars}★</span>
                      <div className="flex-1">
                        <Progress value={dist.percentage} className="h-2" />
                      </div>
                      <span className="text-sm text-gray-600 w-8">{dist.count}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Achievement Cards */}
            <div className="space-y-4">
              <Card className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white">
                <CardContent className="p-4">
                  <div className="flex items-center">
                    <Award className="w-8 h-8 mr-3" />
                    <div>
                      <p className="font-semibold">Top Rated</p>
                      <p className="text-sm opacity-90">4.9+ estrelas</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-green-400 to-green-600 text-white">
                <CardContent className="p-4">
                  <div className="flex items-center">
                    <Users className="w-8 h-8 mr-3" />
                    <div>
                      <p className="font-semibold">Confiável</p>
                      <p className="text-sm opacity-90">100+ clientes</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-blue-400 to-blue-600 text-white">
                <CardContent className="p-4">
                  <div className="flex items-center">
                    <TrendingUp className="w-8 h-8 mr-3" />
                    <div>
                      <p className="font-semibold">Em Alta</p>
                      <p className="text-sm opacity-90">Crescimento 15%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Main Content - Reviews */}
          <div className="lg:col-span-3">
            {/* Filters */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Filtrar por avaliação
                    </label>
                    <Select value={filterRating} onValueChange={setFilterRating}>
                      <SelectTrigger>
                        <SelectValue placeholder="Todas as avaliações" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Todas as avaliações</SelectItem>
                        <SelectItem value="5">⭐⭐⭐⭐⭐ (5 estrelas)</SelectItem>
                        <SelectItem value="4">⭐⭐⭐⭐ (4+ estrelas)</SelectItem>
                        <SelectItem value="3">⭐⭐⭐ (3+ estrelas)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex-1">
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Ordenar por
                    </label>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="recent">Mais recentes</SelectItem>
                        <SelectItem value="oldest">Mais antigas</SelectItem>
                        <SelectItem value="highest">Maior avaliação</SelectItem>
                        <SelectItem value="helpful">Mais úteis</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-end">
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <Filter className="w-4 h-4 mr-2" />
                      Aplicar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Results Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Avaliações ({reviews.length})
              </h2>
            </div>

            {/* Reviews List */}
            <div className="space-y-6">
              {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-8">
              <Button variant="outline" size="lg">
                Carregar mais avaliações
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Avaliacoes;
