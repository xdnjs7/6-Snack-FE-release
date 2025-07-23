import { z } from "zod";

export const signupSchema = z
  .object({
    name: z.string().min(1, "이름(기업 담당자)을 입력해주세요."),
    id: z.string().email("유효한 이메일 주소를 입력해주세요.").min(1, "아이디(이메일)를 입력해주세요."),
    password: z
      .string()
      .min(8, "비밀번호는 최소 8자 이상이어야 합니다.")
      .regex(/[a-zA-Z]/, "비밀번호는 영문자를 포함해야 합니다.")
      .regex(/[0-9]/, "비밀번호는 숫자를 포함해야 합니다.")
      .regex(/[^a-zA-Z0-9]/, "비밀번호는 특수문자를 포함해야 합니다."),
    passwordConfirm: z.string().min(1, "비밀번호 확인을 입력해주세요."),
    companyName: z.string().min(1, "회사명을 입력해주세요."),
    companyNumber: z.string().regex(/^\d{10}$/, "10자리 사업자 번호 형식으로 입력해주세요."),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "비밀번호와 비밀번호 확인이 일치하지 않습니다.",
    path: ["passwordConfirm"],
  });
