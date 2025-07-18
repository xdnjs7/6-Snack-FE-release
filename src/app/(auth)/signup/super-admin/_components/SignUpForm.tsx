"use client";

import React from "react";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";
import img_logo from "@/assets/images/img_logo.webp";
import { adminSignUp } from "@/app/actions/adminSignup";
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
        // 예시: 백엔드가 "Email already exists" 에러를 반환할 경우
        if (result.error.includes("Email already exists")) {
          // 백엔드의 실제 에러 메시지에 따라 조건 조정
          setError("id", { type: "manual", message: "이미 사용 중인 이메일입니다." });
        } else if (result.error.includes("Invalid business number")) {
          // 다른 예시
          setError("companyNumber", { type: "manual", message: "유효하지 않은 사업자 번호입니다." });
        } else {
          // 위에서 처리되지 않은 일반적인 오류
          console.log(`회원가입 중 오류가 발생했습니다: ${result.error}`);
        }
      }
    } catch (error) {
      console.error("예상치 못한 오류:", error);
      console.log("회원가입 중 예상치 못한 오류가 발생했습니다.");
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
    <div>
      <div className="flex justify-center items-center h-16">
        <Image src={img_logo} alt="우리 회사 로고" width={344} height={97} priority />
      </div>
      <div
        className={clsx(
          "w-150",
          "h-183.5",
          "pt-10",
          "pr-15",
          "pb-10",
          "pl-15",
          "rounded-[2px]",
          "bg-[--color-white]",
          "shadow-[0px_0px_40px_0px_#0000001A]",
          "flex",
          "flex-col",
          "gap-5",
        )}
      >
        <div className="flex flex-col gap-2.5">
          <h2
            className={clsx(
              "font-suit",
              "font-bold",
              "text-6",
              "leading-tight",
              "tracking-tighter",
              "text-left",
              "align-middle",
            )}
          >
            기업 담당자 회원가입
          </h2>
          <p
            className={clsx(
              "font-suit",
              "font-normal",
              "text-4",
              "leading-tight",
              "tracking-tighter",
              "text-left",
              "align-middle",
            )}
          >
            * 그룹 내 유저는 기업 담당자의 초대 메일을 통해 가입이 가능합니다.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          {formFields.map((field) => (
            <div key={field.id}>
              <label htmlFor={field.id} className="sr-only">
                {field.label}
              </label>
              <input
                type={field.type}
                id={field.id}
                placeholder={field.label}
                {...register(field.name as keyof TSignUpForm)}
                className={clsx(
                  "w-full",
                  "p-3",
                  "border",
                  "border-[--color-primary-200]",
                  "rounded-md",
                  "focus:outline-none",
                  "focus:ring-2",
                  "focus:ring-[--color-secondary-500]",
                  "placeholder-[--color-primary-400]",
                  "text-[--color-primary-900]",
                  "text-base",
                  errors[field.name as keyof TSignUpForm] && "border-red-500",
                )}
              />
              {errors[field.name as keyof TSignUpForm] && (
                <p className="text-red-500 text-sm mt-1">{errors[field.name as keyof TSignUpForm]?.message}</p>
              )}
            </div>
          ))}

          <button
            type="submit"
            disabled={isSubmitting}
            className={clsx(
              "w-full",
              "py-4",
              "bg-[--color-primary-950]",
              "text-[--color-white]",
              "font-semibold",
              "rounded-md",
              "hover:bg-[--color-primary-800]",
              "transition-colors",
              "duration-200",
              isSubmitting && "opacity-70 cursor-not-allowed",
            )}
          >
            {isSubmitting ? "가입 중..." : "가입하기"}
          </button>
        </form>

        <p className={clsx("text-center", "mt-6", "text-sm", "text-[--color-primary-700]")}>
          이미 계정이 있으신가요?{" "}
          <a
            href="/login"
            className={clsx(
              "text-[--color-primary-950]",
              "font-semibold",
              "underline",
              "hover:text-[--color-primary-700]",
            )}
          >
            로그인
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;
