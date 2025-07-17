"use client";

import { TChildrenProps } from "@/types/children.types";
import { usePathname } from "next/navigation";
import React from "react";

export default function GeneralLayout({ children }: TChildrenProps) {
  const currentPath = usePathname();

  const isMatchedPath = ["/login", "/signup", "/profile"].some((path) => currentPath.startsWith(path));

  return (
    <>
      {isMatchedPath ? (
        <div className="flex justify-center items-center px-[24px] pb-[24px] sm:px-[72px] sm:pb-[72px]">
          <div className="flex flex-col w-full max-w-[1400px]">{children}</div>
        </div>
      ) : (
        <div className="flex justify-center items-center px-[24px] pb-[24px]">
          <div className="flex flex-col w-full max-w-[1400px]">{children}</div>
        </div>
      )}
    </>
  );
}
