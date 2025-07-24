export async function addToCart(productId: number, quantity: number) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ productId, quantity }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "장바구니 추가 실패");
  }

  return res.json();
}
