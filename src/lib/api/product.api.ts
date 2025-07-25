import { TMyProductsParams, TProduct } from "@/types/product.types";
import { defaultFetch, cookieFetch } from "./fetchClient.api";

// 카테고리 조회
// export const getCategories = async () => {
//   return cookieFetch("/products/category");
// };

export type GetProductsResponse = {
  items: TProduct[];
  nextCursor?: number;
}
// 상품 목록 조회
export const getProducts = async (params?: {
  category?: number;
  sort?: "latest" | "popular" | "low" | "high";
  cursor?: number;
  limit?: number;
}): Promise<GetProductsResponse> => {
  const searchParams = new URLSearchParams();

  if (params?.category) searchParams.append("category", params.category.toString());
  if (params?.sort) searchParams.append("sort", params.sort);
  if (params?.cursor) searchParams.append("cursor", params.cursor.toString());
  if (params?.limit) searchParams.append("limit", params.limit.toString());

  const queryString = searchParams.toString();
  const url = queryString ? `/products?${queryString}` : "/products";

  // response 타입 지정해줘야함? -권장
  const response = await cookieFetch<GetProductsResponse>(url);
  return response;
};

// 내가 등록한 상품 조회
export const getMyProducts = async (params: TMyProductsParams): Promise<TMyProductsResponse> => {
  const queryString = new URLSearchParams(params);

  return await cookieFetch(`/my/products?${queryString.toString()}`);
};
