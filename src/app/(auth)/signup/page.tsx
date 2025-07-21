"use client";
import MobileCategoryMenu from "@/components/common/MobileCategoryMenu";
import SubCategoryItem from "@/components/common/SubCategoryItem";
import AuthenticatedHeader from "@/components/layout/AuthenticatedHeader";
import Image from "next/image";
import React from "react";
import img_logo from "@/assets/images/img_logo.webp";
import SnackIconSvg from "@/components/svg/SnackIconSvg";

export default function SignUpPage() {

  // Frontend Feature TOdo: getInviteApi 구현후 아래 data 대체해야함, inviteId, 
  const user = {
    name: "김철수",
    company: {
      id: 1,
      name: "테스트 회사",
    },
  };
  return (
    // top parent
    <div className="flex flex-col items-center justify-center px-[24px] pt-[60px] gap-[46px] sm:px-[72px] sm:pt-[119px] sm:gap-0">
      {/* mobile */}
      {/* logo + intro */}
      <div className="flex flex-col items-center justify-center w-full">
        <div className="px-[60px] py-[38px]">
          <SnackIconSvg className="w-[225px] h-[63px] sm:w-[344px] sm:h-[97px]" />
        </div>
        <h1>{user.name} 님, 만나서 반갑습니다.</h1>
        <p>비밀번호를 입력해 회원가입을 완료해주세요.</p>
      </div>
      {/* signup content */}
      <div className="flex flex-col w-full"></div>
      <div></div>
    </div>
  );
}
