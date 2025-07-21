"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
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

  const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
    setCurrentPage(1); // 정렬 변경 시 1페이지로 이동
  };

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
        </select>
      </div>

      {purchaseItems.length === 0 ? (
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
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-[--color-primary-100]">
            <thead className="bg-[--color-primary-50]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-[--color-primary-700] uppercase tracking-wider">
                  구매 요청일
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[--color-primary-700] uppercase tracking-wider">
                  요청인
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[--color-primary-700] uppercase tracking-wider">
                  구매 품목
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[--color-primary-700] uppercase tracking-wider">
                  금액
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[--color-primary-700] uppercase tracking-wider">
                  구매 승인일
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[--color-primary-700] uppercase tracking-wider">
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
                          : "bg-[--color-primary-50] text-[--color-primary-700]",
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
