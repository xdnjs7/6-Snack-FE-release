import React from "react";
import OrderPageContent from "./_components/OrderPageContent";

export default async function OrderPage({ searchParams }: { searchParams: Promise<{ cartItemId?: string }> }) {
  const params = await searchParams;

  return <OrderPageContent cartItemId={params.cartItemId} />;
}
