export type TMyProductsParams = {
  page: string;
  limit: string;
  orderBy: "latest" | "priceLow" | "priceHigh";
};

// 스키마 변경시 타입도 변경예정, cumulativeQuantity field 추가예정
export type TProduct = {
  id: number;
  categoryId: number;
  creatorId: string;
  name: string;
  price: number;
  imageUrl: string;
  linkUrl: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  category: {
    id: number;
    name: string;
    parentId: number;
  };
  creator: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
};
