import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, X, Copy, Check, Loader2, Send, AlertTriangle } from "lucide-react";
import { Input } from "@/components/ui/input";

const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxs4qar-Gh1GJpJj0nKv63lhjVZvF6YcYSyJcpbgR2jggNK03LoduIKWB6XuLMEOT0CwA/exec";
const PIX_KEY = "lucas.rafaela@pix.com";
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
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6 },
};

const GiftRegistry = () => {
  const [gifts, setGifts] = useState<GiftItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedGift, setSelectedGift] = useState<GiftItem | null>(null);

  // Form state
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
          ? `Cota de R$ ${cotaValue.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`
          : undefined,
      };
    }).filter((g: GiftItem) => g.title.trim());

      setGifts(parsed);
      setError(null);
    } catch (err) {
      console.error("Erro ao carregar presentes:", err);
      setError("Não foi possível carregar a lista de presentes.");
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
        headers: {
          "Content-Type": "application/json",
        },
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

        // 🔥 redireciona a aba criada
        if (paymentLink) {
          window.open(paymentLink, "_blank");
        }

        // pequeno delay só pra UX ficar mais natural
        setTimeout(() => {
          setSubmitSuccess(true);
          setOpeningPayment(false);
        }, 800);

        return;
      }

      throw new Error("Link não retornado");
    } catch (err) {
      console.error(err);
      alert("Erro ao gerar pagamento 😢");
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
    <section id="gifts" className="section-padding bg-background">
      <div className="container mx-auto max-w-5xl">
        <motion.div {...fadeUp} className="text-center mb-12">
          <span className="text-sm font-body tracking-[0.3em] uppercase text-gold">Lista de presentes</span>
          <h2 className="mt-2 font-display text-4xl md:text-5xl font-semibold text-foreground">Presenteie o Casal</h2>
          <div className="mt-4 w-16 h-px bg-gold mx-auto" />
          <p className="mt-4 font-body text-muted-foreground max-w-lg mx-auto">
            Contribua via PIX para ajudar Lucas & Rafa a realizarem seus sonhos juntos
          </p>
        </motion.div>

        {loading && (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-gold" />
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <p className="font-body text-muted-foreground">{error}</p>
          </div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {gifts.map((gift, i) => {
              const pct = gift.goal > 0 ? Math.min((gift.raised / gift.goal) * 100, 100) : 0;
              return (
                <motion.div
                  key={gift.id}
                  {...fadeUp}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="bg-card rounded-2xl border border-border p-6 hover:shadow-md transition-shadow"
                >
                  <div className="mb-4">
                    {gift.imageUrl ? (
                      <img
                        src={gift.imageUrl}
                        alt={gift.title}
                        className="w-full h-40 object-cover rounded-xl"
                      />
                    ) : (
                      <div className="w-full h-40 flex items-center justify-center bg-secondary rounded-xl text-4xl">
                        🎁
                      </div>
                    )}
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2">{gift.title}</h3>

                  {gift.shareLabel && (
                    <p className="text-xs font-body text-gold mb-3 bg-gold/10 rounded-full px-3 py-1 inline-block">
                      {gift.shareLabel}
                    </p>
                  )}

                  {gift.goal > 0 && (
                    <div className="mt-3">
                      <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${pct}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.3 }}
                          className="h-full rounded-full"
                          style={{ background: `linear-gradient(90deg, hsl(var(--gold)), hsl(var(--gold-light)))` }}
                        />
                      </div>
                      <p className="text-xs font-body text-muted-foreground mt-1">{Math.round(pct)}% alcançado</p>
                    </div>
                  )}

                  <button
                    onClick={() => openModal(gift)}
                    className="mt-4 w-full py-2.5 rounded-lg bg-primary text-primary-foreground font-body font-semibold text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                  >
                    <Gift className="w-4 h-4" /> Presentear
                  </button>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedGift && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/50 backdrop-blur-sm"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              style={{position: "relative", borderRadius: "0 !important"}}
              onClick={(e) => e.stopPropagation()}
              className="bg-card border border-border p-8 max-w-md w-full shadow-xl max-h-[90vh] overflow-y-auto"
            >

            <button style={{position: "absolute", right: "10px", top: "10px"}} onClick={closeModal} className="text-muted-foreground hover:text-foreground">
              <X className="w-5 h-5" />
            </button>
            {!submitSuccess && (

              <div className="flex items-start mb-6" style={{flexDirection: 'column-reverse', width: '100%'}}>
                <div style={{width: '100%'}}>
                  {selectedGift.imageUrl ? (
                    <img
                      style={{height: "200px"}}
                      src={selectedGift.imageUrl}
                      alt={selectedGift.title}
                      className="w-full object-cover rounded-xl mb-3"
                    />
                  ) : (
                    <div className="text-3xl mb-3">🎁</div>
                  )}
                  <h3 className="font-display text-xl font-semibold text-foreground mt-2">{selectedGift.title}</h3>
                  {selectedGift.cotaValue ? (
                    <p className="text-sm font-body text-gold mt-1">
                      Cota: R$ {selectedGift.cotaValue.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </p>
                  ) : null}
                </div>
              </div>
            )}

            {(submitting || openingPayment) ? (
              <div className="text-center py-6 space-y-4">
                <Loader2 className="w-8 h-8 animate-spin text-gold mx-auto" />

                <h4 className="font-display text-lg font-semibold text-foreground">
                  Gerando seu link...
                </h4>

                <p className="font-body text-sm text-muted-foreground">
                  Estamos preparando seu pagamento com segurança 💛
                </p>
              </div>
              ): submitSuccess ? (
                <div className="text-center py-6 space-y-4">

                  <h4 className="font-display text-lg font-semibold text-foreground">
                    Tudo pronto!
                  </h4>

                  <p className="font-body text-sm text-muted-foreground">
                    Abrimos o link de pagamento em uma nova aba para você finalizar com segurança.
                    <br /><br />
                    Assim que concluir, o presente será registrado para o casal
                  </p>

                  {lastPaymentLink && (
                    <button
                      onClick={() => window.open(lastPaymentLink, "_blank")}
                      className="w-full py-2.5 rounded-lg border border-border font-body font-semibold text-sm hover:bg-secondary transition-colors"
                    >
                      Abrir link novamente
                    </button>
                  )}

                  <button
                    onClick={closeModal}
                    className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground font-body font-semibold text-sm hover:opacity-90 transition-opacity"
                  >
                    Fechar
                  </button>
                </div>
                ) : (
                <div className="space-y-5">
                  {/* Name only */}
                  <div>
                    <label className="block text-xs font-body text-muted-foreground mb-1">Seu nome</label>
                    <Input
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      placeholder="Ex: João Silva"
                      className="font-body"
                    />
                  </div>

                  {/* Fixed value display */}
                  <div className="bg-secondary/50 rounded-lg p-3 border border-border">
                    <p className="text-xs font-body text-muted-foreground mb-1">Valor da cota</p>
                    <p className="font-display text-lg font-semibold text-foreground">
                      R$ {selectedGift.cotaValue?.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </p>
                  </div>

                  <button
                      onClick={handleConfirmAndSubmit}
                      disabled={submitting}
                      className="w-full py-3 rounded-lg bg-gold text-primary-foreground font-body font-semibold text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-4 h-4" />
                    Gerar link de pagamento
                  </button>
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