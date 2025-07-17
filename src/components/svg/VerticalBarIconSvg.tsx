import React from "react";

interface VerticalBarIconSvgProps {
  className?: string;
}

export default function VerticalBarIconSvg({ className = "" }: VerticalBarIconSvgProps) {
  return (
    <svg width="1" height="11" viewBox="0 0 1 11" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="1" height="10" transform="translate(0 0.5)" fill="currentColor" />
    </svg>
  );
}
