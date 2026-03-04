import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Copy,
  Check,
  Loader2,
  Send,
  AlertTriangle,
} from "lucide-react";
import { Input } from "@/components/ui/input";

const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxs4qar-Gh1GJpJj0nKv63lhjVZvF6YcYSyJcpbgR2jggNK03LoduIKWB6XuLMEOT0CwA/exec";

const PIX_KEY = "lucas.rafaela@pix.com";

type GiftItem = {
  id: number;
  title: string;
  goal: number;
  raised: number;
  cotaValue?: number;
  imageUrl?: string;
};

function parseBRL(value: unknown): number {
  if (typeof value === "number") return value;
  if (!value) return 0;
  const str = String(value);
  return (
    parseFloat(
      str.replace("R$", "").replace(/\./g, "").replace(",", ".").trim()
    ) || 0
  );
}

const GiftRegistry = () => {
  const [gifts, setGifts] = useState<GiftItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedGift, setSelectedGift] = useState<GiftItem | null>(null);
  const [copied, setCopied] = useState(false);

  const [nome, setNome] = useState("");
  const [quantidade, setQuantidade] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const fetchGifts = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(APPS_SCRIPT_URL);
      if (!res.ok) throw new Error("Erro ao buscar dados");
      const data = await res.json();

      const parsed: GiftItem[] = data
        .map((row: Record<string, unknown>, i: number) => {
          return {
            id: i + 1,
            title: String(row["PRESENTE"] || `Presente ${i + 1}`),
            goal: parseBRL(row["VALOR TOTAL"]),
            raised: parseBRL(row["VALOR PAGO"]),
            cotaValue: parseBRL(row["VALOR POR COTA"]),
            imageUrl: String(row["FOTO"] || ""),
          };
        })
        .filter((g: GiftItem) => g.title.trim());

      setGifts(parsed);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Erro ao carregar presentes.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGifts();
  }, [fetchGifts]);

  const openModal = (gift: GiftItem) => {
    if (gift.goal > 0 && gift.raised >= gift.goal) return;
    setSelectedGift(gift);
    setQuantidade(1);
    setNome("");
    setSubmitSuccess(false);
    setShowConfirm(false);
  };

  const closeModal = () => {
    setSelectedGift(null);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(PIX_KEY);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const cotasRestantes =
    selectedGift && selectedGift.cotaValue
      ? Math.max(
          0,
          Math.floor(
            (selectedGift.goal - selectedGift.raised) /
              selectedGift.cotaValue
          )
        )
      : 0;

  const valorTotal =
    selectedGift?.cotaValue && quantidade
      ? selectedGift.cotaValue * quantidade
      : 0;

  const handleConfirmAndSubmit = async () => {
    if (!selectedGift || !nome.trim() || quantidade < 1) return;

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
          valor: valorTotal,
          quantidade,
        }),
      });

      setSubmitSuccess(true);
      setTimeout(() => fetchGifts(), 2000);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="section-padding bg-background">
      <div className="container mx-auto max-w-5xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {gifts.map((gift) => {
            const pct =
              gift.goal > 0
                ? Math.min((gift.raised / gift.goal) * 100, 100)
                : 0;

            const isFull = gift.goal > 0 && gift.raised >= gift.goal;

            return (
              <div
                key={gift.id}
                className="bg-card rounded-2xl border border-border p-6"
              >
                <div className="mb-4 w-full h-40 rounded-xl overflow-hidden bg-secondary">
                  {gift.imageUrl ? (
                    <img
                      src={gift.imageUrl}
                      alt={gift.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-3xl">
                      Coloca foto mano
                    </div>
                  )}
                </div>

                <h3 className="font-semibold mb-2">{gift.title}</h3>

                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gold"
                    style={{ width: `${pct}%` }}
                  />
                </div>

                <p className="text-xs mt-1">
                  {Math.round(pct)}% alcançado
                </p>

                <button
                  disabled={isFull}
                  onClick={() => openModal(gift)}
                  className={`mt-4 w-full py-2.5 rounded-lg font-semibold text-sm ${
                    isFull
                      ? "bg-muted text-muted-foreground cursor-not-allowed"
                      : "bg-primary text-primary-foreground hover:opacity-90"
                  }`}
                >
                  {isFull ? "Esgotado" : "Presentear"}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {selectedGift && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
            onClick={closeModal}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              className="bg-card rounded-2xl p-8 max-w-md w-full"
            >
              {submitSuccess ? (
                <div className="text-center">
                  <h4 className="text-lg font-semibold">
                    Obrigado pelo presente!
                  </h4>
                  <button
                    onClick={closeModal}
                    className="mt-4 px-6 py-2 bg-primary text-white rounded-lg"
                  >
                    Fechar
                  </button>
                </div>
              ) : (
                <div className="space-y-5">
                  <h3 className="text-lg font-semibold">
                    {selectedGift.title}
                  </h3>

                  <p className="text-sm">
                    Cotas restantes: {cotasRestantes}
                  </p>

                  <Input
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Seu nome"
                  />

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() =>
                        setQuantidade((q) => Math.max(1, q - 1))
                      }
                      className="px-3 py-2 border rounded-lg"
                    >
                      -
                    </button>

                    <span className="text-lg font-semibold">
                      {quantidade}
                    </span>

                    <button
                      onClick={() =>
                        setQuantidade((q) =>
                          Math.min(cotasRestantes, q + 1)
                        )
                      }
                      className="px-3 py-2 border rounded-lg"
                    >
                      +
                    </button>
                  </div>

                  <div>
                    <p className="text-sm">Total:</p>
                    <p className="text-lg font-semibold">
                      R${" "}
                      {valorTotal.toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                      })}
                    </p>
                  </div>

                  <div className="bg-secondary rounded-lg p-3 flex justify-between items-center">
                    <code className="text-sm">{PIX_KEY}</code>
                    <button onClick={handleCopy}>
                      {copied ? <Check size={16} /> : <Copy size={16} />}
                    </button>
                  </div>

                  <button
                    disabled={!nome.trim() || quantidade > cotasRestantes}
                    onClick={() => setShowConfirm(true)}
                    className="w-full py-3 rounded-lg bg-gold text-white font-semibold disabled:opacity-50"
                  >
                    Já enviei o PIX
                  </button>

                  {showConfirm && (
                    <div className="space-y-3 text-center">
                      <p>
                        Confirmar pagamento de R${" "}
                        {valorTotal.toLocaleString("pt-BR", {
                          minimumFractionDigits: 2,
                        })}
                        ?
                      </p>
                      <button
                        onClick={handleConfirmAndSubmit}
                        className="w-full py-2 bg-primary text-white rounded-lg"
                      >
                        Confirmar
                      </button>
                    </div>
                  )}
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