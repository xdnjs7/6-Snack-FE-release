"use client";

import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { getAdminOrders } from "@/lib/api/order.api"; // 경로가 맞는지 확인해주세요
import { getBudgets } from "@/lib/api/budgets.api"; // 경로가 맞는지 확인해주세요
import Dropdown from "@/components/common/DropDown";
import fileIcon from "@/assets/icons/ic_file.svg"
import Image from "next/image";

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

// 예산/지출/총액 API 응답 타입
interface BudgetSummaryApi {
  id: number;
  companyId: number;
  currentMonthExpense: number;
  currentMonthBudget: number;
  monthlyBudget: number;
  year: string;
  month: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  currentYearTotalExpense: number;
  previousMonthBudget: number;
  previousMonthExpense: number;
  previousYearTotalExpense: number;
}

const formatNumber = (num: number | undefined) => (typeof num === "number" ? num.toLocaleString() + "원" : "-");

const OrderHistoryPage = () => {
  // PurchaseSummary 상태
  const [budgetData, setBudgetData] = useState<BudgetSummaryApi | null>(null);
  const [budgetLoading, setBudgetLoading] = useState(false);
  const [budgetError, setBudgetError] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false); // Add state for hover

  // PurchaseList 상태
  const [purchaseItems, setPurchaseItems] = useState<TPurchaseItem[]>([]);
  const [sortBy, setSortBy] = useState<string>("latest");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [purchaseListLoading, setPurchaseListLoading] = useState(false);
  const [purchaseListError, setPurchaseListError] = useState<string | null>(null);
  const itemsPerPage = 4;
  const [totalCount, setTotalCount] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // PurchaseSummary 데이터 로드
  useEffect(() => {
    const fetchData = async () => {
      setBudgetLoading(true);
      setBudgetError(null);
      try {
        const res = await getBudgets();
        setBudgetData(res);
      } catch (e: unknown) {
        let msg = "예산 데이터를 불러오지 못했습니다.";
        if (typeof e === "object" && e !== null && "message" in e) {
          const err = e as { message?: string };
          if (typeof err.message === "string") {
            msg = err.message;
          }
        }
        setBudgetError(msg);
      } finally {
        setBudgetLoading(false);
      }
    };
    fetchData();
  }, []);

  // PurchaseList 드롭다운 외부 클릭 감지
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

  // PurchaseList 데이터 로드
  useEffect(() => {
    const fetchData = async () => {
      setPurchaseListLoading(true);
      setPurchaseListError(null);
      try {
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
        let msg = "구매 내역 데이터를 불러오지 못했습니다.";
        if (typeof e === "object" && e !== null && "message" in e) {
          const err = e as { message?: string };
          if (typeof err.message === "string") {
            msg = err.message;
          }
        }
        setPurchaseListError(msg);
      } finally {
        setPurchaseListLoading(false);
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

  return (
    <div
      className={clsx(
        "min-h-screen",
        "text-neutral-800", // 기본 텍스트 색상
        "font-suit", // 폰트 적용
        "flex",
        "flex-col",
      )}
    >
      {/* Main Content Area */}
      <main className={clsx("flex-1", "p-6 sm:p-8 md:p-10", "max-w-[1352px]", "mx-auto", "w-full", "relative")}
        style={{ background: "var(--color-white)" }} // 배경색 전역 변수 적용
      >
        <div className="flex flex-row justify-between items-center mb-6">
          <div className="text-lg sm:text-2xl font-bold font-suit" style={{ color: "var(--color-primary-950)" }}>구매 내역 확인</div>
          <div className="relative custom-sort-dropdown">
            <Dropdown
              options={["최신순", "오래된순"]}
              onChange={(selectedOption: string) => {
                // 선택된 옵션에 따라 sortBy 상태 업데이트
                if (selectedOption === "최신순") {
                  setSortBy("latest");
                } else if (selectedOption === "오래된순") {
                  setSortBy("oldest"); // API에서 'oldest' 또는 'asc' 등으로 사용한다면 맞춰야 합니다.
                }
              }}
            />
          </div>
        </div>
        {/* PurchaseSummary 컴포넌트 내용 */}
        {budgetLoading ? (
          <div className="py-8 text-center" style={{ color: "var(--color-secondary-500)" }}>예산 정보 로딩 중...</div>
        ) : budgetError ? (
          <div className="py-8 text-center" style={{ color: "var(--color-error-500)" }}>{budgetError}</div>
        ) : !budgetData ? null : (
          <div className="w-full flex flex-col gap-4 mb-8">
            {/* 카드 3개 (모바일: 세로, 태블릿/PC: 가로) */}
            <div className="relative flex flex-col gap-4 sm:flex-row sm:gap-5">
              {/* 이번 달 예산 */}
              <div className="flex-1 flex flex-col justify-between w-[414.67px] h-[150px] pt-[30px] pr-[40px] pb-[30px] pl-[30px] gap-2 rounded-[4px] opacity-100"
                style={{ background: "var(--color-primary-50)" }}>
                <div className="flex flex-row items-center justify-between w-full mb-2">
                  <div className="text-neutral-800 text-base sm:text-lg font-bold font-suit" style={{ color: "var(--color-primary-950)" }}>이번 달 예산</div>
                  <div className="text-neutral-800 text-lg sm:text-2xl font-extrabold font-suit" style={{ color: "var(--color-primary-950)" }}>
                    {formatNumber(budgetData.currentMonthBudget)}
                  </div>
                </div>
                <div className="text-stone-500 text-sm sm:text-base font-normal font-suit leading-snug mt-0" style={{ color: "var(--color-primary-400)" }}>
                  지난 달 예산은
                  <br />
                  {formatNumber(budgetData.previousMonthBudget)}였어요
                </div>
              </div>
              {/* 이번 달 지출액 */}
              <div
                className="flex-1 flex flex-col justify-between relative w-[414.67px] h-[150px] pt-[30px] pr-[40px] pb-[30px] pl-[30px] gap-0 rounded-[4px] opacity-100 overflow-visible"
                style={{ background: "var(--color-primary-50)" }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <div className="flex flex-row items-center justify-between w-full mb-0">
                  <div className="text-neutral-800 text-base sm:text-lg font-bold font-suit" style={{ color: "var(--color-primary-950)" }}>이번 달 지출액</div>
                  <div className="text-neutral-800 text-lg sm:text-2xl font-extrabold font-suit" style={{ color: "var(--color-primary-950)" }}>
                    {formatNumber(budgetData.currentMonthExpense)}
                  </div>
                </div>
                <div className="text-stone-500 text-sm sm:text-base font-normal font-suit" style={{ color: "var(--color-primary-400)" }}>
                  지난 달: {formatNumber(budgetData.previousMonthExpense)}
                </div>
                {/* 진행바 */}
                <div className="w-full flex items-center gap-0 mt-0">
                  <div className="flex-1 h-1.5 rounded-md overflow-hidden" style={{ background: "var(--color-primary-200)" }}>
                    <div
                      className="h-1.5 rounded-md"
                      style={{
                        background: "var(--color-secondary-500)",
                        width: `${budgetData.currentMonthExpense > 0 && budgetData.currentMonthBudget > 0
                          ? Math.max(
                            1,
                            Math.round((budgetData.currentMonthExpense / budgetData.currentMonthBudget) * 100),
                          )
                          : 0
                          }%`,
                      }}
                    />
                  </div>
                  <div className="text-neutral-800 text-xs sm:text-sm font-normal font-suit min-w-[32px] text-right" style={{ color: "var(--color-primary-950)" }}>
                    {budgetData.currentMonthBudget > 0
                      ? `${budgetData.currentMonthExpense > 0 ? Math.max(1, Math.round((budgetData.currentMonthExpense / budgetData.currentMonthBudget) * 100)) : 0}%`
                      : "-"}
                  </div>
                </div>
                {/* 남은 예산 정보 박스 (Hover 시 노출 - 데스크탑) */}
                {isHovered && (
                  <div
                    className={clsx(
                      "hidden sm:flex",
                      "absolute",
                      "left-[47%]",
                      "top-32",
                      "-translate-x-1/2",
                      "mt-0",
                      "w-[calc(80%)]",
                      "p-6",
                      "rounded-[12px]",
                      "flex-col",
                      "justify-center",
                      "items-start",
                      "gap-2",
                      "z-10",
                      "pointer-events-none", // 호버된 상태에서 클릭 방지
                    )}
                    style={{ background: "var(--color-primary-950)" }}
                  >
                    <div className="inline-flex justify-start items-center gap-1">
                      <div className="text-white text-base font-extrabold font-suit">이번 달 남은 예산:</div>
                      <div className="text-white text-base font-extrabold font-suit">
                        {formatNumber(budgetData.currentMonthBudget - budgetData.currentMonthExpense)}
                      </div>
                    </div>
                    <div className="inline-flex justify-start items-center gap-1">
                      <div className="text-white text-sm font-normal font-suit">지난 달 남은 예산:</div>
                      <div className="text-white text-sm font-normal font-suit">
                        {formatNumber(budgetData.previousMonthBudget - budgetData.previousMonthExpense)}
                      </div>
                    </div>
                    <div className="text-white text-sm font-normal font-suit">
                      {`지난 달보다 ${(budgetData.currentMonthExpense - budgetData.previousMonthExpense).toLocaleString()}원 ${budgetData.currentMonthExpense - budgetData.previousMonthExpense > 0 ? "더 사용했어요" : "덜 사용했어요"}`}
                    </div>
                  </div>
                )}
              </div>
              {/* 올해 총 지출액 */}
              <div className="flex-1 flex flex-col justify-between w-[414.67px] h-[150px] pt-[30px] pr-[40px] pb-[30px] pl-[30px] gap-2 rounded-[4px] opacity-100"
                style={{ background: "var(--color-primary-50)" }}>
                <div className="flex flex-row items-center justify-between w-full mb-2">
                  <div className="text-neutral-800 text-base sm:text-lg font-bold font-suit" style={{ color: "var(--color-primary-950)" }}>올해 총 지출액</div>
                  <div className="text-neutral-800 text-lg sm:text-2xl font-extrabold font-suit" style={{ color: "var(--color-primary-950)" }}>
                    {formatNumber(budgetData.currentYearTotalExpense)}
                  </div>
                </div>
                <div className="text-stone-500 text-sm sm:text-base font-normal font-suit leading-snug mt-auto" style={{ color: "var(--color-primary-400)" }}>
                  {`올해 작년보다`}
                  <br />
                  {`${(budgetData.currentYearTotalExpense - budgetData.previousYearTotalExpense).toLocaleString()}원 ${budgetData.currentYearTotalExpense - budgetData.previousYearTotalExpense > 0
                    ? "더 지출했어요"
                    : "덜 지출했어요"
                    }`}
                </div>
              </div>
            </div>
            {/* 모바일용 남은 예산 정보 박스 (항상 노출 - 모바일) */}
            <div className="flex sm:hidden w-full p-6 rounded-[12px] flex-col justify-center items-start gap-2 mt-4"
              style={{ background: "var(--color-primary-950)" }}>
              <div className="inline-flex justify-start items-center gap-1">
                <div className="text-white text-base font-extrabold font-suit">이번 달 남은 예산:</div>
                <div className="text-white text-base font-extrabold font-suit">
                  {formatNumber(budgetData.currentMonthBudget - budgetData.currentMonthExpense)}
                </div>
              </div>
              <div className="inline-flex justify-start items-center gap-1">
                <div className="text-white text-sm font-normal font-suit">지난 달 남은 예산:</div>
                <div className="text-white text-sm font-normal font-suit">
                  {formatNumber(budgetData.previousMonthBudget - budgetData.previousMonthExpense)}
                </div>
              </div>
              <div className="text-white text-sm font-normal font-suit">
                {`지난 달보다 ${(budgetData.currentMonthExpense - budgetData.previousMonthExpense).toLocaleString()}원 ${budgetData.currentMonthExpense - budgetData.previousMonthExpense > 0 ? "더 사용했어요" : "덜 사용했어요"}`}
              </div>
            </div>
          </div>
        )}

        {/* PurchaseList 컴포넌트 내용 */}
        <div
          className={clsx(
            "bg-white",
            "p-0 sm:p-4 md:p-6",
            "rounded-lg",
            "shadow-sm",
            "w-full",
            "overflow-x-auto",
            "border-neutral-200",
          )}
          style={{ boxShadow: "none", background: "white" }} // 기존 그림자 제거 및 배경색 명시
        >
          {/* 상단: 타이틀 + 정렬 버튼 */}
          {/* <div className="flex flex-col sm:flex-row sm:justify-end sm:items-center gap-2 px-6 pt-6 pb-2"> */}
          {/* 이 부분은 삭제됨, 상단으로 이동 */}
          {/* </div> */}

          {/* 리스트/테이블 */}
          <div className="w-full px-0 sm:px-6 pb-4">
            {purchaseListLoading ? (
              <div className="flex items-center justify-center py-16 text-blue-600">구매 내역 로딩 중...</div>
            ) : purchaseListError ? (
              <div className="flex items-center justify-center py-16 text-red-500">{purchaseListError}</div>
            ) : currentItems.length === 0 ? (
              <>
                {/* 모바일: sm 미만 */}
                <div className="block sm:hidden w-full flex justify-center items-center py-16">
                  <div className="self-stretch inline-flex flex-col justify-start items-center gap-5 w-full">
                    <div className="w-24 h-24 relative bg-neutral-50 rounded-[100px] overflow-hidden mb-2" />
                    <div className="self-stretch flex flex-col justify-start items-center gap-10 w-full">
                      <div className="w-72 flex flex-col justify-start items-center gap-2.5">
                        <div className="self-stretch text-center justify-center text-neutral-800 text-lg font-extrabold font-['SUIT']">
                          구매 내역이 없어요
                        </div>
                        <div className="self-stretch text-center justify-center text-neutral-700 text-sm font-normal font-['SUIT'] leading-snug">
                          상품 리스트를 둘러보고
                          <br />
                          관리자에게 요청해보세요
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => console.log("구매 요청 내역으로 이동")}
                        data-size="Default"
                        data-state="normal"
                        data-type="filled"
                        className="self-stretch h-16 px-4 py-3 bg-neutral-800 rounded-sm inline-flex justify-center items-center w-full"
                      >
                        <div className="text-center justify-center text-white text-base font-bold font-['SUIT']">
                          구매 요청 내역으로 이동
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
                {/* 태블릿/데스크탑: sm 이상 */}
                <div className="hidden sm:flex w-full justify-center items-center py-24">
                  <div className="w-80 inline-flex flex-col justify-start items-center gap-7">
                    <div className="flex justify-center w-24 h-24 relative bg-neutral-50 rounded-[100px] overflow-hidden mb-2">
                      <Image src={fileIcon} alt="빈 문서 아이콘" width={36} height={43} priority />
                    </div>
                    <div className="self-stretch flex flex-col justify-start items-center gap-12">
                      <div className="w-72 flex flex-col justify-start items-center gap-2.5">
                        <div className="self-stretch text-center justify-center text-neutral-800 text-2xl font-extrabold font-['SUIT']">
                          구매 내역이 없어요
                        </div>
                        <div className="self-stretch text-center justify-center text-neutral-700 text-base font-normal font-['SUIT'] leading-relaxed">
                          구매 요청을 승인하고
                          <br />
                          상품을 주문해보세요
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => console.log("구매 요청 내역으로 이동")}
                        data-size="Default"
                        data-state="normal"
                        data-type="filled"
                        className="self-stretch h-16 px-4 py-3 bg-neutral-800 rounded-sm inline-flex justify-center items-center"
                      >
                        <div className="text-center justify-center text-white text-base font-bold font-['SUIT']">
                          구매 요청 내역으로 이동
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* 모바일: 카드형 */}
                <div className="block sm:hidden">
                  <div className="flex flex-col gap-4">
                    {currentItems.map((item) => (
                      <div
                        key={item.id}
                        className="bg-[color:var(--color-primary-100)] rounded-[12px] p-5 flex flex-col gap-3 shadow-sm" // Figma 시안: 배경색 #F5F5F5, rounded-12px
                        style={{
                          border: "1px solid var(--color-primary-100)",
                          width: "100%",
                        }}
                      >
                        <div className="flex justify-between items-center border-b border-neutral-200 pb-3 mb-2">
                          <div className="text-neutral-800 text-base font-bold font-suit">{item.item}</div>
                          <div className="text-neutral-800 text-lg font-extrabold font-suit">{item.amount}</div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <div className="flex justify-between items-center">
                            <span className="text-neutral-500 text-sm font-normal font-suit">구매 요청일</span>{" "}
                            {/* Figma 시안: #808080 */}
                            <span className="text-neutral-800 text-sm font-bold font-suit">
                              {item.requestDate}
                            </span>{" "}
                            {/* Figma 시안: #3C3C3C */}
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-neutral-500 text-sm font-normal font-suit">요청인</span>
                            <span className="flex items-center gap-2">
                              <span className="text-neutral-800 text-sm font-bold font-suit">{item.requester}</span>
                              <span
                                className={clsx(
                                  "px-2 py-1 rounded-[100px] text-xs font-bold font-suit",
                                  item.status === "요청"
                                    ? "bg-blue-50 text-blue-600" // Figma 시안: 요청 #EBF2FF, 텍스트 #2563EB
                                    : "bg-[color:var(--color-primary-100)] text-neutral-600", // 승인 #E5E5E5
                                )}
                              >
                                {item.status}
                              </span>
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-neutral-500 text-sm font-normal font-suit">구매 승인일</span>
                            <span className="text-neutral-800 text-sm font-bold font-suit">{item.approvalDate}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-neutral-500 text-sm font-normal font-suit">담당자</span>
                            <span className="text-neutral-800 text-sm font-bold font-suit">{item.manager}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {/* 태블릿/PC: 테이블형 */}
                <div className="hidden sm:block">
                  <table className="min-w-full divide-y divide-neutral-200">
                    {" "}
                    {/* Figma 시안: divide border #E5E5E5 */}
                    <thead className="bg-white">
                      <tr
                        style={{
                          borderTop: "1px solid #E5E5E5",
                          borderBottom: "1px solid #E5E5E5",
                          width: "100%",
                        }}
                      >
                        <th className="px-6 py-4 text-left text-base font-bold text-neutral-500 font-suit">
                          구매 요청일
                        </th>{" "}
                        {/* Figma 시안: #808080 */}
                        <th className="px-6 py-4 text-left text-base font-bold text-neutral-500 font-suit">요청인</th>
                        <th className="px-6 py-4 text-left text-base font-bold text-neutral-500 font-suit">
                          구매 품목
                        </th>
                        <th className="px-6 py-4 text-left text-base font-bold text-neutral-500 font-suit">금액</th>
                        <th className="px-6 py-4 text-left text-base font-bold text-neutral-500 font-suit">
                          구매 승인일
                        </th>
                        <th className="px-6 py-4 text-left text-base font-bold text-neutral-500 font-suit">담당자</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-neutral-100">
                      {" "}
                      {/* 각 행 사이에 구분선 */}
                      {currentItems.map((item) => (
                        <tr
                          key={item.id}
                          className="h-20 align-middle"
                          style={{
                            borderBottom: "1px solid #E5E5E5", // Figma 시안: 테이블 행 하단 border #E5E5E5
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
                                  item.status === "요청"
                                    ? "bg-blue-50 text-blue-600" // Figma 시안: 요청 #EBF2FF, 텍스트 #2563EB
                                    : "bg-[color:var(--color-primary-100)] text-neutral-600", // 승인 #E5E5E5
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
              </>
            )}
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
                  "flex items-center gap-1.5 px-3 py-2 rounded-md",
                  "text-neutral-500 text-base font-normal font-suit", // Figma 시안: 텍스트 #808080
                  "bg-white", // Figma 시안: 배경 흰색, 테두리 #E5E5E5
                  "hover:bg-neutral-100", // Figma 시안: 호버 시 배경 #F5F5F5
                  "transition-colors duration-200",
                  currentPage === 1 && "opacity-50 cursor-not-allowed",
                )}
              >
                <span className="w-6 h-6 flex items-center justify-center">
                  <svg
                    width="8"
                    height="14"
                    viewBox="0 0 8 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="block mx-auto my-auto"
                  >
                    <path
                      d="M7 13L1 7L7 1"
                      stroke="#A3A3A3"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />{" "}
                    {/* Figma 시안: stroke #A3A3A3 */}
                  </svg>
                </span>
                Prev
              </button>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={clsx(
                  "flex items-center gap-1.5 px-3 py-2 rounded-md",
                  "text-neutral-800 text-base font-normal font-suit", // Figma 시안: 텍스트 #3C3C3C
                  "bg-white", // Figma 시안: 배경 흰색, 테두리 #E5E5E5
                  "hover:bg-neutral-100", // Figma 시안: 호버 시 배경 #F5F5F5
                  "transition-colors duration-200 ml-2",
                  currentPage === totalPages && "opacity-50 cursor-not-allowed",
                )}
              >
                Next
                <span className="w-6 h-6 flex items-center justify-center">
                  <svg
                    width="8"
                    height="14"
                    viewBox="0 0 8 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="block mx-auto my-auto"
                  >
                    <path
                      d="M1 1L7 7L1 13"
                      stroke="#222"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />{" "}
                    {/* Figma 시안: stroke #222222 */}
                  </svg>
                </span>
              </button>
            </div>
          </nav>
        </div>
      </main>
    </div>
  );
};

export default OrderHistoryPage;
