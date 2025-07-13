import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Search, User } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        {/* Ícone de erro */}
        <div className="mb-8">
          <div className="mx-auto w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <span className="text-4xl font-bold text-red-600">404</span>
          </div>
        </div>

        {/* Título e descrição */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Página não encontrada
        </h1>
        <p className="text-gray-600 mb-8">
          A página que você está procurando não existe ou foi movida.
        </p>

        {/* URL tentada */}
        <div className="bg-gray-100 rounded-lg p-3 mb-8">
          <p className="text-sm text-gray-500 mb-1">URL tentada:</p>
          <p className="text-sm font-mono text-gray-700 break-all">
            {location.pathname}
          </p>
        </div>

        {/* Botões de ação */}
        <div className="space-y-3">
          <Button 
            onClick={() => navigate('/')}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            <Home className="w-4 h-4 mr-2" />
            Voltar para Home
          </Button>

          <div className="grid grid-cols-2 gap-3">
            <Button 
              variant="outline"
              onClick={() => navigate('/busca')}
              className="w-full"
            >
              <Search className="w-4 h-4 mr-2" />
              Buscar Serviços
            </Button>

            <Button 
              variant="outline"
              onClick={() => navigate('/login')}
              className="w-full"
            >
              <User className="w-4 h-4 mr-2" />
              Fazer Login
            </Button>
          </div>

          <Button 
            variant="ghost"
            onClick={() => navigate(-1)}
            className="w-full text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar à página anterior
          </Button>
        </div>

        {/* Informações adicionais */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Se você acredita que isso é um erro, entre em contato conosco.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
