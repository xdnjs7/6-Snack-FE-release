import { z } from "zod";

export const productRegistrationSchema = z.object({
  productName: z.string().min(1, "상품명을 입력해주세요").max(100, "상품명은 15자 이하여야 합니다"),
  price: z
    .string()
    .min(1, "가격을 입력해주세요")
    .regex(/^\d+$/, "숫자만 입력해주세요")
    .transform((val) => parseInt(val, 10))
    .refine((val) => val > 0, "가격은 0보다 커야 합니다"),
  productLink: z.string().min(1, "제품 링크를 입력해주세요").url("올바른 URL을 입력해주세요"),
  mainCategory: z.string().min(1, "대분류를 선택해주세요"),
  subCategory: z.string().min(1, "소분류를 선택해주세요"),
  imageFile: z
    .instanceof(File, { message: "이미지를 업로드해주세요" })
    .refine((file) => file.size <= 5 * 1024 * 1024, "파일 크기는 5MB 이하여야 합니다")
    .refine(
      (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
      "JPG, PNG, WEBP 형식만 지원됩니다",
    ),
});

export type ProductRegistrationFormData = z.infer<typeof productRegistrationSchema>;
