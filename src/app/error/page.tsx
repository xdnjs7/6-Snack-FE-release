"use client";

import Button from "@/components/ui/Button";
import Image from "next/image";
import React, { useEffect } from "react";
import img_error_logo from "@/assets/images/img_error_logo.png";
import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";

type TRole = "USER" | "ADMIN";

export default function ErrorPage() {
  const { user } = useAuth();
  const router = useRouter();

  const role = {
    USER: "관리자",
    ADMIN: "최고 관리자",
  } as const;

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
      {user?.role && (
        <>
          <div className="flex flex-col gap-[16px] justify-center items-center">
            <div className="relative w-[40vw] h-[30vh] max-w-[300px] aspect-[7/8]">
              <Image src={img_error_logo} alt="로고" fill className="object-contain" />
            </div>

            <div className="text-center font-medium text-[16px]/[24px] sm:text-[20px]/[30px]">
              {sessionStorage.getItem("previousPath") === "/cart/order" ? (
                <>
                  <div>이 페이지는 일반 사용자 전용입니다. </div>
                  <div>관리자 이상 권한으로는 이용할 수 없습니다.</div>
                </>
              ) : (
                <>
                  <div>접근이 제한된 페이지입니다.</div>
                  <div>이 페이지는 {role[user?.role as TRole]} 이상만 접근할 수 있습니다.</div>
                </>
              )}
            </div>
          </div>

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
