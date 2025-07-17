"use client";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { TButtonType } from "@/types/button.types";
import React, { useEffect, useState } from "react";
import IcVisibilityOn from "@/assets/icons/ic_visibility_on.svg";
import IcVisibilityOff from "@/assets/icons/ic_visibility_off.svg";

enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
  SUPER_ADMIN = "SUPER_ADMIN",
}

async function getUserInfo() {
  return {
    company: "코드잇",
    role: Role.SUPER_ADMIN,
    name: "김스낵",
    email: "codeit@demail.com",
  };
}

export default function ProfileComponent() {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showCheckPw, setShowCheckPw] = useState(false);

  const isFormValid = password.length > 0 && confirmPassword.length > 0 && password === confirmPassword;

  const buttonType: TButtonType = isFormValid ? "black" : "grayDisabled";

  useEffect(() => {
    (async () => {
      const user = await getUserInfo();
      setCompany(user.company);
      setRole(user.role as Role);
      setName(user.name);
      setEmail(user.email);
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

  return (
    <div className="w-full sm:w-[600px] sm:px-14 sm:rounded-sm sm:shadow-[0px_0px_40px_0px_rgba(0,0,0,0.10)] sm:outline-offset-[-1px]  py-10 px-6 inline-flex flex-col justify-center items-start gap-5">
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
              <div className="relative self-stretch flex flex-col gap-1">
                <label className="text-primary-600 text-xs">비밀번호</label>
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full border-b py-2 border-primary-950 text-primary-900 text-base outline-none"
                  placeholder="비밀번호를 입력해주세요"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 bottom-2.5 w-6 h-6"
                >
                  <Image
                    src={showPassword ? IcVisibilityOn : IcVisibilityOff}
                    alt="비밀번호 보기 토글"
                    width={24}
                    height={24}
                  />
                </button>
              </div>

              {/* 비밀번호 확인 */}
              <div className="relative self-stretch flex flex-col gap-1">
                <label className="text-gray-500 text-xs">비밀번호 확인</label>
                <input
                  type={showCheckPw ? "text" : "password"}
                  className="w-full border-b border-primary-950 text-primary-900 py-2 text-base outline-none"
                  placeholder="비밀번호를 한번 더 입력해주세요"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowCheckPw((prev) => !prev)}
                  className="absolute right-0 bottom-2.5 w-6 h-6"
                >
                  <Image
                    src={showCheckPw ? IcVisibilityOn : IcVisibilityOff} 
                    alt="비밀번호 보기 토글"
                    width={24}
                    height={24}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* 버튼 */}
          <Button
            type={buttonType}
            label="변경하기"
            className="self-stretch h-16 p-4"
            onClick={() => {
              if (!isFormValid) return;
              console.log("제출됨:", { company, password });
            }}
          />
        </div>
      </div>
    </div>
  );
}
