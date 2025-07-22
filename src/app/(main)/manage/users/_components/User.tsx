"use client";
import React, { useEffect, useMemo, useState, Suspense } from "react";
import InviteMemberModal from "@/components/common/InviteMemberModal";
import MemberList from "@/components/common/MemberList";
import Pagination from "@/components/common/Pagination";
import Button from "@/components/ui/Button";
import SearchBar from "@/components/ui/SearchBar";
import { useModal } from "@/providers/ModalProvider";
import { TMemberItem } from "@/types/meberList.types";
import { fetchAllCompanyUsers } from "@/types/companyUser.api";
import { useSearchParams } from "next/navigation";

export default function User() {
  const [currentPaginationPage, setCurrentPaginationPage] = useState(1);
  const { openModal, closeModal } = useModal();
  const [members, setMembers] = useState<TMemberItem[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const name = searchParams.get("name") ?? "";
  const MEMVERS_PAGE = 5;
  const totalPages = Math.ceil(members.length / MEMVERS_PAGE);

  const paginateMembers = useMemo(() => {
    const start = (currentPaginationPage - 1) * MEMVERS_PAGE;
    return members.slice(start, start + MEMVERS_PAGE);
  }, [members, currentPaginationPage]);

  const handleDeleteUser = (id: string) => {
    setMembers((prev) => prev.filter((member) => member.id !== id));
  };

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const users = await fetchAllCompanyUsers(name);
        setMembers(users);
      } catch (error) {
        alert(error instanceof Error ? error.message : "회원 목록 불러오기 실패");
      } finally {
        setLoading(false);
      }
    })();
  }, [name]);

  return (
    <div>
      <div className="flex justify-between items-center sm:mt-15 md:mt-[21px]">
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

      {loading ? (
        <div className="text-center py-10">로딩 중...</div>
      ) : (
        paginateMembers.map((member) => <MemberList key={member.id} {...member} onClickDeleteUser={handleDeleteUser} />)
      )}

      <Pagination currentPage={currentPaginationPage} totalPages={totalPages} onPageChange={setCurrentPaginationPage} />

      <div className="w-full flex justify-center">
        <Button
          type="black"
          label="회원 초대하기"
          className="w-50 h-16  sm:hidden"
          onClick={() => {
            openModal(
              <InviteMemberModal
                mode="invite"
                onCancel={closeModal}
                onSubmit={(data) => {
                  console.log("회원 초대 등록:", data);
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
