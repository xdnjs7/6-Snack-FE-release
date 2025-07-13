"use client";

interface ArrowIconProps {
  direction: "left" | "right" | "down" | "up";
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

const ArrowIcon = ({ direction, className = "", onClick, disabled = false }: ArrowIconProps) => {
  return (
    <svg
      width="8"
      height="15"
      viewBox="0 0 8 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`cursor-pointer text-gray-300 ${disabled ? "opacity-50" : ""} ${className}`}
      onClick={!disabled ? onClick : undefined}
      style={{
        transform: direction === "left" ? "rotate(180deg)" : 
                   direction === "down" ? "rotate(90deg)" : 
                   direction === "up" ? "rotate(-90deg)" : "none"
      }}
    >
      <path 
        d="M1.08203 0.371094L7.97656 7.26465L1.08203 14.1592L0.0214844 13.0986L5.85449 7.26562L0.0214844 1.43164L1.08203 0.371094Z" 
        fill={disabled ? "#9CA3AF" : "currentColor"}
      />
    </svg>
  );
};

export default ArrowIcon; 