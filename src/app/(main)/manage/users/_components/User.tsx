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
import { Suspense, useMemo, useState, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export default function User() {
  const [currentPaginationPage, setCurrentPaginationPage] = useState<number>(1);
  const { openModal } = useModal();
  const searchParams = useSearchParams();
  const name = searchParams.get("name") ?? "";
  const queryClient = useQueryClient();
  const MEMVERS_PAGE = 5;

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

  // 회원 목록 조회
  const {
    data: membersData,
    isLoading: isLoadingMembers,
    error: membersError,
  } = useQuery({
    queryKey: ["companyUsers", name],
    queryFn: () => fetchAllCompanyUsers({ name, limit: 50 }),
    staleTime: 5 * 60 * 1000, // 5분
  });

  const members = membersData?.users ?? [];
  const totalPages = Math.ceil(members.length / MEMVERS_PAGE);

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
    <div>
      <div className="flex justify-between items-center sm:mt-15 md:mt-[21px]">
        <div className="mt-[20px] pb-3 self-stretch text-lg font-bold sm:mt-0 sm:text-2xl">회원 관리</div>
        <Button
          type="black"
          label="회원 초대하기"
          className="w-50 h-16 hidden sm:block rounded-[2px]"
          onClick={() => {
            openModal(<InviteMemberModal onSubmit={handleInviteUser} />);
          }}
        />
      </div>

      <Suspense>
        <SearchBar />
      </Suspense>

      <div className="w-full mt-10 self-stretch p-5 border-t border-b border-neutral-200 hidden sm:flex justify-start items-center gap-8">
        <div className="px-14 flex justify-start items-center mr-2">
          <div className="justify-center text-primary-500 text-base font-bold">이름</div>
        </div>
        <div className="flex-1 justify-center text-primary-500 text-base font-bold">메일</div>
        <div className="w-20 text-center justify-center text-primary-500 text-base font-bold">권한</div>
        <div className="w-48 text-center justify-center text-primary-500 text-base font-bold">비고</div>
      </div>

      {isLoadingMembers || deleteUserMutation.isPending || inviteUserMutation.isPending ? (
        <div className="text-center py-10">로딩 중...</div>
      ) : (
        paginateMembers.map((member) => (
          <MemberList
            key={member.id}
            {...member}
            onClickDeleteUser={handleDeleteUser}
            onRoleUpdate={(data) => showToast("권한이 성공적으로 변경되었습니다.", "success")}
          />
        ))
      )}

      <div className="mt-6">
        <Pagination
          currentPage={currentPaginationPage}
          totalPages={totalPages}
          onPageChange={setCurrentPaginationPage}
        />
      </div>

      <div className="w-full flex justify-center">
        <Button
          type="black"
          label="회원 초대하기"
          className="w-50 h-16  sm:hidden rounded-[2px]"
          onClick={() => {
            openModal(<InviteMemberModal mode="invite" onSubmit={handleInviteUser} />);
          }}
        />
      </div>

      <Toast
        text={toastMessage}
        variant={toastVariant}
        isVisible={toastVisible}
        onClose={() => setToastVisible(false)}
      />
    </div>
  );
}
