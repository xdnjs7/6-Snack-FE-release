import { defaultFetch, cookieFetch } from "./fetchClient.api";

// 카테고리 조회
// export const getCategories = async () => {
//   return cookieFetch("/products/category");
// };

// 상품 목록 조회
export const getProducts = async (params?: {
  category?: number;
  sort?: "latest" | "popular" | "low" | "high";
  cursor?: number;
  limit?: number;
}) => {
  const searchParams = new URLSearchParams();

  if (params?.category) searchParams.append("category", params.category.toString());
  if (params?.sort) searchParams.append("sort", params.sort);
  if (params?.cursor) searchParams.append("cursor", params.cursor.toString());
  if (params?.limit) searchParams.append("limit", params.limit.toString());

  const queryString = searchParams.toString();
  const url = queryString ? `/products?${queryString}` : "/products";

  return defaultFetch(url);
};
