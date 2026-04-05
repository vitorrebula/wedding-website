import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import heroBg from "@/assets/rafa-e--lucas-hero.jpeg";

const WEDDING_DATE = new Date("2026-04-30T18:00:00");

const calcTimeLeft = () => {
  const diff = WEDDING_DATE.getTime() - Date.now();
  if (diff <= 0) return { dias: 0, horas: 0, min: 0, seg: 0 };
  return {
    dias: Math.floor(diff / (1000 * 60 * 60 * 24)),
    horas: Math.floor((diff / (1000 * 60 * 60)) % 24),
    min: Math.floor((diff / (1000 * 60)) % 60),
    seg: Math.floor((diff / 1000) % 60),
  };
};

const HeroSection = () => {
  const [time, setTime] = useState(calcTimeLeft());

  useEffect(() => {
    const id = setInterval(() => setTime(calcTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img 
          src={heroBg} 
          alt="Cenário de casamento" 
          className="w-full h-full object-cover [object-position:50%_10%]" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 pt-20">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-semibold text-black leading-tight"
        >
          <span className="inline-flex items-center mx-3 md:mx-5">
          Lucas
            &
          Rafaela
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-5 font-body text-sm tracking-[0.25em] text-black uppercase"
        >
          30 · 04 · 2026
        </motion.p>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="mt-10 flex justify-center gap-4 md:gap-8"
        >
          {Object.entries(time).map(([label, value]) => (
            <div key={label} className="text-center">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-lg bg-card/80 backdrop-blur-sm border border-gold-light/30 flex items-center justify-center shadow-lg">
                <span className="font-display text-2xl md:text-3xl font-bold text-foreground">{value}</span>
              </div>
              <span className="mt-2 block text-xs font-body uppercase tracking-wider text-black">
                {label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-16 animate-float"
        >
          <a href="#gifts" className="text-muted-foreground hover:text-foreground transition-colors">
            <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
