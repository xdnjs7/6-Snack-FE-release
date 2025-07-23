"use client";

import { TChildrenProps } from "@/types/children.types";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React, { useState } from "react";

export default function QueryProvider({ children }: TChildrenProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <div className="z-50 fixed bottom-17 right-3.5">
        <ReactQueryDevtools initialIsOpen={false} buttonPosition="relative" />
      </div>
      {children}
    </QueryClientProvider>
  );
}
