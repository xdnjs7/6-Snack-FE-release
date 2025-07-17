import React, { FC } from "react";
import clsx from "clsx";

type TRequestListItemProps = {
  requestDate: string; // 요청 날짜 (예: "2024. 07. 04")
  productName: string; // 상품명 (예: "코카콜라 제로" 또는 "코카콜라 제로 외 1건")
  price: number; // 가격 (예: 1900)
  status: "대기중" | "요청취소" | "요청완료"; // 요청 상태 (현재는 '대기중'만 보이므로 확장 가능성 고려)
  onRequestCancel: () => void; // '요청 취소' 버튼 클릭 시 실행될 함수
};

const RequestListItem: FC<TRequestListItemProps> = ({ requestDate, productName, price, status, onRequestCancel }) => {
  const statusClasses = clsx("inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium font-suit", {
    "bg-primary-300 text-primary-950": status === "대기중", // 대기중 상태의 배경색 및 텍스트 색상
  });

  return (
    // 리스트 아이템 컨테이너: 투명 배경, 하단에 회색 구분선
    <div className="relative py-4 border-b border-primary-200 bg-transparent flex flex-col sm:flex-row items-start sm:items-center justify-between font-suit text-primary-950">
      {/* 왼쪽 정보 (날짜, 상품명, 가격) */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center mb-2 sm:mb-0">
        <span className="text-primary-500 text-sm mr-4 min-w-[70px]">{requestDate}</span>
        <span className="text-base font-medium mr-4">{productName}</span>
        <span className="text-base">{price.toLocaleString()}</span> {/* 가격에 콤마 포맷 */}
      </div>

      {/* 오른쪽 정보 (상태, 요청 취소 버튼) */}
      <div className="flex items-center space-x-3 ml-auto">
        {" "}
        {/* ml-auto로 오른쪽 정렬 */}
        {/* 상태 태그 */}
        <span className={statusClasses}>
          {/* 상태 아이콘 (디자인에 따라 다를 수 있음. 여기서는 간단한 원 사용) */}
          <svg className="w-2 h-2 mr-1" fill="currentColor" viewBox="0 0 8 8">
            <circle cx="4" cy="4" r="3" />
          </svg>
          {status}
        </span>
        {/* 요청 취소 버튼 */}
        <button
          onClick={onRequestCancel}
          className="px-4 py-2 border border-primary-300 rounded-md shadow-sm text-sm font-medium text-primary-700 bg-white hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-300 transition-colors duration-200 whitespace-nowrap"
        >
          요청 취소
        </button>
      </div>
    </div>
  );
};

export default RequestListItem;
