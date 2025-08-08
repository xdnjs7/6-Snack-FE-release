import { z } from "zod";

export const inviteSignupSchema = z
  .object({
    password: z
      .string()
      .min(8, "8자 이상 입력해주세요.")
      .regex(/[a-zA-Z]/, "비밀번호는 영문자를 포함해야 합니다.")
      .regex(/[0-9]/, "비밀번호는 숫자를 포함해야 합니다.")
      .regex(/[^a-zA-Z0-9]/, "비밀번호는 특수문자를 포함해야 합니다."),
    passwordConfirm: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordConfirm"],
  });

export type TInviteSignUpFormData = z.infer<typeof inviteSignupSchema>; 