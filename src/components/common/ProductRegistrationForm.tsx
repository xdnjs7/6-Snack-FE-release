import React, { ChangeEvent } from "react";
import Input from "./Input";
import Dropdown from "./DropDown";
import photoIcon from "@/assets/icons/ic_photo.svg";
import Image from "next/image";
import { useProductRegistrationForm } from "@/hooks/useProductRegistrationForm";
import XIconSvg from "../svg/XIconSvg";

// 상품 데이터를 위한 타입 정의
export type TProductData = {
  productName: string;
  price: string;
  productLink: string;
  mainCategory: string;
  subCategory: string;
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
    handleMainCategoryChange,
    handleSubCategoryChange,
    onSubmit,
  } = useProductRegistrationForm({
    onSubmitSuccess,
    onClose,
    initialData,
  });

  const {
    register,
    formState: { errors },
  } = form;

  const onImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleImageChange(e.target.files[0]);
    }
  };

  return (
    // <div className="min-h-screen flex items-center justify-center p-4 bg-primary-50">

    <div className="w-[512px] h-[696px] fixed inset-0 top-1/2 left-1/2 -translate-1/2 rounded-[6px] p-[30px] bg-white shadow-xl flex flex-col gap-[32px] items-center">
      <h2 className="font-suit font-bold text-[18px] leading-[100%] tracking-[-0.45px] text-primary-950 text-center">
        상품 등록
      </h2>

      <div className="flex justify-center items-center relative">
        {!imagePreviewUrl ? (
          <label
            htmlFor="imageUpload"
            className="w-[140px] h-[140px] flex flex-col items-center justify-center border border-primary-200 rounded-[2px] text-primary-400 cursor-pointer hover:bg-primary-100"
          >
            <Image src={photoIcon} alt="사진 아이콘" />
            <input id="imageUpload" type="file" accept="image/*" onChange={onImageChange} className="hidden" />
          </label>
        ) : (
          <>
            <Image
              src={imagePreviewUrl}
              alt="Product Preview"
              width={140}
              height={140}
              className="object-contain border border-primary-100 rounded-[2px]"
            />
            <button
              onClick={handleImageRemove}
              className="absolute top-0 right-0 -mt-2 -mr-2 bg-primary-50 rounded-full p-1 border-1 border-primary-100"
              aria-label="Remove image"
            >
             
              <XIconSvg className="w-4 h-4"/>
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
              onChange={handleMainCategoryChange}
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
              onChange={handleSubCategoryChange}
              className="w-full"
            />
          </div>
        </div>

        <div className="w-full">
          <Input
            type="text"
            id="productName"
            {...register("productName", { required: "상품명을 입력해주세요" })}
            placeholder="상품명을 입력해주세요"
            label="상품명"
          />
          {errors.productName && <p className="text-red-500 text-sm mt-1">{errors.productName.message}</p>}
        </div>

        <div className="w-full">
          <Input
            type="text"
            id="price"
            {...register("price", {
              required: "가격을 입력해주세요",
              pattern: {
                value: /^\d+$/,
                message: "숫자만 입력해주세요",
              },
            })}
            placeholder="가격을 입력해주세요"
            label="가격"
          />
          {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
        </div>

        <div className="w-full">
          <Input
            type="text"
            id="productLink"
            {...register("productLink", {
              required: "제품 링크를 입력해주세요",
              pattern: {
                value: /^https?:\/\/.+/, // 올바른 URL
                message: "올바른 URL을 입력해주세요",
              },
            })}
            placeholder="제품 링크를 입력해주세요"
            label="제품 링크"
          />
          {errors.productLink && <p className="text-red-500 text-sm mt-1">{errors.productLink.message}</p>}
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
  );
}
