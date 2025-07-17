"use client";

import React from "react";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const signUpSchema = z
  .object({
    name: z.string().min(1, "이름(기업 담당자)을 입력해주세요."),
    id: z.string().min(1, "아이디를 입력해주세요."),
    password: z
      .string()
      .min(8, "비밀번호는 최소 8자 이상이어야 합니다.")
      .regex(/[a-zA-Z]/, "비밀번호는 영문자를 포함해야 합니다.")
      .regex(/[0-9]/, "비밀번호는 숫자를 포함해야 합니다.")
      .regex(/[^a-zA-Z0-9]/, "비밀번호는 특수문자를 포함해야 합니다."),
    passwordConfirm: z.string().min(1, "비밀번호 확인을 입력해주세요."),
    companyName: z.string().min(1, "회사명을 입력해주세요."),
    companyNumber: z
      .string()
      .regex(/^\d{3}-\d{2}-\d{5}$/, "유효한 사업자 번호 형식(예: 123-45-67890)으로 입력해주세요."),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "비밀번호와 비밀번호 확인이 일치하지 않습니다.",
    path: ["passwordConfirm"],
  });

type TSignUpForm = z.infer<typeof signUpSchema>;

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TSignUpForm>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: TSignUpForm) => {
    console.log("폼이 제출되었습니다!");
    console.log("폼 데이터:", data);

    try {
      // 여기에 실제 백엔드 API 호출 코드를 넣으세요.
      // fetch('/api/signup', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(data),
      // });

      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert("회원가입이 완료되었습니다!");
    } catch (error) {
      console.error("Error:", error);
      alert("회원가입 중 오류가 발생했습니다.");
    }
  };

  const formFields = [
    { id: "name", label: "이름(기업 담당자)을 입력해주세요", type: "text", name: "name" },
    { id: "id", label: "아이디를 입력해주세요", type: "text", name: "id" },
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
    <div
      className={clsx(
        "w-full",
        "px-4",
        "py-8",
        "sm:px-8",
        "sm:py-12",
        "md:px-16",
        "md:py-16",
        "max-w-xs",
        "sm:max-w-md",
        "md:max-w-lg",
        "bg-[--color-white]",
        "rounded-lg",
        "shadow-none",
        "sm:shadow-md",
      )}
    >
      <h1>Snack</h1>

      <div>
        <h2>기업 담당자 회원가입</h2>
        <p>* 그룹 내 유저는 기업 담당자의 초대 메일을 통해 가입이 가능합니다.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
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
            "py-3",
            "bg-[--color-primary-950]",
            "text-[--color-white]",
            "font-semibold",
            "rounded-md",
            "hover:bg-[--color-primary-800]",
            "transition-colors",
            "duration-200",
            "mt-6",
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
  );
};

export default SignUpForm;
