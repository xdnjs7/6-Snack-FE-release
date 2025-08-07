import { z } from "zod";

export const productRegistrationSchema = z.object({
  productName: z
    .string()
    .min(1, "상품명을 입력해주세요")
    .max(15, "상품명은 15자 이하여야 합니다")
    .regex(/^[a-zA-Z0-9가-힣ㄱ-ㅎㅏ-ㅣ\s]+$/, "특수문자는 사용할 수 없습니다"),
  price: z
    .string()
    .min(1, "가격을 입력해주세요")
    .regex(/^\d*$/, "숫자만 입력해주세요")
    .refine((val) => val === "" || parseInt(val, 10) > 0, "가격은 0보다 커야 합니다")
    .refine((val) => val === "" || parseInt(val, 10) <= 1000000, "가격은 1,000,000원 이하여야 합니다"),
  productLink: z
    .string()
    .min(1, "제품 링크를 입력해주세요")
    .refine((val) => {
      if (val === "") return true;
      // http:// 또는 https://로 시작하는지 확인
      if (!val.startsWith("http://") && !val.startsWith("https://")) {
        return false;
      }
      // // 이후 부분에 .이 포함되어 있는지 확인 (도메인 검증)
      const afterProtocol = val.substring(val.indexOf("//") + 2);
      if (!afterProtocol.includes(".")) {
        return false;
      }
      try {
        new URL(val);
        return true;
      } catch {
        return false;
      }
    }, "올바른 URL 형식을 입력해주세요 (예: https://example.com)"),
  parentCategory: z.string().min(1, "대분류를 선택해주세요"),
  childrenCategory: z.string().min(1, "소분류를 선택해주세요"),
  imageFile: z
    .union([
      z.instanceof(File, { message: "이미지를 업로드해주세요" }),
      z.null().refine(() => false, { message: "이미지를 업로드해주세요" }),
    ])
    .refine((file) => file && file.size > 0, "이미지를 업로드해주세요")
    .refine((file) => file && file.size <= 5 * 1024 * 1024, "파일 크기는 5MB 이하여야 합니다")
    .refine(
      (file) => file && ["image/jpeg", "image/png", "image/webp", "image/avif"].includes(file.type),
      "JPG, PNG, WEBP, AVIF 형식만 지원됩니다",
    ),
});

export type ProductRegistrationFormData = z.infer<typeof productRegistrationSchema>;
