import React, { useState, FC, FormEvent, ChangeEvent, useEffect } from "react";
import Input from "./Input"; // Input 컴포넌트 경로 확인
import Dropdown from "./DropDown";
import photoIcon from "../../assets/icons/ic_photo.svg";
import Image from "next/image";

// 상품 데이터를 위한 타입 정의
export type TProductData = {
  productName: string;
  price: string;
  productLink: string;
  mainCategory: string;
  subCategory: string;
  imageUrl?: string; // 이미지 URL (수정 모드에서 기존 이미지 표시용)
};

// ProductRegistrationForm 컴포넌트가 받을 수 있는 프롭스 타입 정의
type TProductRegistrationFormProps = {
  onSubmitSuccess?: () => void; // 제출 성공 시 호출될 콜백 함수
  onCancel?: () => void; // 취소 버튼 클릭 시 호출될 콜백 함수
  initialData?: TProductData; // 폼을 초기화할 데이터 (편집 모드용)
};

const ProductRegistrationForm: FC<TProductRegistrationFormProps> = ({
  onSubmitSuccess,
  onCancel,
  initialData,
}) => {
  const [productName, setProductName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [productLink, setProductLink] = useState<string>("");
  const [mainCategory, setMainCategory] = useState<string>("");
  const [subCategory, setSubCategory] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null); // 이미지 미리보기 URL 상태

  // initialData가 변경될 때마다 폼 필드를 초기화
  useEffect(() => {
    if (initialData) {
      setProductName(initialData.productName);
      setPrice(initialData.price);
      setProductLink(initialData.productLink);
      setMainCategory(initialData.mainCategory);
      setSubCategory(initialData.subCategory);
      if (initialData.imageUrl) {
        setImagePreviewUrl(initialData.imageUrl); // URL로 미리보기 설정
        // 실제 File 객체가 필요한 경우, 여기서는 File 객체를 생성할 수 없으므로 imageFile은 null로 둠
        // 또는 initialData.imageFile로 File 객체를 직접 받을 수도 있음
      }
    }
  }, [initialData]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreviewUrl(URL.createObjectURL(file)); // 파일 객체로 미리보기 URL 생성
    }
  };

  const handleImageRemove = () => {
    setImageFile(null);
    setImagePreviewUrl(null); // 미리보기 URL도 함께 제거
  };

  const handleMainCategoryChange = (value: string) => {
    setMainCategory(value);
    // 대분류 선택에 따라 소분류 옵션을 변경하는 로직 추가 가능
  };

  const handleSubCategoryChange = (value: string) => {
    setSubCategory(value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log({
      productName,
      price,
      productLink,
      mainCategory,
      subCategory,
      imageFile, // 실제 File 객체
    });
    alert("상품이 등록되었습니다!");

    // 폼 초기화
    setProductName("");
    setPrice("");
    setProductLink("");
    setMainCategory("");
    setSubCategory("");
    setImageFile(null);
    setImagePreviewUrl(null); // 미리보기 URL도 초기화

    // 제출 성공 콜백 호출
    if (onSubmitSuccess) {
      onSubmitSuccess();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-primary-50">
      <div className="w-[512px] h-[696px] rounded-[6px] p-[30px] bg-white shadow-xl flex flex-col gap-[32px] items-center">
        <h2 className="font-suit font-bold text-[18px] leading-[100%] tracking-[-0.45px] text-primary-950 text-center">
          상품 등록
        </h2>

        <div className="flex justify-center items-center relative">
          {!imagePreviewUrl ? ( // imagePreviewUrl을 기준으로 표시
            <label
              htmlFor="imageUpload"
              className="w-[140px] h-[140px] flex flex-col items-center justify-center border border-primary-200 rounded-[2px] text-primary-400 cursor-pointer hover:bg-primary-100"
            >
              <Image src={photoIcon} alt="사진 아이콘" />
              <input
                id="imageUpload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          ) : (
            <>
              <img
                src={imagePreviewUrl} // imagePreviewUrl 사용
                alt="Product Preview"
                className="w-[140px] h-[140px] object-contain border border-primary-300 rounded-[2px]"
              />
              <button
                onClick={handleImageRemove}
                className="absolute top-0 right-0 -mt-2 -mr-2 bg-primary-800 text-white rounded-full p-1"
                aria-label="Remove image"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 w-full">
          <div>
            <label htmlFor="mainCategory" className="sr-only">
              대분류
            </label>
            <Dropdown
              options={["식품", "음료", "생활용품", "패션", "가전"]} // 예시 대분류 옵션
              value={mainCategory || "대분류"} // 초기값 또는 선택된 값 표시
              onChange={handleMainCategoryChange}
            />
          </div>
          <div>
            <label htmlFor="subCategory" className="sr-only">
              소분류
            </label>
            <Dropdown
              options={[
                "청량 탄산 음료",
                "과즙음료",
                "에너지음료",
                "간편식",
                "신선식",
              ]} // 예시 소분류 옵션
              value={subCategory || "소분류"} // 초기값 또는 선택된 값 표시
              onChange={handleSubCategoryChange}
            />
          </div>
        </div>

        <div className="w-full">
          <Input
            type="text"
            id="productName"
            value={productName}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setProductName(e.target.value)}
            placeholder="상품명을 입력해주세요"
            label="상품명"
            hasValue={productName.length > 0}
          />
        </div>

        <div className="w-full">
          <Input
            type="text"
            id="price"
            value={price}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPrice(e.target.value)}
            placeholder="가격을 입력해주세요"
            label="가격"
            hasValue={price.length > 0}
          />
        </div>

        <div className="w-full">
          <Input
            type="text"
            id="productLink"
            value={productLink}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setProductLink(e.target.value)}
            placeholder="제품 링크를 입력해주세요"
            label="제품 링크"
            hasValue={productLink.length > 0}
          />
        </div>

        <div className="flex justify-between w-full">
          <button
            type="button"
            onClick={onCancel || (() => console.log("취소"))} // onCancel 프롭 사용
            className="w-[216px] h-[64px] border border-primary-300 rounded-[2px] py-[12px] px-[16px] text-sm font-medium text-primary-700 bg-white hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            취소
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="w-[216px] h-[64px] rounded-[2px] py-[12px] px-[16px] text-sm font-medium text-white bg-primary-800 hover:bg-primary-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-900"
          >
            등록하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductRegistrationForm;