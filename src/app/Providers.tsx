import ModalProvider from "@/providers/ModalProvider";
import AuthProvider from "@/providers/AuthProvider";
import { TChildrenProps } from "@/types/children.types";
import React from "react";

export default function Providers({ children }: TChildrenProps) {
  return (
    <AuthProvider>
      <ModalProvider>{children}</ModalProvider>
    </AuthProvider>
  );
}
