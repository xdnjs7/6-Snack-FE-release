"use client";
import InviteMemberModal from "@/components/common/InviteMemberModal";
import MemberList from "@/components/common/MemberList";
import Pagination from "@/components/common/Pagination";
import Button from "@/components/ui/Button";
import SearchBar from "@/components/ui/SearchBar";
import { useModal } from "@/providers/ModalProvider";
import { TMemberItem } from "@/types/meberList.types";
import React, { Suspense, useMemo, useState } from "react";

export default function User() {
  const [currentPaginationPage, setCurrentPaginationPage] = useState(1);
  const { openModal, closeModal } = useModal();

  const [members, setMembers] = useState<TMemberItem[]>(
    Array.from({ length: 23 }, (_, i) => ({
      id: (i + 1).toString(),
      name: `유저${i + 1}`,
      email: `user${i + 1}@example.com`,
      role: i % 2 === 0 ? "ADMIN" : "USER",
    })),
  );

  const MEMVERS_PAGE = 5;
  const totalPages = Math.ceil(members.length / MEMVERS_PAGE);

  const paginateMembers = useMemo(() => {
    const start = (currentPaginationPage - 1) * MEMVERS_PAGE;
    return members.slice(start, start + MEMVERS_PAGE);
  }, [members, currentPaginationPage]);

  const handleDeleteUser = (id: string) => {
    setMembers((prev) => prev.filter((member) => member.id !== id));
  };

  return (
    <div>
      <div className="mt-[20px] mb-3 self-stretch justify-center text-lg font-bold ">회원 관리</div>
      <Suspense>
        <SearchBar />
      </Suspense>
      {paginateMembers.map((member) => (
        <MemberList key={member.id} {...member} onClickDeleteUser={handleDeleteUser} />
      ))}
      <Pagination currentPage={currentPaginationPage} totalPages={totalPages} onPageChange={setCurrentPaginationPage} />
      <div className="w-full flex justify-center">
        <Button
          type="black"
          label="회원 초대"
          className="mt-6 w-full h-16 justify-center items-center"
          onClick={() => {
            openModal(
              <InviteMemberModal
                onCancel={closeModal}
                onSubmit={(data) => {
                  console.log("회원 초대 등록:", data);
                  console.log("이름:", data.name);
                  console.log("이메일:", data.email);
                  console.log("권한:", data.role);
                  closeModal();
                }}
              />,
            );
          }}
        />
      </div>
    </div>
  );
}
