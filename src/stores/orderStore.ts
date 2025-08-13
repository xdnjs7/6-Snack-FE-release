import { TOrderResponse } from "@/types/order.types";
import { create } from "zustand";

type TOrderState = {
  order: TOrderResponse | null;
  setOrder: (order: TOrderResponse) => void;
};

export const useOrderStore = create<TOrderState>((set) => ({
  order: null,
  setOrder: (order) => set({ order }),
}));
