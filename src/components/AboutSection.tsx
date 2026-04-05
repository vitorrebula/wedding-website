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
      {/* Parte 1 - Minimalista mantendo seus padrões */}
      <div className="section-padding bg-secondary/50">
        <div className="container mx-auto max-w-4xl">
          <motion.div {...fadeUp} className="text-center mb-12">
            <span className="text-sm font-body tracking-[0.3em] uppercase text-gold">Parte 1</span>
            <h2 className="mt-2 font-display text-4xl md:text-5xl font-semibold text-foreground">O grande momento</h2>
            <div className="mt-4 w-16 h-px bg-gold mx-auto" />
          </motion.div>

          <motion.div {...fadeUp} className="text-center">
            <Church className="w-12 h-12 mx-auto text-gold mb-6 opacity-60" />
            <h3 className="font-display text-2xl font-semibold text-foreground mb-4">Cerimônia Religiosa</h3>
            <p className="font-body text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Convidamos você para o momento mais especial de nossas vidas: nosso casamento. Venham com o coração cheio de amor e bençãos para testemunhar nossa troca de votos!
            </p>
            
            {/* Mantendo suas fontes e tamanhos, apenas mudando o layout de badges para texto limpo */}
            <div className="mt-8 flex justify-center gap-6 border-t border-border pt-8 max-w-xs mx-auto">
              <span className="text-sm font-body font-medium text-gold">30/04/2026</span>
              <span className="w-px h-4 bg-border" />
              <span className="text-sm font-body font-medium text-gold">19h30</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Parte 2 - Celebração refinada */}
      <div className="relative section-padding overflow-hidden">
        <div className="absolute inset-0">
          <img src={partyBg} alt="Festa" className="w-full h-full object-cover grayscale-[20%]" />
          <div className="absolute inset-0 bg-black/75" /> 
        </div>

        <div className="relative z-10 container mx-auto max-w-4xl">
          <motion.div {...fadeUp} className="text-center mb-12">
            <span className="text-sm font-club tracking-[0.3em] uppercase text-white/40">Parte 2</span>
            <h2 className="mt-2 font-club text-4xl md:text-5xl font-bold text-white">A Celebração</h2>
            <div className="mt-4 w-16 h-px bg-white/20 mx-auto" />
          </motion.div>

          <motion.div {...fadeUp} className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-8 md:p-12 text-center">
            <img src={lr} alt="L&R" style={{width: '70px', display: "block", margin: "0 auto", opacity: 0.8}} />
            
            <h3 className="font-club text-2xl font-bold mb-4 text-white italic mt-[10px]">
              After Party
            </h3>
            
            <p className="font-body text-white/70 leading-relaxed max-w-2xl mx-auto">
              Depois da cerimônia, vamos comemorar o casamento em uma balada, onde receberemos os cumprimentos. 
            </p>

            <div className="mt-6 p-6 border-y border-white/10">
              <p className="font-body text-sm text-white/50">
                Os ingressos para entrada são vendidos antecipadamente.
                <br />
                <strong className="text-white/80">Vamos adorar a sua presença!</strong> Mas sinta-se à vontade para ir apenas para cerimônia, se preferir.
              </p>
            </div>

            <div className="mt-6 flex flex-wrap justify-center gap-6">
              <span className="text-xs font-club font-medium text-white/40 tracking-[0.2em] uppercase">Open Bar</span>
              <span className="text-xs font-club font-medium text-white/40 tracking-[0.2em] uppercase">Open Food</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;