import { useQuery } from "@tanstack/react-query";
import { getProductById } from "@/lib/api/productDetail.api";
import type { Product } from "@/types/productDetail.types";

/**
 * @JJOBO
 * 1. const 화살표 함수로 변경
 * 2. tsx -> ts로 확장자 변경
 */

export function useProductDetail(productId: number) {
  return useQuery<Product>({
    queryKey: ["product", productId],
    queryFn: () => getProductById(productId),
    enabled: !!productId, // productId 있을 때만 실행
  });
}
