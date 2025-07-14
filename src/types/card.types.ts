import { StaticImageData } from "next/image";

export type TCardProps = {
  name: string;
  purchaseCount?: number;
  price: string | number;
  imageUrl: string | StaticImageData;
};
