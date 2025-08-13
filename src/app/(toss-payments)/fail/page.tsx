import React from "react";
import FailPageContent from "./_components/FailPageContent";

export default async function FailPage({ searchParams }: { searchParams: Promise<{ message?: string }> }) {
  const params = await searchParams;

  return <FailPageContent message={params.message} />;
}
