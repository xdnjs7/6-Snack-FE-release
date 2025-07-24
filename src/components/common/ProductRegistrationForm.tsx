import React, { useState, FC, FormEvent, ChangeEvent } from "react";
import Input from "./Input";

type TProductRegistrationFormProps = Record<string, never>;

const ProductRegistrationForm: FC<TProductRegistrationFormProps> = () => {
  const [productName, setProductName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [productLink, setProductLink] = useState<string>("");
  const [mainCategory, setMainCategory] = useState<string>("");
  const [subCategory, setSubCategory] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleImageRemove = () => {
    setImageFile(null);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log({
      productName,
      price,
      productLink,
      mainCategory,
      subCategory,
      imageFile,
    });
    alert("상품이 등록되었습니다!");
    setProductName("");
    setPrice("");
    setProductLink("");
    setMainCategory("");
    setSubCategory("");
    setImageFile(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-primary-50">
      <div className="w-[512px] h-[696px] rounded-[6px] p-[30px] bg-white shadow-xl flex flex-col gap-[36px] items-center">
        <h2 className="font-suit font-bold text-[18px] leading-[100%] tracking-[-0.45px] text-primary-950 text-center">
          상품 등록
        </h2>

        <div className="flex justify-center items-center relative">
          {!imageFile ? (
            <label
              htmlFor="imageUpload"
              className="w-[140px] h-[140px] flex flex-col items-center justify-center border border-primary-300 rounded-[2px] bg-primary-50 text-primary-400 cursor-pointer hover:bg-primary-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 mb-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="text-xs">이미지 등록</span>
              <input id="imageUpload" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            </label>
          ) : (
            <>
              <img
                src={URL.createObjectURL(imageFile)}
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
            <div className="relative">
              <select
                id="mainCategory"
                value={mainCategory}
                onChange={(e) => setMainCategory(e.target.value)}
                className="block w-full px-4 py-2 border border-primary-300 rounded-md shadow-sm focus:outline-none focus:ring-secondary-500 focus:border-secondary-500 sm:text-sm appearance-none pr-8"
              >
                <option value="">대분류</option>
                <option value="음료">음료</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-primary-700">
                <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="subCategory" className="sr-only">
              소분류
            </label>
            <div className="relative">
              <select
                id="subCategory"
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
                className="block w-full px-4 py-2 border border-primary-300 rounded-md shadow-sm focus:outline-none focus:ring-secondary-500 focus:border-secondary-500 sm:text-sm appearance-none pr-8"
              >
                <option value="">소분류</option>
                <option value="청량 · 탄산 음료">청량 · 탄산 음료</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-primary-700">
                <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full">
          <Input
            type="text"
            id="productName"
            value={productName}
            onChange={setProductName}
            placeholder="상품명을 입력해주세요"
          />
        </div>

        <div className="w-full">
          <Input type="text" id="price" value={price} onChange={setPrice} placeholder="가격을 입력해주세요" />
        </div>

        <div className="w-full">
          <Input
            type="text"
            id="productLink"
            value={productLink}
            onChange={setProductLink}
            placeholder="제품 링크를 입력해주세요"
          />
        </div>

        <div className="flex justify-between w-full">
          <button
            type="button"
            onClick={() => console.log("취소")}
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
