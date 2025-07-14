import { StaticImageData } from "next/image";
import React from "react";

type TCardProps = {
  name: string;
  purchaseCount?: number;
  price: string | number;
  imageUrl: string | StaticImageData;
};

export const Card: React.FC<TCardProps> = ({ name, purchaseCount, price, imageUrl }) => {
  return (
    <div className="w-40 h-64 sm:w-96 sm:h-auto flex flex-col justify-start items-start gap-3.5 sm:gap-5">
      <div className="w-full h-40 px-4 py-5 sm:h-96 sm:px-28 sm:py-20 relative bg-neutral-100 rounded-sm shadow-[4px_4px_20px_0px_rgba(250,247,243,0.25)] flex justify-center items-center gap-2.5">
        <img
          data-type="cola"
          className="w-14 h-24 sm:w-36 sm:h-60"
          src={typeof imageUrl === "string" ? imageUrl : imageUrl.src}
          alt={name}
        />
      </div>
      <div className="w-32 sm:w-auto flex-1 flex flex-col justify-start items-start gap-2">
        <div className="flex flex-col sm:flex-row justify-start sm:items-center gap-2">
          <div className="text-stone-900 text-base sm:text-lg font-normal font-suit">{name}</div>
          {purchaseCount !== undefined && (
            <div className="text-blue-500 text-xs sm:text-sm font-bold font-suit">{purchaseCount}회 구매</div>
          )}
        </div>
        <div className="text-stone-900 text-base sm:text-lg font-extrabold font-suit">
          {price.toLocaleString("ko-KR")}원
        </div>
      </div>
    </div>
  );
};

export default Card;
