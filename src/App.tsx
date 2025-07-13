import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cliente from "./pages/Cliente";
import Prestador from "./pages/Prestador";
import Auth from "./pages/Auth";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProfileSetup from "./pages/ProfileSetup";
import Avaliacoes from "./pages/Avaliacoes";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Busca from "./pages/Busca";
import PerfilPrestador from "./pages/PerfilPrestador";
import Dock from "./components/Dock";
import Configuracoes from "./pages/Configuracoes";
import PerfilProfissional from "./pages/PerfilProfissional";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { ProfileCheck } from "./components/ProfileCheck";
import { ProfileCompletionBanner } from "./components/ProfileCompletionBanner";
import { DevModeBanner } from "./components/DevModeBanner";
import { AuthProvider } from "./contexts/AuthContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <DevModeBanner />
          <ProfileCompletionBanner />
          <Dock />
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/busca" element={<Busca />} />
          <Route path="/perfil-profissional" element={<PerfilProfissional />} />
          <Route path="/perfil-prestador" element={<PerfilPrestador />} />
          <Route path="/configuracoes" element={<Configuracoes />} />
          <Route path="/cliente" element={
            <ProtectedRoute requiredRole="user">
              <ProfileCheck>
                <Cliente />
              </ProfileCheck>
            </ProtectedRoute>
          } />
          <Route path="/prestador" element={
            <ProtectedRoute requiredRole="provider">
              <ProfileCheck>
                <Prestador />
              </ProfileCheck>
            </ProtectedRoute>
          } />
          <Route path="/auth" element={<Auth />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile-setup" element={
            <ProtectedRoute>
              <ProfileCheck redirectToSetup={false}>
                <ProfileSetup />
              </ProfileCheck>
            </ProtectedRoute>
          } />
          <Route path="/avaliacoes" element={<ProtectedRoute><Avaliacoes /></ProtectedRoute>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
