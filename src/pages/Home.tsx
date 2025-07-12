import React from "react";
import { Palette, Briefcase, Truck, SprayCan, Camera, Search as SearchIcon, Link2, Star, Home as HomeIcon, User as UserIcon, Settings as SettingsIcon } from "lucide-react";

const categories = [
  { icon: Palette, label: "Design" },
  { icon: Briefcase, label: "Marketing" },
  { icon: Truck, label: "Transporte" },
  { icon: SprayCan, label: "Limpeza" },
];

const Home: React.FC = () => {
  return (
    <div className="main-container p-4 sm:p-6 md:p-8 bg-indigo-50 min-h-screen font-poppins md:ml-20 pb-24">
      <div className="flex flex-col gap-8">
        <main className="w-full flex flex-col gap-8">
          {/* Header */}
          <div className="bg-white rounded-2xl p-4 sm:p-8 custom-shadow mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Encontre o profissional ideal</h1>
            <p className="text-gray-500 mb-4 sm:mb-6 text-base sm:text-lg">Conectamos você aos melhores profissionais da sua região para qualquer tipo de serviço.</p>
            <div className="flex flex-col sm:flex-row w-full gap-2 mb-4 sm:mb-6">
              <input
                type="text"
                placeholder="O que você está procurando?"
                className="flex-1 rounded-full px-4 sm:px-6 py-3 sm:py-4 text-gray-700 bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
              />
              <button className="bg-blue-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold shadow-md hover:bg-blue-600 transition text-base w-full sm:w-auto">Buscar</button>
            </div>
            {/* Categorias logo abaixo da busca */}
            <div className="mt-2">
              <h2 className="text-lg sm:text-xl font-bold mb-2 sm:mb-4 text-gray-800">Categorias</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                {categories.map(cat => (
                  <button key={cat.label} className="bg-gray-100 text-gray-700 font-semibold py-3 sm:py-4 px-3 sm:px-4 rounded-lg text-sm hover:bg-gray-200 transition-colors flex flex-col items-center gap-2">
                    <cat.icon className="w-6 h-6 sm:w-7 sm:h-7 text-blue-500" />
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
          {/* Profissionais em Destaque */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
            {/* Card exemplo 1 */}
            <div className="bg-white p-4 sm:p-6 rounded-2xl custom-shadow flex flex-col justify-between transition-transform duration-300 card-hover">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <Camera className="w-12 h-12 text-blue-500" />
                  <div>
                    <h3 className="font-bold text-lg text-gray-800">Ana Silva</h3>
                    <p className="text-sm text-gray-500">Fotógrafa • Itapira-SP</p>
                  </div>
                  <span className="ml-auto bg-red-100 text-red-600 text-xs font-semibold px-3 py-1 rounded-full">Novo</span>
                </div>
                <div className="flex items-center mb-4">
                  <Star className="w-4 h-4 text-yellow-400" fill="#facc15" />
                  <Star className="w-4 h-4 text-yellow-400" fill="#facc15" />
                  <Star className="w-4 h-4 text-yellow-400" fill="#facc15" />
                  <Star className="w-4 h-4 text-yellow-400" fill="#facc15" />
                  <Star className="w-4 h-4 text-yellow-400" fill="#facc15" />
                  <span className="ml-2 text-sm text-gray-600 font-medium">4.8</span>
                  <span className="ml-1 text-sm text-gray-400">(127)</span>
                </div>
                <p className="text-gray-600 text-sm mb-4">Fotógrafa profissional especializada em eventos e retratos.</p>
              </div>
              <div className="flex justify-end items-center mt-auto">
                <p className="text-lg font-bold text-green-600">R$ 300/h</p>
              </div>
            </div>
            {/* Outros cards mockados podem ser adicionados aqui */}
          </div>

          {/* Como Funciona */}
          <div className="bg-white rounded-2xl p-8 custom-shadow flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <SearchIcon className="w-7 h-7 text-blue-500" />
              <span className="font-medium text-gray-800 text-lg">Busque um serviço</span>
            </div>
            <div className="flex items-center gap-4">
              <Link2 className="w-7 h-7 text-blue-500" />
              <span className="font-medium text-gray-800 text-lg">Conecte-se</span>
            </div>
            <div className="flex items-center gap-4">
              <Star className="w-7 h-7 text-yellow-400" />
              <span className="font-medium text-gray-800 text-lg">Avalie o serviço</span>
            </div>
          </div>

          {/* Estatísticas */}
          <div className="bg-white rounded-2xl p-8 custom-shadow flex flex-row items-center justify-between text-center">
            <div>
              <div className="text-2xl font-bold text-blue-500">500+</div>
              <div className="text-sm text-gray-500">Profissionais</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-500">50+</div>
              <div className="text-sm text-gray-500">Categorias</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-500">1200+</div>
              <div className="text-sm text-gray-500">Serviços realizados</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-500">4.8</div>
              <div className="text-sm text-gray-500">Avaliação média</div>
            </div>
          </div>

          {/* Chamada para prestadores */}
          <div className="bg-white rounded-2xl p-8 custom-shadow flex flex-col items-center">
            <h2 className="text-lg font-bold text-blue-500 mb-2">É um profissional qualificado?</h2>
            <ul className="text-blue-500 text-base mb-4 list-disc pl-5">
              <li>Aumente sua visibilidade no mercado</li>
              <li>Gerencie seus serviços online</li>
              <li>Receba avaliações e construa sua reputação</li>
            </ul>
            <button className="bg-blue-500 text-white px-8 py-4 rounded-full font-semibold shadow-md hover:bg-blue-600 transition text-base">Torne-se um prestador</button>
          </div>

          {/* Depoimentos */}
          <div className="bg-white rounded-2xl p-8 custom-shadow text-center text-gray-500 text-base">
            "Ainda não temos depoimentos. Seja o primeiro a compartilhar sua experiência!"
          </div>
        </main>
      </div>
      <style>{`
        .custom-shadow {
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06);
        }
        .card-hover:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05);
        }
        .font-poppins { font-family: 'Poppins', sans-serif; }
      `}</style>
    </div>
  );
};

export default Home; 