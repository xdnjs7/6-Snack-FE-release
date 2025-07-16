"use client";

import React, { useState, FormEvent, ChangeEvent } from "react"; // 타입 추가: FormEvent, ChangeEvent
import clsx from "clsx";

// 폼 데이터 타입을 정의합니다.
interface FormData {
  id: string;
  password: string;
  passwordConfirm: string;
  companyName: string;
  companyNumber: string;
}

const SignUpForm = () => {
  // 폼 입력 값들을 관리하기 위한 상태 (TypeScript 적용)
  const [formData, setFormData] = useState<FormData>({
    id: "",
    password: "",
    passwordConfirm: "",
    companyName: "",
    companyNumber: "",
  });

  // 입력 필드 변경 핸들러
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // 폼 제출 핸들러
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 폼 기본 제출 동작을 막습니다.

    // 여기에 폼 유효성 검사 및 제출 로직을 구현합니다.
    console.log("폼이 제출되었습니다!");
    console.log("폼 데이터:", formData);

    // 예시: 간단한 유효성 검사
    if (formData.password !== formData.passwordConfirm) {
      alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      return;
    }
    if (!formData.id || !formData.password || !formData.companyName) {
      alert("필수 정보를 모두 입력해주세요.");
      return;
    }

    // 일반적으로 이 곳에서 백엔드 API로 데이터를 전송합니다 (fetch API 또는 axios 등 사용).
    // fetch('/api/signup', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(formData),
    // })
    // .then(response => response.json())
    // .then(data => {
    //   console.log('Success:', data);
    //   alert('회원가입이 완료되었습니다!');
    //   // 성공 후 리다이렉트 또는 상태 업데이트
    // })
    // .catch((error) => {
    //   console.error('Error:', error);
    //   alert('회원가입 중 오류가 발생했습니다.');
    // });
  };

  return (
    <div
      className={clsx(
        "w-full",
        "px-4", // 모바일 기본 패딩
        "py-8", // 모바일 세로 패딩
        "sm:px-8", // 태블릿 화면 너비 (sm: 744px 이상)에서 적용될 패딩
        "sm:py-12", // 태블릿 화면 너비에서 적용될 세로 패딩
        "md:px-16", // PC 화면 너비 (md: 1400px 이상)에서 적용될 패딩
        "md:py-16", // PC 화면 너비에서 적용될 세로 패딩
        "max-w-xs", // 모바일 최대 너비 (대략 이미지와 유사하게)
        "sm:max-w-md", // 태블릿 최대 너비
        "md:max-w-lg", // PC 최대 너비
        "bg-[--color-white]", // 폼 배경색 (global.css 변수 사용)
        "rounded-lg", // 모서리 둥글게 (이미지에는 없지만 일반적인 UI 관행)
        "shadow-none", // 모바일에서는 그림자 없음
        "sm:shadow-md", // 태블릿/PC에서 은은한 그림자 추가
      )}
    >
      <h1
        className={clsx(
          "text-5xl", // "Snack" 텍스트 크기
          "font-bold", // 굵은 글씨
          "text-center", // 중앙 정렬
          "mb-10", // "Snack" 아래 여백
          "md:mb-16", // 큰 화면에서 더 많은 여백
        )}
      >
        Snack
      </h1>

      <div className="text-center mb-8">
        <h2
          className={clsx(
            "text-xl", // 제목 글자 크기
            "font-semibold", // 굵은 글씨
            "text-[--color-primary-950]", // 제목 색상
            "mb-2", // 제목 아래 여백
          )}
        >
          기업 담당자 회원가입
        </h2>
        <p
          className={clsx(
            "text-sm", // 설명 글자 크기
            "text-[--color-primary-700]", // 설명 색상 (약간 연한 회색)
            "leading-relaxed", // 줄 간격
          )}
        >
          * 그룹 내 유저는 기업 담당자의 초대 메일을 통해 가입이 가능합니다.
        </p>
      </div>

      <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
        {/* 입력 필드들 */}
        {[
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
        ].map((field) => (
          <div key={field.id}>
            <label htmlFor={field.id} className="sr-only">
              {field.label}
            </label>
            <input
              type={field.type}
              id={field.id}
              name={field.name} // 폼 제출 시 필요한 name 속성
              placeholder={field.label}
              value={formData[field.name as keyof FormData]} // 타입 단언: `field.name`이 `FormData`의 키임을 명시
              onChange={handleChange}
              className={clsx(
                "w-full",
                "p-3",
                "border",
                "border-[--color-primary-200]", // 테두리 색상 (옅은 회색)
                "rounded-md", // 둥근 모서리
                "focus:outline-none", // 포커스 시 기본 아웃라인 제거
                "focus:ring-2", // 포커스 시 링 효과
                "focus:ring-[--color-secondary-500]", // 링 색상 (파란색)
                "placeholder-[--color-primary-400]", // 플레이스홀더 텍스트 색상
                "text-[--color-primary-900]", // 입력 텍스트 색상
                "text-base", // 글자 크기
              )}
            />
          </div>
        ))}

        {/* 회원가입 버튼 */}
        <button
          type="submit"
          className={clsx(
            "w-full",
            "py-3",
            "bg-[--color-primary-950]", // 버튼 배경색 (가장 진한 회색/검정)
            "text-[--color-white]", // 버튼 텍스트 색상 (흰색)
            "font-semibold", // 굵은 글씨
            "rounded-md", // 둥근 모서리
            "hover:bg-[--color-primary-800]", // 호버 시 색상 변경
            "transition-colors", // 색상 전환 시 부드러운 효과
            "duration-200", // 전환 지속 시간
            "mt-6", // 버튼 위 여백
          )}
        >
          가입하기
        </button>
      </form>

      {/* 로그인 링크 */}
      <p className={clsx("text-center", "mt-6", "text-sm", "text-[--color-primary-700]")}>
        이미 계정이 있으신가요?{" "}
        <a
          href="/login" // Next.js 로그인 페이지 경로
          className={clsx(
            "text-[--color-primary-950]", // 링크 텍스트 색상 (진한 회색/검정)
            "font-semibold", // 굵은 글씨
            "underline", // 밑줄
            "hover:text-[--color-primary-700]", // 호버 시 색상 변경
          )}
        >
          로그인
        </a>
      </p>
    </div>
  );
};

export default SignUpForm;
