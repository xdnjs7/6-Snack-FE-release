"use client";

import { Role } from "@/types/InviteMemberModal.types";
import clsx from "clsx";

type TProfileFieldProps = {
  label: string;
  value: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
  isEditable?: boolean;
  role?: string;
  type?: "input" | "display";
};

export default function ProfileField({
  label,
  value,
  onChange,
  readOnly = false,
  isEditable = false,
  role,
  type = "input",
}: TProfileFieldProps) {
  const isSuperAdmin = role === Role.SUPER_ADMIN;
  const isCompanyName = label === "기업명";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;

    // 회사명 입력 제한: 특수문자 제거, 공백 제거, 20글자 제한
    if (isCompanyName) {
      newValue = newValue.replace(/[^a-zA-Z0-9가-힣ㄱ-ㅎㅏ-ㅣ]/g, "").slice(0, 20);
      e.target.value = newValue;
    }

    onChange?.(newValue);
  };

  return (
    <div className="self-stretch flex flex-col sm:gap-1">
      <label className="text-primary-600 pb-[5px] text-xs">{label}</label>
      {type === "input" && isEditable ? (
        <input
          className={clsx(
            "w-full border-b py-2 px-1 text-base outline-none",
            isSuperAdmin ? "border-primary-950 text-primary-900" : "border-primary-200 text-primary-300 bg-transparent",
          )}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          readOnly={readOnly}
        />
      ) : (
        <div className="w-full border-b border-primary-200 pb-2 px-1 text-primary-300 text-base bg-transparent">
          {value}
        </div>
      )}
    </div>
  );
}
