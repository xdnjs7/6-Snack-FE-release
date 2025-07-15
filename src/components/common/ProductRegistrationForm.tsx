import React, { useState, FC, FormEvent, ChangeEvent } from "react";

// Define the type for the component's props. Since this form doesn't take props yet,
// Record<string, never> is used to explicitly indicate no expected properties.
type TProductRegistrationFormProps = Record<string, never>;

const ProductRegistrationForm: FC<TProductRegistrationFormProps> = () => {
  const [productName, setProductName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [productLink, setProductLink] = useState<string>("");
  const [mainCategory, setMainCategory] = useState<string>(""); // For "대분류"
  const [subCategory, setSubCategory] = useState<string>(""); // For "소분류"
  const [imageFile, setImageFile] = useState<File | null>(null); // For uploaded file

  // Handles image selection
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  // Handles image removal
  const handleImageRemove = () => {
    setImageFile(null);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // In a real application, you would send this data to a backend API.
    // For example, using FormData for file uploads.
    console.log({
      productName,
      price,
      productLink,
      mainCategory,
      subCategory,
      imageFile, // This would be sent in a FormData object for actual upload
    });
    alert("상품이 등록되었습니다!");
    // Optionally, reset form fields after submission
    setProductName("");
    setPrice("");
    setProductLink("");
    setMainCategory("");
    setSubCategory("");
    setImageFile(null);
  };

  return (
    // Replaced bg-gray-100 with bg-primary-50 for a lighter background from your palette
    <div className="min-h-screen bg-primary-50 flex items-center justify-center p-4">
      {/* Replaced bg-white with bg-white (explicitly defined) */}
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        {/* Replaced text-black (default) with text-primary-950 for explicit deep black */}
        <h2 className="text-xl font-bold text-center mb-6 text-primary-950">상품 등록</h2>

        {/* Product Image Upload Section */}
        <div className="mb-6 flex justify-center items-center relative">
          {!imageFile ? (
            // Placeholder for image upload
            <label
              htmlFor="imageUpload"
              // Replaced border-gray-300 with border-primary-300
              // Replaced bg-gray-50 with bg-primary-50
              // Replaced text-gray-400 with text-primary-400
              // Replaced hover:bg-gray-100 with hover:bg-primary-100
              className="w-24 h-24 flex flex-col items-center justify-center border border-primary-300 rounded-md bg-primary-50 text-primary-400 cursor-pointer hover:bg-primary-100"
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
            // Display uploaded image with remove button
            <>
              <img
                src={URL.createObjectURL(imageFile)} // Create URL for preview
                alt="Product Preview"
                // Replaced border-gray-300 with border-primary-300
                className="w-24 h-24 object-contain border border-primary-300 rounded-md"
              />
              <button
                onClick={handleImageRemove}
                // Replaced bg-gray-800 with bg-primary-800
                // Replaced text-white with text-white (explicitly defined)
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

        {/* Category Dropdowns */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Main Category (대분류) */}
          <div>
            <label htmlFor="mainCategory" className="sr-only">
              대분류
            </label>
            <div className="relative">
              <select
                id="mainCategory"
                value={mainCategory}
                onChange={(e) => setMainCategory(e.target.value)}
                // Replaced border-gray-300 with border-primary-300
                // Replaced focus:ring-blue-500 with focus:ring-secondary-500
                // Replaced focus:border-blue-500 with focus:border-secondary-500
                className="block w-full px-4 py-2 border border-primary-300 rounded-md shadow-sm focus:outline-none focus:ring-secondary-500 focus:border-secondary-500 sm:text-sm appearance-none pr-8"
              >
                <option value="">대분류</option>
                <option value="음료">음료</option>
                {/* Add more main categories as needed */}
              </select>
              {/* Replaced text-gray-700 with text-primary-700 */}
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

          {/* Sub Category (소분류) */}
          <div>
            <label htmlFor="subCategory" className="sr-only">
              소분류
            </label>
            <div className="relative">
              <select
                id="subCategory"
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
                // Replaced border-gray-300 with border-primary-300
                // Replaced focus:ring-blue-500 with focus:ring-secondary-500
                // Replaced focus:border-blue-500 with focus:border-secondary-500
                className="block w-full px-4 py-2 border border-primary-300 rounded-md shadow-sm focus:outline-none focus:ring-secondary-500 focus:border-secondary-500 sm:text-sm appearance-none pr-8"
              >
                <option value="">소분류</option>
                <option value="청량 · 탄산 음료">청량 · 탄산 음료</option>
                {/* Add more sub categories as needed, potentially based on main category selection */}
              </select>
              {/* Replaced text-gray-700 with text-primary-700 */}
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

        {/* Product Name Input */}
        <div className="mb-4">
          <label htmlFor="productName" className="block text-sm font-medium text-primary-700 sr-only">
            상품명
          </label>
          <input
            type="text"
            id="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            // Replaced border-gray-300 with border-primary-300
            // Replaced placeholder-gray-400 with placeholder-primary-400
            // Replaced focus:ring-blue-500 with focus:ring-secondary-500
            // Replaced focus:border-blue-500 with focus:border-secondary-500
            className="mt-1 block w-full px-3 py-2 border border-primary-300 rounded-md shadow-sm placeholder-primary-400 focus:outline-none focus:ring-secondary-500 focus:border-secondary-500 sm:text-sm"
            placeholder="상품명을 입력해주세요"
          />
        </div>

        {/* Price Input */}
        <div className="mb-4">
          <label htmlFor="price" className="block text-sm font-medium text-primary-700 sr-only">
            가격
          </label>
          <input
            type="text"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            // Replaced border-gray-300 with border-primary-300
            // Replaced placeholder-gray-400 with placeholder-primary-400
            // Replaced focus:ring-blue-500 with focus:ring-secondary-500
            // Replaced focus:border-blue-500 with focus:border-secondary-500
            className="mt-1 block w-full px-3 py-2 border border-primary-300 rounded-md shadow-sm placeholder-primary-400 focus:outline-none focus:ring-secondary-500 focus:border-secondary-500 sm:text-sm"
            placeholder="가격을 입력해주세요"
          />
        </div>

        {/* Product Link Input */}
        <div className="mb-6">
          <label htmlFor="productLink" className="block text-sm font-medium text-primary-700 sr-only">
            제품 링크
          </label>
          <input
            type="text"
            id="productLink"
            value={productLink}
            onChange={(e) => setProductLink(e.target.value)}
            // Replaced border-gray-300 with border-primary-300
            // Replaced placeholder-gray-400 with placeholder-primary-400
            // Replaced focus:ring-blue-500 with focus:ring-secondary-500
            // Replaced focus:border-blue-500 with focus:border-secondary-500
            className="mt-1 block w-full px-3 py-2 border border-primary-300 rounded-md shadow-sm placeholder-primary-400 focus:outline-none focus:ring-secondary-500 focus:border-secondary-500 sm:text-sm"
            placeholder="제품 링크를 입력해주세요"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between space-x-4">
          <button
            type="button"
            onClick={() => console.log("취소")} // Add actual cancel logic here (e.g., navigate back)
            // Replaced border-gray-300 with border-primary-300
            // Replaced text-gray-700 with text-primary-700
            // Replaced bg-white with bg-white (explicitly defined)
            // Replaced hover:bg-gray-50 with hover:bg-primary-50
            // Replaced focus:ring-gray-500 with focus:ring-primary-500
            className="flex-1 py-2 px-4 border border-primary-300 rounded-md shadow-sm text-sm font-medium text-primary-700 bg-white hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            취소
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            // Replaced border-transparent with border-transparent (no change)
            // Replaced text-white with text-white (explicitly defined)
            // Replaced bg-gray-800 with bg-primary-800
            // Replaced hover:bg-gray-900 with hover:bg-primary-900
            // Replaced focus:ring-gray-900 with focus:ring-primary-900
            className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-primary-800 hover:bg-primary-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-900"
          >
            등록하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductRegistrationForm;
