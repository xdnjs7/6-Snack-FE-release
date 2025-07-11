import { TChildrenProps } from "@/types/children.types";
import React from "react";

export default function Tablet({ children }: TChildrenProps) {
  return <div className="hidden sm:block md:hidden">{children}</div>;
}
