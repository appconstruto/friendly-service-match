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
    <div className="flex flex-col justify-between items-center h-screen bg-gradient-to-b from-cyan-300 to-blue-600 p-6">
      
      {/* Espaço superior */}
      <div className="mt-20 flex flex-col items-center gap-6">
        {/* Ícone em seta */}
        <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-md">
          <ChevronRight className="w-8 h-8 text-gray-400" />
        </div>
        
        {/* Logo do nome */}
        <h1 className="text-white text-4xl font-bold tracking-wide text-center">
          SERVIÇOS<br />JÁ
        </h1>
      </div>

      {/* Botões */}
      <div className="w-full flex flex-col gap-4 mb-10">
        <button 
          onClick={handleLogin}
          className="w-full border-2 border-white text-white font-semibold py-3 rounded-full text-lg hover:bg-white hover:text-blue-600 transition-colors"
        >
          Login
        </button>
        <button 
          onClick={handleRegister}
          className="w-full bg-white text-blue-600 font-bold py-3 rounded-full text-lg hover:bg-gray-100 transition-colors"
        >
          Criar Conta
        </button>
      </div>
    </div>
  );
};

export default Home; 