"use client";

import Input from "@/components/common/Input";
import { UseFormRegisterReturn } from "react-hook-form";

type TProfilePasswordSectionProps = {
  passwordRegister: UseFormRegisterReturn;
  confirmPasswordRegister: UseFormRegisterReturn;
  passwordError?: string;
  confirmPasswordError?: string;
};

export default function ProfilePasswordSection({
  passwordRegister,
  confirmPasswordRegister,
  passwordError,
  confirmPasswordError,
}: TProfilePasswordSectionProps) {
  return (
    <>
      {/* 비밀번호 */}
      <Input
        label="비밀번호(선택)"
        type="password"
        showPasswordToggle={true}
        error={passwordError}
        id="password"
        autoComplete="new-password"
        placeholder="새로운 비밀번호를 입력하세요(선택)"
        {...passwordRegister}
        // onChange 제거 - register의 onChange가 처리하도록
      />

      {/* 비밀번호 확인 */}
      <Input
        label="비밀번호 확인"
        type="password"
        showPasswordToggle={true}
        error={confirmPasswordError}
        id="confirmPassword"
        autoComplete="new-password"
        placeholder="비밀번호를 한번 더 입력해주세요"
        {...confirmPasswordRegister}
        // onChange 제거 - register의 onChange가 처리하도록
      />
    </>
  );
}
