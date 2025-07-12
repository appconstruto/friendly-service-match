import React, { useState } from "react";
import { Home, Search as SearchIcon, User as UserIcon, Settings as SettingsIcon, Bell, Shield, Palette, Globe, Moon, Sun } from "lucide-react";

const Configuracoes: React.FC = () => {
  const [settings, setSettings] = useState({
    notifications: { push: true, email: false, sms: false },
    privacy: { publicProfile: true, location: false, contactInfo: true },
    appearance: { theme: 'dark' },
    language: 'pt-BR',
  });

  const handleSwitch = (section: string, key: string) => {
    setSettings(prev => ({
      ...prev,
      [section]: { ...prev[section], [key]: !prev[section][key] }
    }));
  };

  const handleTheme = (theme: string) => {
    setSettings(prev => ({ ...prev, appearance: { theme } }));
  };

  return (
    <div className="bg-indigo-100 flex items-center justify-center min-h-screen font-inter">
      <div className="flex flex-col lg:flex-row gap-4 w-full max-w-6xl p-4 md:ml-20 pb-24">
        {/* Sidebar/Dock */}
        {/* Main */}
        <main className="flex-1 bg-white/80 backdrop-blur-sm rounded-2xl p-6 lg:p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-8">Configurações</h1>
          <div className="space-y-8">
            {/* Notificações */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-4 mb-6">
                <Bell className="w-6 h-6 text-indigo-500" />
                <h2 className="text-lg font-semibold text-gray-700">Notificações</h2>
              </div>
              <div className="space-y-4">
                {[
                  { key: 'push', label: 'Notificações push', desc: 'Receber notificações de novos serviços' },
                  { key: 'email', label: 'Notificações por email', desc: 'Receber atualizações por email' },
                  { key: 'sms', label: 'Notificações por SMS', desc: 'Receber notificações por mensagem de texto' },
                ].map(item => (
                  <div className="flex justify-between items-center" key={item.key}>
                    <div>
                      <h3 className="font-medium text-gray-800">{item.label}</h3>
                      <p className="text-sm text-gray-500">{item.desc}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" checked={settings.notifications[item.key]} onChange={() => handleSwitch('notifications', item.key)} />
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-500"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
            {/* Privacidade */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-4 mb-6">
                <Shield className="w-6 h-6 text-indigo-500" />
                <h2 className="text-lg font-semibold text-gray-700">Privacidade</h2>
              </div>
              <div className="space-y-4">
                {[
                  { key: 'publicProfile', label: 'Perfil público', desc: 'Permitir que outros vejam seu perfil' },
                  { key: 'location', label: 'Compartilhar localização', desc: 'Compartilhar localização com clientes' },
                  { key: 'contactInfo', label: 'Informações de contato', desc: 'Mostrar telefone e email no perfil' },
                ].map(item => (
                  <div className="flex justify-between items-center" key={item.key}>
                    <div>
                      <h3 className="font-medium text-gray-800">{item.label}</h3>
                      <p className="text-sm text-gray-500">{item.desc}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" checked={settings.privacy[item.key]} onChange={() => handleSwitch('privacy', item.key)} />
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-500"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
            {/* Aparência */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-4 mb-6">
                <Palette className="w-6 h-6 text-indigo-500" />
                <h2 className="text-lg font-semibold text-gray-700">Aparência</h2>
              </div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <div>
                  <h3 className="font-medium text-gray-800">Tema</h3>
                  <p className="text-sm text-gray-500">Alternar entre tema claro, escuro ou automático</p>
                </div>
                <div className="flex items-center gap-2 mt-4 sm:mt-0 bg-gray-100 p-1 rounded-full">
                  <button className={`p-2 rounded-full ${settings.appearance.theme === 'light' ? 'bg-indigo-500 text-white' : 'text-gray-600 hover:bg-gray-200'}`} onClick={() => handleTheme('light')}>
                    <Sun className="w-5 h-5" />
                  </button>
                  <button className={`p-2 rounded-full ${settings.appearance.theme === 'dark' ? 'bg-indigo-500 text-white' : 'text-gray-600 hover:bg-gray-200'}`} onClick={() => handleTheme('dark')}>
                    <Moon className="w-5 h-5" />
                  </button>
                  <button className={`p-2 rounded-full ${settings.appearance.theme === 'auto' ? 'bg-indigo-500 text-white' : 'text-gray-600 hover:bg-gray-200'}`} onClick={() => handleTheme('auto')}>
                    <Globe className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
            {/* Idioma */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-4 mb-6">
                <Globe className="w-6 h-6 text-indigo-500" />
                <h2 className="text-lg font-semibold text-gray-700">Idioma</h2>
              </div>
              <div className="relative">
                <select
                  className="w-full appearance-none bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-indigo-500"
                  value={settings.language}
                  onChange={e => setSettings(prev => ({ ...prev, language: e.target.value }))}
                >
                  <option value="pt-BR">Português (Brasil)</option>
                  <option value="en-US">English (United States)</option>
                  <option value="es-ES">Español</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <span className="material-symbols-outlined">expand_more</span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <button className="flex-1 py-3 px-6 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors">
              Restaurar padrões
            </button>
            <button className="flex-1 py-3 px-6 bg-indigo-500 text-white font-semibold rounded-lg hover:bg-indigo-600 transition-colors">
              Salvar alterações
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Configuracoes; 