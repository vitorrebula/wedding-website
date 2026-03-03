import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import GiftRegistry from "@/components/GiftRegistry";

const Presentes = () => {
  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="container mx-auto flex items-center h-16 px-4">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm font-body font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Link>
        </div>
      </nav>
      <div className="pt-16">
        <GiftRegistry />
      </div>
    </div>
  );
};

export default Presentes;
