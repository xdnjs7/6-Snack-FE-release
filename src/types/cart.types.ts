import { TProduct } from "./product.types";

export type TGetCartItemsParams = {
  selected?: string;
};

export type TGetCartItemsResponse = {
  id: number;
  userId: string;
  productId: number;
  quantity: number;
  isChecked: boolean;
  deletedAt: string | null;
  product: Omit<TProduct, "category" | "creator">;
}[];
