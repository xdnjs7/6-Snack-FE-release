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

  return (
    <div className="self-stretch flex flex-col sm:gap-1">
      <label className="text-primary-600 pb-[5px] text-xs">{label}</label>
      {type === "input" && isEditable ? (
        <input
          className={clsx(
            "w-full border-b pb-2 text-base outline-none",
            isSuperAdmin ? "border-primary-950 text-primary-900" : "border-primary-200 text-primary-300 bg-transparent",
          )}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          readOnly={readOnly}
        />
      ) : (
        <div className="w-full border-b border-primary-200 pb-2 text-primary-300 text-base bg-transparent">{value}</div>
      )}
    </div>
  );
}
