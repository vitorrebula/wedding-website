import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, X, Copy, Check, Loader2, Send, AlertTriangle } from "lucide-react";
import { Input } from "@/components/ui/input";

const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxs4qar-Gh1GJpJj0nKv63lhjVZvF6YcYSyJcpbgR2jggNK03LoduIKWB6XuLMEOT0CwA/exec";
const PIX_KEY = "lucas.rafaela@pix.com"; // Replace

type GiftItem = {
  id: number;
  title: string;
  emoji: string;
  goal: number;
  raised: number;
  shareLabel?: string;
  cotaValue?: number;
};

function getEmoji(name: string): string {
  const lower = name.toLowerCase();
  return "🎁";
}

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
  const [copied, setCopied] = useState(false);

  // Form state
  const [nome, setNome] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

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

        return {
          id: i + 1,
          title: title || `Presente ${i + 1}`,
          emoji: getEmoji(title),
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

  const handleCopy = () => {
    navigator.clipboard.writeText(PIX_KEY);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleConfirmAndSubmit = async () => {
    if (!nome.trim() || !selectedGift || !selectedGift.cotaValue) return;

    setSubmitting(true);
    setShowConfirm(false);
    try {
      await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pessoa: nome.trim(),
          presente: selectedGift.title,
          valor: selectedGift.cotaValue,
        }),
      });

      setSubmitSuccess(true);
      setNome("");
      setTimeout(() => fetchGifts(), 2000);
    } catch (err) {
      console.error("Erro ao enviar:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const openModal = (gift: GiftItem) => {
    setSelectedGift(gift);
    setSubmitSuccess(false);
    setShowConfirm(false);
    setNome("");
  };

  const closeModal = () => {
    setSelectedGift(null);
    setSubmitSuccess(false);
    setShowConfirm(false);
  };

  return (
    <section id="gifts" className="section-padding bg-background">
      <div className="container mx-auto max-w-5xl">
        <motion.div {...fadeUp} className="text-center mb-12">
          <span className="text-sm font-body tracking-[0.3em] uppercase text-gold">Lista de presentes</span>
          <h2 className="mt-2 font-display text-4xl md:text-5xl font-semibold text-foreground">Presenteie o Casal</h2>
          <div className="mt-4 w-16 h-px bg-gold mx-auto" />
          <p className="mt-4 font-body text-muted-foreground max-w-lg mx-auto">
            Contribua via PIX para ajudar Lucas & Rafa a realizarem seus sonhos juntos 💛
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
                  <div className="text-4xl mb-4">{gift.emoji}</div>
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
              onClick={(e) => e.stopPropagation()}
              className="bg-card rounded-2xl border border-border p-8 max-w-md w-full shadow-xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="text-3xl">{selectedGift.emoji}</span>
                  <h3 className="font-display text-xl font-semibold text-foreground mt-2">{selectedGift.title}</h3>
                  {selectedGift.cotaValue ? (
                    <p className="text-sm font-body text-gold mt-1">
                      Cota: R$ {selectedGift.cotaValue.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </p>
                  ) : null}
                </div>
                <button onClick={closeModal} className="text-muted-foreground hover:text-foreground">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {submitSuccess ? (
                <div className="text-center py-6">
                  <div className="text-5xl mb-4">🎉</div>
                  <h4 className="font-display text-lg font-semibold text-foreground mb-2">Obrigado pelo presente!</h4>
                  <p className="font-body text-sm text-muted-foreground">
                    Seu pagamento foi registrado. Lucas & Rafa agradecem de coração! 💛
                  </p>
                  <button
                    onClick={closeModal}
                    className="mt-6 px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-body font-semibold text-sm hover:opacity-90 transition-opacity"
                  >
                    Fechar
                  </button>
                </div>
              ) : (showConfirm || submitting) ? (
                /* Confirmation popup */
                <div className="text-center py-4 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mx-auto">
                    <AlertTriangle className="w-7 h-7 text-gold" />
                  </div>
                  <h4 className="font-display text-lg font-semibold text-foreground">Confirmar envio</h4>
                  <p className="font-body text-sm text-muted-foreground">
                    Você confirma que já enviou o PIX de{" "}
                    <strong className="text-foreground">
                      R$ {selectedGift.cotaValue?.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </strong>{" "}
                    para o presente <strong className="text-foreground">{selectedGift.title}</strong>?
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setShowConfirm(false)}
                      className="flex-1 py-2.5 rounded-lg border border-border font-body font-semibold text-sm text-muted-foreground hover:bg-secondary transition-colors"
                    >
                      Voltar
                    </button>
                    <button
                      onClick={handleConfirmAndSubmit}
                      disabled={submitting}
                      className="flex-1 py-2.5 rounded-lg bg-gold text-primary-foreground font-body font-semibold text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                      {submitting ? "Enviando..." : "Sim, enviei!"}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-5">
                  <p className="font-body text-sm text-muted-foreground text-center">
                    Faça um PIX de{" "}
                    <strong className="text-foreground">
                      R$ {selectedGift.cotaValue?.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </strong>{" "}
                    e confirme abaixo:
                  </p>

                  {/* PIX Key */}
                  <div className="flex items-center gap-2 bg-secondary rounded-lg p-3">
                    <code className="flex-1 text-sm font-body text-foreground truncate">{PIX_KEY}</code>
                    <button
                      onClick={handleCopy}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {copied ? <Check className="w-4 h-4 text-sage" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>

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
                    onClick={() => setShowConfirm(true)}
                    disabled={!nome.trim()}
                    className="w-full py-3 rounded-lg bg-gold text-primary-foreground font-body font-semibold text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-4 h-4" />
                    Já enviei o PIX
                  </button>

                  <p className="text-xs font-body text-muted-foreground text-center">
                    Ao confirmar, seu presente será registrado automaticamente na planilha do casal.
                  </p>
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
