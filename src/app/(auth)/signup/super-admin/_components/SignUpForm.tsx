"use client";

import React from "react";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";
import img_logo from "@/assets/images/img_logo.webp";
import { adminSignUp } from "@/app/actions/adminSignUp";
import { signUpSchema } from "@/lib/schemas/signUpSchema";

type TSignUpForm = z.infer<typeof signUpSchema>;

const SignUpForm = () => {
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

        // alert창으로 오류 메시지 표시
        alert(`회원가입 실패: ${result.error}`);

        // 백엔드 에러 메시지에 따른 처리
        if (result.error.includes("이미 등록된 이메일")) {
          setError("id", { type: "manual", message: "이미 등록된 이메일입니다." });
        } else if (result.error.includes("이미 등록된 사업자")) {
          setError("companyNumber", { type: "manual", message: "이미 등록된 사업자 등록 번호입니다." });
        } else if (result.error.includes("모두 입력해야 합니다")) {
          // 일반적인 필수 필드 누락 에러
          console.log("필수 필드가 누락되었습니다.");
        } else {
          // 기타 오류
          console.log(`회원가입 중 오류가 발생했습니다: ${result.error}`);
        }
      } else {
        // 성공 시 처리 (리다이렉트는 서버 액션에서 처리됨)
        console.log("회원가입이 성공했습니다!");
        alert("회원가입이 성공했습니다!");
      }
    } catch (error) {
      console.error("예상치 못한 오류:", error);
      console.log("회원가입 중 예상치 못한 오류가 발생했습니다.");

      // 예상치 못한 오류도 alert로 표시
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
    <div className="w-full min-h-screen flex items-center justify-center bg-white">
      <div
        className={clsx(
          // 모바일: w-96, 태블릿/데스크탑: w-[600px]
          "w-96 sm:w-[600px] md:w-[600px] lg:w-[600px]",
          // 모바일: pt-6, 태블릿/데스크탑: pt-[123px] lg:pt-[97px]
          "pt-6 sm:pt-[123px] lg:pt-[97px]",
          "flex flex-col items-center",
          "relative",
        )}
      >
        {/* 로고 영역 */}
        <div
          className={clsx(
            // 모바일: w-80 h-36, 태블릿/데스크탑: w-[500px] h-52
            "w-80 h-36 sm:w-[500px] sm:h-52",
            "relative overflow-hidden mb-6",
          )}
        >
          <div
            className={clsx(
              // 모바일: w-56 h-16, 태블릿/데스크탑: w-80 h-24
              "w-56 h-16 sm:w-80 sm:h-24",
              // 모바일: left-[50.92px] top-[38.18px], 태블릿/데스크탑: left-[77.86px] top-[58.40px]
              "absolute left-[50.92px] top-[38.18px] sm:left-[77.86px] sm:top-[58.40px]",
              "bg-black rounded",
            )}
          >
            {/* 실제 로고 이미지 */}
            <Image src={img_logo} alt="우리 회사 로고" fill style={{ objectFit: "contain" }} priority />
          </div>
        </div>
        {/* 폼 컨테이너 */}
        <div
          className={clsx(
            // 모바일: w-80, 태블릿/데스크탑: w-[500px]
            "w-80 sm:w-[500px]",
            // 모바일: px-0 py-0, 태블릿/데스크탑: px-14 py-10
            "px-0 py-0 sm:px-14 sm:py-10",
            "bg-white rounded-sm",
            "shadow-none sm:shadow-[0px_0px_40px_0px_rgba(0,0,0,0.10)]",
            "outline-none sm:outline sm:outline-1 sm:outline-offset-[-1px]",
            "flex flex-col items-start gap-5",
          )}
        >
          {/* 타이틀/설명 */}
          <div className="flex flex-col items-start gap-2.5 w-full">
            <div className="text-lg sm:text-2xl font-bold font-suit text-stone-900 text-center w-full">
              기업 담당자 회원가입
            </div>
            <div className="text-sm sm:text-base font-normal font-suit text-stone-500 text-center w-full">
              * 그룹 내 유저는 기업 담당자의
              <br className="sm:hidden" />
              초대 메일을 통해 가입이 가능합니다.
            </div>
          </div>
          {/* 폼 */}
          <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col items-center gap-6">
            <div className="w-full flex flex-col gap-7">
              <div className="w-full flex flex-col gap-8">
                <div className="w-full flex flex-col gap-5">
                  {formFields.map((field) => (
                    <div
                      key={field.id}
                      className={clsx(
                        "self-stretch h-14 px-1 py-2 border-b",
                        "border-stone-500",
                        "inline-flex justify-between items-center overflow-hidden",
                        errors[field.name as keyof TSignUpForm] && "border-red-500",
                      )}
                      data-show-eye={field.type === "password"}
                      data-show-floating-label="true"
                      data-size="sm"
                      data-state={errors[field.name as keyof TSignUpForm] ? "error" : "normal"}
                    >
                      <input
                        type={field.type}
                        id={field.id}
                        placeholder={field.label}
                        {...register(field.name as keyof TSignUpForm)}
                        className={clsx(
                          "flex-1 bg-transparent outline-none border-none",
                          "text-zinc-500 text-base font-normal font-suit",
                          "placeholder:text-zinc-500",
                        )}
                        autoComplete={field.type === "password" ? "new-password" : "off"}
                      />
                      {/* eye 아이콘 (비밀번호 입력란만) */}
                      {field.type === "password" && (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 relative overflow-hidden">
                            {/* eye 아이콘(디자인용, 기능X) */}
                            <div className="w-3.5 h-3 left-[1.19px] top-[2.33px] absolute bg-neutral-600 rounded" />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              {/* 에러 메시지 */}
              {formFields.map((field) =>
                errors[field.name as keyof TSignUpForm] ? (
                  <p key={field.id} className="text-red-500 text-xs mt-1 ml-2">
                    {errors[field.name as keyof TSignUpForm]?.message}
                  </p>
                ) : null,
              )}
              {/* 가입하기 버튼 */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={clsx(
                  "self-stretch h-16 p-4",
                  isSubmitting ? "bg-neutral-200 text-zinc-400" : "bg-neutral-800 text-white",
                  "rounded-sm inline-flex justify-center items-center",
                  "text-base font-bold font-suit",
                  "transition-colors duration-200",
                  isSubmitting && "opacity-70 cursor-not-allowed",
                )}
                data-size="Default"
                data-state={isSubmitting ? "disabled" : "active"}
                data-type="filled"
              >
                {isSubmitting ? "가입 중..." : "가입하기"}
              </button>
            </div>
            {/* 하단 안내 */}
            <div className="inline-flex justify-center items-center gap-1 w-full mt-2">
              <div className="text-neutral-400 text-base font-normal font-suit">이미 계정이 있으신가요?</div>
              <a
                href="/login"
                className="text-neutral-800 text-base font-bold font-suit underline hover:text-neutral-600"
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

export default SignUpForm;
