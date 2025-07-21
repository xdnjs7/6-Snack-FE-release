"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import SnackIconSvg from "@/components/svg/SnackIconSvg";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { register } from "@/app/actions/auth";

export default function SignUpPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleRegister(formData: FormData) {
    setIsLoading(true);
    setError("");

    // 유효성 검사
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (!name || !email || !password || !confirmPassword) {
      setError("모든 필드를 입력해주세요.");
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("비밀번호는 6자 이상이어야 합니다.");
      setIsLoading(false);
      return;
    }

    try {
      const result = await register({ name, email, password });

      if (result.success) {
        // 회원가입 성공 시 로그인 페이지로 리다이렉트
        router.push("/login");
        router.refresh();
      } else {
        setError(result.error || "회원가입에 실패했습니다");
      }
    } catch (err) {
      setError("일반 회원가입은 초대 링크가 필요합니다. 관리자에게 문의해주세요.");
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
        <div className="flex flex-col justify-center max-w-[600px] sm:shadow-[0px_0px_40px_0px_rgba(0,0,0,0.1)] sm:h-[500px] sm:py-[40px] sm:px-[60px]">
          <p className="mb-[10px] font-bold text-[20px]/[25px] tracking-tight text-[#1f1f1f] sm:mb-[20px] sm:text-[24px]/[30px]">
            회원가입
          </p>

          {/* 초대 링크 안내 */}
          <div className="mb-4 p-3 bg-blue-100 border border-blue-400 text-blue-700 rounded">
            <p className="text-sm">
              <strong>안내:</strong> 일반 회원가입은 초대 링크가 필요합니다.
              <br />
              관리자에게 초대 링크를 요청해주세요.
            </p>
          </div>

          {error && <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">{error}</div>}

          <form
            action={handleRegister}
            className="relative flex flex-col justify-center items-center w-full gap-[20px]"
          >
            <input
              name="name"
              className="w-full max-w-[480px] h-[56px] py-[8px] px-[4px] outline-none border-b-1 border-primary-600 placeholder:font-normal placeholder:text-[16px]/[20px] placeholder:tracking-tight placeholder:text-primary-500"
              placeholder="이름을 입력해주세요"
              type="text"
              required
            />
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
            <input
              name="confirmPassword"
              className="w-full max-w-[480px] h-[56px] py-[8px] px-[4px] outline-none border-b-1 border-primary-600 placeholder:font-normal placeholder:text-[16px]/[20px] placeholder:tracking-tight placeholder:text-primary-500"
              placeholder="비밀번호를 다시 입력해주세요"
              type="password"
              required
            />
          </form>

          <Button
            type={isLoading ? "grayDisabled" : "primary"}
            label={isLoading ? "회원가입 중..." : "회원가입"}
            className="mt-[30px] mb-[24px] font-bold text-[16px]/[20px] h-[64px]"
            onClick={() => {
              const form = document.querySelector("form");
              if (form) {
                const formData = new FormData(form);
                handleRegister(formData);
              }
            }}
          />

          <div className="flex justify-center items-center gap-[4px]">
            <p className="font-normal text-[16px]/[20px] tracking-tight text-[#999999]">이미 계정이 있으신가요? </p>
            <Link href="/login">
              <p className="font-bold text-[16px]/[20px] tracking-tight text-primary-950 underline">로그인</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
