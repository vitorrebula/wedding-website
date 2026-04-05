import { motion } from "framer-motion";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6 },
};

const madrinhas = [
  "Raissa Campos",
  "Verônica Porto Lima",
  "Mariana Abritta",
  "Ana Barbara",
  "Gabrielle Rébula",
  "Ana Carolina Rébula",
  "Maria Eduarda Coelho",
  "Rafaela Coelho",
  "Isadora Porto Lima",
  "Rebeca Camile",
];

const padrinhos = [
  "Vitor Rebula",
  "Gabriel Torres",
  "Matheus Torres",
  "Luan Sander",
  "André Marques",
  "Emanuel Moura",
  "Daniel Gomes",
  "Marcus Coelho",
  "Edson Junio",
  "Gustavo Nicomedes",
  "Rodrigo Amaral",
];

const PadrinhosMadrinhas = () => {
  return (
    <section id="padrinhos" className="section-padding bg-background">
      <div className="container mx-auto max-w-4xl">
        <motion.div {...fadeUp} className="text-center mb-16">
          <h2 className="mt-3 font-display text-4xl md:text-5xl font-semibold text-foreground">
            Nossos Padrinhos
          </h2>
          <div className="mt-5 w-16 h-px bg-gold mx-auto" />
        </motion.div>

        <motion.p
          {...fadeUp}
          className="text-center font-body text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-20 text-base md:text-lg"
        >
          Escolhemos vocês a dedo para estarem ao nosso lado neste momento tão
          importante. Obrigado por aceitarem o convite e por fazerem parte da
          nossa história.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          {/* Madrinhas */}
          <motion.div {...fadeUp}>
            <h3 className="font-display text-lg tracking-[0.15em] uppercase text-foreground text-center mb-10">
              Madrinhas
            </h3>
            <ul className="space-y-5">
              {madrinhas.map((nome) => (
                <li
                  key={nome}
                  className="text-center font-body text-muted-foreground text-base"
                >
                  {nome}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Padrinhos */}
          <motion.div {...fadeUp}>
            <h3 className="font-display text-lg tracking-[0.15em] uppercase text-foreground text-center mb-10">
              Padrinhos
            </h3>
            <ul className="space-y-5">
              {padrinhos.map((nome) => (
                <li
                  key={nome}
                  className="text-center font-body text-muted-foreground text-base"
                >
                  {nome}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div {...fadeUp} className="mt-20 w-24 h-px bg-border mx-auto" />
      </div>
    </section>
  );
};

export default PadrinhosMadrinhas;
