"use client";

import Button from "@/components/ui/Button";
import Image from "next/image";
import React, { useEffect } from "react";
import img_dog_error from "@/assets/images/img_dog_error.png";
import { useRouter } from "next/navigation";

export default function NotFoundPage() {
  const router = useRouter();

  const handleClick = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/products");
    }
  };

  useEffect(() => {
    const removePreviousPath = () => {
      sessionStorage.removeItem("previousPath");
    };
    window.addEventListener("beforeunload", removePreviousPath);
    return () => {
      window.removeEventListener("beforeunload", removePreviousPath);
    };
  }, []);

  return (
    <div className="flex flex-col h-screen justify-center items-center gap-[20px] -mb-[24px]">
      <section className="flex flex-col gap-[16px] justify-center items-center">
        <div className="relative w-[40vw] h-[30vh] max-w-[300px] aspect-[7/8]">
          <Image src={img_dog_error} alt="페이지를 찾을 수 없습니다 이미지" fill className="object-contain" />
        </div>
        <div role="status" className="text-center font-medium text-[16px]/[24px] sm:text-[20px]/[30px]">
          <h2>페이지를 찾을 수 없습니다.</h2>
          <p>요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.</p>
        </div>
      </section>
      <div className="flex gap-4">
        <Button
          type="black"
          label="돌아가기"
          onClick={handleClick}
          className="font-semibold text-[16px]/[20px] tracking-tight w-44 max-w-[230px] min-h-[56px] sm:max-w-[310px] sm:h-[64px]"
        />
        <Button
          type="white"
          label="홈으로"
          onClick={() => router.push("/products")}
          className="font-semibold text-[16px]/[20px] tracking-tight w-44 max-w-[230px] min-h-[56px] sm:max-w-[310px] sm:h-[64px]"
        />
      </div>
    </div>
  );
}
