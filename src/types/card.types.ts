import { StaticImageData } from "next/image";

export type CardProps = {
  name: string;
  purchaseCount?: number;
  price: string | number;
  imageUrl: string | StaticImageData;
};
