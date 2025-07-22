"use client";

import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { getAdminOrders } from "../../../../lib/api/order.api";

// API 응답 타입 정의 (예시, 실제 응답에 맞게 수정 필요)
type AdminOrderApiItem = {
  id: number | string;
  requestDate?: string;
  createdAt?: string;
  requesterName?: string;
  requester?: string;
  itemSummary?: string;
  item?: string;
  amount?: number;
  approvalDate?: string;
  updatedAt?: string;
  managerName?: string;
  manager?: string;
};

// 구매 내역 아이템 타입 정의
// (API 응답에 맞게 타입을 수정해야 할 수 있음)
type TPurchaseItem = {
  id: string;
  requestDate: string;
  requester: string;
  status: "요청" | "승인";
  item: string;
  amount: string;
  approvalDate: string;
  manager: string;
};

type AdminOrderApiResponse = {
  items?: AdminOrderApiItem[];
  data?: AdminOrderApiItem[];
  totalCount?: number;
  total?: number;
};

const statusMap: Record<string, "요청" | "승인"> = {
  pending: "요청",
  approved: "승인",
};

const PurchaseList: React.FC = () => {
  const [purchaseItems, setPurchaseItems] = useState<TPurchaseItem[]>([]);
  const [sortBy, setSortBy] = useState<string>("latest");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const itemsPerPage = 4;
  const [totalCount, setTotalCount] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleSortButtonClick = () => setDropdownOpen((prev) => !prev);
  const handleSortSelect = (value: string) => {
    setSortBy(value);
    setCurrentPage(1);
    setDropdownOpen(false);
  };

  useEffect(() => {
    if (!dropdownOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".custom-sort-dropdown")) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen]);

  // API에서 데이터 받아오기
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // pending, approved 두 상태 모두 조회해서 합침
        const [pendingRes, approvedRes]: [AdminOrderApiResponse, AdminOrderApiResponse] = await Promise.all([
          getAdminOrders({
            status: "pending",
            offset: (currentPage - 1) * itemsPerPage,
            limit: itemsPerPage,
            orderBy: sortBy,
          }),
          getAdminOrders({
            status: "approved",
            offset: (currentPage - 1) * itemsPerPage,
            limit: itemsPerPage,
            orderBy: sortBy,
          }),
        ]);
        // API 응답 구조에 따라 데이터 파싱 필요 (아래는 예시)
        const parse = (item: AdminOrderApiItem, statusKey: string): TPurchaseItem => ({
          id: String(item.id),
          requestDate: item.requestDate || item.createdAt || "-",
          requester: item.requesterName || item.requester || "-",
          status: statusMap[statusKey],
          item: item.itemSummary || item.item || "-",
          amount: typeof item.amount === "number" ? item.amount.toLocaleString() : "-",
          approvalDate: item.approvalDate || item.updatedAt || "-",
          manager: item.managerName || item.manager || "-",
        });
        const pendingList = (pendingRes.items || pendingRes.data || []).map((item) => parse(item, "pending"));
        const approvedList = (approvedRes.items || approvedRes.data || []).map((item) => parse(item, "approved"));
        setPurchaseItems([...pendingList, ...approvedList]);
        setTotalCount(
          (pendingRes.totalCount || pendingRes.total || 0) + (approvedRes.totalCount || approvedRes.total || 0),
        );
      } catch (e: unknown) {
        let msg = "데이터를 불러오지 못했습니다.";
        if (typeof e === "object" && e !== null && "message" in e) {
          const err = e as { message?: string };
          if (typeof err.message === "string") {
            msg = err.message;
          }
        }
        setError(msg);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy, currentPage]);

  const totalPages = Math.ceil(totalCount / itemsPerPage);
  const currentItems = purchaseItems; // 이미 API에서 페이징된 데이터만 받아옴

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center py-16 text-[--color-primary-700]">로딩 중...</div>;
  }
  if (error) {
    return <div className="flex items-center justify-center py-16 text-red-500">{error}</div>;
  }

  return (
    <div
      className={clsx("bg-white", "p-0 sm:p-4 md:p-6", "rounded-lg", "shadow-sm", "w-full", "overflow-x-auto")}
      style={{ boxShadow: "none", border: "none", background: "none" }}
    >
      {/* 상단: 타이틀 + 정렬 버튼 */}
      <div className="flex flex-col sm:flex-row sm:justify-end sm:items-center gap-2 px-6 pt-6 pb-2">
        <div className="relative custom-sort-dropdown">
          <button
            type="button"
            onClick={handleSortButtonClick}
            className={clsx(
              "w-28 h-11 px-4 py-2.5 bg-white border border-neutral-200 rounded-md flex justify-between items-center",
              "text-neutral-800 text-base font-normal font-suit",
              "relative",
            )}
            aria-haspopup="listbox"
            aria-expanded={dropdownOpen}
          >
            <span>{sortBy === "latest" ? "정렬" : "오래된 순"}</span>
            <span className="w-4 h-4 ml-2 inline-block">
              <svg width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L8 8L15 1" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            {dropdownOpen && (
              <ul
                className="absolute left-0 top-full mt-1 w-full bg-white border border-neutral-200 rounded shadow z-10"
                role="listbox"
              >
                <li
                  className={clsx(
                    "px-4 py-2 hover:bg-gray-100 cursor-pointer",
                    sortBy === "latest" && "font-bold text-blue-600",
                  )}
                  role="option"
                  aria-selected={sortBy === "latest"}
                  onClick={() => handleSortSelect("latest")}
                >
                  정렬
                </li>
                <li
                  className={clsx(
                    "px-4 py-2 hover:bg-gray-100 cursor-pointer",
                    sortBy === "oldest" && "font-bold text-blue-600",
                  )}
                  role="option"
                  aria-selected={sortBy === "oldest"}
                  onClick={() => handleSortSelect("oldest")}
                >
                  오래된 순
                </li>
              </ul>
            )}
          </button>
        </div>
      </div>

      {/* 리스트/테이블 */}
      <div className="w-full px-0 sm:px-6 pb-4">
        {/* 모바일: 카드형, 태블릿/PC: 테이블형 */}
        <div className="block sm:hidden">
          {currentItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="w-24 h-24 bg-[--color-primary-50] rounded-full flex items-center justify-center mb-6">
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
                onClick={() => console.log("구매 요청 내역으로 이동")}
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
            <div className="flex flex-col gap-4">
              {currentItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-neutral-100 rounded-[12px] p-5 flex flex-col gap-3 shadow-sm"
                  style={{
                    borderBottom: "1px solid #E5E5E5",
                    width: "100%",
                  }}
                >
                  <div className="flex justify-between items-center border-b border-neutral-200 pb-3 mb-2">
                    <div className="text-neutral-800 text-base font-bold font-suit">{item.item}</div>
                    <div className="text-neutral-800 text-lg font-extrabold font-suit">{item.amount}</div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                      <span className="text-neutral-800 text-sm font-normal font-suit">구매 요청일</span>
                      <span className="text-zinc-800 text-sm font-bold font-suit">{item.requestDate}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-neutral-800 text-sm font-normal font-suit">요청인</span>
                      <span className="flex items-center gap-2">
                        <span className="text-zinc-800 text-sm font-bold font-suit">{item.requester}</span>
                        <span
                          className={clsx(
                            "px-2 py-1 rounded-[100px] text-xs font-bold font-suit",
                            item.status === "요청" ? "bg-blue-50 text-blue-500" : "bg-gray-100 text-gray-500",
                          )}
                        >
                          {item.status}
                        </span>
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-neutral-800 text-sm font-normal font-suit">구매 승인일</span>
                      <span className="text-zinc-800 text-sm font-bold font-suit">{item.approvalDate}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-neutral-800 text-sm font-normal font-suit">담당자</span>
                      <span className="text-zinc-800 text-sm font-bold font-suit">{item.manager}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {/* 태블릿/PC: 테이블형 */}
        <div className="hidden sm:block">
          <table className="min-w-full divide-y divide-[--color-primary-100]">
            <thead className="bg-white">
              <tr
                style={{
                  borderTop: "1px solid #E5E5E5",
                  borderBottom: "1px solid #E5E5E5",
                  width: "100%",
                }}
              >
                <th className="px-6 py-4 text-left text-base font-bold text-zinc-500 font-suit">구매 요청일</th>
                <th className="px-6 py-4 text-left text-base font-bold text-zinc-500 font-suit">요청인</th>
                <th className="px-6 py-4 text-left text-base font-bold text-zinc-500 font-suit">구매 품목</th>
                <th className="px-6 py-4 text-left text-base font-bold text-zinc-500 font-suit">금액</th>
                <th className="px-6 py-4 text-left text-base font-bold text-zinc-500 font-suit">구매 승인일</th>
                <th className="px-6 py-4 text-left text-base font-bold text-zinc-500 font-suit">담당자</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {currentItems.map((item) => (
                <tr
                  key={item.id}
                  className="h-20 align-middle"
                  style={{
                    borderBottom: "1px solid #E5E5E5",
                    width: "100%",
                  }}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-base text-neutral-800 font-normal font-suit">
                    {item.requestDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-base text-neutral-800 font-normal font-suit">
                    <span className="flex items-center gap-2">
                      <span>{item.requester}</span>
                      <span
                        className={clsx(
                          "px-2 py-1 rounded-[100px] text-xs font-bold font-suit",
                          item.status === "요청" ? "bg-blue-50 text-blue-500" : "bg-gray-100 text-gray-500",
                        )}
                      >
                        {item.status}
                      </span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-pre-wrap text-base text-neutral-800 font-normal font-suit">
                    {item.item}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-base text-neutral-800 font-extrabold font-suit">
                    {item.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-base text-neutral-800 font-normal font-suit">
                    {item.approvalDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-base text-neutral-800 font-normal font-suit">
                    {item.manager}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <nav
        className="px-4 py-3 flex items-center justify-between sm:px-6"
        style={{ width: "100%" }}
        aria-label="Pagination"
      >
        <div className="text-neutral-800 text-base font-normal font-suit">
          {currentPage} of {totalPages}
        </div>
        <div className="flex items-center">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={clsx(
              "flex items-center gap-1.5 px-3 py-2 border border-neutral-200 rounded-md text-zinc-500 text-base font-normal font-suit bg-white hover:bg-neutral-50 transition-colors duration-200",
              currentPage === 1 && "opacity-50 cursor-not-allowed",
            )}
          >
            <span className="w-6 h-6 relative inline-block">
              <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 13L1 7L7 1" stroke="#A3A3A3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            Prev
          </button>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={clsx(
              "flex items-center gap-1.5 px-3 py-2 border border-neutral-200 rounded-md text-neutral-800 text-base font-normal font-suit bg-white hover:bg-neutral-50 transition-colors duration-200 ml-2",
              currentPage === totalPages && "opacity-50 cursor-not-allowed",
            )}
          >
            Next
            <span className="w-6 h-6 relative inline-block">
              <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L7 7L1 13" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default PurchaseList;
