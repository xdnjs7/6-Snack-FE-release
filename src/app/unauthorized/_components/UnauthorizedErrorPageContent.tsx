"use client";

import Button from "@/components/ui/Button";
import Image from "next/image";
import React from "react";
import img_dog_error from "@/assets/images/img_dog_error.png";
import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";

type TRole = "USER" | "ADMIN";

type TErrorPageContentProps = {
  from?: string;
};

export default function UnauthorizedErrorPageContent({ from }: TErrorPageContentProps) {
  const { user } = useAuth();
  const router = useRouter();

  const requiredRole = {
    USER: "관리자 이상만 접근",
    ADMIN: "최고 관리자 이상만 접근",
  } as const;

  const handleClick = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/products");
    }
  };

  return (
    <div className="flex flex-col h-screen justify-center items-center gap-[20px] -mb-[24px]">
      {user?.role && (
        <>
          <section className="flex flex-col gap-[16px] justify-center items-center">
            <div className="relative w-[40vw] h-[30vh] max-w-[300px] aspect-[7/8]">
              <Image src={img_dog_error} alt="에러를 나타내는 강아지 이미지" fill className="object-contain" />
            </div>

            <div role="status" className="text-center font-medium text-[16px]/[24px] sm:text-[20px]/[30px]">
              {from === "order" && user.role !== "USER" ? (
                <>
                  <h2>이 페이지는 일반 사용자 전용입니다. </h2>
                  <p>관리자 이상 권한으로는 이용할 수 없습니다.</p>
                </>
              ) : (
                <>
                  <h2>접근이 제한된 페이지입니다.</h2>
                  <p>이 페이지는 {requiredRole[user?.role as TRole]}할 수 있습니다.</p>
                </>
              )}
            </div>
          </section>

          <Button
            type="black"
            label="돌아가기"
            onClick={handleClick}
            className="font-semibold text-[16px]/[20px] tracking-tight w-full max-w-[230px] min-h-[56px] sm:max-w-[310px] sm:h-[64px]"
          />
        </>
      )}
    </div>
  );
}
