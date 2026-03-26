import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export async function criarLink(item) {
  const payload = {
    handle: process.env.HANDLE,
    order_nsu: `presente_${item.id}`,
    items: [
      {
        quantity: 1,
        price: item.preco,
        description: item.nome
      }
    ],
    redirect_url: "https://wedding-website-olive-psi.vercel.app/",
    webhook_url: "https://wedding-website-mpek.onrender.com/webhook"
  };

  const response = await axios.post(
    "https://api.infinitepay.io/invoices/public/checkout/links",
    payload
  );

  return response.data;
}