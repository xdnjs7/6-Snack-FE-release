export type TOrderItem = {
  id: number;
  userId: string;
  productsPriceTotal: number;
  deliveryFee: number;
  createdAt: string;
  status: "PENDING" | "APPROVED" | "REJECTED" | "CANCELED";
  receipts: {
    productName: string;
    imageUrl: string;
    quantity: number;
  }[];
};
