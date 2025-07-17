import Image from "next/image";
import React from "react";
import img_logo from "@/assets/images/img_logo.webp";

export default function LoginPage() {
  return (
    <div>
      <div className="relative w-[327px] h-[140px]">
        <Image src={img_logo} alt="Snack 로고" fill className="object-cover" />
      </div>
    </div>
  );
}
