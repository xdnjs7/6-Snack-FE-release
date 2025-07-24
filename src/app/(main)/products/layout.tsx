"use client";

import AuthProvider from "@/providers/AuthProvider";
import { ReactNode } from "react";

export default function ProductsLayout({ children }: { children: ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
