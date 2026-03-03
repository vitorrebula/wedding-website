import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { useState } from "react";

const VideoSection = () => {
  const [playing, setPlaying] = useState(false);

  return (
    <section className="section-padding bg-card" id="video">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground">
            Um recado dos noivos
          </h2>
          <p className="mt-3 font-body text-muted-foreground text-base">
            Dê play e saiba tudo sobre a nossa festa
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative aspect-video rounded-xl overflow-hidden shadow-xl border border-border bg-muted"
        >
          {!playing ? (
            <button
              onClick={() => setPlaying(true)}
              className="absolute inset-0 flex items-center justify-center group cursor-pointer"
            >
              <div className="w-20 h-20 rounded-full bg-foreground/80 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Play className="w-8 h-8 text-background ml-1" />
              </div>
              <span className="absolute bottom-6 font-body text-sm text-muted-foreground">
                Clique para assistir
              </span>
            </button>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground font-body">
              {/* Replace the div below with your video embed */}
              {/* Example with YouTube: */}
              {/* <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/VIDEO_ID?autoplay=1"
                allow="autoplay; encrypted-media"
                allowFullScreen
              /> */}
              <p className="text-center px-4">
                Cole aqui o link do vídeo do YouTube ou Vimeo.<br />
                <span className="text-xs text-muted-foreground/60">
                  Substitua este placeholder no código pelo iframe do vídeo.
                </span>
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default VideoSection;
