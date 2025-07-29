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

export type TOrderBase = {
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

export type TOrderNowBody = {
  cartItemIds: number[];
};

export type TOrderNowResponse = {
  message: string;
  data: {
    id: number;
    userId: string;
    approver: string;
    adminMessage: string | null;
    requestMessage: string | null;
    totalPrice: number;
    createdAt: string;
    updatedAt: string;
    status: string;
  };
};

export type TOrderResponse = {
  message: string;
  data: {
    id: number;
    companyId: number;
    userId: string;
    approver: string | null;
    adminMessage: string | null;
    requestMessage: string;
    totalPrice: number;
    createdAt: string;
    updatedAt: string;
    status: string;
    orderedItems: {
      id: number;
      orderId: number;
      receiptId: number;
      productId: number;
      receipt: {
        id: number;
        productName: string;
        price: number;
        imageUrl: string;
        quantity: number;
      };
    }[];
  };
};
