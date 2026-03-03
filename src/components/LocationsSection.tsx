import { motion } from "framer-motion";
import { MapPin, Church, Music } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6 },
};

const LocationsSection = () => {
  return (
    <section id="locations" className="section-padding bg-background">
      <div className="container mx-auto max-w-5xl">
        <motion.div {...fadeUp} className="text-center mb-12">
          <span className="text-sm font-body tracking-[0.3em] uppercase text-gold">Onde será</span>
          <h2 className="mt-2 font-display text-4xl md:text-5xl font-semibold text-foreground">Localização</h2>
          <div className="mt-4 w-16 h-px bg-gold mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Church */}
          <motion.div {...fadeUp} className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm">
            <div className="aspect-video bg-muted">
              <iframe
                title="Igreja"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3750.0!2d-43.9!3d-19.9!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDU0JzAwLjAiUyA0M8KwNTQnMDAuMCJX!5e0!3m2!1spt-BR!2sbr!4v1234567890"
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="p-6 text-center">
              <Church className="w-8 h-8 mx-auto text-gold mb-3" />
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">Cerimônia</h3>
              <p className="font-body text-sm text-muted-foreground">
                Local da cerimônia religiosa
              </p>
              <p className="mt-2 font-body text-xs text-muted-foreground flex items-center justify-center gap-1">
                <MapPin className="w-3 h-3" /> Endereço a confirmar
              </p>
            </div>
          </motion.div>

          {/* Party */}
          <motion.div {...fadeUp} className="bg-club-dark rounded-2xl border border-neon-pink/20 overflow-hidden shadow-sm">
            <div className="aspect-video bg-club-surface">
              <iframe
                title="Festa"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3750.0!2d-43.9!3d-19.9!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDU0JzAwLjAiUyA0M8KwNTQnMDAuMCJX!5e0!3m2!1spt-BR!2sbr!4v1234567890"
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="p-6 text-center">
              <Music className="w-8 h-8 mx-auto text-neon-pink mb-3" />
              <h3 className="font-club text-xl font-bold text-neon-blue mb-2">After Party</h3>
              <p className="font-body text-sm text-gold-light/60">
                Local da festa
              </p>
              <p className="mt-2 font-body text-xs text-gold-light/40 flex items-center justify-center gap-1">
                <MapPin className="w-3 h-3" /> Endereço a confirmar
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LocationsSection;
