import { TMyProductsParams } from "@/types/product.types";
import { cookieFetch } from "./fetchClient.api";

export const getMyProducts = async (params: TMyProductsParams) => {
  const queryString = new URLSearchParams(params);

  return await cookieFetch(`/my/products?${queryString.toString()}`);
};
