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
import VisibilityOffIconSvg from "@/components/svg/VisibilityOffIconSvg";
import VisibilityOnIconSvg from "@/components/svg/VisibilityOnIconSvg";
import clsx from "clsx";
import Button from "@/components/ui/Button";
import { signUpWithInviteApi } from "@/lib/api/auth.api";

// 리액트 훅폼에 연결할 zod 스키마 정의
const signUpSchema = z
  .object({
    password: z
      .string()
      .min(8, "8자 이상 입력해주세요.")
      .regex(/[a-zA-Z]/, "비밀번호는 영문자를 포함해야 합니다.")
      .regex(/[0-9]/, "비밀번호는 숫자를 포함해야 합니다.")
      .regex(/[^a-zA-Z0-9]/, "비밀번호는 특수문자를 포함해야 합니다."),
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
  const [inviteError, setInviteError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isValid },
    setError: setFormError,
  } = useForm<TSignUpFormData>({
    resolver: zodResolver(signUpSchema),
    mode: "onChange",
  });

  const [passwordInput, passwordConfirmInput] = watch("password", "passwordConfirm");

  // 초대 정보 가져오기
  useEffect(() => {
    const fetchInviteInfo = async () => {
      try {
        setIsLoading(true);
        const data = await getInviteApi(inviteId);
        setInviteInfo(data);
      } catch (error) {
        setInviteError(error instanceof Error ? error.message : "초대 링크가 유효하지 않습니다.");
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
      await signUpWithInviteApi(inviteId, data.password, data.passwordConfirm);
      router.push("/login");
    } catch {
      setFormError("root", { message: "회원가입에 실패했습니다. 다시 시도해주세요." });
    }
  };

  // 로딩 중이거나 에러가 있을 때 표시
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-lg font-medium text-primary-600">초대 정보를 불러오는 중...</div>
      </div>
    );
  }

  if (inviteError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <div className="text-lg font-medium text-error-600">초대 링크 오류</div>
        <div className="text-base text-primary-600">{inviteError}</div>
        <Link href="/login" className="text-primary-950 underline">
          로그인 페이지로 돌아가기
        </Link>
      </div>
    );
  }

  return (
    // top parent
    <div className="sm:relative flex flex-col items-center justify-center gap-[46px] sm:gap-0 pt-[48px] sm:pt-[160px]">
      {/* mobile */}
      {/* logo + intro */}
      <div className="sm:absolute sm:top-0 flex flex-col items-center justify-center w-full max-w-[480px] sm:max-w-[600px]">
        <div className="flex justify-center items-center w-full sm:max-w-[500px] h-[140px] sm:h-[214px] py-[38.18px] sm:py-[58.4px] px-[50.92px] sm:px-[77.86px]">
          <Link href="/">
            <SnackIconSvg className="w-[225.16px] h-[63.64px] sm:w-[344px] sm:h-[97.3px]" />
          </Link>
        </div>
        <div className="sm:hidden">
          <div className="flex flex-col items-center justify-center gap-[10px]">
            <h1 className="text-lg/[22px] sm:text-2xl/[30px] font-bold tracking-tight text-center align-middle ">
              {inviteInfo?.name} 님, 만나서 반갑습니다.
            </h1>
            <p className="text-primary-600 text-sm/[17px] sm:text-base/[20px] tracking-tight text-center align-middle">
              비밀번호를 입력해 회원가입을 완료해주세요.
            </p>
          </div>
        </div>
      </div>
      {/* signup content - form, register button, link to login */}

      <div className="sm:absolute sm:w-[600px] sm:top-[152.12px] flex flex-col w-full items-center justify-center sm:items-start sm:px-[60px] sm:py-[40px] sm:bg-white sm:rounded-xs sm:shadow-[0px_0px_40px_0px_rgba(0,0,0,0.10)]">
        <div className="hidden sm:block sm:mb-[20px]">
          <div className="flex flex-col items-center justify-center gap-[10px]">
            <h1 className="text-lg/[22px] sm:text-2xl/[30px] font-bold tracking-tight text-center align-middle ">
              {inviteInfo?.name} 님, 만나서 반갑습니다.
            </h1>
            <p className="text-primary-600 text-sm/[17px] sm:text-base/[20px] tracking-tight text-center align-middle">
              비밀번호를 입력해 회원가입을 완료해주세요.
            </p>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full mb-[30px] gap-[20px]">
          {/* 이메일 */}
          <div className="flex flex-col justify-between w-full h-[56px] py-2 px-1 border-b border-primary-200">
            <label className="text-primary-500 text-xs/[15px] font-normal tracking-tight">이메일</label>
            <input
              type="email"
              value={inviteInfo?.email || ""}
              readOnly
              className="outline-none text-base/[20px] tracking-tight text-primary-300"
            />
          </div>
          {/* 비밀번호 input wrapper*/}
          <div className="flex flex-col gap-1">
            <div
              className={clsx(
                "relative flex justify-between items-center w-full h-[56px] py-2 px-1 border-b",
                errors.password ? "border-error-500" : "border-primary-600",
              )}
            >
              <div className="flex flex-col w-full justify-between items-start gap-[5px] pr-[24px]">
                <label
                  className={clsx(
                    "text-primary-500 text-xs/[15px] font-normal tracking-tight",
                    !passwordInput && "hidden",
                  )}
                >
                  비밀번호
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  placeholder="비밀번호를 입력하세요"
                  className={clsx(
                    // 수정해야함!
                    showPassword ? "tracking-tight" : "tracking-[0.25em]",
                    "w-full max-w-[480px] font-normal text-[16px]/[20px] text-primary-950 outline-none placeholder:font-normal placeholder:text-[16px]/[20px] placeholder:tracking-tight placeholder:text-primary-500",
                  )}
                />
              </div>
              {/* 비밀번호 보임토글 */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-1 bottom-2"
              >
                {showPassword ? <VisibilityOnIconSvg /> : <VisibilityOffIconSvg />}
              </button>
            </div>
            {/* 에러 메세지 */}
            {errors.password && (
              <span className="text-error-500 text-sm/[17px] tracking-tight">{errors.password.message}</span>
            )}
          </div>

          {/* 비밀번호 확인 input wrapper*/}
          <div className="flex flex-col gap-1">
            <div className="relative flex justify-between items-center w-full h-[56px] py-2 px-1 border-b border-primary-600">
              <div className="flex flex-col w-full justify-between items-start gap-[5px] pr-[24px]">
                <label
                  className={clsx(
                    "text-primary-500 text-xs/[15px] font-normal tracking-tight",
                    !passwordConfirmInput && "hidden",
                  )}
                >
                  비밀번호 확인
                </label>
                <input
                  type={showPasswordConfirm ? "text" : "password"}
                  {...register("passwordConfirm")}
                  placeholder="비밀번호를 다시 입력하세요"
                  className={clsx(
                    // 수정해야함!
                    showPassword ? "text-[16px]/[20px]" : "text-[20px]/[20px]",
                    "w-full tracking-tight text-primary-950 placeholder:text-primary-500 placeholder:text-base/[20px] placeholder:tracking-tight outline-none",
                  )}
                />
              </div>
              {/* 비밀번호 확인 보임토글 */}
              <button
                type="button"
                onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                className="cursor-pointer absolute right-1 bottom-2"
              >
                {showPasswordConfirm ? <VisibilityOnIconSvg /> : <VisibilityOffIconSvg />}
              </button>
            </div>
            {/* 에러 메세지 */}
            {errors.passwordConfirm && (
              <span className="text-error-500 text-sm/[17px] tracking-tight">{errors.passwordConfirm.message}</span>
            )}
          </div>
        </form>

        {/* 전체 폼 에러 메시지 */}
        {errors.root && (
          <div className="mb-4 p-3 bg-error-50 border border-error-200 rounded text-error-600 text-sm">
            {errors.root.message}
          </div>
        )}

        <Button
          type="primary"
          label={isSubmitting ? "처리 중..." : "가입하기"}
          className={clsx(
            "w-full h-[64px] mb-[24px]",
            isValid && !isSubmitting ? "bg-primary-950 text-primary-50" : "bg-primary-100 text-primary-300",
          )}
          onClick={isValid && !isSubmitting ? handleSubmit(onSubmit) : undefined}
        />
        <p className="text-primary-500 text-base/[20px] tracking-tight">
          이미 계정이 있으신가요?
          <Link href="/login">
            <span className="text-primary-950 text-base/[20px] tracking-tight font-bold underline decoration-primary-950 underline-offset-2">
              로그인
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
}
