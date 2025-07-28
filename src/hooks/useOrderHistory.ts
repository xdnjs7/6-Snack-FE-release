import { useState, useEffect, useCallback } from "react";
import { useBudgets } from "@/hooks/useBudgets";
import { useAdminOrders } from "@/hooks/useAdminOrders";
import { formatDate } from "@/lib/utils/formatDate.util";

export type TPurchaseItem = {
  id: string;
  requestDate: string;
  requester: string;
  status: "요청" | "승인";
  item: string;
  amount: string;
  approvalDate: string;
  manager: string;
  adminMessage?: string;
};

export const useOrderHistory = (sortByDefault: string = "latest", itemsPerPage: number = 4) => {
  const [sortBy, setSortBy] = useState<string>(sortByDefault);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // 예산 데이터 패칭
  const { data: budgetData, isLoading: budgetLoading, isError: budgetIsError, error: budgetErrorObj } = useBudgets();
  const budgetError = budgetIsError ? (budgetErrorObj as Error)?.message || "예산 데이터를 불러오지 못했습니다." : null;

  // 구매내역 데이터 패칭 (승인완료만)
  const {
    data: approvedData,
    isLoading: approvedLoading,
    isError: approvedIsError,
    error: approvedErrorObj,
  } = useAdminOrders({ status: "approved", offset: (currentPage - 1) * itemsPerPage, limit: itemsPerPage, orderBy: sortBy });

  const purchaseListLoading = approvedLoading;
  const purchaseListError = approvedIsError ? (approvedErrorObj as Error)?.message : null;

  // 데이터 파싱
  const statusMap: Record<string, "요청" | "승인"> = { approved: "승인" };
  
  interface OrderItem {
    id: number | string;
    requestDate?: string;
    createdAt?: string;
    requesterName?: string;
    requester?: string;
    productName?: string;
    itemSummary?: string;
    item?: string;
    totalPrice?: number;
    amount?: number;
    approvalDate?: string;
    updatedAt?: string;
    approver?: string;
    managerName?: string;
    manager?: string;
    adminMessage?: string;
  }
  
  const parse = (item: OrderItem): TPurchaseItem => ({
    id: String(item.id),
    requestDate: item.requestDate
      ? formatDate(item.requestDate)
      : item.createdAt
        ? formatDate(item.createdAt)
        : "-",
    requester: item.requesterName || item.requester || "-",
    status: statusMap["approved"],
    item: item.productName || item.itemSummary || item.item || "-",
    amount: typeof item.totalPrice === "number"
      ? item.totalPrice.toLocaleString()
      : typeof item.amount === "number"
        ? item.amount.toLocaleString()
        : "-",
    approvalDate: item.approvalDate
      ? formatDate(item.approvalDate)
      : item.updatedAt
        ? formatDate(item.updatedAt)
        : "-",
    manager: item.approver || item.managerName || item.manager || "-",
    adminMessage: item.adminMessage,
  });
  const purchaseItems: TPurchaseItem[] = (approvedData?.orders || []).map((item: OrderItem) => parse(item));
  const totalCount = approvedData?.meta?.totalCount || 0;
  const totalPages = Math.ceil(totalCount / itemsPerPage);
  const currentItems: TPurchaseItem[] = purchaseItems;

  const handlePageChange = useCallback((page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  }, [totalPages]);

  // 드롭다운 외부 클릭 감지
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

  // 숫자 포맷 유틸
  const formatNumber = (num: number | undefined) => (typeof num === "number" ? num.toLocaleString() + "원" : "-");

  return {
    // 예산 관련
    budgetData,
    budgetLoading,
    budgetError,
    // 구매내역 관련
    purchaseListLoading,
    purchaseListError,
    currentItems,
    totalPages,
    currentPage,
    handlePageChange,
    // 정렬 관련
    sortBy,
    setSortBy,
    dropdownOpen,
    setDropdownOpen,
    // 유틸
    formatNumber,
  };
};
