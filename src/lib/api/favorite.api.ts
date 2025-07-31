import { TAddFavoriteProductResponse, TGetFavoriteProductResponse } from "@/types/favorite.types";
import { cookieFetch } from "./fetchClient.api";

export const getFavorites = async (): Promise<TGetFavoriteProductResponse> => {
  return await cookieFetch("/favorites");
};

export const createFavorite = async (productId: string): Promise<TAddFavoriteProductResponse> => {
  return await cookieFetch(`/favorites/${productId}`, {
    method: "POST",
  });
};

export const deleteFavorite = async (productId: string): Promise<void> => {
  return await cookieFetch(`/favorites/${productId}`, {
    method: "DELETE",
  });
};
