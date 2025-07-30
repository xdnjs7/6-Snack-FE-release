import React from "react";
import { useModal } from "@/providers/ModalProvider";

type TOrderActionModalProps = {
  modalTitle: string;
  modalDescription: string;
  confirmButtonText: string;
  cancelButtonText: string;
  onConfirm: () => void;
  onCancel?: () => void;
};

export default function OrderActionModal({
  modalTitle,
  modalDescription,
  confirmButtonText,
  cancelButtonText,
  onConfirm,
  onCancel,
}: TOrderActionModalProps) {
  const { closeModal } = useModal();

  const handleConfirm = () => {
    onConfirm();
    closeModal();
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
    closeModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center backdrop-blur-xs justify-center font-suit">
      <div className="bg-white rounded-md p-6 w-full max-w-md mx-4 sm:mx-0">
        {/* Title */}
        <h2 className="text-lg font-bold text-black text-center mb-2">{modalTitle}</h2>
        {/* Confirmation Message */}
        <p
          className="text-primary-900 text-center text-md mb-6"
          dangerouslySetInnerHTML={{ __html: modalDescription }}
        />
        {/* Action Icon */}
        <div className="flex items-center justify-center mb-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-white mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <circle cx="12" cy="12" r="12" fill="#4C8AE1" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
          <span className="text-primary-950 font-bold">구매 요청</span>
        </div>
        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
          <button
            onClick={handleCancel}
            className="w-full py-5 px-10 border border-primary-300 text-sm font-medium text-primary-700 bg-white hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-300 transition-colors duration-200"
          >
            {cancelButtonText}
          </button>
          <button
            onClick={handleConfirm}
            className="w-full py-5 px-10 border border-transparent text-sm font-medium text-white bg-primary-900 hover:bg-primary-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-900 transition-colors duration-200"
          >
            {confirmButtonText}
          </button>
        </div>
      </div>
    </div>
  );
}
