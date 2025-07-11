"use client";

interface XIconProps {
  className?: string;
  onClick?: () => void;
}

const XIcon = ({ className = "", onClick }: XIconProps) => {
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
      <path d="M17 7L7 17" stroke="#373737" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M7 7L17 17" stroke="#373737" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
};

export default XIcon; 