"use client";

import React, { ChangeEvent, useState } from "react";
import clsx from "clsx";

// 구매 내역 아이템 타입 정의
type TPurchaseItem = {
  id: string;
  requestDate: string;
  requester: string;
  status: "요청" | "승인"; // 이미지에 '요청'과 '승인' 상태가 보임
  item: string;
  amount: string;
  approvalDate: string;
  manager: string;
};

const DUMMY_PURCHASE_DATA: TPurchaseItem[] = [
  {
    id: "1",
    requestDate: "2025. 07. 01",
    requester: "김스낵",
    status: "요청",
    item: "코카콜라 제로 1캔 외 1건\n총 수량 4개",
    amount: "21,000",
    approvalDate: "2024. 07. 04",
    manager: "김코드",
  },
  {
    id: "2",
    requestDate: "2025. 07. 01",
    requester: "김스낵",
    status: "승인",
    item: "코카콜라 제로 1캔 외 1건\n총 수량 4개",
    amount: "21,000",
    approvalDate: "2024. 07. 04",
    manager: "김코드",
  },
  {
    id: "3",
    requestDate: "2025. 07. 01",
    requester: "김스낵",
    status: "요청",
    item: "코카콜라 제로 1캔 외 1건\n총 수량 4개",
    amount: "21,000",
    approvalDate: "2024. 07. 04",
    manager: "김코드",
  },
  {
    id: "4",
    requestDate: "2025. 07. 01",
    requester: "김스낵",
    status: "승인",
    item: "코카콜라 제로 1캔 외 1건\n총 수량 4개",
    amount: "21,000",
    approvalDate: "2024. 07. 04",
    manager: "김코드",
  },
  // 더 많은 더미 데이터 추가 가능
];

const PurchaseList: React.FC = () => {
  const [purchaseItems, setPurchaseItems] = useState<TPurchaseItem[]>(DUMMY_PURCHASE_DATA);
  const [sortBy, setSortBy] = useState<string>("latest"); // 정렬 기준 상태
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 4; // 페이지당 항목 수 (이미지 기준)

  const totalPages = Math.ceil(purchaseItems.length / itemsPerPage);
  const currentItems = purchaseItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
    // 실제 정렬 로직은 여기에 구현 (예: purchaseItems.sort(...))
    console.log("정렬 기준 변경:", e.target.value);
  };

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div
      className={clsx(
        "bg-[--color-white]",
        "p-4",
        "rounded-lg",
        "shadow-sm",
        "w-full",
        "border",
        "border-[--color-primary-100]",
      )}
    >
      <div className="flex justify-end mb-4">
        <select
          value={sortBy}
          onChange={handleSortChange}
          className={clsx(
            "p-2",
            "border",
            "border-[--color-primary-200]",
            "rounded-md",
            "text-sm",
            "text-[--color-primary-700]",
            "focus:outline-none",
            "focus:ring-1",
            "focus:ring-[--color-secondary-500]",
          )}
        >
          <option value="latest">정렬</option>
          <option value="oldest">오래된 순</option>
          {/* 추가 정렬 옵션 */}
        </select>
      </div>

      {purchaseItems.length === 0 ? (
        // 구매 내역이 없을 때
        <div className="flex flex-col items-center justify-center py-16">
          <div className="w-24 h-24 bg-[--color-primary-50] rounded-full flex items-center justify-center mb-6">
            {/* 아이콘 (간단한 SVG 또는 이모지) */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-12 h-12 text-[--color-primary-400]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 21l-5.25-5.25M5.25 5.25l5.25 5.25"
              />
            </svg>
          </div>
          <p className="text-lg font-semibold text-[--color-primary-900] mb-2">구매 내역이 없어요</p>
          <p className="text-sm text-[--color-primary-700] mb-6">구매 요청을 승인하고 상품을 주문해보세요</p>
          <button
            onClick={() => console.log("구매 요청 내역으로 이동")} // 실제 라우팅 로직 추가
            className={clsx(
              "py-3",
              "px-6",
              "bg-[--color-primary-950]",
              "text-[--color-white]",
              "font-semibold",
              "rounded-md",
              "hover:bg-[--color-primary-800]",
              "transition-colors",
              "duration-200",
            )}
          >
            구매 요청 내역으로 이동
          </button>
        </div>
      ) : (
        // 구매 내역이 있을 때 (테이블)
        <div className="overflow-x-auto">
          {" "}
          {/* 모바일에서 가로 스크롤 가능하게 */}
          <table className="min-w-full divide-y divide-[--color-primary-100]">
            <thead className="bg-[--color-primary-50]">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-[--color-primary-700] uppercase tracking-wider"
                >
                  구매 요청일
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-[--color-primary-700] uppercase tracking-wider"
                >
                  요청인
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-[--color-primary-700] uppercase tracking-wider"
                >
                  구매 품목
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-[--color-primary-700] uppercase tracking-wider"
                >
                  금액
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-[--color-primary-700] uppercase tracking-wider"
                >
                  구매 승인일
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-[--color-primary-700] uppercase tracking-wider"
                >
                  담당자
                </th>
              </tr>
            </thead>
            <tbody className="bg-[--color-white] divide-y divide-[--color-primary-100]">
              {currentItems.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[--color-primary-900]">{item.requestDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[--color-primary-900]">
                    {item.requester}{" "}
                    <span
                      className={clsx(
                        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                        item.status === "요청"
                          ? "bg-[--color-secondary-100] text-[--color-secondary-500]"
                          : "bg-[--color-primary-50] text-[--color-primary-700]", // 승인 상태는 이미지에 없지만 기본 색상 적용
                      )}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-pre-wrap text-sm text-[--color-primary-900]">{item.item}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[--color-primary-900]">{item.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[--color-primary-900]">
                    {item.approvalDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[--color-primary-900]">{item.manager}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Pagination */}
          <nav
            className="px-4 py-3 flex items-center justify-between border-t border-[--color-primary-100] sm:px-6"
            aria-label="Pagination"
          >
            <div className="flex-1 flex justify-between sm:justify-end">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={clsx(
                  "relative inline-flex items-center px-4 py-2 border border-[--color-primary-200] text-sm font-medium rounded-md text-[--color-primary-700] bg-[--color-white] hover:bg-[--color-primary-50]",
                  currentPage === 1 && "opacity-50 cursor-not-allowed",
                )}
              >
                Prev
              </button>
              <div className="ml-3 text-sm text-[--color-primary-700] flex items-center">
                <span className="font-semibold">{currentPage}</span> of {totalPages}
              </div>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={clsx(
                  "ml-3 relative inline-flex items-center px-4 py-2 border border-[--color-primary-200] text-sm font-medium rounded-md text-[--color-primary-700] bg-[--color-white] hover:bg-[--color-primary-50]",
                  currentPage === totalPages && "opacity-50 cursor-not-allowed",
                )}
              >
                Next
              </button>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
};

export default PurchaseList;
