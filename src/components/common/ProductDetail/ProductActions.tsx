import React from "react";
import QuantityDropdown from "../QuantityDropdown";
import MenuDropdown from "../MenuDropdown";

type ProductActionsProps = {
  selectedQuantity: number;
  onQuantityChange: (quantity: number) => void;
};

export default function ProductActions({ selectedQuantity, onQuantityChange }: ProductActionsProps) {
  return (
    <div className="flex items-start gap-3.5 sm:gap-5">
      <QuantityDropdown selectedQuantity={selectedQuantity} onQuantityChange={onQuantityChange} />
      <MenuDropdown
        menuType="product"
        onEdit={() => console.log("상품 수정")}
        onDelete={() => console.log("상품 삭제")}
      />
    </div>
  );
}
