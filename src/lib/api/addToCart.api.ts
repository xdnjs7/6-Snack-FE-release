import { cookieFetch } from "./fetchClient.api";

export const addToCart = async (productId: number, quantity: number) => {
  return cookieFetch("/cart", {
    method: "POST",
    body: JSON.stringify({ productId, quantity }),
  });
};
