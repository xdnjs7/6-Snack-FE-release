"use client";
import React, { useEffect, useState } from "react";
import SnackIconSvg from "@/components/svg/SnackIconSvg";
import Link from "next/link";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { getInviteApi, TInviteInfo } from "@/lib/api/invite.api";

// 리액트 훅폼 스키마 정의
const signUpSchema = z
  .object({
    password: z.string().min(8, "비밀번호는 최소 8자 이상이어야 합니다."),
    // 개발 완료시 다시 포함시켜두기
    // .regex(/^(?=.*[a-zA-Z])(?=.*[0-9])/, "비밀번호는 영문과 숫자를 포함해야 합니다."),
    passwordConfirm: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordConfirm"],
  });

type TSignUpFormData = z.infer<typeof signUpSchema>;

export default function InviteSignUpPage() {
  const params = useParams();
  const router = useRouter();
  const inviteId = params.inviteId as string;

  const [isLoading, setIsLoading] = useState(false);
  const [inviteInfo, setInviteInfo] = useState<TInviteInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError: setFormError,
  } = useForm<TSignUpFormData>({
    resolver: zodResolver(signUpSchema),
    mode: "onChange",
  });

  // 초대 정보 가져오기
  useEffect(() => {
    const fetchInviteInfo = async () => {
      try {
        setIsLoading(true);
        const data: TInviteInfo = await getInviteApi(inviteId);
        setInviteInfo(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : "초대 링크가 유효하지 않습니다.");
      } finally {
        setIsLoading(false);
      }
    };
    //  inviteId 정하기
    if (inviteId) {
      fetchInviteInfo();
    }
  }, [inviteId]);

  // react hook form 회원가입 처리
  const onSubmit = async (data: TSignUpFormData) => {
    // ??
    if (!inviteInfo) return;

    try {
    } catch (error) {}
  };

  return (
    // top parent
    <div className="flex flex-col items-center justify-center gap-[43px] sm:gap-0">
      {/* mobile */}
      {/* logo + intro */}
      <div className="flex flex-col items-center justify-center w-full max-w-[480px] pt-[48px] sm:max-w-[600px] sm:py-[160px]">
        <div className="flex justify-center w-full h-[140px] py-[38.18px] px-[50.92px]">
          <Link href="/">
            <SnackIconSvg className="w-[225.16px] h-[63.64px] sm:w-[344px] sm:h-[97.3px]" />
          </Link>
        </div>
        <div className="flex flex-col items-center justify-center gap-[10px] ">
          <h1 className="text-lg/[22px] sm:text-2xl/[30px] font-bold tracking-tight text-center align-middle ">
            {inviteInfo?.name} 님, 만나서 반갑습니다.
          </h1>
          <p className="text-primary-600 text-sm/[17px] sm:text-base/[20px] tracking-tight text-center align-middle">
            비밀번호를 입력해 회원가입을 완료해주세요.
          </p>
        </div>
      </div>
      {/* signup content */}

      <div className="flex flex-col w-full items-center justify-center">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full mb-[30px]">
          {/* 이메일 */}
          <div className="flex flex-col w-full">
            <label className="text-primary-500 text-xs/[15px] font-normal tracking-tight">이메일</label>
            <input type="email" value={inviteInfo?.email || ""} readOnly className="outline-none" />
          </div>
          {/* 비밀번호 */}
          <div className="flex flex-col w-full gap-1">
            <div className="">
              <label>비밀번호</label>
              <input type="password" {...register("password")} placeholder="비밀번호를 입력하세요" />
            </div>
            {errors.password && <span>{errors.password.message}</span>}
          </div>
          {/* 비밀번호 확인 */}
          <div className="flex flex-col w-full">
            <label>비밀번호 확인</label>
            <input type="password" {...register("passwordConfirm")} placeholder="비밀번호를 다시 입력하세요" />
            {errors.passwordConfirm && <span>{errors.passwordConfirm.message}</span>}
          </div>
        </form>
        
        {/* 공용컴포 button으로 대체해야함 */}
        <button type="submit" disabled={isSubmitting} className="mb-[30px]">
          {isSubmitting ? "처리 중..." : "회원가입 완료"}
        </button>
        <p>이미 계정이 있으신가요? <span>로그인</span></p>
      </div>

    </div>
  );
}
