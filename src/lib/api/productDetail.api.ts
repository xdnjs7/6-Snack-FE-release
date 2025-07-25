import type { Product } from "@/types/productDetail.types";
import { cookieFetch } from "./fetchClient.api";

export async function getProductById(productId: number): Promise<Product> {
  return await cookieFetch(`/products/${productId}`);
}
