import React, { useState } from "react";
import { Menu, X, Home, Search, User, Settings, LogOut } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthContext } from "@/contexts/AuthContext";

const HamburgerMenu: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signOut } = useAuthContext();

  const menuItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Search, label: "Busca", path: "/busca" },
    { icon: User, label: "Perfil", path: user?.role === 'provider' ? "/prestador" : "/cliente" },
    { icon: Settings, label: "Configurações", path: "/configuracoes" },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuItemClick = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      {/* Menu Hamburger fixo no topo */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <div className="flex items-center justify-between px-6 py-4">
          {/* Menu Hamburger à esquerda */}
          <button
            onClick={toggleMenu}
            className="flex flex-col items-center justify-center w-8 h-8 space-y-1 hover:bg-white/10 rounded-lg p-1 transition-colors"
          >
            <div className="w-6 h-0.5 bg-gray-600 rounded-full transition-all duration-300"></div>
            <div className="w-6 h-0.5 bg-gray-600 rounded-full transition-all duration-300"></div>
            <div className="w-6 h-0.5 bg-gray-600 rounded-full transition-all duration-300"></div>
          </button>

          {/* Avatar do usuário à direita */}
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-200 to-blue-400 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
              <User className="w-5 h-5 text-gray-700" />
            </div>
          </div>
        </div>
      </div>

      {/* Menu Lateral Deslizante */}
      <div className={`fixed inset-0 z-50 transition-opacity duration-300 ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        {/* Overlay */}
        <div 
          className="absolute inset-0 bg-black bg-opacity-50"
          onClick={() => setIsMenuOpen(false)}
        ></div>
        
        {/* Menu Content */}
        <div className={`absolute left-0 top-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex flex-col h-full">
            {/* Header do Menu */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">Menu</h2>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Informações do Usuário */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-200 to-blue-400 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-gray-700" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">
                    {user ? (user.role === 'provider' ? 'Prestador' : 'Cliente') : 'Visitante'}
                  </p>
                  <p className="text-sm text-gray-600">
                    {user ? user.email : 'Faça login para acessar'}
                  </p>
                </div>
              </div>
            </div>

            {/* Itens do Menu */}
            <div className="flex-1 py-4">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                return (
                  <button
                    key={item.path}
                    onClick={() => handleMenuItemClick(item.path)}
                    className={`w-full flex items-center space-x-3 px-6 py-4 text-left hover:bg-gray-50 transition-colors ${
                      active ? 'bg-blue-50 border-r-2 border-blue-500' : ''
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${active ? 'text-blue-600' : 'text-gray-600'}`} />
                    <span className={`font-medium ${active ? 'text-blue-600' : 'text-gray-800'}`}>
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Botão de Login/Logout */}
            <div className="p-6 border-t border-gray-200">
              {user ? (
                <button
                  onClick={() => {
                    signOut();
                    setIsMenuOpen(false);
                  }}
                  className="w-full flex items-center space-x-3 px-4 py-3 text-left text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Sair</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    navigate('/login');
                    setIsMenuOpen(false);
                  }}
                  className="w-full flex items-center space-x-3 px-4 py-3 text-left text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <User className="w-5 h-5" />
                  <span className="font-medium">Fazer Login</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Espaçamento para o header fixo */}
      <div className="h-16"></div>
    </>
  );
};

export default HamburgerMenu;