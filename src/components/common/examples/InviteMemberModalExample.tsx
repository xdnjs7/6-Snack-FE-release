import React from "react";
import { useModal } from "@/providers/ModalProvider";
import InviteMemberModal from "../InviteMemberModal";

export default function InviteMemberModalExample() {
  const { openModal, closeModal } = useModal();

  const handleOpenModal = () => {
    openModal(
      <InviteMemberModal
        onCancel={closeModal}
        onSubmit={() => {
          console.log("회원 초대 등록");
          closeModal();
        }}
      />
    );
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">회원 초대 모달 예시</h1>
      <button
        onClick={handleOpenModal}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        회원 초대 모달 열기
      </button>
    </div>
  );
} 