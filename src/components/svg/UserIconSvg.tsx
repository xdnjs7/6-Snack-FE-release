import React from "react";

type TUserIconSvgProps = {
  className?: string;
  onClick?: () => void;
  isActive?: boolean;
};
export default function UserIconSvg({ className = "", onClick, isActive = false }: TUserIconSvgProps) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`cursor-pointer text-primary-500 ${className}`}
    >
      <path
        d="M7.14977 5.1001C7.14977 3.53318 8.42001 2.26294 9.98694 2.26294C11.5539 2.26294 12.8241 3.53318 12.8241 5.1001V5.22197C12.8241 6.78889 11.5539 8.05913 9.98694 8.05913C8.42001 8.05913 7.14977 6.78889 7.14977 5.22197V5.1001Z"
        fill={isActive ? "#000000" : "currentColor"}
      />
      <path
        d="M3.08464 12.5689C3.08464 10.9552 4.3928 9.64703 6.00651 9.64703H14.1634C15.7771 9.64703 17.0853 10.9552 17.0853 12.5689V17.3036H3.08464V12.5689Z"
        fill={isActive ? "#000000" : "currentColor"}
      />
      <path
        d="M16.3757 12.6448C16.3757 11.6093 15.5362 10.7698 14.5007 10.7698H5.5C4.46447 10.7698 3.625 11.6093 3.625 12.6448V17.7384H2.375V12.6448C2.375 10.9189 3.77411 9.51984 5.5 9.51984H14.5007C16.2265 9.51984 17.6257 10.9189 17.6257 12.6448V17.7384H16.3757V12.6448Z"
        fill={isActive ? "#000000" : "currentColor"}
      />
      <path d="M3.32715 16.2922H16.5856V17.7375H3.32715V16.2922Z" fill={isActive ? "#000000" : "currentColor"} />
    </svg>
  );
}
