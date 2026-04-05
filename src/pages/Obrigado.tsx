import { motion } from "framer-motion";
import { Heart, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Obrigado = () => {
  return (
    // Fundo no seu tom favorito #faf0f1 para um encerramento quente e elegante
    <div className="h-screen flex flex-col items-center justify-center px-6 text-center overflow-hidden relative">
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 max-w-lg"
      >
        {/* Ícone Minimalista: Sem círculos, apenas o traço fino */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-10"
        >
          <Heart className="w-10 h-10 text-gold/40 mx-auto stroke-[1.2]" />
        </motion.div>

        <motion.div className="space-y-8">
          <div className="space-y-3">
            <span className="text-[10px] font-body tracking-[0.5em] uppercase text-gold font-bold block">
              De coração
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-medium text-foreground uppercase tracking-tight">
              Muito obrigado
            </h1>
            <div className="w-12 h-px bg-gold/30 mx-auto mt-6" />
          </div>

          <div className="space-y-6 max-w-md mx-auto">
            <p className="font-body text-sm text-muted-foreground leading-relaxed uppercase tracking-widest opacity-80">
              Ficamos muito felizes com o seu presente. Cada gesto nos
              ajuda a construir o começo da nossa vida juntos.
            </p>
            
            <p className="font-body text-sm text-foreground leading-relaxed uppercase tracking-[0.15em] font-medium">
              O maior presente é a sua <span className="text-gold">presença</span> ao nosso
              lado nesse dia tão especial.
            </p>

            <div className="pt-8">
              <p className="font-display text-xl text-gold italic tracking-wide">
                Nos vemos no altar
              </p>
              <p className="font-display text-sm text-foreground/40 mt-4 uppercase tracking-[0.4em]">
                Lucas & Rafa
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-16"
        >
          <Link
            to="/presentes"
            className="inline-flex items-center gap-3 text-[10px] font-body text-muted-foreground uppercase tracking-[0.3em] hover:text-gold transition-all group"
          >
            <ArrowLeft className="w-3 h-3 transition-transform group-hover:-translate-x-1" />
            [ Voltar ]
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Obrigado;