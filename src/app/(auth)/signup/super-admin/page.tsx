"use client";

import React from "react";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { adminSignUp } from "@/app/actions/adminSignUp";
import { signUpSchema } from "@/lib/schemas/signUpSchema";
import SnackIconSvg from "@/components/svg/SnackIconSvg";
import Link from "next/link";

// 타입 정의
type TSignUpForm = z.infer<typeof signUpSchema>;

const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<TSignUpForm>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: TSignUpForm) => {
    console.log("폼이 제출되었습니다!");
    console.log("폼 데이터:", data);

    // FormData 객체 생성 및 데이터 추가
    const formData = new FormData();
    formData.append("email", data.id); // 클라이언트의 'id'를 백엔드의 'email'로 매핑
    formData.append("name", data.name);
    formData.append("password", data.password);
    formData.append("confirmPassword", data.passwordConfirm);
    formData.append("companyName", data.companyName);
    formData.append("bizNumber", data.companyNumber); // 클라이언트의 'companyNumber'를 백엔드의 'bizNumber'로 매핑

    try {
      // 서버 액션 호출
      const result = await adminSignUp(formData);

      if (result?.error) {
        console.error("회원가입 실패:", result.error);
        alert(`회원가입 실패: ${result.error}`);
        if (result.error.includes("이미 등록된 이메일")) {
          setError("id", { type: "manual", message: "이미 등록된 이메일입니다." });
        } else if (result.error.includes("이미 등록된 사업자")) {
          setError("companyNumber", { type: "manual", message: "이미 등록된 사업자 등록 번호입니다." });
        } else if (result.error.includes("모두 입력해야 합니다")) {
          console.log("필수 필드가 누락되었습니다.");
        } else {
          console.log(`회원가입 중 오류가 발생했습니다: ${result.error}`);
        }
      } else {
        console.log("회원가입이 성공했습니다!");
        alert("회원가입이 성공했습니다!");
      }
    } catch (error) {
      console.error("예상치 못한 오류:", error);
      console.log("회원가입 중 예상치 못한 오류가 발생했습니다.");
      if (error instanceof Error) {
        alert(`예상치 못한 오류가 발생했습니다: ${error.message}`);
      } else {
        alert("예상치 못한 오류가 발생했습니다.");
      }
    }
  };

  const formFields = [
    { id: "name", label: "이름(기업 담당자)을 입력해주세요", type: "text", name: "name" },
    { id: "id", label: "아이디(이메일)를 입력해주세요", type: "email", name: "id" },
    { id: "password", label: "비밀번호를 입력해주세요", type: "password", name: "password" },
    {
      id: "passwordConfirm",
      label: "비밀번호를 한 번 더 입력해주세요",
      type: "password",
      name: "passwordConfirm",
    },
    { id: "companyName", label: "회사명을 입력해주세요", type: "text", name: "companyName" },
    { id: "companyNumber", label: "사업자 번호를 입력해주세요", type: "text", name: "companyNumber" },
  ];

  return (
    <div className="flex justify-center">
      <div className="flex flex-col justify-center w-full max-w-[480px] pt-[48px] sm:max-w-[600px] sm:py-[160px]">
        {/* 로고 영역 */}
        <div className="flex justify-center w-full h-[140px] py-[38.18px] px-[50.92px] sm:h-auto sm:pb-0">
          <Link href="/">
            <SnackIconSvg className="w-[225.16px] h-[63.64px] sm:w-[344px] sm:h-[97.3px]" />
          </Link>
        </div>
        {/* 폼 컨테이너 */}
        <div className="flex flex-col justify-center max-w-[600px] sm:shadow-[0px_0px_40px_0px_rgba(0,0,0,0.1)] sm:py-[40px] sm:px-[60px]">
          {/* 타이틀/설명 */}
          <div className="flex flex-col items-start gap-2.5 w-full">
            <div className="font-bold text-[20px]/[25px] tracking-tight text-[#1f1f1f] sm:text-[24px]/[30px] w-full text-left">
              기업 담당자 회원가입
            </div>
            <div className="text-[14px] sm:text-[16px] font-normal text-[#999999] w-full text-left">
              * 그룹 내 유저는 기업 담당자의
              <br className="sm:hidden" />
              초대 메일을 통해 가입이 가능합니다.
            </div>
          </div>
          {/* 폼 */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="relative flex flex-col justify-center items-center w-full gap-[20px] mt-[20px]"
          >
            {formFields.map((field) => (
              <input
                key={field.id}
                type={field.type}
                id={field.id}
                placeholder={field.label}
                {...register(field.name as keyof TSignUpForm)}
                className={clsx(
                  "w-full max-w-[480px] h-[56px] py-[8px] px-[4px] outline-none border-b-1 border-primary-600",
                  "placeholder:font-normal placeholder:text-[16px]/[20px] placeholder:tracking-tight placeholder:text-primary-500",
                  errors[field.name as keyof TSignUpForm] && "border-red-500",
                )}
                autoComplete={field.type === "password" ? "new-password" : "off"}
              />
            ))}
            {/* 에러 메시지 */}
            {formFields.map((field) =>
              errors[field.name as keyof TSignUpForm] ? (
                <p key={field.id} className="text-red-500 text-xs mt-1 ml-2 w-full max-w-[480px]">
                  {errors[field.name as keyof TSignUpForm]?.message}
                </p>
              ) : null,
            )}
            {/* 가입하기 버튼 */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={clsx(
                "w-full max-w-[480px] h-[64px] mt-[30px] mb-[24px] font-bold text-[16px]/[20px]",
                isSubmitting ? "bg-neutral-200 text-zinc-400" : "bg-neutral-800 text-white",
                "rounded-sm inline-flex justify-center items-center transition-colors duration-200",
                isSubmitting && "opacity-70 cursor-not-allowed",
              )}
              data-size="Default"
              data-state={isSubmitting ? "disabled" : "active"}
              data-type="filled"
            >
              {isSubmitting ? "가입 중..." : "가입하기"}
            </button>
            {/* 하단 안내 */}
            <div className="flex justify-center items-center gap-[4px] w-full mt-2">
              <div className="font-normal text-[16px]/[20px] tracking-tight text-[#999999]">
                이미 계정이 있으신가요?{" "}
              </div>
              <a
                href="/login"
                className="font-bold text-[16px]/[20px] tracking-tight text-primary-950 underline hover:text-neutral-600"
              >
                로그인
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
