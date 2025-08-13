import React from "react";

type TProfileAvatarProps = {
  label: string;
  className?: string;
};

export default function ProfileAvatar({ label, className = "" }: TProfileAvatarProps) {
  return (
    <div
      className={`w-6 h-6 bg-primary-100 py-1.5 px-[7.5] rounded-[100px] flex items-center justify-center overflow-hidden ${className}`}
    >
      <div className=" text-primary-950 text-[10px] tracking-tight font-medium">{label}</div>
    </div>
  );
}
