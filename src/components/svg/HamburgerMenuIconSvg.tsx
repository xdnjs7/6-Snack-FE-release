import React from "react";

type THamburgerMenuIconSvgProps = {
  className?: string;
  onClick?: () => void;
};
export default function HamburgerMenuIconSvg({ className = "", onClick }: THamburgerMenuIconSvgProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`cursor-pointer ${className}`}
      onClick={onClick}
    >
      <path d="M4.5 5.85352H19.5V7.35352H4.5V5.85352Z" fill="currentColor" />
      <path d="M4.5 11.3535H19.5V12.8535H4.5V11.3535Z" fill="currentColor" />
      <path d="M4.5 16.8535H19.5V18.3535H4.5V16.8535Z" fill="currentColor" />
    </svg>
  );
}
