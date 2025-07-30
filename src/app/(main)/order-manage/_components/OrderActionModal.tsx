import React from "react";
import { useModal } from "@/providers/ModalProvider";
import ExclamationMarkIconSvg from "@/components/svg/ExclamationMarkIconSvg";
import Button from "@/components/ui/Button";

type TOrderActionModalProps = {
  modalTitle: string;
  modalDescription: string;
  leftButtonText: string;
  rightButtonText: string;
  onLeftClick: () => void;
  onRightClick?: () => void;
};

export default function OrderActionModal({
  modalTitle,
  modalDescription,
  leftButtonText,
  rightButtonText,
  onLeftClick,
  onRightClick,
}: TOrderActionModalProps) {
  const { closeModal } = useModal();

  const handleLeftClick = () => {
    onLeftClick();
    closeModal();
  };

  const handleRightClick = () => {
    if (onRightClick) {
      onRightClick();
    }
    closeModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="flex flex-col bg-white rounded-md w-[327px] sm:w-[512px] gap-9 px-[30px] pt-[40px] pb-[30px] shadow-[0px_0px_30px_0px_rgba(0,0,0,0.14)]">
        <div className="flex flex-col sm:gap-2">
          <h2 className="text-lg/[22px] font-bold text-black text-center mb-2">{modalTitle}</h2>
          <div className="flex items-center justify-center">
            <ExclamationMarkIconSvg className="text-red hidden sm:block" />
          </div>
          <p
            className="text-primary-900 text-center text-base tracking-tight"
            dangerouslySetInnerHTML={{ __html: modalDescription }}
          />
        </div>
        <div className="w-full flex justify-center items-center gap-2.5 sm:gap-5">
          <Button
            type="white"
            label={leftButtonText}
            onClick={handleLeftClick}
            className="h-[50px] sm:h-[64px] w-full"
          />
          <Button
            type="black"
            label={rightButtonText}
            onClick={handleRightClick}
            className="h-[50px] sm:h-[64px] w-full"
          />
        </div>
      </div>
    </div>
  );
}
