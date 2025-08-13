import { TChildrenProps } from "@/types/children.types";
import React from "react";

export default function Mobile({ children }: TChildrenProps) {
  return <div className="sm:hidden">{children}</div>;
}
