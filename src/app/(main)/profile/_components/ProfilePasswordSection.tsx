"use client";

import Input from "@/components/common/Input";

type TProfilePasswordSectionProps = {
  password: string;
  confirmPassword: string;
  onPasswordChange: (value: string) => void;
  onConfirmPasswordChange: (value: string) => void;
  passwordError: string;
  confirmPasswordError: string;
};

export default function ProfilePasswordSection({
  password,
  confirmPassword,
  onPasswordChange,
  onConfirmPasswordChange,
  passwordError,
  confirmPasswordError,
}: TProfilePasswordSectionProps) {
  return (
    <>
      {/* 비밀번호 */}
      <Input
        label="비밀번호(선택)"
        type="password"
        value={password}
        onChange={(e) => onPasswordChange(e.target.value)}
        showPasswordToggle={true}
        error={passwordError}
        id="password"
        autoComplete="new-password"
        placeholder="새로운 비밀번호를 입력하세요(선택)"
      />

      {/* 비밀번호 확인 */}
      <Input
        label="비밀번호 확인"
        type="password"
        value={confirmPassword}
        onChange={(e) => onConfirmPasswordChange(e.target.value)}
        showPasswordToggle={true}
        error={confirmPasswordError}
        id="confirmPassword"
        autoComplete="new-password"
        placeholder="비밀번호를 한번 더 입력해주세요"
      />
    </>
  );
}
