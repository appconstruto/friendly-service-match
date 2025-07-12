import React, { useState } from "react";
import { Star, StarHalf, Wifi, Home, Search as SearchIcon, User as UserIcon, Settings as SettingsIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const professionals = [
  {
    id: "1",
    name: "Ana Silva",
    profession: "Fotógrafa",
    location: "Itapira-SP",
    price: 300,
    rating: 4.8,
    reviews: 127,
    isNew: true,
    isRemote: false,
    category: "Fotografia",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD8cfmBkZh7bj3tnHZU4DKegX7g-4PPP8vgeARMxlOSgjU7WhWGqaAerKPEwQKlyV1D563AcDHtzBp5EkVRBZVVoBhB44Jm3GdEFgyvU_-uUkC7f83HjirCCfmYDPj7PY_XDO0ksXvR1G1Ed-O-1M9Ij9gp3vKarBE3rMzMqGK13MosdxAAkOWPzdSRTXs32ZgqOh2taURCsyLKwKXMdHDnNDtRVYY2CZFia5zx7VCM5_DRmTi81z19QAuh9JHS--TB6jqadY4EqBDN",
    description: "Fotógrafa profissional especializada em eventos e retratos."
  },
  {
    id: "2",
    name: "Carlos Santos",
    profession: "Designer",
    location: "São Paulo-SP",
    price: 150,
    rating: 4.9,
    reviews: 89,
    isNew: false,
    isRemote: true,
    category: "Design",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCtzwgk5gCjGPLp7PRS81ViO9EJoeivVllwt1PX70lUk5hlCbAG32GwQm461upT_BfQStptDz8rjjEyaR2Ib3vw7Lieh9FmOR_gB4NyoMTMA62OzA7l2qHWfE5O4RlY5sopO-XP9wpo-anksD5WrUhZC53tyd3vmARqiT8VghPBCuGSz-4LtjVbgSN5hiIoIuShO-PyBK5Ohw8jzmTyO11NZ9VYaqLjGpQ0EUxgiK-u8BPqA_WzAXM9fP3bp3zpcQOxnF0x3reOyMuM",
    description: "Designer gráfico e web designer com 8 anos de experiência."
  },
  {
    id: "3",
    name: "Maria Costa",
    profession: "Limpeza",
    location: "Rio de Janeiro-RJ",
    price: 80,
    rating: 4.7,
    reviews: 203,
    isNew: false,
    isRemote: false,
    category: "Limpeza",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAcfkJ_GiV4dfqbwJuasCAXv76bm-F03tdmbupgaaF0M0_W6_lZKPCyuFpUxgyGVTouWGsGfAgU4BGyKZgS0GRzRu2ZAxEonFjNyOpvb3a6X0WFaFWN5XJ1hKJFLbPNm-27UI9sumUyuvzjPO3CTKubUKSesdvL46wuw8zTuRiXOL9XZuB3U1IXwWPVHiXkIgfROUcafGt0ySuo2rHUJB2JV2XWQDjbXmnNVrjgpx1Df_xuzoKS9Ca6kpbUyn_ll_WzPZYQsDDRZF7l",
    description: "Serviços de limpeza residencial e comercial."
  },
  {
    id: "4",
    name: "João Oliveira",
    profession: "Programador",
    location: "Belo Horizonte-MG",
    price: 200,
    rating: 4.6,
    reviews: 150,
    isNew: true,
    isRemote: true,
    category: "Tecnologia",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC68RZ7HvZe7hsuVCIin8kUlvCzFUZviXJAWFD5DgYKI5AFbB_DvrHiDgyM-1hw_u1VkBk_Tp7Y76YVjnXARqqC_psXd2tcMEokWZw7P-Ch3ugWzw2yAEh30F4FJ5hg66-F3l4hv1e590_bHrn79sQEbM2K_APmvyrmvS-49P3Sc6rJLS85GYFFrjGB6q4OrHMr4Rcd1D65N2pS8ho0fzjDEzkG8DUBiursL1-q_cEtdzTdsBwDVpYYkMD199R7Hjetkcndi8kWb4Hf",
    description: "Desenvolvedor full-stack especializado em React e Node.js."
  }
];

const categories = [
  "Todas", "Design", "Marketing", "Transporte", "Limpeza", "Tecnologia", "Alimentação", "Construção", "Beleza", "Fotografia"
];

const Busca: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [selectedCity, setSelectedCity] = useState("Todas");
  const [priceRange, setPriceRange] = useState(500);
  const [minRating, setMinRating] = useState(0);
  const [onlyRemote, setOnlyRemote] = useState(false);
  const [sortBy, setSortBy] = useState("relevancia");
  const navigate = useNavigate();

  // Função para renderizar estrelas
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    return (
      <span className="flex">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={i} className="w-4 h-4 text-yellow-400" fill="#facc15" />
        ))}
        {halfStar && <StarHalf className="w-4 h-4 text-yellow-400" fill="#facc15" />}
        {[...Array(5 - fullStars - (halfStar ? 1 : 0))].map((_, i) => (
          <Star key={i} className="w-4 h-4 text-gray-300" />
        ))}
      </span>
    );
  };

  // Gerar lista de cidades únicas
  const cities = [
    "Todas",
    ...Array.from(new Set(professionals.map(p => p.location.split("-").pop()?.trim() || ""))).filter(Boolean)
  ];

  return (
    <div className="main-container p-4 sm:p-6 md:p-8 bg-indigo-50 min-h-screen font-poppins md:ml-20 pb-24">
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        {/* Sidebar de filtros */}
        <aside className="w-full lg:w-1/4 xl:w-1/5 mb-6 lg:mb-0">
          <div className="bg-white rounded-2xl p-4 sm:p-6 custom-shadow sticky top-8">
            <h2 className="text-xl font-bold mb-6 text-gray-800">Filtros</h2>
            <div>
              <h3 className="font-semibold text-gray-700 mb-4">Categorias</h3>
              <select
                className="w-full bg-gray-100 text-gray-700 font-semibold py-2 px-4 rounded-lg text-sm mb-6 border-none focus:ring-2 focus:ring-blue-500"
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value)}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <h3 className="font-semibold text-gray-700 mb-4">Cidade</h3>
              <select
                className="w-full bg-gray-100 text-gray-700 font-semibold py-2 px-4 rounded-lg text-sm mb-2 border-none focus:ring-2 focus:ring-blue-500"
                value={selectedCity}
                onChange={e => setSelectedCity(e.target.value)}
              >
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
            {/* Removido: Filtro de preço por hora */}
            <div className="mt-8">
              <h3 className="font-semibold text-gray-700 mb-4">Avaliação mínima</h3>
              <div className="space-y-3">
                <button
                  className={`w-full text-left bg-blue-500 text-white font-semibold py-3 px-4 rounded-lg text-sm shadow-md hover:bg-blue-600 transition-colors ${minRating === 0 ? "" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                  onClick={() => setMinRating(0)}
                >
                  Qualquer avaliação
                </button>
                <button
                  className={`w-full text-left bg-gray-100 text-gray-700 font-semibold py-3 px-4 rounded-lg text-sm hover:bg-gray-200 transition-colors flex items-center ${minRating === 3 ? "bg-blue-500 text-white shadow-md hover:bg-blue-600" : ""}`}
                  onClick={() => setMinRating(3)}
                >
                  3+
                  <span className="ml-2 flex text-yellow-400">{renderStars(3)}</span>
                </button>
                <button
                  className={`w-full text-left bg-gray-100 text-gray-700 font-semibold py-3 px-4 rounded-lg text-sm hover:bg-gray-200 transition-colors flex items-center ${minRating === 4 ? "bg-blue-500 text-white shadow-md hover:bg-blue-600" : ""}`}
                  onClick={() => setMinRating(4)}
                >
                  4+
                  <span className="ml-2 flex text-yellow-400">{renderStars(4)}</span>
                </button>
                <button
                  className={`w-full text-left bg-gray-100 text-gray-700 font-semibold py-3 px-4 rounded-lg text-sm hover:bg-gray-200 transition-colors flex items-center ${minRating === 4.5 ? "bg-blue-500 text-white shadow-md hover:bg-blue-600" : ""}`}
                  onClick={() => setMinRating(4.5)}
                >
                  4.5+
                  <span className="ml-2 flex text-yellow-400">{renderStars(4.5)}</span>
                </button>
              </div>
            </div>
            {/* Removido: Seletor de trabalho remoto */}
            <div className="mt-8">
              <button className="w-full bg-gray-200 text-gray-800 font-bold py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors">Limpar filtros</button>
            </div>
          </div>
        </aside>
        {/* Main */}
        <main className="w-full lg:w-3/4 xl:w-4/5">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <button className="bg-gray-200 text-gray-800 font-semibold py-2 px-5 rounded-full text-sm hover:bg-gray-300 transition-colors">Relevância</button>
            <button className="bg-white text-gray-600 font-semibold py-2 px-5 rounded-full text-sm custom-shadow hover:bg-gray-100 transition-colors">Menor preço</button>
            <button className="bg-white text-gray-600 font-semibold py-2 px-5 rounded-full text-sm custom-shadow hover:bg-gray-100 transition-colors">Maior preço</button>
            <button className="bg-white text-gray-600 font-semibold py-2 px-5 rounded-full text-sm custom-shadow hover:bg-gray-100 transition-colors">Avaliação</button>
            <button className="bg-white text-gray-600 font-semibold py-2 px-5 rounded-full text-sm custom-shadow hover:bg-gray-100 transition-colors">Lista</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
            {professionals
              .filter(p => selectedCategory === "Todas" || p.category === selectedCategory)
              .filter(p => selectedCity === "Todas" || p.location.split("-").pop()?.trim() === selectedCity)
              .filter(p => p.rating >= minRating)
              .map(prof => (
                <div
                  key={prof.id}
                  className="bg-white p-6 rounded-2xl custom-shadow flex flex-col justify-between transition-transform duration-300 card-hover cursor-pointer"
                  onClick={() => navigate('/perfil-profissional')}
                >
                  <div>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className={`w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center ${prof.name === 'Carlos Santos' ? 'border-4 border-blue-300' : ''} overflow-hidden`}>
                          <img src={prof.image} alt={`Foto de ${prof.name}`} className="rounded-full w-full h-full object-cover" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-gray-800">{prof.name}</h3>
                          <p className="text-sm text-gray-500">{prof.profession} • {prof.location}</p>
                        </div>
                      </div>
                      {/* Removido: badge 'Novo' */}
                    </div>
                    <div className="flex items-center mb-4">
                      {renderStars(prof.rating)}
                      <span className="ml-2 text-sm text-gray-600 font-medium">{prof.rating}</span>
                      <span className="ml-1 text-sm text-gray-400">({prof.reviews})</span>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">{prof.description}</p>
                  </div>
                  <div className="flex justify-end items-center mt-auto">
                    {/* Removido: preço */}
                  </div>
                </div>
              ))}
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

export default Busca; 