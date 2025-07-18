"use server";

import { signUpSchema } from "@/lib/schemas/signUpSchema";
import { redirect } from "next/navigation";

type TSignupResponse = {
  message: string;
  // 백엔드 동작에서 기대하는 것: token, user_id 등등 들어갈 수 있음
};

type TSignupError = {
  error: string;
  details?: any;
  message?: any;
};

const BASE_URL = "localhost:8080"
const API_URL = `http://${BASE_URL}/auth/signup`

export async function adminSignUp(formData: FormData) {
  const inputData = {
    name: formData.get("name"),
    id: formData.get("email"), // 서버 액션에서는 'email'로 받지만, Zod 스키마는 'id'일 수 있음. 스키마에 맞춰 조정.
    password: formData.get("password"),
    passwordConfirm: formData.get("confirmPassword"),
    companyName: formData.get("companyName"),
    companyNumber: formData.get("bizNumber"), // 서버 액션에서는 'bizNumber'로 받지만, Zod 스키마는 'companyNumber'일 수 있음.
  };

  // Zod 스키마를 사용하여 서버에서 데이터 유효성 검사
  const parsedData = signUpSchema.safeParse(inputData);

  if (!parsedData.success) {
    // 유효성 검사 실패 시, 첫 번째 에러 메시지를 반환
    return { error: parsedData.error.message || "입력 데이터가 유효하지 않습니다." };
}
  }

  // 유효성 검사를 통과한 데이터 사용
  const { id: email, name, password, passwordConfirm, companyName, companyNumber: bizNumber } = parsedData.data;

  // ... 이하 기존 fetch 로직 유지 ...

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

    // 성공시 동작
    redirect("/admin/dashboard");
  } catch (error) {
    console.error("Error during signup:", error);
    return { error: "An unexpected error occurred. Please try again later." };
  }
}
