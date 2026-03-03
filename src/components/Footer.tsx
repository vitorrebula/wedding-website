import { Heart } from "lucide-react";

const Footer = () => (
  <footer className="py-10 bg-primary text-center">
    <p className="font-display text-2xl text-primary-foreground mb-2">
      Lucas & Rafaela
    </p>
    <p className="font-body text-sm text-primary-foreground/60 flex items-center justify-center gap-1">
      Feito com <Heart className="w-3 h-3 fill-blush text-blush" /> para o grande dia
    </p>
    <p className="font-body text-xs text-primary-foreground/40 mt-4">
      19 de Setembro de 2026
    </p>
  </footer>
);

export default Footer;
