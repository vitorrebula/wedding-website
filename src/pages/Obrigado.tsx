import { motion } from "framer-motion";
import { Heart, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Obrigado = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-background px-6 text-center overflow-hidden relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-gold/5 blur-3xl" />
        <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-blush/10 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-lg space-y-6"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3, type: "spring" }}
          className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto"
        >
          <Heart className="w-8 h-8 text-gold fill-gold/30" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="space-y-4"
        >
          <span className="text-sm font-body tracking-[0.3em] uppercase text-gold">
            De coração
          </span>
          <h1 className="font-display text-3xl md:text-4xl font-semibold text-foreground">
            Muito obrigado! 
          </h1>
          <div className="w-12 h-px bg-gold mx-auto" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="space-y-4"
        >
          <p className="font-body text-muted-foreground leading-relaxed">
            Ficamos muito felizes com o seu presente! Cada gesto de carinho nos
            emociona e nos ajuda a construir o começo da nossa vida juntos.
          </p>
          <p className="font-body text-muted-foreground leading-relaxed">
            Mas queremos que você saiba: o maior presente que podemos receber é
            a sua <strong className="text-foreground">presença</strong> ao nosso
            lado nesse dia tão especial. Ter você com a gente vai fazer tudo
            ainda mais inesquecível.
          </p>
          <p className="font-body text-foreground font-medium italic">
            Nos vemos no altar! 🤍
          </p>
          <p className="font-display text-lg text-gold mt-2">
            — Lucas & Rafa
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <Link
            to="/presentes"
            className="inline-flex items-center gap-2 mt-4 text-sm font-body text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para presentes
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Obrigado;
