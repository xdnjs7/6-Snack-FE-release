import React from "react";
import SuccessPageContent from "./_components/SuccessPageContent";

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ orderid?: string; amount?: string; paymentKey?: string }>;
}) {
  const params = await searchParams;

  return <SuccessPageContent orderId={params.orderid} amount={params.amount} paymentKey={params.paymentKey} />;
}
