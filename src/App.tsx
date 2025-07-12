import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cliente from "./pages/Cliente";
import Prestador from "./pages/Prestador";
import Auth from "./pages/Auth";
import Avaliacoes from "./pages/Avaliacoes";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Busca from "./pages/Busca";
import PerfilPrestador from "./pages/PerfilPrestador";
import Dock from "./components/Dock";
import Configuracoes from "./pages/Configuracoes";
import PerfilProfissional from "./pages/PerfilProfissional";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Dock />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/busca" element={<Busca />} />
          <Route path="/perfil-profissional" element={<PerfilProfissional />} />
          <Route path="/perfil-prestador" element={<PerfilPrestador />} />
          <Route path="/configuracoes" element={<Configuracoes />} />
          <Route path="/cliente" element={<Cliente />} />
          <Route path="/prestador" element={<Prestador />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/avaliacoes" element={<Avaliacoes />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
