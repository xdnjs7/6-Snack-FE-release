"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePassword, updateSuper, updateCompany, Role } from "@/lib/api/profile.api";
import { profileSchema, TProfileFormData } from "@/lib/schemas/profile.schema";
import { useAuth } from "@/providers/AuthProvider";
import ProfileField from "./ProfileField";
import ProfilePasswordSection from "./ProfilePasswordSection";
import ProfileSubmitButton from "./ProfileSubmitButton";

export default function ProfileForm() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // 리액트 훅 폼 설정
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
    reset,
  } = useForm<TProfileFormData>({
    resolver: zodResolver(profileSchema),
    mode: "onChange",
  });

  // 폼 값들 감시
  const company = watch("company");
  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  // 변경사항 확인
  const hasCompanyChanged = Boolean(user?.role === Role.SUPER_ADMIN && company?.trim() !== (user?.company?.name || ""));
  const hasPasswordChanged = Boolean(password && password.length > 0);

  const hasAnyChanges = hasCompanyChanged || hasPasswordChanged;

  // 비밀번호 유효성 검사 - 별도로 처리
  const isPasswordValid = !hasPasswordChanged || (
    password && 
    password.length >= 8 && 
    /[a-zA-Z]/.test(password) && 
    /[0-9]/.test(password) && 
    /[^a-zA-Z0-9]/.test(password) &&
    password === confirmPassword
  );

  // 폼 유효성 검사 - 조건부로 처리
  const isFormValid = Boolean(hasAnyChanges && (
    hasCompanyChanged ? isValid : isPasswordValid
  ));

  // 디버깅용 로그 추가
  console.log({
    hasCompanyChanged,
    hasPasswordChanged,
    hasAnyChanges,
    isPasswordValid,
    isValid,
    password,
    confirmPassword,
    errors: Object.keys(errors),
  });

  // Profile 업데이트 Mutation
  const updateProfile = useMutation({
    mutationFn: async (data: TProfileFormData) => {
      if (user?.role === Role.SUPER_ADMIN) {
        if (hasCompanyChanged && !data.password) {
          return await updateCompany(user.id, data.company!.trim());
        } else if (data.password) {
          return await updateSuper(user.id, data.company?.trim() || user.company?.name || "", data.password);
        }
      } else {
        if (data.password) {
          return await updatePassword(user!.id, data.password);
        }
      }
    },
    onSuccess: () => {
      // 성공 시 폼 초기화
      setValue("password", "");
      setValue("confirmPassword", "");

      // 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error: Error) => {
      console.error("업데이트 실패:", error.message);
    },
  });

  // 유저 정보 로드 및 폼 초기화
  useEffect(() => {
    if (user) {
      reset({
        company: user.company?.name || "",
        password: "",
        confirmPassword: "",
      });
    }
  }, [user, reset]);

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
      console.log("폼이 유효하지 않습니다:", errors);
      return;
    }

    updateProfile.mutate(data);
  };

  return (
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
                isEditable={user?.role === Role.SUPER_ADMIN}
                role={user?.role}
                type="input"
                error={errors.company?.message}
              />

              {/* 권한 */}
              <ProfileField label="권한" value={getRoleLabel(user?.role as Role)} type="display" />

              {/* 이름 */}
              <ProfileField label="이름" value={user?.name || ""} type="display" />

              {/* 이메일 */}
              <ProfileField label="이메일" value={user?.email || ""} type="display" />

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
  );
}
