import React from "react";
import PlusToggleIconSvg from "@/components/svg/PlusToggleIconSvg";

type TInfoSectionProps = {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
};

export default function InfoSection({ title, isOpen, onToggle, children }: TInfoSectionProps) {
  return (
    <div className="self-stretch py-7.5 sm:py-10 border-b border-primary-200 inline-flex flex-col justify-center items-start gap-1.5 sm:gap-2">
      <div className="self-stretch inline-flex justify-between items-center">
        <div className="text-primary-950 text-base/[20px] sm:text-lg/[22px] md:text-lg font-bold tracking-tight">
          {title}
        </div>
        <PlusToggleIconSvg isOpen={isOpen} onClick={onToggle} />
      </div>
      {isOpen && (
        <div className="text-primary-600 text-sm sm:text-base/[22px] md:text-base font-normal tracking-tight">
          {children}
        </div>
      )}
    </div>
  );
}
