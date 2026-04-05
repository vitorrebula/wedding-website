import { motion } from "framer-motion";
import { Ticket, Check } from "lucide-react";

const EXTERNAL_URL = "https://uticket.com.br/evento/comemoracao-casamento-lucas-e-rafa/01LX30ME6FLPI3"; 

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6 },
};

const ticketData = {
  title: "After party",
  price: "R$ 69,00",
  icon: Ticket,
  description: "Direto pra balada",
  features: ["P9 / Ipanema Bar"],
  badge: "OSS"
};

const TicketsSection = () => {
  const Icon = ticketData.icon;

  return (
    <section id="tickets" className="section-padding bg-secondary/50 py-24">
      <div className="container mx-auto max-w-5xl px-6">
        <motion.div {...fadeUp} className="text-center mb-16">
          <span className="text-sm font-body tracking-[0.3em] uppercase text-gold font-bold">Confirme sua presença</span>
          <h2 className="mt-2 font-display text-4xl md:text-5xl font-semibold text-foreground tracking-tight uppercase">RSVP & Ingressos</h2>
          <div className="mt-6 w-16 h-px bg-gold mx-auto" />
          <p className="mt-6 font-body text-muted-foreground max-w-lg mx-auto">
            A festa é por adesão — ir apenas à cerimônia é totalmente bem-vindo!
          </p>
        </motion.div>

        <div className="flex justify-center">
          <motion.div
            {...fadeUp}
            className="relative w-full max-w-[380px] rounded-2xl p-10 text-center border-2 bg-white border-border shadow-xl transition-all duration-300 hover:shadow-2xl group"
          >
            {/* Badge com mais contraste para leitura imediata */}
            {ticketData.badge && (
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full bg-gold text-white text-[11px] font-body font-bold tracking-[0.2em] uppercase shadow-lg">
                {ticketData.badge}
              </span>
            )}

            {/* Ícone com cor mais definida */}
            <Icon
              className="w-12 h-12 mx-auto mb-6 text-gold stroke-[1.5]"
            />

            <h3 className="font-display text-2xl font-bold mb-2 text-foreground tracking-wide uppercase">
              {ticketData.title}
            </h3>

            {/* Aumentei a opacidade para leitura */}
            <p className="text-[10px] font-body mb-8 text-muted-foreground uppercase tracking-[0.2em] font-semibold">
              {ticketData.description}
            </p>

            {/* Bloco de Valor: O coração do card agora tem leitura total */}
            <div className="py-8 border-y-2 border-secondary mb-8 bg-secondary/10">
              <p className="text-5xl font-display font-bold text-foreground">
                {ticketData.price}
              </p>
              <span className="text-[11px] font-body text-foreground/60 uppercase tracking-[0.1em] mt-2 block font-medium">
                Individual / Cota Única
              </span>
            </div>

            {/* Lista com ícone de check para facilitar o escaneamento visual */}
            <ul className="space-y-4 mb-10">
              {ticketData.features.map((f) => (
                <li
                  key={f}
                  className="text-sm font-body text-foreground font-medium flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4 text-gold" />
                  {f}
                </li>
              ))}
            </ul>

            <a
              href={EXTERNAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-full py-5 rounded-xl bg-gold text-white font-body font-bold text-xs uppercase tracking-[0.3em] transition-all duration-300 hover:bg-foreground hover:scale-[1.02] shadow-lg shadow-gold/20"
            >
              Garantir ingresso
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TicketsSection;