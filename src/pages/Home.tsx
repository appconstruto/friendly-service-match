import React from "react";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-300 to-blue-600 flex flex-col">
      {/* Container principal */}
      <div className="flex-1 flex flex-col items-center px-6 pt-8">
        {/* Logo */}
        <div className="mb-12 mt-20">
          <div className="flex flex-col items-center justify-center mb-6">
            {/* Ícone em seta */}
            <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-md mb-6">
              <ChevronRight className="w-8 h-8 text-gray-400" />
            </div>
            
            {/* Logo do nome */}
            <h1 className="text-white text-4xl font-bold tracking-wide text-center">
              SERVIÇOS<br />JÁ
            </h1>
          </div>
        </div>

        {/* Espaço flexível para empurrar os botões para baixo */}
        <div className="flex-1 min-h-[40px]"></div>

        {/* Botões */}
        <div className="w-full max-w-sm pb-8 pt-2 space-y-4">
          <button 
            onClick={handleLogin}
            className="w-full h-14 border-2 border-white text-white font-semibold rounded-2xl text-lg hover:bg-white hover:text-blue-600 transition-colors"
          >
            Login
          </button>
          <button 
            onClick={handleRegister}
            className="w-full h-14 bg-white text-blue-600 font-bold rounded-2xl text-lg hover:bg-gray-100 transition-colors"
          >
            Criar Conta
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home; 