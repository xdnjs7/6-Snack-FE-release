import React from "react";
import clsx from "clsx";
import SignUpForm from "./_components/SignUpForm";

export const metadata = {
  title: "Snack - 회원가입",
  description: "Snack 서비스의 기본 담당자 회원가입 페이지입니다.",
};

const SignUpPage = () => {
  return (
    <div
      className={clsx(
        "min-h-screen flex flex-col items-center justify-center",
        "bg-[--color-white]", // 배경색 (global.css 변수 사용)
        "text-[--color-primary-950]", // 기본 텍스트 색상 (global.css 변수 사용)
        "font-[var(--font-suit)]", // 폰트 (global.css 변수 사용)
      )}
    >
      {/* 클라이언트 컴포넌트 렌더링 */}
      <SignUpForm />
    </div>
  );
};

export default SignUpPage;
