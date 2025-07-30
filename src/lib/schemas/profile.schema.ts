import { z } from "zod";

// Profile 업데이트용 Zod 스키마
export const profileSchema = z
  .object({
    company: z.string().optional(),
    password: z
      .string()
      .optional()
      .refine((val) => !val || val.length >= 1, {
        message: "비밀번호를 입력해주세요.",
      })
      .refine((val) => !val || val.length >= 8, {
        message: "비밀번호는 최소 8자 이상이어야 합니다.",
      })
      .refine((val) => !val || /[a-zA-Z]/.test(val), {
        message: "영문자를 포함해야 합니다.",
      })
      .refine((val) => !val || /[0-9]/.test(val), {
        message: "숫자를 포함해야 합니다.",
      })
      .refine((val) => !val || /[^a-zA-Z0-9]/.test(val), {
        message: "특수문자를 포함해야 합니다.",
      }),
    confirmPassword: z.string().optional(),
  })
  .refine(
    (data) => {
      // 비밀번호가 입력된 경우에만 확인 비밀번호와 일치하는지 검사
      if (data.password && data.password.length > 0) {
        return data.password === data.confirmPassword;
      }
      return true;
    },
    {
      message: "비밀번호가 일치하지 않습니다.",
      path: ["confirmPassword"],
    },
  )
  .refine(
    (data) => {
      // 회사명이 변경된 경우 공백이 아니어야 함
      if (data.company !== undefined) {
        return data.company.trim() !== "";
      }
      return true;
    },
    {
      message: "회사명을 입력해주세요.",
      path: ["company"],
    },
  );

// 타입 정의
export type TProfileFormData = z.infer<typeof profileSchema>;
