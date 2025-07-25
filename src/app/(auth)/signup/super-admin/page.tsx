"use client";
import React, { useEffect, useState } from "react";
import SnackIconSvg from "@/components/svg/SnackIconSvg";
import Link from "next/link";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import VisibilityOffIconSvg from "@/components/svg/VisibilityOffIconSvg";
import VisibilityOnIconSvg from "@/components/svg/VisibilityOnIconSvg";
// 초대 관련 import 제거
// import { getInviteApi, TInviteInfo } from "@/lib/api/invite.api";
// import { signUpWithInviteApi } from "@/lib/api/auth.api";

// 리액트 훅폼에 연결할 zod 스키마 정의
const signUpSchema = z
  .object({
    email: z.string().email("유효한 이메일을 입력해주세요."),
    name: z.string().min(1, "이름을 입력해주세요."),
    companyName: z.string().min(1, "회사명을 입력해주세요."),
    bizNumber: z.string().regex(/^[0-9]{10}$/, "유효한 사업자 번호를 입력해주세요."),
    password: z
      .string()
      .min(8, "8자 이상 입력해주세요.")
      .regex(/[a-zA-Z]/, "비밀번호는 영문자를 포함해야 합니다.")
      .regex(/[0-9]/, "비밀번호는 숫자를 포함해야 합니다.")
      .regex(/[^a-zA-Z0-9]/, "비밀번호는 특수문자를 포함해야 합니다."),
    passwordConfirm: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordConfirm"],
  });

type TSignUpFormData = z.infer<typeof signUpSchema>;

export default function SuperAdminSignUpPage() {
  const router = useRouter();

  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isValid },
    setError: setFormError,
  } = useForm<TSignUpFormData>({
    resolver: zodResolver(signUpSchema),
    mode: "onChange",
  });

  const [passwordInput, passwordConfirmInput] = watch("password", "passwordConfirm");

  // 회원가입 처리
  const onSubmit = async (data: TSignUpFormData) => {
    setError(null);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "회원가입에 실패했습니다.");
      }
      router.push("/login");
    } catch (error) {
      setError(error instanceof Error ? error.message : "회원가입에 실패했습니다.");
      console.error("회원가입 에러:", error);
    }
  };

  return (
    // top parent
    <div className="sm:relative flex flex-col items-center justify-center gap-[46px] sm:gap-0 pt-[48px] sm:pt-[160px]">
      {/* mobile */}
      {/* logo + intro */}
      <div className="sm:absolute sm:top-0 flex flex-col items-center justify-center w-full max-w-[480px] sm:max-w-[600px]">
        <div className="flex justify-center items-center w-full sm:max-w-[500px] h-[140px] sm:h-[214px] py-[38.18px] sm:py-[58.4px] px-[50.92px] sm:px-[77.86px]">
          <Link href="/">
            <SnackIconSvg className="w-[225.16px] h-[63.64px] sm:w-[344px] sm:h-[97.3px]" />
          </Link>
        </div>
        <div className="sm:hidden">
          <div className="flex flex-col items-start justify-center gap-[10px]">
            <h1 className="text-lg/[22px] sm:text-2xl/[30px] font-bold tracking-tight text-left align-middle ">
              {/* 기업 담당자 회원가입 */}
              기업 담당자 회원가입
            </h1>
            <p className="text-primary-600 text-sm/[17px] sm:text-base/[20px] tracking-tight text-center align-middle">
              * 그룹 내 유저는 기업 담당자의 초대 메일을 통해 가입이 가능합니다.
            </p>
          </div>
        </div>
      </div>
      {/* signup content - form, register button, link to login */}

      <div className="sm:absolute sm:w-[600px] sm:top-[152.12px] flex flex-col w-full items-center justify-center sm:items-start sm:px-[60px] sm:py-[40px] sm:bg-white sm:rounded-xs sm:shadow-[0px_0px_40px_0px_rgba(0,0,0,0.10)]">
        <div className="hidden sm:block sm:mb-[20px]">
          <div className="flex flex-col items-start justify-center gap-[10px]">
            <h1 className="text-lg/[22px] sm:text-2xl/[30px] font-bold tracking-tight text-left align-middle ">
              {/* 기업 담당자 회원가입 */}
              기업 담당자 회원가입
            </h1>
            <p className="text-primary-600 text-sm/[17px] sm:text-base/[20px] tracking-tight text-left align-middle">
              * 그룹 내 유저는 기업 담당자의 초대 메일을 통해 가입이 가능합니다.
            </p>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full mb-[8px] gap-[20px]">
          {/* 이메일 입력 필드 */}
          <div className="flex flex-col gap-1">
            <div className={clsx("relative flex justify-between items-center w-full h-[56px] py-2 px-1 border-b", errors.email ? "border-error-500" : "border-primary-600")}>
              <div className="flex flex-col w-full justify-between items-start gap-[5px] pr-[24px]">
                <label className={clsx("text-primary-500 text-xs/[15px] font-normal tracking-tight", !watch("email") && "hidden")}>이메일</label>
                <input type="email" {...register("email")} placeholder="이메일을 입력해주세요." className="w-full max-w-[480px] font-normal text-[16px]/[20px] text-primary-950 outline-none placeholder:font-normal placeholder:text-[16px]/[20px] placeholder:tracking-tight placeholder:text-primary-500" />
              </div>
            </div>
            {errors.email && <span className="text-error-500 text-sm/[17px] tracking-tight">{errors.email.message}</span>}
          </div>

          {/* 이름 입력 필드 */}
          <div className="flex flex-col gap-1">
            <div className={clsx("relative flex justify-between items-center w-full h-[56px] py-2 px-1 border-b", errors.name ? "border-error-500" : "border-primary-600")}>
              <div className="flex flex-col w-full justify-between items-start gap-[5px] pr-[24px]">
                <label className={clsx("text-primary-500 text-xs/[15px] font-normal tracking-tight", !watch("name") && "hidden")}>이름</label>
                <input type="text" {...register("name")} placeholder="이름을 입력해주세요." className="w-full max-w-[480px] font-normal text-[16px]/[20px] text-primary-950 outline-none placeholder:font-normal placeholder:text-[16px]/[20px] placeholder:tracking-tight placeholder:text-primary-500" />
              </div>
            </div>
            {errors.name && <span className="text-error-500 text-sm/[17px] tracking-tight">{errors.name.message}</span>}
          </div>

          {/* 비밀번호 input wrapper*/}
          <div className="flex flex-col gap-1">
            <div
              className={clsx(
                "relative flex justify-between items-center w-full h-[56px] py-2 px-1 border-b",
                errors.password ? "border-error-500" : "border-primary-600",
              )}
            >
              <div className="flex flex-col w-full justify-between items-start gap-[5px] pr-[24px]">
                <label
                  className={clsx(
                    "text-primary-500 text-xs/[15px] font-normal tracking-tight",
                    !passwordInput && "hidden",
                  )}
                >
                  비밀번호
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  placeholder="비밀번호를 입력해주세요."
                  className={clsx(
                    // 수정해야함!
                    showPassword ? "tracking-tight" : "tracking-[0.25em]",
                    "w-full max-w-[480px] font-normal text-[16px]/[20px] text-primary-950 outline-none placeholder:font-normal placeholder:text-[16px]/[20px] placeholder:tracking-tight placeholder:text-primary-500",
                  )}
                />
              </div>
              {/* 비밀번호 보임토글 */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-1 bottom-2"
              >
                {showPassword ? <VisibilityOnIconSvg /> : <VisibilityOffIconSvg />}
              </button>
            </div>
            {/* 에러 메세지 */}
            {errors.password && (
              <span className="text-error-500 text-sm/[17px] tracking-tight">{errors.password.message}</span>
            )}
          </div>

          {/* 비밀번호 확인 input wrapper*/}
          <div className="flex flex-col gap-1">
            <div className="relative flex justify-between items-center w-full h-[56px] py-2 px-1 border-b border-primary-600">
              <div className="flex flex-col w-full justify-between items-start gap-[5px] pr-[24px]">
                <label
                  className={clsx(
                    "text-primary-500 text-xs/[15px] font-normal tracking-tight",
                    !passwordConfirmInput && "hidden",
                  )}
                >
                  비밀번호 확인
                </label>
                <input
                  type={showPasswordConfirm ? "text" : "password"}
                  {...register("passwordConfirm")}
                  placeholder="비밀번호를 한 번 더 입력해주세요."
                  className={clsx(
                    // 수정해야함!
                    showPassword ? "text-[16px]/[20px]" : "text-[20px]/[20px]",
                    "w-full tracking-tight text-primary-950 placeholder:text-primary-500 placeholder:text-base/[20px] placeholder:tracking-tight outline-none",
                  )}
                />
              </div>
              {/* 비밀번호 확인 보임토글 */}
              <button
                type="button"
                onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                className="cursor-pointer absolute right-1 bottom-2"
              >
                {showPasswordConfirm ? <VisibilityOnIconSvg /> : <VisibilityOffIconSvg />}
              </button>
            </div>
            {/* 에러 메세지 */}
            {errors.passwordConfirm && (
              <span className="text-error-500 text-sm/[17px] tracking-tight">{errors.passwordConfirm.message}</span>
            )}
          </div>

          {/* 회사명 입력 필드 */}
          <div className="flex flex-col gap-1">
            <div className={clsx("relative flex justify-between items-center w-full h-[56px] py-2 px-1 border-b", errors.companyName ? "border-error-500" : "border-primary-600")}>
              <div className="flex flex-col w-full justify-between items-start gap-[5px] pr-[24px]">
                <label className={clsx("text-primary-500 text-xs/[15px] font-normal tracking-tight", !watch("companyName") && "hidden")}>회사명</label>
                <input type="text" {...register("companyName")} placeholder="회사명을 입력해주세요." className="w-full max-w-[480px] font-normal text-[16px]/[20px] text-primary-950 outline-none placeholder:font-normal placeholder:text-[16px]/[20px] placeholder:tracking-tight placeholder:text-primary-500" />
              </div>
            </div>
            {errors.companyName && <span className="text-error-500 text-sm/[17px] tracking-tight">{errors.companyName.message}</span>}
          </div>

          {/* 사업자 번호 입력 필드 */}
          <div className="flex flex-col gap-1">
            <div className={clsx("relative flex justify-between items-center w-full h-[56px] py-2 px-1 border-b", errors.bizNumber ? "border-error-500" : "border-primary-600")}>
              <div className="flex flex-col w-full justify-between items-start gap-[5px] pr-[24px]">
                <label className={clsx("text-primary-500 text-xs/[15px] font-normal tracking-tight", !watch("bizNumber") && "hidden")}>사업자 번호</label>
                <input type="text" {...register("bizNumber")} placeholder="사업자 번호를 입력해주세요." className="w-full max-w-[480px] font-normal text-[16px]/[20px] text-primary-950 outline-none placeholder:font-normal placeholder:text-[16px]/[20px] placeholder:tracking-tight placeholder:text-primary-500" />
              </div>
            </div>
            {errors.bizNumber && <span className="text-error-500 text-sm/[17px] tracking-tight">{errors.bizNumber.message}</span>}
          </div>

          {/* 가입 버튼 - 직접 button 태그로 대체 */}
          <button
            type="submit"
            className={clsx(
              "w-full h-[64px] mb-[24px] rounded-[2px] inline-flex justify-center items-center text-base",
              isValid && !isSubmitting ? "bg-primary-950 text-primary-50" : "bg-primary-100 text-primary-300",
              "font-bold"
            )}
            disabled={isSubmitting || !isValid}
          >
            {isSubmitting ? "처리 중..." : "가입하기"}
          </button>
          {/* 에러 메시지 표시 */}
          {error && (
            <div className="text-error-500 text-center text-sm mt-2">{error}</div>
          )}
        </form>

        {/* 계정이 있으신가요 */}
        <p className="text-primary-500 text-base/[20px] tracking-tight text-center w-full">
          이미 계정이 있으신가요?
          <Link href="/login">
            <span className="text-primary-950 text-base/[20px] tracking-tight font-bold underline decoration-primary-950 underline-offset-2">
              로그인
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
}
