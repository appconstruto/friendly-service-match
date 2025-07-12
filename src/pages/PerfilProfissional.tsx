import React from "react";

const mockProfile = {
  name: "dreamy_diya",
  avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  about: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.",
  interests: ["Viajando", "Musica", "Fotografia", "Leitura"],
};

const PerfilProfissional: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#DCE6F2] via-[#B3C8F2] to-[#725EF2] p-4">
      <div className="w-full max-w-xs sm:max-w-md md:max-w-lg bg-white rounded-3xl shadow-2xl flex flex-col items-center p-4 sm:p-8 gap-4 sm:gap-6 mx-auto">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">Perfil do Profissional</h2>
        <img src={mockProfile.avatar} alt={mockProfile.name} className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-white shadow-lg mb-2" />
        <div className="text-xl sm:text-2xl font-semibold text-[#725EF2] mb-4">{mockProfile.name}</div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-4 w-full justify-center">
          <button className="px-6 py-2 rounded-full font-semibold bg-[#725EF2] text-white shadow hover:bg-[#0798F2] transition w-full sm:w-auto">Mensagem</button>
          <button className="px-6 py-2 rounded-full font-semibold bg-gray-100 text-gray-800 shadow hover:bg-[#DCE6F2] transition w-full sm:w-auto">Adicionar</button>
          <button className="px-6 py-2 rounded-full font-semibold bg-gray-100 text-gray-800 shadow hover:bg-[#DCE6F2] transition w-full sm:w-auto">Mais</button>
        </div>
        <div className="w-full bg-[#F8FAFC] rounded-2xl p-4 sm:p-6 shadow mb-2">
          <h3 className="text-lg font-bold text-gray-800 mb-2">Sobre</h3>
          <p className="text-gray-700 text-base">{mockProfile.about}</p>
        </div>
        <div className="w-full bg-[#F8FAFC] rounded-2xl p-4 sm:p-6 shadow">
          <h3 className="text-lg font-bold text-gray-800 mb-2">Interesses</h3>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {mockProfile.interests.map((interest) => (
              <span key={interest} className="bg-[#B3C8F2] text-[#0798F2] px-4 py-1 rounded-full text-base font-medium">{interest}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerfilProfissional; 