import { motion } from "framer-motion";
import { Church } from "lucide-react";
import partyBg from "@/assets/festa.jpeg";
import lr from "@/assets/l&r.jpeg";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6 },
};

const AboutSection = () => {
  return (
    <section id="about" className="relative">
      <div className="section-padding bg-secondary/50">
        <div className="container mx-auto max-w-4xl">
          <motion.div {...fadeUp} className="text-center mb-12">
            <span className="text-sm font-body tracking-[0.3em] uppercase text-gold">Parte 1</span>
            <h2 className="mt-2 font-display text-4xl md:text-5xl font-semibold text-foreground">O grande momento</h2>
            <div className="mt-4 w-16 h-px bg-gold mx-auto" />
          </motion.div>

          <motion.div {...fadeUp} className="bg-card rounded-2xl border border-border p-8 md:p-12 text-center shadow-sm">
            <Church className="w-12 h-12 mx-auto text-gold mb-6" />
            <h3 className="font-display text-2xl font-semibold text-foreground mb-4">Cerimônia Religiosa</h3>
            <p className="font-body text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Convidamos você para o momento mais especial de nossas vidas: nosso casamento. Venham com o coração cheio de amor e bençãos para testemunhar nossa troca de votos!       </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <span className="px-3 py-1 rounded-full bg-sage-light text-sage text-xs font-body font-medium">30/04/2026</span>
              <span className="px-3 py-1 rounded-full bg-sage-light text-sage text-xs font-body font-medium">19h30</span>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="relative section-padding overflow-hidden">
        <div className="absolute inset-0">
          <img src={partyBg} alt="Festa" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-club-dark/85" />
        </div>

        <div className="relative z-10 container mx-auto max-w-4xl">
          <motion.div {...fadeUp} className="text-center mb-12">
            <span className="text-sm font-club tracking-[0.3em] uppercase text-neon-pink">Parte 2</span>
            <h2 className="mt-2 font-club text-4xl md:text-5xl font-bold text-gradient-neon">A Celebração</h2>
            <div className="mt-4 w-16 h-px bg-neon-pink mx-auto" />
          </motion.div>

          <motion.div {...fadeUp} className="bg-club-surface/60 backdrop-blur-md rounded-2xl border border-neon-pink/20 p-8 md:p-12 text-center">
            <img src={lr} alt="L&R" style={{width: '70px', display: "block", margin: "0 auto"}} />
            <h3 className="font-club text-2xl font-bold text-neon-blue mb-4 flex items-center justify-center gap-2">
              After Party
            </h3>
            <p className="font-body text-gold-light/80 leading-relaxed max-w-2xl mx-auto">
              Depois da cerimônia, vamos comemorar o casamento em uma balada, onde receberemos os cumprimentos. 

              Os ingressos para entrada são vendidos antecipadamente.

              <strong className="text-neon-blue"> Vamos adorar a sua presença!</strong> Mas sinta-se a vontade para ir apenas para cerimônia, se preferir.
            </p>

            <div className="mt-6 p-4 rounded-lg bg-club-dark/50 border border-neon-blue/20">
              <p className="font-body text-sm text-gold-light/60">
                Para quem quiser estender a alegria com a gente, nossa festa será 
                  <strong className="text-neon-pink"> por adesão</strong> (ingresso pago). 
                  Sintam-se totalmente acolhidos para participar apenas da nossa cerimônia na igreja; 
                  o importante para nós é o seu carinho!
                </p>
            </div>

            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <span className="px-3 py-1 rounded-full bg-neon-pink/10 text-neon-pink text-xs font-club font-medium border border-neon-pink/20"> Open Bar</span>
              <span className="px-3 py-1 rounded-full bg-neon-blue/10 text-neon-blue text-xs font-club font-medium border border-neon-blue/20"> Open Food</span>
              <span className="px-3 py-1 rounded-full bg-neon-pink/10 text-neon-pink text-xs font-club font-medium border border-neon-pink/20"> Momentos inesquecíveis</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
