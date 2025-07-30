"use client";

import { useEffect, useState } from "react";
import { getUserInfo, updatePassword, updateSuper, updateCompany, UserInfo } from "@/lib/api/profile.api";
import { Role } from "@/types/InviteMemberModal.types";
import ProfileField from "./ProfileField";
import ProfilePasswordSection from "./ProfilePasswordSection";
import ProfileSubmitButton from "./ProfileSubmitButton";
import Toast from "@/components/common/Toast";

export default function ProfileForm() {
  const [userId, setUserId] = useState("");
  const [company, setCompany] = useState("");
  const [originalCompany, setOriginalCompany] = useState("");
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Toast 상태
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState<"success" | "error">("success");

  // 회사명 유효성 검사
  const trimmedCompany = company.trim();
  const isCompanyChanged = role === Role.SUPER_ADMIN && trimmedCompany !== originalCompany;
  const isCompanyValid = isCompanyChanged ? trimmedCompany !== "" : true;

  // 비밀번호 유효성 검사
  const isPasswordValid =
    password.length >= 8 &&
    password === confirmPassword &&
    password.length > 0 &&
    /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/.test(password);

  // 폼 유효성 검사: 기업명이 변경된 경우 공백이 아니어야 하고, 비밀번호가 입력된 경우 유효해야 함
  const isFormValid = isCompanyValid && (isPasswordValid || (!isPasswordValid && isCompanyChanged));

  // 비밀번호 에러 메시지
  const getPasswordError = () => {
    if (password.length === 0) return "";
    if (password.length < 8) return "비밀번호는 8자 이상이어야 합니다.";
    if (!/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/.test(password)) {
      return "비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다.";
    }
    return "";
  };

  const getConfirmPasswordError = () => {
    if (confirmPassword.length === 0) return "";
    if (confirmPassword.length < 8) return "비밀번호는 8자 이상이어야 합니다.";
    if (!/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/.test(confirmPassword)) {
      return "비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다.";
    }
    if (password !== confirmPassword) return "비밀번호가 일치하지 않습니다.";
    return "";
  };

  const passwordError = getPasswordError();
  const confirmPasswordError = getConfirmPasswordError();

  // Toast 표시 함수
  const showToast = (message: string, variant: "success" | "error") => {
    setToastMessage(message);
    setToastVariant(variant);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000);
  };

  // 유저 정보 로드
  useEffect(() => {
    (async () => {
      try {
        const user: UserInfo = await getUserInfo();
        setUserId(user.id);
        setCompany(user.company.name);
        setOriginalCompany(user.company.name);
        setRole(user.role);
        setName(user.name);
        setEmail(user.email);
      } catch (err) {
        console.error("유저 정보 조회 실패:", err);
        showToast("유저 정보 조회에 실패했습니다.", "error");
      }
    })();
  }, []);

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
  const handleSubmit = async () => {
    if (!isFormValid) {
      // 기업명이 변경되었지만 공백인 경우
      if (role === Role.SUPER_ADMIN && isCompanyChanged && trimmedCompany === "") {
        showToast("회사명을 입력해주세요.", "error");
        return;
      }

      // 비밀번호가 입력되었지만 유효하지 않은 경우
      if (password.length > 0) {
        if (passwordError) {
          showToast(passwordError, "error");
          return;
        }
        if (confirmPasswordError) {
          showToast(confirmPasswordError, "error");
          return;
        }
      }

      showToast("입력 정보를 확인해주세요.", "error");
      return;
    }

    try {
      setIsSubmitting(true);
      if (role === Role.SUPER_ADMIN) {
        if (isCompanyChanged && !isPasswordValid) {
          await updateCompany(userId, trimmedCompany);
          setOriginalCompany(trimmedCompany);
          showToast("회사명이 변경되었습니다.", "success");
        } else if (isPasswordValid) {
          await updateSuper(userId, trimmedCompany, password);
          setOriginalCompany(trimmedCompany);
          showToast("정보가 변경되었습니다.", "success");
        }
      } else {
        await updatePassword(userId, password);
        showToast("비밀번호가 변경되었습니다.", "success");
      }
      setPassword("");
      setConfirmPassword("");
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "업데이트 실패";
      showToast(errorMessage, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Toast
        text={toastMessage}
        variant={toastVariant}
        isVisible={toastVisible}
        onClose={() => setToastVisible(false)}
      />

      <div className="w-full sm:w-[600px] sm:px-14 sm:rounded-sm sm:shadow-[0px_0px_40px_0px_rgba(0,0,0,0.10)] sm:outline-offset-[-1px] py-10 inline-flex flex-col justify-center items-start gap-5">
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
                  value={company}
                  onChange={setCompany}
                  readOnly={role !== Role.SUPER_ADMIN}
                  isEditable={role === Role.SUPER_ADMIN}
                  role={role}
                  type="input"
                />

                {/* 권한 */}
                <ProfileField label="권한" value={getRoleLabel(role as Role)} type="display" />

                {/* 이름 */}
                <ProfileField label="이름" value={name} type="display" />

                {/* 이메일 */}
                <ProfileField label="이메일" value={email} type="display" />

                {/* 비밀번호 섹션 */}
                <ProfilePasswordSection
                  password={password}
                  confirmPassword={confirmPassword}
                  onPasswordChange={setPassword}
                  onConfirmPasswordChange={setConfirmPassword}
                  passwordError={passwordError}
                  confirmPasswordError={confirmPasswordError}
                />
              </div>
            </div>

            {/* 제출 버튼 */}
            <ProfileSubmitButton isFormValid={isFormValid} isSubmitting={isSubmitting} onSubmit={handleSubmit} />
          </div>
        </div>
      </div>
    </>
  );
}
