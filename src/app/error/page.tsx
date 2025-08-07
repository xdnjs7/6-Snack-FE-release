"use client";

import React from "react";
import ErrorPageContent from "./_components/ErrorPageContent";

export default async function ErrorPage({ searchParams }: { searchParams: Promise<{ from?: string }> }) {
  const params = await searchParams;

  return <ErrorPageContent from={params.from} />;
}
