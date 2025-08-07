export type TCategory = {
  id: number;
  name: string;
  parentId: number;
};

export type TCreator = {
  id: string;
  email: string;
  name: string;
  password: string;
  companyId: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  hashedRefreshToken: string;
  role: string;
};

export type TProduct = {
  id: number;
  categoryId: number;
  creatorId: string;
  name: string;
  price: number;
  imageUrl: string;
  linkUrl: string;
  cumulativeSales: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  category: TCategory;
  creator: TCreator;
};

export type TProductGrid = {
  id: number;
  categoryId: number;
  creatorId: string;
  name: string;
  price: number;
  imageUrl: string;
  linkUrl: string;
  cumulativeSales: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  category: TCategory;
  creator: Pick<TCreator, "id" | "email" | "name" | "role">;
};

export type TProductMeta = {
  totalCount: number;
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
};

export type TMyProductsResponse = {
  items: TProduct[];
  meta: TProductMeta;
};

export type TMyProductsParams = {
  page: string;
  limit: string;
  orderBy: "latest" | "priceLow" | "priceHigh";
};

// 스키마 변경시 타입도 변경예정, cumulativeQuantity field 추가예정
// export type TProduct = {
//   id: number;
//   categoryId: number;
//   creatorId: string;
//   name: string;
//   price: number;
//   imageUrl: string;
//   linkUrl: string;
//   createdAt: string;
//   updatedAt: string;
//   deletedAt: string | null;
//   category: {
//     id: number;
//     name: string;
//     parentId: number;
//   };
//   creator: {
//     id: string;
//     email: string;
//     name: string;
//     role: string;
//   };
// };
