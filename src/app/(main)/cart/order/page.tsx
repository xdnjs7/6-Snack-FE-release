import React from "react";
import OrderPageContent from "./_components/OrderPageContent";

export default function OrderPage({ searchParams }: { searchParams: { cartItemId?: string } }) {
  const cartItemId = searchParams.cartItemId;

  return <OrderPageContent cartItemId={cartItemId} />;
}
