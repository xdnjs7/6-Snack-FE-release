import React from "react";
import UnauthorizedErrorPageContent from "./_components/UnauthorizedErrorPageContent";

export default async function UnauthorizedErrorPage({ searchParams }: { searchParams: Promise<{ from?: string }> }) {
  const params = await searchParams;

  return <UnauthorizedErrorPageContent from={params.from} />;
}
