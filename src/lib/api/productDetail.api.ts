import type { Product } from "@/types/productDetail.types";

export async function getProductById(productId: number): Promise<Product> {
  const res = await fetch(`http://localhost:8080/products/${productId}`, {
    credentials: "include",
  });

  if (!res.ok) throw new Error("상품 정보를 불러올 수 없습니다");
  return res.json();
}
