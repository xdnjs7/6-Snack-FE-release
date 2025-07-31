import { cookieFetch } from "./fetchClient.api";

export const cancelOrderApi = async (orderId: number): Promise<void> => {
  console.log("🔥 fetch 실행 시작");
  return await cookieFetch(`/orders/${orderId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json", // ✅ 반드시 있어야 함!
    },
    body: JSON.stringify({ status: "CANCELED" }),
  });
};
