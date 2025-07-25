import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import HamburgerMenu from "@/components/HamburgerMenu";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Profile {
  id: string;
  first_name: string;
  last_name: string;
  display_name: string;
  avatar_url: string;
  bio: string;
  services: string;
  description: string;
  location: string;
  phone: string;
  email: string;
  specializations: string;
  experience_years: number;
  hourly_rate: number;
}

const PerfilProfissional: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchProfile = async () => {
      if (!id) return;

      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', id)
          .eq('role', 'provider')
          .single();

        if (error) {
          console.error('Erro ao buscar perfil:', error);
          toast({
            title: "Erro",
            description: "Não foi possível carregar o perfil do prestador.",
            variant: "destructive",
          });
          return;
        }

        setProfile(data);
      } catch (error) {
        console.error('Erro ao buscar perfil:', error);
        toast({
          title: "Erro",
          description: "Erro inesperado ao carregar perfil.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id, toast]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-100 via-blue-50 to-blue-100">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-100 via-blue-50 to-blue-100 p-4">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Perfil não encontrado</h2>
          <p className="text-gray-600">O prestador que você está procurando não foi encontrado.</p>
        </div>
      </div>
    );
  }

  const displayName = profile.display_name || `${profile.first_name} ${profile.last_name}`;
  const services = profile.services ? profile.services.split(',').map(s => s.trim()) : [];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-100 via-blue-50 to-blue-100 p-4">
      <HamburgerMenu />
      <div className="w-full max-w-xs sm:max-w-md md:max-w-lg bg-white rounded-3xl shadow-2xl flex flex-col items-center p-4 sm:p-8 gap-4 sm:gap-6 mx-auto">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">Perfil do Profissional</h2>
        
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gray-200 flex items-center justify-center border-4 border-white shadow-lg mb-2">
          {profile.avatar_url ? (
            <img src={profile.avatar_url} alt={displayName} className="w-full h-full rounded-full object-cover" />
          ) : (
            <span className="text-2xl font-bold text-gray-600">
              {profile.first_name?.charAt(0)}{profile.last_name?.charAt(0)}
            </span>
          )}
        </div>
        
        <div className="text-xl sm:text-2xl font-semibold text-blue-600 mb-4">{displayName}</div>
        
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-4 w-full justify-center">
          <button className="px-6 py-2 rounded-full font-semibold bg-blue-600 text-white shadow hover:bg-blue-700 transition w-full sm:w-auto">
            Mensagem
          </button>
          <button className="px-6 py-2 rounded-full font-semibold bg-gray-100 text-gray-800 shadow hover:bg-gray-200 transition w-full sm:w-auto">
            Adicionar
          </button>
          <button className="px-6 py-2 rounded-full font-semibold bg-gray-100 text-gray-800 shadow hover:bg-gray-200 transition w-full sm:w-auto">
            Mais
          </button>
        </div>

        {profile.description && (
          <div className="w-full bg-gray-50 rounded-2xl p-4 sm:p-6 shadow mb-2">
            <h3 className="text-lg font-bold text-gray-800 mb-2">Sobre</h3>
            <p className="text-gray-700 text-base">{profile.description}</p>
          </div>
        )}

        {services.length > 0 && (
          <div className="w-full bg-gray-50 rounded-2xl p-4 sm:p-6 shadow mb-2">
            <h3 className="text-lg font-bold text-gray-800 mb-2">Serviços</h3>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {services.map((service, index) => (
                <span 
                  key={index} 
                  className="bg-blue-100 text-blue-600 px-4 py-1 rounded-full text-base font-medium"
                >
                  {service}
                </span>
              ))}
            </div>
          </div>
        )}

        {profile.location && (
          <div className="w-full bg-gray-50 rounded-2xl p-4 sm:p-6 shadow mb-2">
            <h3 className="text-lg font-bold text-gray-800 mb-2">Localização</h3>
            <p className="text-gray-700 text-base">{profile.location}</p>
          </div>
        )}

        {(profile.experience_years || profile.hourly_rate) && (
          <div className="w-full bg-gray-50 rounded-2xl p-4 sm:p-6 shadow">
            <h3 className="text-lg font-bold text-gray-800 mb-2">Informações Profissionais</h3>
            {profile.experience_years && (
              <p className="text-gray-700 text-base mb-1">
                Experiência: {profile.experience_years} {profile.experience_years === 1 ? 'ano' : 'anos'}
              </p>
            )}
            {profile.hourly_rate && (
              <p className="text-gray-700 text-base">
                Valor por hora: R$ {profile.hourly_rate.toFixed(2)}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PerfilProfissional;