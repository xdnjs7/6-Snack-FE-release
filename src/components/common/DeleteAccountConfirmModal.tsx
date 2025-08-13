import React from "react";
import Button from "../ui/Button";
import ExclamationMarkIconSvg from "../svg/ExclamationMarkIconSvg";

type TDeleteModalProps = {
  name: string;
  email: string;
  onCancel: () => void;
  onConfirm: () => void;
};
export default function DeleteAccountConfirmModal({ name, email, onCancel, onConfirm }: TDeleteModalProps) {
  return (
    <div className="absolute left-1/2 top-1/2 translate-[-50%] w-[327px] sm:w-[512px] px-7.5 pt-10 pb-7.5 bg-white rounded-md shadow-[0px_0px_30px_0px_rgba(0,0,0,0.14)] inline-flex flex-col justify-center items-center gap-9">
      <div className="flex flex-col justify-start items-center gap-2">
        <div className="justify-center text-black text-lg font-bold">계정 탈퇴</div>
        <div className="flex flex-col justify-start items-center gap-2">
          <ExclamationMarkIconSvg className="hidden sm:block text-red" />
          <div className="text-center justify-center">
            {/* 모바일 버전 */}
            <div className="block sm:hidden">
              <span className="text-gray-900 text-base font-bold leading-relaxed">
                {name}({email})
              </span>
              <span className="text-gray-900 text-base font-normal leading-relaxed">
                님의
                <br />
                계정을 탈퇴시킬까요?
              </span>
            </div>

            {/* 데스크톱 버전  */}
            <div className="hidden sm:block">
              <span className="text-gray-900 text-base font-bold leading-relaxed">
                {name}({email})
              </span>
              <span className="text-gray-900 text-base font-normal leading-relaxed">님의 계정을 탈퇴시킬까요?</span>
            </div>
          </div>
        </div>
      </div>
      <div className="self-stretch inline-flex justify-start items-center gap-2.5">
        <Button
          type="white"
          label="더 생각해볼게요"
          className="h-[50px] sm:h-[64px] flex-1 text-sm/[17px] sm:text-base/[20px] font-bold tracking-tight"
          onClick={onCancel}
        />
        <Button
          type="black"
          label="탈퇴시키기"
          className="bg-primary-950 h-[50px] sm:h-[64px] flex-1 text-sm/[17px] sm:text-base/[20px] font-bold tracking-tight"
          onClick={onConfirm}
        />
      </div>
    </div>
  );
}
