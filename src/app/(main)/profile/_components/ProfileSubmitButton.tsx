"use client";

import Button from "@/components/ui/Button";
import { TButtonType } from "@/types/button.types";

type TProfileSubmitButtonProps = {
  isFormValid: boolean;
  isSubmitting: boolean;
  onSubmit: () => void;
};

export default function ProfileSubmitButton({ isFormValid, isSubmitting, onSubmit }: TProfileSubmitButtonProps) {
  const buttonType: TButtonType = isFormValid ? "black" : "grayDisabled";

  return (
    <Button
      type={buttonType}
      label={isSubmitting ? "변경 중..." : "변경하기"}
      className={`self-stretch h-16 p-4 ${!isFormValid ? "bg-primary-100 text-primary-300" : ""}`}
      disabled={!isFormValid || isSubmitting}
      onClick={onSubmit}
    />
  );
}
