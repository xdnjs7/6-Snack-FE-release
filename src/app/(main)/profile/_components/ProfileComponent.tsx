"use client";

import Image from "next/image";
import Button from "@/components/ui/Button";
import { TButtonType } from "@/types/button.types";
import React, { useEffect, useState } from "react";
import IcVisibilityOn from "@/assets/icons/ic_visibility_on.svg";
import IcVisibilityOff from "@/assets/icons/ic_visibility_off.svg";
import VisibilityOffIconSvg from "@/components/svg/VisibilityOffIconSvg";
import VisibilityOnIconSvg from "@/components/svg/VisibilityOnIconSvg";

enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
  SUPER_ADMIN = "SUPER_ADMIN",
}

async function getUserInfo() {
  const res = await fetch("http://localhost:8080/users/me", {
    method: "GET",
    credentials: "include",
  });
  if (!res.ok) throw new Error("유저 정보를 불러오지 못했습니다.");
  const { user } = await res.json();
  return user;
}

async function updateSuper(userId: string, company: string, password: string) {
  const res = await fetch(`http://localhost:8080/super-admin/users/${userId}/company`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      companyName: company,
      passwordData: {
        newPassword: password,
        newPasswordConfirm: password,
      },
    }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "회사 정보 업데이트 실패");
  }

  return await res.json();
}

async function updatePassword(userId: string, password: string) {
  const res = await fetch(`http://localhost:8080/users/${userId}/password`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      newPassword: password,
      newPasswordConfirm: password,
    }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "비밀번호 변경 실패");
  }
  return await res.json();
}

export default function ProfileComponent() {
  const [userId, setUserId] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showCheckPw, setShowCheckPw] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isFormValid = password.length > 0 && confirmPassword.length > 0 && password === confirmPassword;
  const buttonType: TButtonType = isFormValid ? "black" : "grayDisabled";

  useEffect(() => {
    (async () => {
      try {
        const user = await getUserInfo();
        setUserId(user.id);
        setCompany(user.company.name);
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
    if (!isFormValid) return;
    try {
      setIsSubmitting(true);
      if (role === Role.SUPER_ADMIN) {
        await updateSuper(userId, company, password);
        alert("회사 정보가 변경되었습니다.");
      } else {
        await updatePassword(userId, password);
        alert("비밀번호가 변경되었습니다.");
      }
      setPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      alert(err.message || "업데이트 실패");
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
                  {showPassword ? (
                    <VisibilityOnIconSvg className="w-6 h-6" />
                  ) : (
                    <VisibilityOffIconSvg className="w-6 h-6" />
                  )}
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
                  {showCheckPw ? (
                    <VisibilityOnIconSvg className="w-6 h-6" />
                  ) : (
                    <VisibilityOffIconSvg className="w-6 h-6" />
                  )}
                </button>
              </div>
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
