import React, { useState } from "react";
import { User, Calendar, Star, Settings, LogOut } from "lucide-react";

interface Service {
  id: string;
  name: string;
  price: number;
  description: string;
}

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  about: string;
  profession: string;
  experience: string;
  hourlyRate: number;
  location: string;
  services: Service[];
}

const PerfilPrestador: React.FC = () => {
  const [profile] = useState<UserProfile>({
    name: "Andre Avancini",
    email: "andreavancini186@gmail.com",
    phone: "19999887766",
    about: "Esse é um perfil de teste",
    profession: "Fotógrafo",
    experience: "1 ano",
    hourlyRate: 300,
    location: "Itapira-SP",
    services: [
      { id: "1", name: "Fotografia de casamento", price: 3000, description: "Cobertura completa do evento" },
      { id: "2", name: "Aniversário", price: 300, description: "Fotografia de festas e eventos" }
    ]
  });

  return (
    <div className="min-h-screen bg-indigo-50 font-poppins md:ml-20 pb-24 flex">
      {/* Sidebar de perfil à esquerda */}
      <aside className="hidden md:flex flex-col w-80 bg-white rounded-2xl shadow-lg p-8 mr-8">
        <div className="flex flex-col items-center mb-10">
          <div className="w-24 h-24 rounded-full bg-blue-500 flex items-center justify-center text-white mb-4">
            <User className="w-12 h-12" />
          </div>
          <h2 className="text-xl font-bold text-gray-800">{profile.name}</h2>
          <p className="text-gray-500">Prestador de Serviços</p>
        </div>
        <nav className="flex flex-col w-full gap-3 mb-8">
          <button className="flex items-center p-3 bg-blue-500 text-white rounded-lg shadow-md font-medium"><User className="w-5 h-5 mr-3" /> Meu Perfil</button>
          <button className="flex items-center p-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium"><Calendar className="w-5 h-5 mr-3" /> Agendamentos</button>
          <button className="flex items-center p-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium"><Star className="w-5 h-5 mr-3" /> Avaliações Recebidas</button>
          <button className="flex items-center p-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium"><Settings className="w-5 h-5 mr-3" /> Configurações</button>
        </nav>
        <div className="mt-auto w-full">
          <button className="flex items-center justify-center p-3 border border-red-400 text-red-500 rounded-lg hover:bg-red-50 font-medium w-full"><LogOut className="w-5 h-5 mr-3" /> Sair</button>
        </div>
      </aside>
      {/* Main */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-5xl bg-white p-8 rounded-2xl shadow-lg">
          <div className="flex flex-wrap gap-4 mb-8">
            <button className="px-6 py-2 bg-blue-500 text-white rounded-full font-semibold">Perfil</button>
            <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded-full font-semibold">Agendamentos</button>
            <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded-full font-semibold">Avaliações</button>
            <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded-full font-semibold">Configurações</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Informações do Perfil */}
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800">Informações do Perfil</h3>
                <button className="flex items-center text-blue-500 font-semibold">
                  <span className="material-icons mr-1">edit</span>
                  Editar
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-gray-500 text-sm font-medium">Nome completo</label>
                  <p className="p-3 bg-gray-100 rounded-lg text-gray-800">{profile.name}</p>
                </div>
                <div>
                  <label className="text-gray-500 text-sm font-medium">Email</label>
                  <p className="p-3 bg-gray-100 rounded-lg text-gray-800">{profile.email}</p>
                </div>
                <div>
                  <label className="text-gray-500 text-sm font-medium">Telefone</label>
                  <p className="p-3 bg-gray-100 rounded-lg text-gray-800">{profile.phone}</p>
                </div>
                <div>
                  <label className="text-gray-500 text-sm font-medium">Sobre você</label>
                  <p className="p-3 bg-gray-100 rounded-lg text-gray-800 h-24">{profile.about}</p>
                </div>
              </div>
            </div>
            {/* Informações Profissionais */}
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800">Informações Profissionais</h3>
                <button className="flex items-center text-blue-500 font-semibold">
                  <span className="material-icons mr-1">edit</span>
                  Editar
                </button>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Profissão</span>
                  <span className="font-semibold text-gray-800">{profile.profession}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Experiência</span>
                  <span className="font-semibold text-gray-800">{profile.experience}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Valor por hora</span>
                  <span className="font-semibold text-green-600">R$ {profile.hourlyRate}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Localização</span>
                  <span className="font-semibold text-gray-800">{profile.location}</span>
                </div>
              </div>
              <div className="mt-8">
                <h4 className="text-lg font-bold text-gray-800 mb-4">Serviços oferecidos</h4>
                <div className="space-y-4">
                  {profile.services.map(service => (
                    <div key={service.id} className="bg-gray-100 p-4 rounded-lg flex justify-between items-center">
                      <div>
                        <p className="font-semibold text-gray-800">{service.name}</p>
                        <p className="text-sm text-gray-600">{service.description}</p>
                      </div>
                      <span className="font-bold text-green-600">R$ {service.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Removido: Sidebar direita (dock) */}
    </div>
  );
};

export default PerfilPrestador; 