export type TProduct = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  cumulativeSales: number;
  category: {
    id: number;
    name: string;
    parent?: {
      id: number;
      name: string;
    };
  };
  creatorId: string;

  isFavorite: boolean;
};
