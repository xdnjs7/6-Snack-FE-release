import { z } from "zod";

// Zod 스키마, 유효성 검사
export const loginSchema = z.object({
  email: z.string().nonempty({ message: "이메일을 입력해주세요." }).email({ message: "유효하지 않은 이메일입니다." }),
  password: z
    .string()
    .nonempty({ message: "비밀번호를 입력해주세요." })
    .min(8, { message: "비밀번호는 8자 이상이어야 합니다." })
    .regex(/[a-zA-Z]/, "비밀번호는 영문자를 포함해야 합니다.")
    .regex(/[0-9]/, "비밀번호는 숫자를 포함해야 합니다.")
    .regex(/[^a-zA-Z0-9]/, "비밀번호는 특수문자를 포함해야 합니다."),
});

// 타입 정의
export type TLoginFormData = z.infer<typeof loginSchema>;
