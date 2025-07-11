import React from "react";
import { Search, Star } from "lucide-react";

const Busca: React.FC = () => {
  return (
    <div className="min-h-screen flex bg-gradient-to-br from-[#f6f6fb] to-[#eef2fb]">
      {/* Sidebar de filtros */}
      <aside className="w-80 p-6 bg-white rounded-2xl shadow-lg m-8 flex-shrink-0 h-fit">
        <h2 className="font-bold text-lg mb-6">Filtros</h2>
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Categorias</h3>
          <ul className="space-y-1">
            <li className="text-[#7b2ff2] bg-[#f6f0ff] rounded px-2 py-1 cursor-pointer">Todas</li>
            <li className="hover:bg-gray-100 rounded px-2 py-1 cursor-pointer">Design</li>
            <li className="hover:bg-gray-100 rounded px-2 py-1 cursor-pointer">Marketing</li>
            <li className="hover:bg-gray-100 rounded px-2 py-1 cursor-pointer">Transporte</li>
            <li className="hover:bg-gray-100 rounded px-2 py-1 cursor-pointer">Limpeza</li>
            <li className="hover:bg-gray-100 rounded px-2 py-1 cursor-pointer">Tecnologia</li>
            <li className="hover:bg-gray-100 rounded px-2 py-1 cursor-pointer">Alimentação</li>
            <li className="hover:bg-gray-100 rounded px-2 py-1 cursor-pointer">Construção</li>
            <li className="hover:bg-gray-100 rounded px-2 py-1 cursor-pointer">Beleza</li>
          </ul>
        </div>
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Preço por hora</h3>
          <input type="range" min={0} max={500} className="w-full" />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>R$ 0</span>
            <span>R$ 500</span>
          </div>
        </div>
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Avaliação mínima</h3>
          <ul className="space-y-1">
            <li className="text-[#7b2ff2] bg-[#f6f0ff] rounded px-2 py-1 cursor-pointer">Qualquer avaliação</li>
            <li className="flex items-center gap-1 hover:bg-gray-100 rounded px-2 py-1 cursor-pointer"><span>3+</span> <Star className="w-4 h-4 text-yellow-400" /><Star className="w-4 h-4 text-yellow-400" /><Star className="w-4 h-4 text-yellow-400" /><Star className="w-4 h-4 text-gray-300" /><Star className="w-4 h-4 text-gray-300" /></li>
            <li className="flex items-center gap-1 hover:bg-gray-100 rounded px-2 py-1 cursor-pointer"><span>4+</span> <Star className="w-4 h-4 text-yellow-400" /><Star className="w-4 h-4 text-yellow-400" /><Star className="w-4 h-4 text-yellow-400" /><Star className="w-4 h-4 text-yellow-400" /><Star className="w-4 h-4 text-gray-300" /></li>
            <li className="flex items-center gap-1 hover:bg-gray-100 rounded px-2 py-1 cursor-pointer"><span>4.5+</span> <Star className="w-4 h-4 text-yellow-400" /><Star className="w-4 h-4 text-yellow-400" /><Star className="w-4 h-4 text-yellow-400" /><Star className="w-4 h-4 text-yellow-400" /><Star className="w-4 h-4 text-yellow-400" /></li>
          </ul>
        </div>
        <div className="mb-4 flex items-center gap-2">
          <input type="checkbox" id="remoto" className="accent-[#7b2ff2]" />
          <label htmlFor="remoto" className="text-sm">Apenas trabalho remoto</label>
        </div>
        <button className="w-full bg-gray-100 rounded py-2 font-semibold text-sm hover:bg-gray-200 transition">Limpar filtros</button>
      </aside>

      {/* Conteúdo principal */}
      <main className="flex-1 p-8">
        {/* Barra de busca e ordenação */}
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
          <div className="flex-1 flex items-center bg-white rounded-lg shadow px-4 py-2">
            <Search className="text-gray-400 mr-2" />
            <input type="text" placeholder="Buscar serviços ou profissionais..." className="flex-1 outline-none bg-transparent" />
            <button className="ml-2 bg-gradient-to-r from-[#7b2ff2] to-[#1e90ff] text-white px-4 py-2 rounded font-semibold">Buscar</button>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded hover:bg-gray-100"><span className="material-icons">grid_view</span></button>
            <button className="p-2 rounded hover:bg-gray-100"><span className="material-icons">list</span></button>
            <select className="ml-2 border rounded px-2 py-1 text-sm">
              <option>Relevância</option>
              <option>Menor preço</option>
              <option>Maior preço</option>
              <option>Melhor avaliação</option>
            </select>
          </div>
        </div>

        {/* Resultados encontrados */}
        <div className="mb-4 text-sm text-gray-600">1 resultados encontrados</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card de profissional */}
          <div className="bg-white rounded-2xl shadow-lg flex flex-col md:flex-row items-center p-6 gap-4">
            <div className="w-32 h-24 bg-gradient-to-br from-[#7b2ff2] to-[#1e90ff] rounded-xl mb-4 md:mb-0" />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold">Fotógrafo</span>
                <span className="bg-blue-100 text-blue-600 text-xs px-2 py-0.5 rounded">Remoto</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                <span>Itapira-SP</span>
              </div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-yellow-500 text-xs font-semibold flex items-center"><Star className="w-4 h-4 mr-1" /> Novo</span>
              </div>
              <div className="font-bold text-[#7b2ff2] text-lg">R$ 300/h</div>
            </div>
          </div>
        </div>

        {/* Mensagem de nenhum resultado */}
        {/* <div className="flex flex-col items-center justify-center h-64 bg-white rounded-2xl shadow-lg mt-8">
          <Search className="w-12 h-12 text-gray-300 mb-4" />
          <div className="font-bold text-lg mb-2">Nenhum resultado encontrado</div>
          <div className="text-gray-500 mb-4">Não encontramos prestadores que correspondam aos critérios de busca.</div>
          <button className="bg-gray-100 rounded px-4 py-2 font-semibold text-sm hover:bg-gray-200 transition">Limpar filtros</button>
        </div> */}
      </main>
    </div>
  );
};

export default Busca; 