"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function SpinnerAnimate() {
  const [frame, setFrame] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((prev) => (prev === 1 ? 2 : 1));
    }, 400); // 0.4초마다 이미지 교체

    return () => clearInterval(interval);
  }, []);

  const imageSrc = frame === 1 ? "/images/spinner_img.png" : "/images/spinner_img2.png";

  return (
    <div className="w-20 h-20 relative">
      <Image
        src={imageSrc}
        alt="로딩 강아지"
        fill // 부모가 relative일 경우, 전체 채움
        className="object-contain"
        priority // 스피너는 빠르게 보여야 하므로 optional하게 적용
      />
    </div>
  );
}
