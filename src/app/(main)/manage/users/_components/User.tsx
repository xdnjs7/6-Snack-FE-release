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
      <div className=" flex  justify-between items-center sm:mt-15 md:mt-[21px]">
        <div className="mt-[20px] mb-3 self-stretch justify-center text-lg font-bold  md:text-2xl">회원 관리</div>
        <Button
          type="black"
          label="회원 초대하기"
          className="w-50 h-16 hidden sm:block"
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
      <Suspense>
        <SearchBar />
      </Suspense>
      <div className="w-full mt-10 self-stretch p-5 border-t border-b border-neutral-200 hidden sm:flex justify-start items-center gap-8">
        <div className="px-14 flex justify-start items-center mr-2">
          <div className="justify-center text-zinc-500 text-base font-bold">이름</div>
        </div>
        <div className="flex-1 justify-center text-zinc-500 text-base font-bold">메일</div>
        <div className="w-20 text-center justify-center text-zinc-500 text-base font-bold">권한</div>
        <div className="w-48 text-center justify-center text-zinc-500 text-base font-bold">비고</div>
      </div>

      {paginateMembers.map((member) => (
        <MemberList key={member.id} {...member} onClickDeleteUser={handleDeleteUser} />
      ))}
      <Pagination currentPage={currentPaginationPage} totalPages={totalPages} onPageChange={setCurrentPaginationPage} />
      <div className="w-full flex justify-center">
        <Button
          type="black"
          label="회원 초대"
          className="mt-6 w-full h-16 justify-center items-center sm:hidden"
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
