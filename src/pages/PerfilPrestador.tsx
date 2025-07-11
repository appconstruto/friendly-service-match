import React from "react";
import { User, Calendar, Star, Settings, LogOut, Camera } from "lucide-react";

const PerfilPrestador: React.FC = () => {
  return (
    <div className="min-h-screen flex bg-gradient-to-br from-[#f6f6fb] to-[#eef2fb]">
      {/* Sidebar do usuário */}
      <aside className="w-80 p-6 bg-white rounded-2xl shadow-lg m-8 flex-shrink-0 h-fit">
        <div className="flex flex-col items-center mb-8">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#7b2ff2] to-[#1e90ff] flex items-center justify-center text-white text-4xl font-bold relative">
            A
            <button className="absolute bottom-2 right-2 bg-white rounded-full p-1 shadow"><Camera className="w-5 h-5 text-[#7b2ff2]" /></button>
          </div>
          <div className="mt-4 text-center">
            <div className="font-bold text-lg">Andre Avancini</div>
            <div className="text-xs text-gray-500">Prestador de Serviços</div>
          </div>
        </div>
        <nav className="flex flex-col gap-2 mb-8">
          <button className="flex items-center gap-2 px-4 py-2 rounded bg-[#f6f0ff] text-[#7b2ff2] font-semibold"><User className="w-5 h-5" /> Meu Perfil</button>
          <button className="flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-100"><Calendar className="w-5 h-5" /> Agendamentos</button>
          <button className="flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-100"><Star className="w-5 h-5" /> Avaliações Recebidas</button>
          <button className="flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-100"><Settings className="w-5 h-5" /> Configurações</button>
        </nav>
        <button className="flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-100 text-red-500 font-semibold"><LogOut className="w-5 h-5" /> Sair</button>
      </aside>

      {/* Conteúdo principal */}
      <main className="flex-1 p-8">
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex gap-4 mb-6">
            <button className="px-4 py-2 rounded bg-[#f6f0ff] text-[#7b2ff2] font-semibold">Perfil</button>
            <button className="px-4 py-2 rounded hover:bg-gray-100">Agendamentos</button>
            <button className="px-4 py-2 rounded hover:bg-gray-100">Avaliações</button>
            <button className="px-4 py-2 rounded hover:bg-gray-100">Configurações</button>
          </div>
          {/* Informações do Perfil */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="font-bold text-lg mb-4">Informações do Perfil</h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Nome completo</label>
                  <input type="text" className="w-full border rounded px-3 py-2" value="Andre Avancini" disabled />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input type="email" className="w-full border rounded px-3 py-2" value="andreavancini186@gmail.com" disabled />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Telefone</label>
                  <input type="text" className="w-full border rounded px-3 py-2" value="19999887766" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Sobre você</label>
                  <textarea className="w-full border rounded px-3 py-2" rows={3} defaultValue="Esse é um perfil de teste" />
                </div>
                <button className="bg-gradient-to-r from-[#7b2ff2] to-[#1e90ff] text-white px-6 py-2 rounded-md font-semibold hover:opacity-90 transition">Salvar alterações</button>
              </form>
            </div>
            <div>
              <h2 className="font-bold text-lg mb-4">Informações Profissionais</h2>
              <div className="mb-2 flex justify-between">
                <span className="font-semibold">Profissão</span>
                <span>Fotógrafo</span>
              </div>
              <div className="mb-2 flex justify-between">
                <span className="font-semibold">Experiência</span>
                <span>1 ano</span>
              </div>
              <div className="mb-2 flex justify-between">
                <span className="font-semibold">Valor por hora</span>
                <span>R$ 300</span>
              </div>
              <div className="mb-2 flex justify-between">
                <span className="font-semibold">Localização</span>
                <span>Itapira-SP</span>
              </div>
              <div className="mb-2">
                <span className="font-semibold">Especialidades</span>
                <div className="mt-1">Serviços oferecidos</div>
                <div className="bg-gray-100 rounded p-2 mt-1 flex justify-between items-center">
                  <span>Fotografia de casamento</span>
                  <span className="font-semibold text-[#7b2ff2]">R$ 3000</span>
                </div>
                <div className="bg-gray-100 rounded p-2 mt-1 flex justify-between items-center">
                  <span>Aniversário</span>
                  <span className="font-semibold text-[#7b2ff2]">R$ 300</span>
                </div>
              </div>
              <button className="mt-4 bg-gradient-to-r from-[#7b2ff2] to-[#1e90ff] text-white px-6 py-2 rounded-md font-semibold hover:opacity-90 transition">Editar perfil profissional</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PerfilPrestador; 