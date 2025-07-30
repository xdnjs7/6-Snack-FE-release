"use client";

import VisibilityOffIconSvg from "@/components/svg/VisibilityOffIconSvg";
import VisibilityOnIconSvg from "@/components/svg/VisibilityOnIconSvg";
import Button from "@/components/ui/Button";
import Input from "@/components/common/Input";
import { getUserInfo, updatePassword, updateSuper, updateCompany, UserInfo } from "@/lib/api/profile.api";
import { TButtonType } from "@/types/button.types";
import { Role } from "@/types/InviteMemberModal.types";
import { useEffect, useState } from "react";

/**
 * @wooju01
 * 1. 하나의 컴포넌트 안에서 너무 많은 useState가 작성되어 있는 것 같습니다. 상태 관리에 있어서 어려움이 생기거나, 의도치 않은 리렌더링이 발생할 가능성이 높아지는 것 같아서, 컴포넌트를 분리하면 좋을 것 같습니다.
 * 2. 현재 로그인, 회원가입에서 리액트 훅 폼과 zod를 사용해서 폼 상태 관리 및 유효성 검사를 진행중이기 때문에 함께 통일성을 맞춰주시면 좋을 것 같습니다. 마이그레이션 요청드립니다(저한테 물어보셔도 돼요!)
 * 3. useEffect로 유저 정보를 가져오고 계신 것 같은데, 이미 useAuth가 있기 때문에 불러오셔서 유저 정보 가져오시면 좋을 것 같습니다.(저한테 문의하셔도 좋습니다.)
 * 4. getRoleLabel util 함수로 따로 만들어서, 사용하면 좋을 것 같습니다. 만드시게 되면 다른 분들 사용하시는 분들 물어보셔서 함께 재사용하시면 좋을 것 같습니다.
 * 5. 오류 해결
 * 6. useQuery, useMutation 사용하기
 */

export default function ProfileComponent() {
  const [userId, setUserId] = useState("");
  const [company, setCompany] = useState("");
  const [originalCompany, setOriginalCompany] = useState("");
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showCheckPw, setShowCheckPw] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isCompanyChanged = role === Role.SUPER_ADMIN && company !== originalCompany;
  const isPasswordValid = password.length >= 8 && password === confirmPassword && password.length > 0;
  const isFormValid = isCompanyChanged || isPasswordValid;
  const buttonType: TButtonType = isFormValid ? "black" : "grayDisabled";

  const passwordError = password.length > 0 && password.length < 8 ? "비밀번호는 8자 이상이어야 합니다." : "";
  const confirmPasswordError =
    confirmPassword.length > 0 && confirmPassword.length < 8
      ? "비밀번호는 8자 이상이어야 합니다."
      : password !== confirmPassword && confirmPassword.length > 0
        ? "비밀번호가 일치하지 않습니다."
        : "";

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
      }
    })();
  }, []);

  function getRoleLabel(role: Role | null) {
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
  }

  const handleSubmit = async () => {
    // isFormValid가 아니면 아무 동작도 하지 않음 (alert 제거)
    if (!isFormValid) return;
    try {
      setIsSubmitting(true);
      if (role === Role.SUPER_ADMIN) {
        if (isCompanyChanged && !isPasswordValid) {
          // 회사명만 변경
          await updateCompany(userId, company);
          alert("회사명이 변경되었습니다.");
        } else if (isPasswordValid) {
          // 비밀번호만 변경하거나 회사명과 비밀번호 모두 변경
          await updateSuper(userId, company, password);
          alert("정보가 변경되었습니다.");
        }
      } else {
        await updatePassword(userId, password);
        alert("비밀번호가 변경되었습니다.");
      }
      setPassword("");
      setConfirmPassword("");
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "업데이트 실패";
      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full sm:w-[600px] sm:px-14 sm:rounded-sm sm:shadow-[0px_0px_40px_0px_rgba(0,0,0,0.10)] sm:outline-offset-[-1px] py-10 inline-flex flex-col justify-center items-start gap-5">
      <div>
        <div className="text-center justify-center text-xl font-bold font-suit">내 프로필 변경</div>
      </div>
      <div className="self-stretch flex flex-col justify-start items-center gap-6">
        <div className="self-stretch flex flex-col justify-start items-start gap-7">
          <div className="self-stretch flex flex-col justify-start items-start gap-8">
            <div className="self-stretch flex flex-col justify-start items-start gap-5">
              {/* 기업명 */}
              <div className="self-stretch flex flex-col gap-1">
                <label className="text-primary-600 text-xs">기업명</label>
                <input
                  className={`w-full border-b py-2 text-base outline-none ${
                    role === Role.SUPER_ADMIN
                      ? "border-primary-950 text-primary-900"
                      : "border-primary-200 text-primary-300 bg-transparent"
                  }`}
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  readOnly={role !== Role.SUPER_ADMIN}
                />
              </div>

              {/* 권한 */}
              <div className="self-stretch flex flex-col gap-1">
                <label className="text-primary-600 text-xs">권한</label>
                <div className="w-full border-b border-primary-200 py-2 text-primary-300 text-base bg-transparent">
                  {getRoleLabel(role as Role)}
                </div>
              </div>

              {/* 이름 */}
              <div className="self-stretch flex flex-col gap-1">
                <label className="text-primary-600 text-xs">이름</label>
                <div className="w-full border-b border-primary-200 py-2 text-primary-300 text-base bg-transparent">
                  {name}
                </div>
              </div>

              {/* 이메일 */}
              <div className="self-stretch flex flex-col gap-1">
                <label className="text-primary-600 text-xs">이메일</label>
                <div className="w-full border-b border-primary-200 py-2 text-primary-300 text-base bg-transparent">
                  {email}
                </div>
              </div>

              {/* 비밀번호 */}
              <Input
                label="비밀번호"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                hasValue={!!password}
                isPassword
                onToggleVisibility={() => setShowPassword((prev) => !prev)}
                VisibilityOnIcon={VisibilityOnIconSvg}
                VisibilityOffIcon={VisibilityOffIconSvg}
                errorMessage={passwordError}
                id="password"
                autoComplete="new-password"
                placeholder="비밀번호를 입력하세요"
              />

              {/* 비밀번호 확인 */}
              <Input
                label="비밀번호 확인"
                type={showCheckPw ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                hasValue={!!confirmPassword}
                isPassword
                onToggleVisibility={() => setShowCheckPw((prev) => !prev)}
                VisibilityOnIcon={VisibilityOnIconSvg}
                VisibilityOffIcon={VisibilityOffIconSvg}
                errorMessage={confirmPasswordError}
                id="confirmPassword"
                autoComplete="new-password"
                placeholder="비밀번호 확인을 입력하세요"
              />
            </div>
          </div>

          {/* 버튼 */}
          <Button
            type={buttonType}
            label={isSubmitting ? "변경 중..." : "변경하기"}
            className="self-stretch h-16 p-4"
            onClick={handleSubmit}
            disabled={!isFormValid || isSubmitting}
          />
        </div>
      </div>
    </div>
  );
}
