import { cookieFetch } from "./fetchClient.api";

export async function addToCart(productId: number, quantity: number) {
  return await cookieFetch("/cart", {
    method: "POST",
    body: JSON.stringify({ productId, quantity }),
  });
}
