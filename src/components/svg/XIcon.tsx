"use client";

type TXIconProps = {
  className?: string;
  onClick?: () => void;
  stroke?: string;
  bgColor?: string; 
};

export default function XIconSvg({
  className = "",
  onClick,
  stroke = "black",
  bgColor = "transparent", 
}: TXIconProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`cursor-pointer ${className}`}
      onClick={onClick}
    >
      <circle cx="12" cy="12" r="12" fill={bgColor} />

      <path d="M17 7L7 17" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M7 7L17 17" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
