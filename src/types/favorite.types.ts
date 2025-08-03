export type TGetFavoriteProductResponse = {
  favorites: {
    id: number;
    product: {
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
      deletedAt: null;
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
  }[];
  meta: {
    totalCount: number;
    itemsPerPage: number;
    totalPages: number;
    nextCursor: number;
  };
};

export type TAddFavoriteProductResponse = {
  id: number;
  userId: string;
  productId: number;
};

export type TMyFavoritesParams = {
  cursor?: string;
  limit: string;
};
