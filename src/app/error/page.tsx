"use client";

import React from "react";
import ErrorPageContent from "./_components/ErrorPageContent";

export default function ErrorPage({ searchParams }: { searchParams: Promise<{ from?: string }> }) {
  searchParams.then((params) => {
    return <ErrorPageContent from={params.from} />;
  });
}
