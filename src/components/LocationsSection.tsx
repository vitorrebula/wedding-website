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
    // Fundo branco padrão (bg-background) para máxima limpeza visual
    <section id="locations" className="section-padding bg-background py-28">
      <div className="container mx-auto max-w-5xl px-6">
        <motion.div {...fadeUp} className="text-center mb-16">
          <span className="text-sm font-body tracking-[0.3em] uppercase text-gold">Onde será</span>
          <h2 className="mt-2 font-display text-4xl md:text-5xl font-semibold text-foreground uppercase tracking-tight">Localização</h2>
          <div className="mt-6 w-12 h-px bg-gold/30 mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Cerimônia - Card Branco Minimalista */}
          <motion.div {...fadeUp} className="bg-white rounded-2xl border border-border overflow-hidden shadow-xl shadow-black/[0.03] group transition-all duration-500 hover:shadow-gold/10">
            <div className="aspect-video bg-muted/30 relative">
              <iframe
                title="Igreja"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3752.124220230887!2d-44.00028712465294!3d-19.87697593665985!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa6913ee9b814df%3A0xccf825845661513f!2sRua%20Castelo%20de%20Alc%C3%A1zar%2C%2080%20-%20Castelo%2C%20Belo%20Horizonte%20-%20MG%2C%2031330-310!5e0!3m2!1spt-BR!2sbr!4v1775355022908!5m2!1spt-BR!2sbr"
                className="w-full h-full border-0 transition-all duration-700"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="p-10 text-center">
              <Church className="w-8 h-8 mx-auto text-gold/40 mb-4 stroke-[1.2]" />
              <h3 className="font-display text-2xl font-semibold text-foreground mb-3 uppercase tracking-wide">Cerimônia</h3>
              <p className="font-body text-sm text-muted-foreground mb-6 italic">
                Local da cerimônia religiosa
              </p>
              <div className="pt-6 border-t border-border flex flex-col items-center gap-2">
                <p className="font-body text-[11px] uppercase tracking-[0.2em] text-gold font-bold flex items-center justify-center gap-2">
                  <MapPin className="w-3 h-3" /> Paróquia N.S. de Guadalupe
                </p>
              </div>
            </div>
          </motion.div>

          {/* After Party - Card Branco Minimalista */}
          <motion.div {...fadeUp} className="bg-white rounded-2xl border border-border overflow-hidden shadow-xl shadow-black/[0.03] group transition-all duration-500 hover:shadow-gold/10">
            <div className="aspect-video bg-muted/30 relative">
              <iframe
                title="Festa"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3752.3535448775724!2d-43.99061541904078!3d-19.86728778865555!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa691034f588631%3A0xba878d57d83eb989!2sAv.%20Fleming%2C%20845%20-%20Ouro%20Preto%2C%20Belo%20Horizonte%20-%20MG%2C%2031310-490!5e0!3m2!1spt-BR!2sbr!4v1775355132904!5m2!1spt-BR!2sbr"
                className="w-full h-full border-0 transition-all duration-700"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="p-10 text-center">
              <Music className="w-8 h-8 mx-auto text-gold/40 mb-4 stroke-[1.2]" />
              {/* Mantida a fonte font-club conforme seu pattern, mas com a cor neutra text-foreground */}
              <h3 className="font-club text-2xl font-bold text-foreground mb-3 italic">After Party</h3>
              <p className="font-body text-sm text-muted-foreground mb-6 italic">
                Local da celebração
              </p>
              <div className="pt-6 border-t border-border flex flex-col items-center gap-2">
                <p className="font-body text-[11px] uppercase tracking-[0.2em] text-gold font-bold flex items-center justify-center gap-2">
                  <MapPin className="w-3 h-3" /> P9/Ipanema Bar
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LocationsSection;