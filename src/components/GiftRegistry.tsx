import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, X, Loader2, Send, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";

const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxs4qar-Gh1GJpJj0nKv63lhjVZvF6YcYSyJcpbgR2jggNK03LoduIKWB6XuLMEOT0CwA/exec";
const API_URL = "https://wedding-website-mpek.onrender.com";

type GiftItem = {
  id: number;
  title: string;
  emoji: string;
  goal: number;
  raised: number;
  shareLabel?: string;
  cotaValue?: number;
  imageUrl?: string;
};

function parseBRL(value: unknown): number {
  if (typeof value === "number") return value;
  if (!value) return 0;
  const str = String(value);
  return parseFloat(str.replace("R$", "").replace(/\./g, "").replace(",", ".").trim()) || 0;
}

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.5 },
};

const GiftRegistry = () => {
  const [gifts, setGifts] = useState<GiftItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedGift, setSelectedGift] = useState<GiftItem | null>(null);
  const [nome, setNome] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [lastPaymentLink, setLastPaymentLink] = useState<string | null>(null);
  const [openingPayment, setOpeningPayment] = useState(false);

  const fetchGifts = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(APPS_SCRIPT_URL);
      if (!res.ok) throw new Error("Erro ao buscar dados");
      const data = await res.json();

      const parsed: GiftItem[] = data.map((row: Record<string, unknown>, i: number) => {
        const title = String(row["PRESENTE"] || "");
        const cotaValue = parseBRL(row["VALOR POR COTA"]);
        const goal = parseBRL(row["VALOR TOTAL"]);
        const raised = parseBRL(row["VALOR PAGO"]);
        const imageUrl = String(row["FOTO"] || "").trim();

        return {
          id: i + 1,
          title: title || `Presente ${i + 1}`,
          imageUrl: imageUrl || undefined,
          goal,
          raised,
          cotaValue,
          shareLabel: cotaValue > 0
            ? `R$ ${cotaValue.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`
            : undefined,
        };
      }).filter((g: GiftItem) => g.title.trim());

      setGifts(parsed);
      setError(null);
    } catch (err) {
      setError("Erro ao carregar lista.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchGifts(); }, [fetchGifts]);

  const handleConfirmAndSubmit = async () => {
    if (!nome.trim() || !selectedGift || !selectedGift.cotaValue) return;
    setSubmitting(true);
    try {
      const response = await fetch(`${API_URL}/create-payment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pessoa: nome.trim(),
          presente: selectedGift.title,
          valor: selectedGift.cotaValue,
        }),
      });
      const data = await response.json();
      if (data?.paymentUrl || data?.url) {
        const paymentLink = data.url ?? data.paymentUrl;
        setLastPaymentLink(paymentLink);
        setOpeningPayment(true);
        if (paymentLink) window.open(paymentLink, "_blank");
        setTimeout(() => {
          setSubmitSuccess(true);
          setOpeningPayment(false);
        }, 800);
        return;
      }
      throw new Error("Link não retornado");
    } catch (err) {
      alert("Erro ao gerar pagamento.");
    } finally {
      setSubmitting(false);
    }
  };

  const openModal = (gift: GiftItem) => {
    setSelectedGift(gift);
    setSubmitSuccess(false);
    setNome("");
  };

  const closeModal = () => {
    setSelectedGift(null);
    setSubmitSuccess(false);
  };

  return (
    <section id="gifts" className="section-padding bg-background py-32">
      <div className="container mx-auto max-w-6xl px-6">
        <motion.div {...fadeUp} className="text-center mb-24">
          <span className="text-[10px] font-body tracking-[0.5em] uppercase text-gold/60 block mb-4">Registry</span>
          <h2 className="font-display text-3xl md:text-4xl text-foreground font-medium uppercase tracking-tight">Lista de Presentes</h2>
          <div className="mt-8 w-8 h-px bg-gold/30 mx-auto" />
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-5 h-5 animate-spin text-gold/40" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {gifts.map((gift, i) => (
              <motion.div
                key={gift.id}
                {...fadeUp}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                className="group flex flex-col items-center text-center"
              >
                <div 
                  className="relative aspect-[4/5] w-full overflow-hidden bg-secondary/20 cursor-pointer rounded-sm"
                  onClick={() => openModal(gift)}
                >
                  {gift.imageUrl ? (
                    <img
                      src={gift.imageUrl}
                      alt={gift.title}
                      className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xl opacity-20 uppercase font-display tracking-widest">Gift</div>
                  )}
                </div>
                
                <div className="mt-8 w-full">
                  <h3 className="font-display text-sm text-foreground uppercase tracking-widest mb-2 h-10 flex items-center justify-center px-4">
                    {gift.title}
                  </h3>
                  
                  <div className="flex flex-col items-center gap-6 mt-4">
                    <span className="font-display text-lg text-gold font-semibold tracking-tighter">
                      {gift.shareLabel}
                    </span>
                    
                    <button
                      onClick={() => openModal(gift)}
                      className="w-full py-4 bg-foreground text-white text-[9px] uppercase tracking-[0.3em] font-bold hover:bg-gold transition-colors flex items-center justify-center gap-2"
                    >
                      Presentear <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedGift && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-white/90 backdrop-blur-md"
            onClick={closeModal}
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white border border-border p-12 max-w-md w-full shadow-2xl relative text-center"
            >
              <button onClick={closeModal} className="absolute right-8 top-8 text-muted-foreground hover:text-foreground">
                <X className="w-4 h-4" />
              </button>

              {submitSuccess ? (
                <div className="py-10 space-y-8">
                  <div className="space-y-4">
                    <h4 className="font-display text-xl text-foreground uppercase tracking-widest">Link de Pagamento</h4>
                    <p className="font-body text-xs text-muted-foreground leading-relaxed uppercase tracking-widest">
                      O checkout foi aberto em uma nova janela.
                    </p>
                  </div>
                  <div className="space-y-4">
                    {lastPaymentLink && (
                      <button
                        onClick={() => window.open(lastPaymentLink, "_blank")}
                        className="w-full py-4 border border-gold text-gold text-[10px] uppercase tracking-widest font-bold hover:bg-gold/5 transition-colors"
                      >
                        Abrir Novamente
                      </button>
                    )}
                    <button onClick={closeModal} className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors">
                      [ Fechar Janela ]
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-12">
                  <div className="space-y-4">
                    <span className="text-[9px] tracking-[0.5em] uppercase text-gold font-bold block mb-2">Checkout</span>
                    <h3 className="font-display text-2xl text-foreground uppercase tracking-tight leading-tight">{selectedGift.title}</h3>
                    <p className="text-xl font-display text-gold font-semibold tracking-tighter">{selectedGift.shareLabel}</p>
                  </div>

                  <div className="space-y-8">
                    <div className="text-left border-b border-border pb-2 group">
                      <label className="text-[9px] uppercase tracking-[0.3em] text-muted-foreground mb-4 block">Nome Completo</label>
                      <Input
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        placeholder="IDENTIFIQUE SUA COTA"
                        className="rounded-none border-0 p-0 focus-visible:ring-0 transition-colors font-body text-sm uppercase tracking-widest bg-transparent"
                      />
                    </div>

                    <button
                      onClick={handleConfirmAndSubmit}
                      disabled={submitting || openingPayment || !nome}
                      className="w-full py-5 bg-foreground text-white text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-gold transition-all flex items-center justify-center gap-3 disabled:opacity-20"
                    >
                      {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Gerar Link de Pagamento"}
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GiftRegistry;