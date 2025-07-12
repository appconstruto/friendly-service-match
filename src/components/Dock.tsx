import React from "react";
import { Home, Search, User, Settings } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const Dock: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Search, label: "Busca", path: "/busca" },
    { icon: User, label: "Perfil", path: "/perfil-prestador" },
    { icon: Settings, label: "Configurações", path: "/configuracoes" },
  ];

  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      {/* Dock vertical à esquerda (desktop) */}
      <div className="hidden md:flex flex-col items-center fixed left-4 top-1/2 -translate-y-1/2 z-50 gap-6 bg-white rounded-3xl p-3 shadow border border-gray-200">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-12 h-12 flex items-center justify-center rounded-full shadow transition-all duration-200
                ${active ? "bg-[#3478F6] text-white" : "bg-[#F5F7FA] text-[#232B3A] hover:bg-[#E3E8F0]"}
              `}
              title={item.label}
            >
              <Icon className="w-6 h-6" />
            </button>
          );
        })}
      </div>

      {/* Dock inferior (mobile) */}
      <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <div className="bg-white rounded-3xl shadow px-6 py-3 flex gap-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-10 h-10 flex items-center justify-center rounded-full transition-all duration-200
                  ${active ? "bg-[#3478F6] text-white" : "bg-[#F5F7FA] text-[#232B3A] hover:bg-[#E3E8F0]"}
                `}
                title={item.label}
              >
                <Icon className="w-5 h-5" />
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Dock; 