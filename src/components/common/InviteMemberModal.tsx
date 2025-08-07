import React, { useState, useRef, useEffect } from "react";
import ArrowIconSvg from "@/components/svg/ArrowIconSvg";
import { TInviteMemberModalProps, TUserRole } from "@/types/inviteMemberModal.types";
import { useModal } from "@/providers/ModalProvider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserRole } from "@/lib/api/superAdmin.api";
import Button from "@/components/ui/Button";
import Input from "@/components/common/Input";
import Toast from "@/components/common/Toast";
import { TToastVariant } from "@/types/toast.types";
import { emailSchema } from "@/lib/schemas/email.schema";

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
  const [emailError, setEmailError] = useState<string>("");
  const [nameError, setNameError] = useState<string>("");

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

  // 권한 수정 mutation
  const updateRoleMutation = useMutation({
    mutationFn: ({ userId, role }: { userId: string; role: TUserRole }) => updateUserRole(userId, role),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["companyUsers"] });
      onSubmit?.({ name, email, role: selectedRole });
      closeModal();
    },
    onError: (error) => {
      const errorMessage = error instanceof Error ? error.message : "권한 수정 중 오류 발생";
      showToast(errorMessage, "error");
    },
  });

  const handleSubmit = async () => {
    if (mode === "edit") {
      if (!defaultValues) {
        showToast("defaultValues가 없습니다.", "error");
        return;
      }

      updateRoleMutation.mutate({
        userId: defaultValues.id,
        role: selectedRole,
      });
    } else {
      if (!name || !email) {
        showToast("이름과 이메일을 모두 입력해주세요.", "error");
        return;
      }

      // 이메일 유효성 검사
      const emailValidation = emailSchema.safeParse(email);
      if (!emailValidation.success) {
        setEmailError("유효하지 않은 이메일입니다.");
        showToast("유효하지 않은 이메일입니다.", "error");
        return;
      }
      setEmailError("");

      onSubmit?.({ name, email, role: selectedRole });
      closeModal();
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      closeModal();
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-white overflow-auto shadow-[0px_0px_40px_0px_rgba(0,0,0,0.10)] sm:w-[600px] sm:h-[490px] sm:top-1/2 sm:left-1/2 sm:translate-[-50%] sm:py-[40px] sm:px-[60px]">
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
                error={nameError}
              />

              <Input
                label="이메일"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  // 실시간 이메일 유효성 검사
                  if (e.target.value) {
                    const emailValidation = emailSchema.safeParse(e.target.value);
                    if (!emailValidation.success) {
                      setEmailError("유효하지 않은 이메일입니다.");
                    } else {
                      setEmailError("");
                    }
                  } else {
                    setEmailError("");
                  }
                }}
                placeholder="이메일을 입력해주세요"
                readOnly={mode === "edit"}
                error={emailError}
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
                  <div className="absolute top-full left-0 w-full bg-white border border-primary-100 z-10">
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

      {toastVisible && <Toast text={toastMessage} variant={toastVariant} isVisible={toastVisible} />}
    </>
  );
}
