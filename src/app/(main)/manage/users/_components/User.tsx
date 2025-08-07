"use client";
import InviteMemberModal from "@/components/common/InviteMemberModal";
import MemberList from "@/components/common/MemberList";
import Pagination from "@/components/common/Pagination";
import Button from "@/components/ui/Button";
import SearchBar from "@/components/ui/SearchBar";
import Toast from "@/components/common/Toast";
import { fetchAllCompanyUsers } from "@/lib/api/companyUser.api";
import { sendInvite } from "@/lib/api/invite.api";
import { deleteUserById } from "@/lib/api/superAdmin.api";
import { getUserApi } from "@/lib/api/user.api";
import { useModal } from "@/providers/ModalProvider";
import { TToastVariant } from "@/types/toast.types";
import { useSearchParams } from "next/navigation";
import { Suspense, useMemo, useState, useRef, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export default function User() {
  const [currentPaginationPage, setCurrentPaginationPage] = useState<number>(1);
  const { openModal } = useModal();
  const searchParams = useSearchParams();
  const name = searchParams.get("name") ?? "";
  const queryClient = useQueryClient();
  const MEMVERS_PAGE = 5;

  // 검색어가 변경될 때 페이지네이션을 1페이지로 리셋
  useEffect(() => {
    setCurrentPaginationPage(1);
  }, [name]);

  // Toast 상태
  const [toastVisible, setToastVisible] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [toastVariant, setToastVariant] = useState<TToastVariant>("success");
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Toast 표시 함수
  const showToast = (message: string, variant: TToastVariant) => {
    // 기존 타이머가 있다면 클리어
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    setToastMessage(message);
    setToastVariant(variant);
    setToastVisible(true);
    timerRef.current = setTimeout(() => setToastVisible(false), 3000);
  };

  // 컴포넌트 언마운트 시 타이머 정리
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  // 회원 목록 조회
  const {
    data: membersData,
    isLoading: isLoadingMembers,
    error: membersError,
  } = useQuery({
    queryKey: ["companyUsers", name],
    queryFn: () => fetchAllCompanyUsers({ name, limit: 50 }),
  });

  const members = useMemo(() => membersData?.users ?? [], [membersData?.users]);
  const totalPages = Math.ceil(members.length / MEMVERS_PAGE);

  useEffect(() => {
    if (totalPages === 0 || currentPaginationPage > totalPages) {
      setCurrentPaginationPage(1);
    }
  }, [totalPages, currentPaginationPage]);

  // 회원 삭제 mutation
  const deleteUserMutation = useMutation({
    mutationFn: deleteUserById,
    onSuccess: (data) => {
      showToast(data.message, "success");
      queryClient.invalidateQueries({ queryKey: ["companyUsers"] });
    },
    onError: (error) => {
      showToast("유저 삭제에 실패했습니다.", "error");
      console.error(error);
    },
  });

  // 회원 초대 mutation
  const inviteUserMutation = useMutation({
    mutationFn: async (data: { name: string; email: string; role: "USER" | "ADMIN" }) => {
      const currentUser = await getUserApi();

      const inviteData = {
        email: data.email,
        name: data.name,
        role: data.role,
        companyId: Number(currentUser.company?.id) || 0,
        invitedById: currentUser.id,
        expiresInDays: 7,
      };

      return sendInvite(inviteData);
    },
    onSuccess: (result) => {
      if (result.emailSent) {
        showToast("초대 이메일이 성공적으로 발송되었습니다.", "success");
      } else {
        showToast("초대 링크는 생성되었지만 이메일 발송에 실패했습니다.", "error");
      }
      // 회원 목록 캐시 무효화하여 다시 조회
      queryClient.invalidateQueries({ queryKey: ["companyUsers"] });
    },
    onError: (error) => {
      showToast(error instanceof Error ? error.message : "초대 발송에 실패했습니다.", "error");
      console.error(error);
    },
  });

  const paginateMembers = useMemo(() => {
    const start = (currentPaginationPage - 1) * MEMVERS_PAGE;
    return members.slice(start, start + MEMVERS_PAGE);
  }, [members, currentPaginationPage]);

  const handleDeleteUser = (userId: string) => {
    deleteUserMutation.mutate(userId);
  };

  const handleInviteUser = (data: { name: string; email: string; role: "USER" | "ADMIN" }) => {
    inviteUserMutation.mutate(data);
  };

  // 에러 처리
  if (membersError) {
    showToast(membersError instanceof Error ? membersError.message : "회원 목록 불러오기 실패", "error");
  }

  return (
    <main aria-label="회원 관리 페이지">
      <header className="flex justify-between items-center sm:mt-15 md:mt-[21px]">
        <h1 className="mt-[20px] pb-3 self-stretch text-lg font-bold sm:mt-0 sm:text-2xl">회원 관리</h1>
        <Button
          type="black"
          label="회원 초대하기"
          className="w-50 h-16 hidden sm:block rounded-[2px]"
          onClick={() => {
            openModal(<InviteMemberModal onSubmit={handleInviteUser} />);
          }}
          aria-label="새 회원 초대하기"
        />
      </header>

      <Suspense>
        <SearchBar />
      </Suspense>

      <section aria-label="회원 목록" className="mt-10">
        {/* PC 테이블 헤더 */}
        <div
          className="w-full mt-10 self-stretch p-5 border-t border-b border-neutral-200 hidden sm:flex justify-start items-center gap-8"
          role="table"
          aria-label="회원 목록 테이블 헤더"
        >
          <div className="px-14 flex justify-start items-center mr-2" role="columnheader" aria-label="이름 컬럼">
            <div className="justify-center text-primary-500 text-base font-bold">이름</div>
          </div>
          <div
            className="flex-1 justify-center text-primary-500 text-base font-bold"
            role="columnheader"
            aria-label="메일 컬럼"
          >
            메일
          </div>
          <div
            className="w-20 text-center justify-center text-primary-500 text-base font-bold"
            role="columnheader"
            aria-label="권한 컬럼"
          >
            권한
          </div>
          <div
            className="w-48 text-center justify-center text-primary-500 text-base font-bold"
            role="columnheader"
            aria-label="비고 컬럼"
          >
            비고
          </div>
        </div>

        {/* 회원 목록 */}
        <div role="list" aria-label="회원 목록">
          {isLoadingMembers || deleteUserMutation.isPending || inviteUserMutation.isPending ? (
            <div className="text-center py-10" role="status" aria-live="polite" aria-label="회원 목록 로딩 중">
              로딩 중...
            </div>
          ) : (
            paginateMembers.map((member) => (
              <div key={member.id} role="listitem">
                <MemberList
                  {...member}
                  onClickDeleteUser={handleDeleteUser}
                  onRoleUpdate={() => showToast("권한이 성공적으로 변경되었습니다.", "success")}
                />
              </div>
            ))
          )}
        </div>
      </section>

      {/* 페이지네이션 */}
      <nav aria-label="회원 목록 페이지네이션" className="mt-6">
        <Pagination
          currentPage={currentPaginationPage}
          totalPages={totalPages}
          onPageChange={setCurrentPaginationPage}
        />
      </nav>

      {/* 모바일 초대 버튼 */}
      <div className="w-full flex justify-center">
        <Button
          type="black"
          label="회원 초대하기"
          className="w-50 h-16 sm:hidden rounded-[2px]"
          onClick={() => {
            openModal(<InviteMemberModal mode="invite" onSubmit={handleInviteUser} />);
          }}
          aria-label="새 회원 초대하기 (모바일)"
        />
      </div>

      <Toast text={toastMessage} variant={toastVariant} isVisible={toastVisible} />
    </main>
  );
}
