"use client";

import React, { Suspense } from "react";
import ProductsPageContent from "./_components/ProductsPageContent";
import FlashToastConsumer from "./_components/FlashToastConsumer";

export default function ProductsPage() {
  return (
    <>
      <Suspense fallback={<div className="flex justify-center items-center py-16">로딩 중...</div>}>
        <ProductsPageContent />
      </Suspense>
      <FlashToastConsumer />
    </>
  );
}
