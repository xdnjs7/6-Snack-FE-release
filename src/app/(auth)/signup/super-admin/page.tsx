"use client";
import React, { useState } from "react";
import SnackIconSvg from "@/components/svg/SnackIconSvg";
import Link from "next/link";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import VisibilityOffIconSvg from "@/components/svg/VisibilityOffIconSvg";
import VisibilityOnIconSvg from "@/components/svg/VisibilityOnIconSvg";
import { superAdminSignUpApi } from "@/lib/api/superAdmin.api";
import Input from "@/components/common/Input";
import Toast from "@/components/common/Toast";
import { ToastVariant } from "@/types/toast.types";

// 리액트 훅폼에 연결할 zod 스키마 정의
const signUpSchema = z
  .object({
    email: z.string().email("유효한 이메일을 입력해주세요."),
    name: z.string().min(1, "이름을 입력해주세요."),
    companyName: z.string().min(1, "회사명을 입력해주세요."),
    bizNumber: z.string().regex(/^[0-9]{10}$/, "사업자 번호 10자리를 입력해주세요."),
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
  const [toastVisible, setToastVisible] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [toastVariant, setToastVariant] = useState<ToastVariant>("success");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isValid },
  } = useForm<TSignUpFormData>({
    resolver: zodResolver(signUpSchema),
    mode: "onChange",
  });

  // Toast를 보여주는 함수
  const showToast = (message: string, variant: ToastVariant = "success") => {
    setToastMessage(message);
    setToastVariant(variant);
    setToastVisible(true);

    // 3초 후 자동으로 숨김
    setTimeout(() => {
      setToastVisible(false);
    }, 3000);
  };

  // 회원가입 처리
  const onSubmit = async (data: TSignUpFormData) => {
    setError(null);
    try {
      await superAdminSignUpApi(data);
      showToast("회원가입이 성공했습니다!", "success");
      // 토스트가 보여진 후 1초 뒤에 페이지 이동
      setTimeout(() => {
        router.push("/login");
      }, 1000);
    } catch (error) {
      const message = error instanceof Error ? error.message : "회원가입에 실패했습니다.";
      showToast(message, "error");
      setError(message);
    }
  };

  return (
    <>
      {/* Toast 컴포넌트 */}
      <Toast
        text={toastMessage}
        variant={toastVariant}
        isVisible={toastVisible}
        onClose={() => setToastVisible(false)}
      />

      {/* top parent */}
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
            <Input
              {...register("email")}
              type="email"
              label="이메일"
              placeholder="이메일을 입력해주세요."
              error={errors.email?.message}
            />

            {/* 이름 입력 필드 */}
            <Input
              {...register("name")}
              type="text"
              label="이름"
              placeholder="이름을 입력해주세요."
              error={errors.name?.message}
            />

            {/* 비밀번호 input wrapper*/}
            <Input
              {...register("password")}
              type="password"
              label="비밀번호"
              placeholder="비밀번호를 입력해주세요."
              showPasswordToggle={true}
              error={errors.password?.message}
            />

            {/* 비밀번호 확인 input wrapper*/}
            <Input
              {...register("passwordConfirm")}
              type="password"
              label="비밀번호 확인"
              placeholder="비밀번호를 한 번 더 입력해주세요."
              showPasswordToggle={true}
              error={errors.passwordConfirm?.message}
            />

            {/* 회사명 입력 필드 */}
            <Input
              {...register("companyName")}
              type="text"
              label="회사명"
              placeholder="회사명을 입력해주세요."
              error={errors.companyName?.message}
              isCompanyName={true}
            />

            {/* 사업자 번호 입력 필드 */}
            <Input
              {...register("bizNumber")}
              type="text"
              label="사업자 번호"
              placeholder="사업자 번호를 입력해주세요."
              error={errors.bizNumber?.message}
              isBizNumber={true}
            />

            {/* 가입 버튼 - 직접 button 태그로 대체 */}
            <button
              type="submit"
              className={clsx(
                "w-full h-[64px] mb-[24px] rounded-[2px] inline-flex justify-center items-center text-base cursor-pointer",
                isValid && !isSubmitting ? "bg-primary-950 text-primary-50" : "bg-primary-100 text-primary-300",
                "font-bold"
              )}
              disabled={isSubmitting || !isValid}
            >
              {isSubmitting ? "처리 중..." : "가입하기"}
            </button>
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
    </>
  );
}
