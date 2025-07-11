import React from "react";
import { Palette, Briefcase, Truck, SprayCan, Laptop, Utensils, Hammer, Scissors, Camera, Search, Link2, Star } from "lucide-react";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#f6f6fb]">
      {/* Header com gradiente */}
      <header className="w-full bg-gradient-to-r from-[#7b2ff2] to-[#1e90ff] py-16 px-4 text-white text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Encontre o profissional ideal para o seu serviço</h1>
        <p className="mb-6">Conectamos você aos melhores profissionais da sua região para qualquer tipo de serviço que você precisar.</p>
        <div className="flex justify-center max-w-xl mx-auto">
          <input
            type="text"
            placeholder="O que você está procurando?"
            className="w-full rounded-l-md px-4 py-2 text-gray-800 focus:outline-none"
          />
          <button className="bg-white text-[#1e90ff] px-6 py-2 rounded-r-md font-semibold hover:bg-gray-100 transition">Buscar</button>
        </div>
      </header>

      {/* Categorias de Serviços */}
      <section className="max-w-4xl mx-auto mt-12 px-4">
        <h2 className="text-xl font-semibold mb-4">Categorias de Serviços</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Cards de categoria com ícones Lucide */}
          <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center">
            <Palette className="mb-2 w-8 h-8 text-[#7b2ff2]" />
            <span>Design</span>
          </div>
          <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center">
            <Briefcase className="mb-2 w-8 h-8 text-[#1e90ff]" />
            <span>Marketing</span>
          </div>
          <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center">
            <Truck className="mb-2 w-8 h-8 text-[#7b2ff2]" />
            <span>Transporte</span>
          </div>
          <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center">
            <SprayCan className="mb-2 w-8 h-8 text-[#1e90ff]" />
            <span>Limpeza</span>
          </div>
          <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center">
            <Laptop className="mb-2 w-8 h-8 text-[#7b2ff2]" />
            <span>Tecnologia</span>
          </div>
          <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center">
            <Utensils className="mb-2 w-8 h-8 text-[#1e90ff]" />
            <span>Alimentação</span>
          </div>
          <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center">
            <Hammer className="mb-2 w-8 h-8 text-[#7b2ff2]" />
            <span>Construção</span>
          </div>
          <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center">
            <Scissors className="mb-2 w-8 h-8 text-[#1e90ff]" />
            <span>Beleza</span>
          </div>
        </div>
      </section>

      {/* Profissionais em Destaque */}
      <section className="max-w-4xl mx-auto mt-12 px-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Profissionais em Destaque</h2>
          <a href="#" className="text-[#1e90ff] hover:underline">Ver todos &rarr;</a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card de profissional */}
          <div className="bg-gradient-to-br from-[#7b2ff2] to-[#1e90ff] rounded-xl p-1">
            <div className="bg-white rounded-xl p-4 h-full flex flex-col">
              <div className="flex items-center mb-2">
                <Camera className="text-3xl mr-2 text-[#7b2ff2]" />
                <span className="font-semibold">Fotógrafo</span>
              </div>
              <span className="text-sm text-gray-500 mb-1">Itapira - SP</span>
              <span className="text-xs text-green-600 mb-2">Novo</span>
              <span className="font-bold text-[#7b2ff2] mt-auto">R$ 300/h</span>
            </div>
          </div>
          {/* Adicione mais cards conforme necessário */}
        </div>
      </section>

      {/* Como Funciona */}
      <section className="max-w-4xl mx-auto mt-16 px-4">
        <h2 className="text-xl font-semibold text-center mb-8">Como Funciona</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="flex justify-center mb-2"><Search className="w-8 h-8 text-[#7b2ff2]" /></div>
            <h3 className="font-semibold mb-1">Busque um serviço</h3>
            <p className="text-gray-600 text-sm">Encontre o profissional qualificado para o serviço que você precisa.</p>
          </div>
          <div>
            <div className="flex justify-center mb-2"><Link2 className="w-8 h-8 text-[#1e90ff]" /></div>
            <h3 className="font-semibold mb-1">Conecte-se</h3>
            <p className="text-gray-600 text-sm">Entre em contato com o profissional e solicite um orçamento.</p>
          </div>
          <div>
            <div className="flex justify-center mb-2"><Star className="w-8 h-8 text-yellow-400" /></div>
            <h3 className="font-semibold mb-1">Avalie o serviço</h3>
            <p className="text-gray-600 text-sm">Após a conclusão, avalie o profissional e compartilhe sua experiência.</p>
          </div>
        </div>
      </section>

      {/* Estatísticas */}
      <section className="w-full bg-gradient-to-r from-[#7b2ff2] to-[#1e90ff] py-10 mt-16">
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-8 text-white text-center">
          <div>
            <div className="text-2xl font-bold">500+</div>
            <div className="text-sm">Profissionais</div>
          </div>
          <div>
            <div className="text-2xl font-bold">50+</div>
            <div className="text-sm">Categorias</div>
          </div>
          <div>
            <div className="text-2xl font-bold">1200+</div>
            <div className="text-sm">Serviços realizados</div>
          </div>
          <div>
            <div className="text-2xl font-bold">4.8</div>
            <div className="text-sm">Avaliação média</div>
          </div>
        </div>
      </section>

      {/* Chamada para prestadores */}
      <section className="max-w-3xl mx-auto mt-12 px-4">
        <div className="bg-white rounded-xl shadow p-8 flex flex-col md:flex-row items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-[#1e90ff] mb-2">É um profissional qualificado?</h2>
            <ul className="text-gray-700 text-sm mb-4 list-disc pl-5">
              <li>Aumente sua visibilidade no mercado</li>
              <li>Gerencie seus serviços online</li>
              <li>Receba avaliações e construa sua reputação</li>
            </ul>
            <button className="bg-gradient-to-r from-[#7b2ff2] to-[#1e90ff] text-white px-6 py-2 rounded-md font-semibold hover:opacity-90 transition">Torne-se um prestador</button>
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section className="max-w-3xl mx-auto mt-16 px-4 mb-12">
        <h2 className="text-xl font-semibold text-center mb-6">O que Dizem Nossos Usuários</h2>
        <div className="bg-gray-100 rounded-xl p-6 text-center text-gray-500">
          "Ainda não temos depoimentos. Seja o primeiro a compartilhar sua experiência!"
        </div>
      </section>
    </div>
  );
};

export default Home; 