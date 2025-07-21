"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import SnackIconSvg from "@/components/svg/SnackIconSvg";
import { useAuth } from "@/providers/AuthProvider";
import { getInviteApi, signUpWithInviteApi, type InviteInfo } from "@/lib/api/invite.api";

export default function InviteSignUpPage() {
  const params = useParams();
  const router = useRouter();
  const inviteId = params.inviteId as string;
  const { signUp } = useAuth();

  const [inviteInfo, setInviteInfo] = useState<InviteInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    password: "",
    passwordConfirm: "",
  });

  // 초대 정보 가져오기
  useEffect(() => {
    const fetchInviteInfo = async () => {
      try {
        setIsLoading(true);
        // TODO: 실제 API 호출로 교체
        // const data = await getInviteApi(inviteId);
        // setInviteInfo(data);

        // 임시 데이터 - 테스트용 inviteId들
        const testInviteIds = ["test-123", "invite-456", "mock-789"];

        if (!testInviteIds.includes(inviteId)) {
          throw new Error("테스트용 inviteId가 아닙니다. test-123, invite-456, mock-789 중 하나를 사용하세요.");
        }

        // 다양한 상태 테스트
        let mockInviteInfo: InviteInfo;

        if (inviteId === "expired-123") {
          // 만료된 초대 테스트
          mockInviteInfo = {
            id: inviteId,
            email: "expired@example.com",
            name: "만료된 초대",
            role: "USER",
            companyId: 1,
            company: { id: 1, name: "테스트 회사" },
            expiresAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1일 전
            isUsed: false,
          };
        } else if (inviteId === "used-123") {
          // 이미 사용된 초대 테스트
          mockInviteInfo = {
            id: inviteId,
            email: "used@example.com",
            name: "사용된 초대",
            role: "USER",
            companyId: 1,
            company: { id: 1, name: "테스트 회사" },
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
            isUsed: true,
          };
        } else {
          // 정상 초대
          mockInviteInfo = {
            id: inviteId,
            email: "invited@example.com",
            name: "김철수",
            role: "USER",
            companyId: 1,
            company: {
              id: 1,
              name: "테스트 회사",
            },
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
            isUsed: false,
          };
        }

        setInviteInfo(mockInviteInfo);
      } catch (error) {
        setError(error instanceof Error ? error.message : "초대 링크가 유효하지 않습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    if (inviteId) {
      fetchInviteInfo();
    }
  }, [inviteId]);

  // 회원가입 처리
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!inviteInfo) return;

    try {
      // 비밀번호 확인
      if (formData.password !== formData.passwordConfirm) {
        setError("비밀번호가 일치하지 않습니다.");
        return;
      }

      // TODO: 실제 API 호출로 교체
      // await signUpWithInviteApi(inviteId, formData.password);

      console.log("회원가입 성공:", {
        email: inviteInfo.email,
        name: inviteInfo.name,
        role: inviteInfo.role,
        companyId: inviteInfo.companyId,
      });

      // 회원가입 성공 후 리다이렉트
      // router.push('/login');
    } catch (error) {
      setError(error instanceof Error ? error.message : "회원가입에 실패했습니다.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center px-[24px] pt-[60px] gap-[46px] sm:px-[72px] sm:pt-[119px] sm:gap-0">
        <div className="flex flex-col items-center justify-center w-full">
          <div className="px-[60px] py-[38px]">
            <SnackIconSvg className="w-[225px] h-[63px] sm:w-[344px] sm:h-[97px]" />
          </div>
          <p>초대 정보를 확인 중입니다...</p>
        </div>
      </div>
    );
  }

  if (error || !inviteInfo) {
    return (
      <div className="flex flex-col items-center justify-center px-[24px] pt-[60px] gap-[46px] sm:px-[72px] sm:pt-[119px] sm:gap-0">
        <div className="flex flex-col items-center justify-center w-full">
          <div className="px-[60px] py-[38px]">
            <SnackIconSvg className="w-[225px] h-[63px] sm:w-[344px] sm:h-[97px]" />
          </div>
          <h1 className="text-red-500 mb-4">오류가 발생했습니다</h1>
          <p className="text-gray-600">{error || "초대 정보를 찾을 수 없습니다."}</p>
        </div>
      </div>
    );
  }

  if (inviteInfo.isUsed) {
    return (
      <div className="flex flex-col items-center justify-center px-[24px] pt-[60px] gap-[46px] sm:px-[72px] sm:pt-[119px] sm:gap-0">
        <div className="flex flex-col items-center justify-center w-full">
          <div className="px-[60px] py-[38px]">
            <SnackIconSvg className="w-[225px] h-[63px] sm:w-[344px] sm:h-[97px]" />
          </div>
          <h1 className="text-red-500 mb-4">이미 사용된 초대 링크입니다</h1>
          <p className="text-gray-600">이 초대 링크는 이미 사용되었습니다.</p>
        </div>
      </div>
    );
  }

  const isExpired = new Date(inviteInfo.expiresAt) < new Date();
  if (isExpired) {
    return (
      <div className="flex flex-col items-center justify-center px-[24px] pt-[60px] gap-[46px] sm:px-[72px] sm:pt-[119px] sm:gap-0">
        <div className="flex flex-col items-center justify-center w-full">
          <div className="px-[60px] py-[38px]">
            <SnackIconSvg className="w-[225px] h-[63px] sm:w-[344px] sm:h-[97px]" />
          </div>
          <h1 className="text-red-500 mb-4">만료된 초대 링크입니다</h1>
          <p className="text-gray-600">이 초대 링크는 만료되었습니다.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center px-[24px] pt-[60px] gap-[46px] sm:px-[72px] sm:pt-[119px] sm:gap-0">
      {/* logo + intro */}
      <div className="flex flex-col items-center justify-center w-full">
        <div className="px-[60px] py-[38px]">
          <SnackIconSvg className="w-[225px] h-[63px] sm:w-[344px] sm:h-[97px]" />
        </div>
        <h1 className="text-2xl font-bold mb-2">{inviteInfo.name} 님, 만나서 반갑습니다.</h1>
        <p className="text-gray-600 mb-4">비밀번호를 입력해 회원가입을 완료해주세요.</p>
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <p className="text-sm text-gray-600">
            <strong>이메일:</strong> {inviteInfo.email}
            <br />
            <strong>회사:</strong> {inviteInfo.company.name}
            <br />
            <strong>역할:</strong> {inviteInfo.role}
          </p>
        </div>
      </div>

      {/* signup form */}
      <div className="flex flex-col w-full max-w-md">
        <form onSubmit={handleSignUp} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              비밀번호
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="passwordConfirm" className="block text-sm font-medium text-gray-700 mb-1">
              비밀번호 확인
            </label>
            <input
              type="password"
              id="passwordConfirm"
              value={formData.passwordConfirm}
              onChange={(e) => setFormData({ ...formData, passwordConfirm: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {error && <div className="text-red-500 text-sm">{error}</div>}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            회원가입 완료
          </button>
        </form>
      </div>
    </div>
  );
}
