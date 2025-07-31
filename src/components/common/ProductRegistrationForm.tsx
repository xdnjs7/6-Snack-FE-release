import React, { ChangeEvent } from "react";
import { FormProvider } from "react-hook-form";
import FormInput from "./FormInput";
import Dropdown from "./DropDown";
import photoIcon from "@/assets/icons/ic_photo.svg";
import Image from "next/image";
import { useProductRegistrationForm } from "@/hooks/useProductRegistrationForm";
import XIconSvg from "../svg/XIconSvg";

// 상품 데이터를 위한 타입 정의
type TProductData = {
  productName: string;
  price: string;
  productLink: string;
  parentCategory: string;
  childrenCategory: string;
  imageUrl?: string;
};

// ProductRegistrationForm 컴포넌트가 받을 수 있는 프롭스 타입 정의
type TProductRegistrationFormProps = {
  onSubmitSuccess?: () => void;
  onClose?: () => void;
  initialData?: TProductData;
};

export default function ProductRegistrationForm({
  onSubmitSuccess,
  onClose,
  initialData,
}: TProductRegistrationFormProps) {
  const {
    form,
    imagePreviewUrl,
    createProductMutation,
    parentCategoryOptions,
    childrenCategoryOptions,
    handleImageChange,
    handleImageRemove,
    handleParentCategoryChange,
    handleChildrenCategoryChange,
    onSubmit,
  } = useProductRegistrationForm({
    onSubmitSuccess,
    onClose,
    initialData,
  });

  // FormInput은 useFormContext를 사용하므로 register와 errors를 직접 사용하지 않음

  const onImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleImageChange(e.target.files[0]);
    }
  };

  return (
    <FormProvider {...form}>
      <div className="w-full h-full z-[99999] sm:w-[512px] sm:h-[696px] sm:fixed sm:inset-0 sm:top-1/2 sm:left-1/2 sm:-translate-1/2 rounded-[6px] p-[30px] bg-white shadow-xl flex flex-col gap-[32px] items-center">
        <h2 className="font-bold text-[18px] leading-[100%] tracking-[-0.45px] text-primary-950 text-center">
          상품 등록
        </h2>

        <div className="flex justify-center items-center relative">
          {!imagePreviewUrl ? (
            <label
              htmlFor="imageUpload"
              className="w-[140px] h-[140px] flex flex-col items-center justify-center border border-primary-200 rounded-[2px] text-primary-400 cursor-pointer hover:bg-primary-100"
            >
              <div className="relative w-[30px] h-[30px]">
                <Image src={photoIcon} fill alt="사진 아이콘" className="object-contain" />
              </div>
              <input id="imageUpload" type="file" accept="image/*" onChange={onImageChange} className="hidden" />
            </label>
          ) : (
            <>
              <div className="w-[140px] h-[140px] flex flex-col items-center justify-center border border-primary-200 rounded-[2px]">
                <div className="relative w-[75%] h-[75%]">
                  <Image src={imagePreviewUrl} alt="Product Preview" fill className="object-contain" />
                </div>
              </div>
              <button
                onClick={handleImageRemove}
                className="absolute top-0 right-0 -mt-2 -mr-2 bg-primary-50 rounded-full p-1 border-1 border-primary-100"
                aria-label="Remove image"
              >
                <XIconSvg className="w-4 h-4" />
              </button>
            </>
          )}
        </div>

        <form onSubmit={onSubmit} className="w-full flex flex-col gap-[32px]">
          <div className="grid grid-cols-2 gap-4 w-full">
            <div>
              <label htmlFor="mainCategory" className="sr-only">
                대분류
              </label>
              <Dropdown
                options={parentCategoryOptions}
                placeholder="대분류"
                onChange={handleParentCategoryChange}
                className="w-full"
              />
            </div>
            <div>
              <label htmlFor="subCategory" className="sr-only">
                소분류
              </label>
              <Dropdown
                options={childrenCategoryOptions}
                placeholder="소분류"
                onChange={handleChildrenCategoryChange}
                className="w-full"
                disabled={!parentCategoryOptions.includes(form.watch("parentCategory"))}
              />
            </div>
          </div>

          <div className="w-full">
            <FormInput name="productName" placeholder="상품명을 입력해주세요" label="상품명" />
          </div>

          <div className="w-full">
            <FormInput name="price" type="text" placeholder="가격을 입력해주세요" label="가격" />
          </div>

          <div className="w-full">
            <FormInput name="productLink" type="text" placeholder="제품 링크를 입력해주세요" label="제품 링크" />
          </div>

          <div className="flex justify-between w-full">
            <button
              type="button"
              onClick={() => {
                if (onClose) {
                  onClose();
                }
              }}
              disabled={createProductMutation.isPending}
              className="w-[216px] h-[64px] border border-primary-300 rounded-[2px] py-[12px] px-[16px] text-sm font-medium text-primary-700 bg-white hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              취소
            </button>
            <button
              type="submit"
              disabled={createProductMutation.isPending}
              className="w-[216px] h-[64px] rounded-[2px] py-[12px] px-[16px] text-sm font-medium text-white bg-primary-800 hover:bg-primary-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-900 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {createProductMutation.isPending ? "등록 중..." : "등록하기"}
            </button>
          </div>
        </form>
      </div>
    </FormProvider>
  );
}
