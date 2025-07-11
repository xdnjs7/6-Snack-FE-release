import { TChildrenProps } from "@/types/children.types";
import React from "react";

export default function Desktop({ children }: TChildrenProps) {
  return <div className="hidden md:block">{children}</div>;
}
