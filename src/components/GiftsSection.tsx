import { motion } from "framer-motion";
import { Gift, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6 },
};

const GiftsSection = () => {
  return (
    <section id="gifts" className="section-padding bg-background">
      <div className="container mx-auto max-w-3xl text-center">
        <motion.div {...fadeUp} className="space-y-6">
          <span className="text-sm font-body tracking-[0.3em] uppercase text-gold">
            Lista de presentes
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-foreground">
            Presenteie o Casal
          </h2>
          <div className="w-16 h-px bg-gold mx-auto" />
          <p className="font-body text-muted-foreground max-w-lg mx-auto">
            Ficaremos muito felizes em ter vocês ao nosso lado. <br /><br /> Se desejar nos presentear, criamos uma lista para nos ajudar a construir nosso novo lar e realizar nossos primeiros sonhos como casal.          </p>
          <Link
            to="/presentes"
            className="inline-flex items-center gap-3 mt-4 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-body font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            <Gift className="w-5 h-5" />
            Ver lista de presentes
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default GiftsSection;
