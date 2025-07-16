import Link from "next/link";
import ArrowRightIcon from "@/components/svg/ArrowRightIconSvg";

const CARD_TEXTS = [
  "흩어진 간식 구매처를 통합하고,\n기수별 지출을 똑똑하게 관리하세요.",
  "관리자와 유저\n모두 이용할 수 있어요.",
  "다양한 품목도\n한 눈에 파악해봐요.",
  "쉽고 빠르게 구매를 요청해보세요.",
  "여러 플랫폼에서 구매한 간식 내역을\n한 곳에서 쉽게 관리해요.",
];

export default function LandingPage() {
  return (
    <div className="w-[1920px] h-[1080px] relative bg-white overflow-hidden">
      {/* 슬로건 */}
      <div className="absolute top-[171px] left-1/2 -translate-x-1/2 text-5xl font-extrabold text-primary-950 text-center leading-[70px]">
        내가 원하는 간식을 쉽고 빠르게 구매
      </div>
      <div className="absolute top-[255px] left-1/2 -translate-x-1/2 text-2xl font-bold text-[#b2b2b2] text-center">
        with Snack
      </div>

      {/* CTA 버튼 */}
      <Link
        href="/signup"
        className="absolute top-[315px] left-1/2 -translate-x-1/2 bg-primary-950 text-white px-5 py-2.5 rounded-full flex items-center gap-1"
      >
        <span className="text-base font-bold">Sign Now</span>
        <ArrowRightIcon />
      </Link>

      {/* 메인 이미지 */}
      <img
        src="/images/img_landing.svg"
        alt="preview"
        width={1300}
        className="absolute top-[423px] left-[310px] h-auto rounded-[10px] shadow-[0_0_20px_rgba(0,0,0,0.08)] block m-0 p-0 leading-none"
      />

      {/* 카드 무한 슬라이드 영역 */}
      <div className="absolute top-[918px] w-full overflow-hidden backdrop-blur-[2px] py-8 px-0">
        <div className="flex animate-slide gap-10 w-max">
          {[...CARD_TEXTS, ...CARD_TEXTS].map((text, idx) => (
            <div
              key={idx}
              className="h-[112px] px-[30px] py-[30px] bg-white/40 rounded-lg shadow-[0px_7px_20px_0px_rgba(0,0,0,0.02)] outline outline-1 outline-offset-[-1px] outline-neutral-200 backdrop-blur-[20px] inline-flex justify-center items-center gap-4 w-fit"
            >
              <div className="text-zinc-500 text-base font-medium font-['Pretendard'] leading-relaxed whitespace-pre-line">
                {text}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
