import ModalProvider from "@/providers/ModalProvider";
import { TChildrenProps } from "@/types/children.types";
import React from "react";

export default function Providers({ children }: TChildrenProps) {
  return <ModalProvider>{children}</ModalProvider>;
}
