import { motion } from "framer-motion";
import { Church, PartyPopper, Ticket } from "lucide-react";

const EXTERNAL_URL = "https://example.com/ingressos"; // Replace with real URL

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6 },
};

const tickets = [
  {
    title: "Apenas Cerimônia",
    price: "Gratuito",
    icon: Church,
    description: "Presença na celebração religiosa",
    features: ["Cerimônia na Igreja", "Fotos com os noivos"],
    variant: "classic" as const,
  },
  {
    title: "Cerimônia + Festa",
    price: "R$ —",
    icon: PartyPopper,
    description: "O pacote completo!",
    features: ["Cerimônia na Igreja", "Open Bar", "Open Food", "DJ & Pista de dança"],
    variant: "featured" as const,
    badge: "Mais popular",
  },
  {
    title: "Apenas Festa",
    price: "R$ —",
    icon: Ticket,
    description: "Direto pra balada",
    features: ["Open Bar", "Open Food", "DJ & Pista de dança"],
    variant: "club" as const,
  },
];

const TicketsSection = () => {
  return (
    <section id="tickets" className="section-padding bg-secondary/50">
      <div className="container mx-auto max-w-5xl">
        <motion.div {...fadeUp} className="text-center mb-12">
          <span className="text-sm font-body tracking-[0.3em] uppercase text-gold">Confirme sua presença</span>
          <h2 className="mt-2 font-display text-4xl md:text-5xl font-semibold text-foreground">RSVP & Ingressos</h2>
          <div className="mt-4 w-16 h-px bg-gold mx-auto" />
          <p className="mt-4 font-body text-muted-foreground max-w-lg mx-auto">
            Escolha como deseja participar. A festa é por adesão — ir apenas à cerimônia é totalmente bem-vindo!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tickets.map((t, i) => {
            const Icon = t.icon;
            const isClub = t.variant === "club";
            const isFeatured = t.variant === "featured";

            return (
              <motion.div
                key={t.title}
                {...fadeUp}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className={`relative rounded-2xl p-8 text-center border transition-transform hover:scale-[1.02] ${
                  isFeatured
                    ? "bg-card border-gold shadow-lg scale-[1.02]"
                    : isClub
                    ? "bg-club-dark border-neon-pink/20"
                    : "bg-card border-border"
                }`}
              >
                {t.badge && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gold text-primary-foreground text-xs font-body font-semibold">
                    {t.badge}
                  </span>
                )}

                <Icon className={`w-10 h-10 mx-auto mb-4 ${isClub ? "text-neon-pink" : "text-gold"}`} />
                <h3 className={`font-display text-xl font-semibold mb-2 ${isClub ? "font-club text-neon-blue" : "text-foreground"}`}>
                  {t.title}
                </h3>
                <p className={`text-sm font-body mb-4 ${isClub ? "text-gold-light/60" : "text-muted-foreground"}`}>
                  {t.description}
                </p>
                <p className={`text-3xl font-display font-bold mb-6 ${isClub ? "text-neon-pink" : "text-foreground"}`}>
                  {t.price}
                </p>

                <ul className="space-y-2 mb-8">
                  {t.features.map((f) => (
                    <li key={f} className={`text-sm font-body ${isClub ? "text-gold-light/50" : "text-muted-foreground"}`}>
                      ✓ {f}
                    </li>
                  ))}
                </ul>

                <a
                  href={EXTERNAL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-block w-full py-3 rounded-lg font-body font-semibold text-sm transition-colors ${
                    isFeatured
                      ? "bg-primary text-primary-foreground hover:opacity-90"
                      : isClub
                      ? "bg-neon-pink text-club-dark hover:opacity-90"
                      : "bg-secondary text-secondary-foreground hover:bg-accent"
                  }`}
                >
                  Selecionar
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TicketsSection;
