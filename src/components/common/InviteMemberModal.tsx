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
      alert(data.message || "권한이 성공적으로 변경되었습니다.");
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
      {/* Desktop Layout */}
      <div className="hidden sm:flex items-center justify-center min-h-screen">
        <div className="w-[600px] px-14 py-10 bg-white rounded-sm shadow-[0px_0px_40px_0px_rgba(0,0,0,0.1)] inline-flex flex-col justify-start items-center gap-8 relative overflow-visible">
          <div className="flex flex-col justify-start items-start gap-2.5">
            <div className="justify-center text-black-400 text-lg font-bold ">
              {mode === "edit" ? "권한 수정" : "회원 초대"}
            </div>
          </div>
          <div className="self-stretch flex flex-col justify-start items-start gap-9">
            <div className="self-stretch flex flex-col justify-start items-start gap-7">
              <div className="self-stretch flex flex-col justify-start items-start gap-5">
                <div className="self-stretch flex flex-col justify-start items-start gap-5">
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
              </div>
              <div className="self-stretch flex flex-col justify-center items-start gap-3">
                <div className="justify-center text-primary-950 text-base font-bold ">권한</div>
                <div className="relative">
                  <div
                    data-active={isDropdownOpen ? "on" : "off"}
                    className="w-[480px] h-11 px-4 py-2.5 bg-white outline-1 outline-offset-[-1px] outline-primary-100 inline-flex justify-between items-center cursor-pointer"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    <div className="justify-start text-primary-950 text-base font-normal ">
                      {roleLabels[selectedRole]}
                    </div>
                    <div className="w-[6px] h-[6px] flex items-center justify-center">
                      <ArrowIconSvg direction={isDropdownOpen ? "up" : "down"} className="text-primary-950" />
                    </div>
                  </div>

                  {isDropdownOpen && (
                    <div className="absolute top-full left-0 w-[480px] bg-white border border-primary-100 z-50">
                      {Object.entries(roleLabels).map(([role, label]) => (
                        <div
                          key={role}
                          className="px-4 py-2.5 hover:bg-gray-50 cursor-pointer text-primary-950 text-base font-normal "
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
            <div className="self-stretch inline-flex justify-start items-center gap-5">
              <Button type="white" label="취소" className="flex-1 h-16" onClick={handleCancel} />
              <Button
                type={updateRoleMutation.isPending ? "grayDisabled" : "black"}
                label={updateRoleMutation.isPending ? "처리 중..." : mode === "edit" ? "권한 수정" : "초대하기"}
                className="flex-1 h-16"
                onClick={handleSubmit}
                disabled={updateRoleMutation.isPending}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="block md:hidden w-full h-screen relative bg-white overflow-hidden">
        <div className="w-full px-2 py-4 left-0 top-0 absolute inline-flex justify-center items-center gap-2">
          <div className="justify-center text-black-400 text-lg font-bold ">회원 초대</div>
        </div>
        <div className="w-full px-6 left-0 top-[80px] absolute inline-flex flex-col justify-start items-start gap-7">
          <div className="self-stretch flex flex-col justify-start items-start gap-5">
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
          <div className="self-stretch flex flex-col justify-center items-start gap-3">
            <div className="justify-center text-primary-950 text-base font-bold ">권한</div>
            <div className="self-stretch flex flex-col justify-start items-start">
              <div
                data-active={isDropdownOpen ? "on" : "off"}
                className="self-stretch h-11 px-4 py-2.5 bg-white outline-1 outline-offset-[-1px] outline-primary-100 inline-flex justify-between items-center cursor-pointer"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <div className="justify-start text-primary-950 text-base font-normal ">{roleLabels[selectedRole]}</div>
                <div className="w-4 h-4 flex items-center justify-center">
                  <ArrowIconSvg direction={isDropdownOpen ? "up" : "down"} />
                </div>
              </div>
              {isDropdownOpen && (
                <div
                  data-height-type="auto"
                  className="w-full bg-white border-l border-r border-b border-primary-100 flex flex-col justify-center items-start overflow-hidden"
                >
                  {Object.entries(roleLabels).map(([role, label]) => (
                    <div
                      key={role}
                      className="self-stretch h-12 pl-4 pr-5 py-2 inline-flex justify-start items-center gap-1 cursor-pointer hover:bg-gray-50"
                      onClick={() => {
                        setSelectedRole(role as TUserRole);
                        setIsDropdownOpen(false);
                      }}
                    >
                      <div className="text-center justify-center text-primary-950 text-base font-normal">{label}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="w-full p-6 left-0 bottom-0 absolute bg-white inline-flex flex-col justify-start items-start gap-2">
          <div className="self-stretch inline-flex justify-start items-center gap-4">
            <Button type="white" label="취소" className="flex-1 h-16" onClick={handleCancel} />
            <Button
              type={updateRoleMutation.isPending ? "grayDisabled" : "black"}
              label={updateRoleMutation.isPending ? "처리 중..." : mode === "edit" ? "권한 수정" : "초대하기"}
              className="flex-1 h-16 sm:hidden"
              onClick={handleSubmit}
              disabled={updateRoleMutation.isPending}
            />
          </div>
        </div>
      </div>
    </>
  );
}
