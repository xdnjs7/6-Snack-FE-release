import React from "react";

type TFormErrorMessageProps = { message?: string };

export default function FormErrorMessage({ message }: TFormErrorMessageProps) {
  return message && <p className="font-normal text-[14px]/[17px] tracking-tight text-error-500">{message}</p>;
}
