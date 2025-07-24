import { useInfiniteQuery } from "@tanstack/react-query";
import { getProducts } from "@/lib/api/product.api";

type TUseProductsParams = {
  category?: number;
  sort?: "latest" | "popular" | "low" | "high";
  limit: number;
};

export const useProducts = (params: TUseProductsParams) => {
  return useInfiniteQuery({
    queryKey: ["products", params],
    queryFn: ({ pageParam }: { pageParam: number | undefined }) =>
      getProducts({
        ...params,
        cursor: pageParam,
      }),
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor || undefined,
    staleTime: 2 * 60 * 1000,
  });
};
