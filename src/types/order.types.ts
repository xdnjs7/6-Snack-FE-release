import { StaticImageData } from "next/image";

type TProducts = {
  id: number;
  productName: string;
  price: number;
  imageUrl: string | StaticImageData;
  quantity: number;
}[];

type TBudget = {
  currentMonthBudget: number;
  currentMonthExpense: number;
};

type TOrderBase = {
  id: number;
  userId: string;
  approver: null;
  adminMessage: string;
  requestMessage: string;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
  status: string;
  requester: string;
};

export type TOrderSummary = TOrderBase & {
  productName: string;
};

export type TOrder = TOrderBase & {
  products: TProducts;
  budget: TBudget;
};

export type TOrderRequestBody = {
  requestMessage?: string;
  cartItemIds: number[];
};
