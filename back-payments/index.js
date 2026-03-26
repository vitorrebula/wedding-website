import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

/**
 * 🔹 1. Criar pagamento
 */
app.post("/create-payment", async (req, res) => {
  try {
    const { pessoa, presente, valor } = req.body;

    // ✅ validações básicas
    if (!pessoa || !presente || !valor) {
      return res.status(400).json({ error: "Dados inválidos" });
    }

    if (valor <= 0) {
      return res.status(400).json({ error: "Valor inválido" });
    }

    // 🔥 transforma em centavos
    const valorCentavos = Math.round(valor * 100);

    // 🔥 guarda contexto no order_nsu
    const order_nsu = `${pessoa}|${presente}|${valor}`;

    const payload = {
      handle: process.env.HANDLE,
      order_nsu,
      items: [
        {
          quantity: 1,
          price: valorCentavos,
          description: presente
        }
      ],
      webhook_url: process.env.WEBHOOK_URL
    };

    const response = await axios.post(
      "https://api.infinitepay.io/invoices/public/checkout/links",
      payload
    );

    res.json(response.data);

  } catch (err) {
    console.error(err?.response?.data || err.message);
    res.status(500).json({ error: "Erro ao criar pagamento" });
  }
});

/**
 * 🔹 2. Webhook (quando pagamento for aprovado)
 */
app.post("/webhook", async (req, res) => {
  try {
    const data = req.body;

    console.log("Webhook recebido:", data);

    const { order_nsu } = data;

    if (!order_nsu) {
      return res.sendStatus(400);
    }

    // 🔥 recupera os dados que salvamos
    const [pessoa, presente, valor] = order_nsu.split("|");

    // 🔥 chama seu App Script (igual hoje)
    await axios.post(process.env.APPS_SCRIPT_URL, {
      pessoa,
      presente,
      valor
    });

    console.log("Planilha atualizada com sucesso");

    res.sendStatus(200);

  } catch (err) {
    console.error("Erro no webhook:", err.message);
    res.sendStatus(400);
  }
});

app.get("/ping", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Servidor ativo 🚀",
    timestamp: new Date().toISOString()
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Servidor rodando 🚀");
});