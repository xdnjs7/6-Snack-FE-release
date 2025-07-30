"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePassword, updateSuper, updateCompany, Role } from "@/lib/api/profile.api";
import { profileSchema, TProfileFormData, validateProfileForm } from "@/lib/schemas/profile.schema";
import { useAuth } from "@/providers/AuthProvider";
import ProfileField from "./ProfileField";
import ProfilePasswordSection from "./ProfilePasswordSection";
import ProfileSubmitButton from "./ProfileSubmitButton";
import Toast from "@/components/common/Toast";

export default function ProfileForm() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [userId, setUserId] = useState("");
  const [originalCompany, setOriginalCompany] = useState("");
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Toast 상태
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState<"success" | "error">("success");

  // React Hook Form 설정
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<TProfileFormData>({
    resolver: zodResolver(profileSchema),
    mode: "onChange",
  });

  // 폼 값들 감시
  const watchedValues = watch();
  const { company, password, confirmPassword } = watchedValues;

  // 변경사항 확인
  const hasCompanyChanged = role === Role.SUPER_ADMIN && company?.trim() !== originalCompany;

  // 폼 유효성 검사 - 스키마의 validateProfileForm 함수 사용
  const isFormValid = validateProfileForm(watchedValues, originalCompany, role, errors);

  // Toast 표시 함수
  const showToast = (message: string, variant: "success" | "error") => {
    setToastMessage(message);
    setToastVariant(variant);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000);
  };

  // Profile 업데이트 Mutation
  const updateProfile = useMutation({
    mutationFn: async (data: TProfileFormData) => {
      if (role === Role.SUPER_ADMIN) {
        if (hasCompanyChanged && !data.password) {
          return await updateCompany(userId, data.company!.trim());
        } else if (data.password) {
          return await updateSuper(userId, data.company?.trim() || originalCompany, data.password);
        }
      } else {
        if (data.password) {
          return await updatePassword(userId, data.password);
        }
      }
    },
    onSuccess: (data, variables) => {
      // 성공 시 처리
      if (role === Role.SUPER_ADMIN) {
        if (hasCompanyChanged && !variables.password) {
          setOriginalCompany(variables.company!.trim());
          showToast("회사명이 변경되었습니다.", "success");
        } else if (variables.password) {
          setOriginalCompany(variables.company?.trim() || originalCompany);
          showToast("정보가 변경되었습니다.", "success");
        }
      } else {
        if (variables.password) {
          showToast("비밀번호가 변경되었습니다.", "success");
        }
      }

      // 폼 초기화
      setValue("password", "");
      setValue("confirmPassword", "");

      // 캐시 무효화 (필요시)
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error: Error) => {
      const errorMessage = error.message || "업데이트 실패";
      showToast(errorMessage, "error");
    },
  });

  // 유저 정보 로드
  useEffect(() => {
    if (user) {
      const companyName = user.company?.name || "";
      setUserId(user.id);
      setName(user.name);
      setEmail(user.email);
      setRole(user.role || "");
      setValue("company", companyName);
      setOriginalCompany(companyName);
    }
  }, [user, setValue]);

  // 권한 라벨 함수
  const getRoleLabel = (role: Role | null) => {
    switch (role) {
      case Role.USER:
        return "일반 유저";
      case Role.ADMIN:
        return "관리자";
      case Role.SUPER_ADMIN:
        return "최고 관리자";
      default:
        return "";
    }
  };

  // 제출 핸들러
  const onSubmit = async (data: TProfileFormData) => {
    if (!isFormValid) {
      // 기업명이 변경되었지만 공백인 경우
      if (role === Role.SUPER_ADMIN && hasCompanyChanged && data.company?.trim() === "") {
        showToast("회사명을 입력해주세요.", "error");
        return;
      }

      // 비밀번호가 입력되었지만 유효하지 않은 경우
      if (data.password && data.password.length > 0) {
        if (errors.password?.message) {
          showToast(errors.password.message, "error");
          return;
        }
        if (errors.confirmPassword?.message) {
          showToast(errors.confirmPassword.message, "error");
          return;
        }
      }

      showToast("입력 정보를 확인해주세요.", "error");
      return;
    }

    // Mutation 실행
    updateProfile.mutate(data);
  };

  return (
    <>
      <Toast
        text={toastMessage}
        variant={toastVariant}
        isVisible={toastVisible}
        onClose={() => setToastVisible(false)}
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full sm:w-[600px] sm:px-14 sm:rounded-sm sm:shadow-[0px_0px_40px_0px_rgba(0,0,0,0.10)] sm:outline-offset-[-1px] py-10 inline-flex flex-col justify-center items-start gap-5"
      >
        <div>
          <div className="text-center justify-center text-xl font-bold font-suit">내 프로필 변경</div>
        </div>

        <div className="self-stretch flex flex-col justify-start items-center gap-6">
          <div className="self-stretch flex flex-col justify-start items-start gap-7">
            <div className="self-stretch flex flex-col justify-start items-start gap-8">
              <div className="self-stretch flex flex-col justify-start items-start gap-5">
                {/* 기업명 */}
                <ProfileField
                  label="기업명"
                  {...register("company")}
                  isEditable={role === Role.SUPER_ADMIN}
                  role={role}
                  type="input"
                  error={errors.company?.message}
                />

                {/* 권한 */}
                <ProfileField label="권한" value={getRoleLabel(role as Role)} type="display" />

                {/* 이름 */}
                <ProfileField label="이름" value={name} type="display" />

                {/* 이메일 */}
                <ProfileField label="이메일" value={email} type="display" />

                {/* 비밀번호 섹션 */}
                <ProfilePasswordSection
                  passwordRegister={register("password")}
                  confirmPasswordRegister={register("confirmPassword")}
                  passwordError={errors.password?.message}
                  confirmPasswordError={errors.confirmPassword?.message}
                />
              </div>
            </div>

            {/* 제출 버튼 */}
            <ProfileSubmitButton
              isFormValid={isFormValid}
              isSubmitting={updateProfile.isPending}
              onSubmit={handleSubmit(onSubmit)}
            />
          </div>
        </div>
      </form>
    </>
  );
}
