"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import SnackIconSvg from "@/components/svg/SnackIconSvg";
import Button from "@/components/ui/Button";
// import VisibilityOffIconSvg from "@/components/svg/VisibilityOffIconSvg";
// import VisibilityOnIconSvg from "@/components/svg/VisibilityOnIconSvg";
import Link from "next/link";
import { useAuth } from "@/providers/AuthProvider";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin(formData: FormData) {
    setIsLoading(true);
    setError("");

    // 유효성 검사
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      setError("이메일과 비밀번호를 입력해주세요.");
      setIsLoading(false);
      return;
    }

    try {
      await login(email, password);
      // 로그인 성공 시 메인 페이지로 리다이렉트
      router.push("/");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "로그인 중 오류가 발생했습니다");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex justify-center">
      <div className="flex flex-col justify-center w-full max-w-[480px] pt-[48px] sm:max-w-[600px] sm:py-[160px]">
        <div className="flex justify-center w-full h-[140px] py-[38.18px] px-[50.92px] sm:h-auto sm:pb-0">
          <Link href="/">
            <SnackIconSvg className="w-[225.16px] h-[63.64px] sm:w-[344px] sm:h-[97.3px]" />
          </Link>
        </div>
        <div className="flex flex-col justify-center max-w-[600px] sm:shadow-[0px_0px_40px_0px_rgba(0,0,0,0.1)] sm:h-[400px] sm:py-[40px] sm:px-[60px]">
          <p className="mb-[10px] font-bold text-[20px]/[25px] tracking-tight text-[#1f1f1f] sm:mb-[20px] sm:text-[24px]/[30px]">
            로그인
          </p>

          {error && <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">{error}</div>}

          <form action={handleLogin} className="relative flex flex-col justify-center items-center w-full gap-[20px]">
            <input
              name="email"
              className="w-full max-w-[480px] h-[56px] py-[8px] px-[4px] outline-none border-b-1 border-primary-600 placeholder:font-normal placeholder:text-[16px]/[20px] placeholder:tracking-tight placeholder:text-primary-500"
              placeholder="이메일을 입력해주세요"
              type="email"
              required
            />
            <input
              name="password"
              className="w-full max-w-[480px] h-[56px] py-[8px] px-[4px] outline-none border-b-1 border-primary-600 placeholder:font-normal placeholder:text-[16px]/[20px] placeholder:tracking-tight placeholder:text-primary-500"
              placeholder="비밀번호를 입력해주세요"
              type="password"
              required
            />
          </form>
            {/* <VisibilityOffIconSvg className="absolute right-[4px] bottom-[8px] z-10" fill="#555555" />
            <VisibilityOnIconSvg className="absolute right-[4px] bottom-[8px]" fill="#555555" /> */}
          </div>
          <Button
            type={isLoading ? "grayDisabled" : "primary"}
            label={isLoading ? "로그인 중..." : "로그인"}
            className="mt-[30px] mb-[24px] font-bold text-[16px]/[20px] h-[64px]"
            onClick={() => {
              const form = document.querySelector("form");
              if (form) {
                const formData = new FormData(form);
                handleLogin(formData);
              }
            }}
          />

          <div className="flex justify-center items-center gap-[4px]">
            <p className="font-normal text-[16px]/[20px] tracking-tight text-[#999999]">기업 담당자이신가요? </p>
            <Link href="/signup/super-admin">
              <p className="font-bold text-[16px]/[20px] tracking-tight text-primary-950 underline">가입하기</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
