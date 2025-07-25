import { TProduct } from "./product.types";

export type TGetCartItemsParams = {
  cartItemId?: string;
  isChecked?: string;
};

export type TGetCartItemsResponse = {
  cart: {
    id: number;
    userId: string;
    productId: number;
    quantity: number;
    isChecked: boolean;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    product: Omit<TProduct, "category" | "creator">;
  }[];
  budget?: {
    currentMonthBudget: number;
    currentMonthExpense: number;
  };
};
