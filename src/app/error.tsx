"use client";

import Button from "@/components/ui/Button";
import Image from "next/image";
import React, { useEffect } from "react";
import img_dog_error from "@/assets/images/img_dog_error.png";
import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";

const requiredRole: Record<string, string> = {
  USER: "관리자 이상만 접근",
  ADMIN: "최고 관리자 이상만 접근",
};

export default function GlobalErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const { user } = useAuth();
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
          <Image src={img_dog_error} alt="에러를 나타내는 강아지 이미지" fill className="object-contain" />
        </div>
        <div role="status" className="text-center font-medium text-[16px]/[24px] sm:text-[20px]/[30px]">
          <h2>문제가 발생했습니다.</h2>
          {user?.role ? (
            sessionStorage.getItem("previousPath") === "/cart/order" ? (
              <>
                <p>이 페이지는 일반 사용자 전용입니다. </p>
                <p>관리자 이상 권한으로는 이용할 수 없습니다.</p>
              </>
            ) : (
              <>
                <p>접근이 제한된 페이지입니다.</p>
                <p>{requiredRole[user.role] ?? "권한이 없습니다."}</p>
              </>
            )
          ) : (
            <p>{error?.message || "알 수 없는 에러가 발생했습니다."}</p>
          )}
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
          label="다시 시도"
          onClick={reset}
          className="font-semibold text-[16px]/[20px] tracking-tight w-44 max-w-[230px] min-h-[56px] sm:max-w-[310px] sm:h-[64px]"
        />
      </div>
    </div>
  );
}
