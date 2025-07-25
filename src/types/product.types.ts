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
  role: "SUPER_ADMIN" | "ADMIN" | "USER";
};

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
  category: TCategory;
  creator: TCreator;
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
