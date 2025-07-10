// 개발 완료 시 반드시 삭제

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/constants/navigationLinks";

export default function DevNavBar() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white border-t z-50">
      <div className="overflow-x-auto flex whitespace-nowrap px-4 py-2 gap-4">
        {navLinks.map((link) => (
          <Link
            key={link.path}
            href={link.path.replace(/:.*$/, "1")} // :id → 1 대체
            className={`text-sm px-3 py-1 rounded ${
              pathname === link.path ? "bg-black text-white" : "bg-gray-100 text-black"
            }`}
          >
            {link.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}
