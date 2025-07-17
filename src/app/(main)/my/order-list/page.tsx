"use client";

import { useMemo, useState } from "react";
import MyRequestList from "@/components/common/MyRequestList";
import Pagination from "@/components/common/Pagination";
import Dropdown from "@/components/common/DropDown";

// 가데이터
const MOCK_REQUESTS = [
  {
    id: 1,
    createdAt: "2024. 07. 04",
    product: "코카콜라 제로 외 1건",
    price: 1900,
    requester: "김스낵",
    status: "대기",
  },
  {
    id: 2,
    createdAt: "2024. 07. 03",
    product: "포카리스웨트",
    price: 1200,
    requester: "이음료",
    status: "승인",
  },
  {
    id: 3,
    createdAt: "2024. 07. 02",
    product: "콘칩",
    price: 1700,
    requester: "최간식",
    status: "거절",
  },
  {
    id: 4,
    createdAt: "2024. 07. 01",
    product: "스윙칩",
    price: 1800,
    requester: "박과자",
    status: "승인",
  },
  {
    id: 5,
    createdAt: "2024. 06. 30",
    product: "생수",
    price: 900,
    requester: "한물",
    status: "대기",
  },
  {
    id: 6,
    createdAt: "2024. 06. 29",
    product: "마이쮸",
    price: 700,
    requester: "양젤리",
    status: "거절",
  },
  {
    id: 7,
    createdAt: "2024. 06. 30",
    product: "생수",
    price: 900,
    requester: "한물",
    status: "대기",
  },
  {
    id: 8,
    createdAt: "2024. 06. 30",
    product: "생수",
    price: 900,
    requester: "한물",
    status: "대기",
  },
  {
    id: 9,
    createdAt: "2024. 06. 30",
    product: "생수",
    price: 900,
    requester: "한물",
    status: "대기",
  },
  {
    id: 10,
    createdAt: "2024. 06. 30",
    product: "생수",
    price: 900,
    requester: "한물",
    status: "대기",
  },
  {
    id: 11,
    createdAt: "2024. 06. 30",
    product: "생수",
    price: 900,
    requester: "한물",
    status: "대기",
  },
];

const PAGE_SIZE = 5;

export default function MyOrderListPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState("");

  const sortedRequests = useMemo(() => {
    const filtered = MOCK_REQUESTS.filter((item) => item.status !== "승인");
    const copied = [...filtered];

    switch (sortOption) {
      case "낮은 가격순":
        return copied.sort((a, b) => a.price - b.price);
      case "높은 가격순":
        return copied.sort((a, b) => b.price - a.price);
      case "최신순":
      default:
        return copied.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
    }
  }, [sortOption]);

  const totalPages = Math.ceil(sortedRequests.length / PAGE_SIZE);
  const paginatedRequests = sortedRequests.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <main className="flex flex-col items-center px-4 md:px-0 pt-10 pb-40 min-h-[calc(100vh-112px)]">
      {/* 헤더 */}
      <div className="w-full max-w-[1352px] py-4 flex justify-between items-center">
        <h1 className="text-lg font-bold text-primary-950">구매 요청 내역</h1>
        <Dropdown value={sortOption} onChange={setSortOption} options={["최신순", "낮은 가격순", "높은 가격순"]} />
      </div>

      {/* 리스트 */}
      <div className="w-full max-w-[1352px] flex-1">
        <div className="hidden md:flex w-full px-10 py-5 border-t border-b border-primary-300 items-center">
          <div className="w-44 text-primary-950 text-base font-bold">구매 요청일</div>
          <div className="w-64 text-primary-950 text-base font-bold">상품 정보</div>
          <div className="w-44 text-primary-950 text-base font-bold">주문 금액</div>
          <div className="w-44 text-primary-950 text-base font-bold">상태</div>
          <div className="w-44 text-primary-950 text-base font-bold">비고</div>
        </div>
        <div
          className="flex flex-col"
          style={{
            minHeight: `${6 * 88}px`, // 예상 아이템 6개 높이 고정 (88px은 각 item 높이 + 여백 포함)
          }}
        >
          {paginatedRequests.map((request) => (
            <MyRequestList
              key={request.id}
              requestDate={request.createdAt}
              productName={request.product}
              price={request.price}
              status={request.status === "대기" ? "대기중" : request.status === "승인" ? "요청완료" : "요청취소"}
              onRequestCancel={() => console.log(`${request.id} 요청 취소`)}
            />
          ))}
        </div>
        {/* 페이지네이션 */}
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      </div>
    </main>
  );
}
