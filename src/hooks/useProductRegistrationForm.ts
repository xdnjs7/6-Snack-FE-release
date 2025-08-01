import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { productRegistrationSchema, type ProductRegistrationFormData } from "@/lib/schemas/product.schema";
import { CATEGORIES } from "@/lib/constants/categories";
import { useCreateProduct } from "./useProductMutations";

type UseProductRegistrationFormProps = {
  onSubmitSuccess?: () => void;
  onClose?: () => void;
  initialData?: {
    productName: string;
    price: string;
    productLink: string;
    parentCategory: string;
    childrenCategory: string;
    imageUrl?: string;
  };
};

export const useProductRegistrationForm = ({
  onSubmitSuccess,
  onClose,
  initialData,
}: UseProductRegistrationFormProps) => {
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const createProductMutation = useCreateProduct();

  const form = useForm<ProductRegistrationFormData>({
    resolver: zodResolver(productRegistrationSchema),
    mode: "onChange",
    defaultValues: {
      productName: "",
      price: "",
      productLink: "",
      parentCategory: "",
      childrenCategory: "",
    },
  });

  const { watch, setValue, reset } = form;
  const watchedValues = watch();

  // 초기 데이터 설정
  useEffect(() => {
    if (initialData) {
      setValue("productName", initialData.productName);
      setValue("price", initialData.price);
      setValue("productLink", initialData.productLink);
      setValue("parentCategory", initialData.parentCategory);
      setValue("childrenCategory", initialData.childrenCategory);
      if (initialData.imageUrl) {
        setImagePreviewUrl(initialData.imageUrl);
      }
    }
  }, [initialData, setValue]);

  // 이미지 처리
  const handleImageChange = (file: File | null) => {
    if (file) {
      setValue("imageFile", file);
      setImagePreviewUrl(URL.createObjectURL(file));
    } else {
      setValue("imageFile", new File([], "empty") as File);
      setImagePreviewUrl(null);
    }
  };

  const handleImageRemove = () => {
    setValue("imageFile", new File([], "empty") as File);
    setImagePreviewUrl(null);
  };

  // 카테고리 처리
  const handleParentCategoryChange = (value: string) => {
    setValue("parentCategory", value);
    setValue("childrenCategory", "");
  };

  const handleChildrenCategoryChange = (value: string) => {
    setValue("childrenCategory", value);
  };

  // 폼 제출
  const onSubmit = async (data: ProductRegistrationFormData) => {
    try {
      // 카테고리 ID 매핑
      const categoryId = getCategoryId(data.parentCategory, data.childrenCategory);

      // FormData 생성
      const formData = new FormData();
      formData.append("name", data.productName);
      formData.append("price", data.price);
      formData.append("linkUrl", data.productLink);
      formData.append("categoryId", categoryId.toString());
      // 빈 파일이 아닌 경우에만 추가
      if (data.imageFile.size > 0) {
        formData.append("image", data.imageFile);
      }

      await createProductMutation.mutateAsync(formData);

      // 성공 처리
      reset();
      setImagePreviewUrl(null);
      onSubmitSuccess?.();
      onClose?.();
    } catch (error) {
      console.error("상품 등록 실패:", error);
    }
  };

  // 카테고리 옵션
  const parentCategoryOptions = CATEGORIES.parentCategory.map((category) => category.name);
  const childrenCategoryOptions = watchedValues.parentCategory
    ? CATEGORIES.childrenCategory[watchedValues.parentCategory as keyof typeof CATEGORIES.childrenCategory]?.map(
        (category) => category.name,
      ) || []
    : [];

  return {
    form,
    imagePreviewUrl,
    createProductMutation,
    parentCategoryOptions,
    childrenCategoryOptions,
    handleImageChange,
    handleImageRemove,
    handleParentCategoryChange,
    handleChildrenCategoryChange,
    onSubmit: form.handleSubmit(onSubmit),
  };
};

// 카테고리 ID 가져오기 헬퍼 함수
const getCategoryId = (mainCategory: string, subCategory: string): number => {
  const parentCategory = CATEGORIES.parentCategory.find((cat) => cat.name === mainCategory);
  if (!parentCategory) return 1;

  const childrenCategories = CATEGORIES.childrenCategory[mainCategory as keyof typeof CATEGORIES.childrenCategory];
  const subCategoryObj = childrenCategories?.find((cat) => cat.name === subCategory);

  return subCategoryObj?.id || 1;
};
