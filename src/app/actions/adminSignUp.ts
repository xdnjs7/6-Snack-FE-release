"use server";

import { signUpSchema } from "@/lib/schemas/signUpSchema";
import { redirect } from "next/navigation";

type TSignupResponse = {
  message: string;
  // 백엔드 동작에서 기대하는 것: token, user_id 등등 들어갈 수 있음
};

type TSignupError = {
  error: string;
  details?: unknown;
  message?: string;
};

// 환경변수에서 API URL을 가져오거나 기본값 사용
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
const API_URL = `${BASE_URL}/auth/signup`;

export async function adminSignUp(formData: FormData) {
  const inputData = {
    name: formData.get("name"),
    id: formData.get("email"), // 서버 액션에서는 'email'로 받지만, Zod 스키마는 'id'일 수 있음. 스키마에 맞춰 조정.
    password: formData.get("password"),
    passwordConfirm: formData.get("confirmPassword"),
    companyName: formData.get("companyName"),
    companyNumber: formData.get("bizNumber"), // 서버 액션에서는 'bizNumber'로 받지만, Zod 스키마는 'companyNumber'일 수 있음.
  };

  // 디버깅을 위한 로그 추가
  console.log("FormData에서 받은 값들:", {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
    companyName: formData.get("companyName"),
    bizNumber: formData.get("bizNumber"),
  });

  // Zod 스키마를 사용하여 서버에서 데이터 유효성 검사
  const parsedData = signUpSchema.safeParse(inputData);

  if (!parsedData.success) {
    // 유효성 검사 실패 시, 첫 번째 에러 메시지를 반환
    return { error: parsedData.error.message || "입력 데이터가 유효하지 않습니다." };
  }

  // 유효성 검사를 통과한 데이터 사용
  const { id: email, name, password, passwordConfirm, companyName, companyNumber: bizNumber } = parsedData.data;

  // 백엔드 서버가 실행되지 않은 경우를 위한 임시 처리
  console.log("백엔드로 전송할 데이터:", {
    email,
    name,
    password,
    passwordConfirm,
    companyName,
    bizNumber,
  });

  // 모든 필수 필드가 있는지 확인
  const requiredFields = { email, name, password, passwordConfirm, companyName, bizNumber };
  const missingFields = Object.entries(requiredFields)
    .filter(([, value]) => !value || value.toString().trim() === "")
    .map(([key]) => key);

  if (missingFields.length > 0) {
    console.log("누락된 필드:", missingFields);
    return { error: `다음 필드가 누락되었습니다: ${missingFields.join(", ")}` };
  }

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        name,
        password,
        passwordConfirm,
        companyName,
        bizNumber,
      }),
    });

    if (!response.ok) {
      const errorData: TSignupError = await response.json();
      // Handle different types of errors from the backend
      console.error("Signup failed:", errorData);
      return { error: errorData.message || "Signup failed. Please try again." };
    }

    const data: TSignupResponse = await response.json();
    console.log("Signup successful:", data);

    // 성공시 동작 - 메인 랜딩페이지로 리다이렉트
    redirect("/");
  } catch (error) {
    // NEXT_REDIRECT는 정상적인 리다이렉트이므로 오류로 처리하지 않음
    if (error instanceof Error && error.message.includes("NEXT_REDIRECT")) {
      throw error; // 리다이렉트를 계속 진행
    }

    console.error("Error during signup:", error);

    // 연결 오류인 경우 더 구체적인 메시지 제공
    if (error instanceof Error && error.message.includes("fetch failed")) {
      return { error: "백엔드 서버에 연결할 수 없습니다. 서버가 실행 중인지 확인해주세요." };
    }

    return { error: "An unexpected error occurred. Please try again later." };
  }
}
