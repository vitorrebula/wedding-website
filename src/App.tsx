import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Presentes from "./pages/Presentes";
import NotFound from "./pages/NotFound";
import { useEffect } from "react";
import Obrigado from "./pages/Obrigado";

const queryClient = new QueryClient();


const App = () => {
  
  useEffect(() => {
    const ping = async () => {
      try {
        await fetch("https://wedding-website-mpek.onrender.com/ping", {
          method: "GET",
          mode: "no-cors"
        });
      } catch (e) {}
    };
  
    ping();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/presentes" element={<Presentes />} />
            <Route path="/obrigado" element={<Obrigado />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  )
};

export default App;
