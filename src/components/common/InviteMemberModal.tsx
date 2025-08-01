import React, { useState } from "react";
import ArrowIconSvg from "@/components/svg/ArrowIconSvg";
import { TInviteMemberModalProps, TUserRole } from "@/types/inviteMemberModal.types";
import { useModal } from "@/providers/ModalProvider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserRole } from "@/lib/api/superAdmin.api";
import Button from "@/components/ui/Button";
import Input from "@/components/common/Input";

const roleLabels: Record<TUserRole, string> = {
  USER: "유저",
  ADMIN: "관리자",
};

export default function InviteMemberModal({
  onCancel,
  onSubmit,
  mode = "invite",
  defaultValues,
}: TInviteMemberModalProps) {
  const { closeModal } = useModal();
  const queryClient = useQueryClient();
  const [name, setName] = useState<string>(defaultValues?.name ?? "");
  const [email, setEmail] = useState<string>(defaultValues?.email ?? "");
  const [selectedRole, setSelectedRole] = useState<TUserRole>(defaultValues?.role ?? "USER");
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  // 권한 수정 mutation
  const updateRoleMutation = useMutation({
    mutationFn: ({ userId, role }: { userId: string; role: TUserRole }) => updateUserRole(userId, role),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["companyUsers"] });
      onSubmit?.({ name, email, role: selectedRole });
      closeModal();
    },
    onError: (error) => {
      const errorMessage = error instanceof Error ? error.message : "권한 수정 중 오류 발생";
      alert(errorMessage);
    },
  });

  const handleSubmit = async () => {
    if (mode === "edit") {
      if (!defaultValues) {
        alert("defaultValues가 없습니다.");
        return;
      }

      updateRoleMutation.mutate({
        userId: defaultValues.id,
        role: selectedRole,
      });
    } else {
      if (!name || !email) {
        alert("이름과 이메일을 모두 입력해주세요.");
        return;
      }

      onSubmit?.({ name, email, role: selectedRole });
      closeModal();
    }
  };

  const handleCancel = () => {
    onCancel?.() || closeModal();
  };

  return (
    <>
      <div className="fixed inset-0 bg-white overflow-auto shadow-[0px_0px_40px_0px_rgba(0,0,0,0.10)] sm:w-[600px] sm:h-[470px] sm:top-1/2 sm:left-1/2 sm:translate-[-50%] sm:py-[40px] sm:px-[60px]">
        <div className="flex justify-center items-center h-[54px] py-[16px] px-[8px] sm:p-0 sm:h-auto">
          <p className="flex justify-center items-center w-[375px] font-bold text-[18px]/[22px] tracking-tight text-[#1f1f1f]">
            {mode === "edit" ? "권한 수정" : "회원 초대"}
          </p>
        </div>

        <div className="flex flex-col items-center p-[24px] pt-[20px] pb-[100px] sm:p-0 sm:pt-[32px] sm:pb-0">
          <div className="flex flex-col w-full gap-[32px] mb-[20px] sm:max-w-[480px] sm:mb-0">
            <div className="flex flex-col justify-start items-start gap-5">
              <Input
                label="이름"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="이름을 입력해주세요"
                readOnly={mode === "edit"}
              />

              <Input
                label="이메일"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="이메일을 입력해주세요"
                readOnly={mode === "edit"}
              />
            </div>

            <div className="flex flex-col justify-center items-start gap-3">
              <p className="font-bold text-[16px]/[20px] tracking-tight text-primary-950">권한</p>
              <div className="relative w-full">
                <div
                  data-active={isDropdownOpen ? "on" : "off"}
                  className="w-full h-11 px-4 py-2.5 bg-white outline-1 outline-primary-100 inline-flex justify-between items-center cursor-pointer"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <div className="justify-start text-primary-950 text-base font-normal">{roleLabels[selectedRole]}</div>
                  <div className="w-[6px] h-[6px] flex items-center justify-center">
                    <ArrowIconSvg direction={isDropdownOpen ? "up" : "down"} className="text-primary-950" />
                  </div>
                </div>

                {isDropdownOpen && (
                  <div className="absolute top-full left-0 w-full bg-white border border-primary-100 z-50">
                    {Object.entries(roleLabels).map(([role, label]) => (
                      <div
                        key={role}
                        className="px-4 py-2.5 hover:bg-gray-50 cursor-pointer text-primary-950 text-base font-normal"
                        onClick={() => {
                          setSelectedRole(role as TUserRole);
                          setIsDropdownOpen(false);
                        }}
                      >
                        {label}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center w-full pt-[384px] gap-[20px] sm:pt-0 sm:max-w-[480px] sm:mt-8">
            <Button
              onClick={handleCancel}
              type="white"
              label="취소"
              className="flex justify-center items-center w-full min-w-[155px] sm:max-w-[230px] h-[64px] py-[12px] px-[16px] font-bold"
            />
            <Button
              onClick={handleSubmit}
              type={updateRoleMutation.isPending ? "grayDisabled" : "black"}
              label={updateRoleMutation.isPending ? "처리 중..." : mode === "edit" ? "권한 수정" : "초대하기"}
              className="flex justify-center items-center w-full  min-w-[155px] sm:max-w-[230px] h-[64px] py-[12px] px-[16px] font-bold"
              disabled={updateRoleMutation.isPending}
            />
          </div>
        </div>
      </div>
    </>
  );
}
