"use client";

import QuantityDropdown from "../QuantityDropdown";
import MenuDropdown from "../MenuDropdown";
import ConfirmationModal from "@/components/common/ConfirmationModal";
import { useRouter } from "next/navigation";
import { useModal } from "@/providers/ModalProvider";
import { useEffect } from "react";
import { useDeleteProduct } from "@/hooks/useDeleteProduct";
import { useFlashToast } from "@/stores/flashToast";

type TProductActionsProps = {
  selectedQuantity: number;
  onQuantityChange: (quantity: number) => void;
  canEdit: boolean;
  productId: number;
  productName: string;
  showToast: (message: string, variant?: "success" | "error") => void;
};

export default function ProductActions({
  selectedQuantity,
  onQuantityChange,
  canEdit,
  productId,
  productName,
  showToast,
}: TProductActionsProps) {
  const router = useRouter();
  const { openModal, closeModal } = useModal();

  const { mutate: deleteProduct } = useDeleteProduct();

  const setFlash = useFlashToast((s) => s.setFlash);

  const handleDelete = () => {
    deleteProduct(productId, {
      onSuccess: () => {
        setFlash("상품이 삭제되었습니다.", "success");
        closeModal();
        router.push("/products"); // 즉시 이동
      },
      onError: () => {
        showToast("상품 삭제 실패", "error"); // 현재 페이지에서 실패만 즉시 표시
      },
    });
  };

  const handleOpenConfirmModal = () => {
    openModal(
      <ConfirmationModal
        isOpen={true}
        onCancel={closeModal}
        onDelete={handleDelete}
        productName={productName}
        modalTitle="상품을 삭제하시겠어요?"
        modalDescription="삭제 후에는 복구할 수 없습니다."
        confirmButtonText="상품 삭제"
        cancelButtonText="더 생각해볼게요"
      />,
    );
  };

  useEffect(() => {
    if (selectedQuantity === 0) {
      onQuantityChange(1);
    }
  }, [selectedQuantity, onQuantityChange]);

  return (
    <div className="flex items-center">
      <span className="min-w-[32px] whitespace-nowrap px-4 text-[16px] sm:text-base">수량</span>
      <QuantityDropdown
        value={selectedQuantity === 0 ? 1 : selectedQuantity}
        onClick={onQuantityChange}
        type="product"
      />
      {canEdit && <MenuDropdown menuType="product" onDelete={handleOpenConfirmModal} />}
    </div>
  );
}
