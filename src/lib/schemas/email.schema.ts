import { z } from "zod";

// 이메일 유효성 검사 스키마
export const emailSchema = z
  .string()
  .nonempty({ message: "이메일을 입력해주세요." })
  .email({ message: "유효하지 않은 이메일입니다." });

// 이메일 유효성 검사 함수
export const validateEmail = (email: string): { isValid: boolean; error?: string } => {
  const result = emailSchema.safeParse(email);

  if (result.success) {
    return { isValid: true };
  } else {
    return {
      isValid: false,
      error: result.error.issues[0]?.message || "유효하지 않은 이메일입니다.",
    };
  }
};
