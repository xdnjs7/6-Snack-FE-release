export type TGetFavoriteProductResponse = {
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
}[];

export type TAddFavoriteProductResponse = {
  id: number;
  userId: string;
  productId: number;
};
