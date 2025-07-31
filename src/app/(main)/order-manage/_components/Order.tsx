"use client";
import Dropdown from "@/components/common/DropDown";
import OrderManageModal from "@/components/common/OrderManageModal";
import Pagination from "@/components/common/Pagination";
import RequestList from "@/components/common/RequestList";
import DogSpinner from "@/components/common/DogSpinner";
import { useOrderVisibleCount } from "@/hooks/useOrderVisibleCount";
import { fetchOrderDetail } from "@/lib/api/orderManage.api";
import { useModal } from "@/providers/ModalProvider";
import { useMemo, useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useBudgets } from "@/hooks/useBudgets";
import { usePendingOrders } from "@/hooks/usePendingOrders";
import { useQueryClient } from "@tanstack/react-query";

export default function Order() {
  const [currentPaginationPage, setCurrentPaginationPage] = useState<number>(1);
  const { openModal } = useModal();
  const queryClient = useQueryClient();

  const orderByMap = useMemo(
    (): Record<string, string> => ({
      최신순: "latest",
      "낮은 가격순": "priceLow",
      "높은 가격순": "priceHigh",
    }),
    [],
  );
  const [orderBy, setOrderBy] = useState<string>(orderByMap["최신순"]);

  const { visibleCount } = useOrderVisibleCount();

  const prevVisibleCountRef = useRef(visibleCount);

  // 예산 정보 가져오기
  const { data: budgetData } = useBudgets();

  // 남은 예산 계산
  const remainingBudget = budgetData?.currentMonthBudget ? budgetData.currentMonthBudget : undefined;

  // 주문 목록 조회
  const offset = (currentPaginationPage - 1) * visibleCount;
  const {
    data: orderData,
    isLoading,
    error,
  } = usePendingOrders({
    offset,
    limit: visibleCount,
    orderBy,
  });

  const orderRequests = orderData?.orders || [];
  const totalCount = orderData?.meta?.totalCount || 0;
  const totalPages = Math.ceil(totalCount / visibleCount);

  // 승인/반려 완료 후 캐시 무효화 및 모달 닫기
  const handleOrderActionComplete = () => {
    queryClient.invalidateQueries({ queryKey: ["pendingOrders"] });
  };

  // visibleCount가 변경될 때 페이지 조정
  useEffect(() => {
    if (prevVisibleCountRef.current !== visibleCount) {
      const currentOffset = (currentPaginationPage - 1) * prevVisibleCountRef.current;
      const newPage = Math.floor(currentOffset / visibleCount) + 1;

      const adjustedPage = Math.max(1, newPage);

      setCurrentPaginationPage(adjustedPage);
      prevVisibleCountRef.current = visibleCount;
    }
  }, [visibleCount, currentPaginationPage]);

  if (error) {
    return (
      <div className="pt-[30px] w-full relative">
        <div className="text-center py-12 text-red-600">주문 데이터를 불러오는데 실패했습니다.</div>
      </div>
    );
  }

  return (
    <div className="pt-[30px] w-full relative">
      <div className="w-full flex justify-between items-center gap-3 pb-3">
        <div className="text-black text-base font-bold">구매 요청 관리</div>
        <Dropdown
          onChange={(selected) => setOrderBy(orderByMap[selected] || orderByMap["최신순"])}
          options={["최신순", "낮은 가격순", "높은 가격순"]}
        />
      </div>

      <div className="flex flex-col">
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <DogSpinner />
          </div>
        ) : orderRequests.length > 0 ? (
          <>
            <RequestList
              orderRequests={orderRequests}
              remainingBudget={remainingBudget}
              onClickReject={async (orderSummary) => {
                const fullOrder = await fetchOrderDetail(orderSummary.id);
                openModal(<OrderManageModal order={fullOrder} type="reject" onClick={handleOrderActionComplete} />);
              }}
              onClickApprove={async (orderSummary) => {
                const fullOrder = await fetchOrderDetail(orderSummary.id);
                openModal(<OrderManageModal order={fullOrder} type="approve" onClick={handleOrderActionComplete} />);
              }}
            />
            <Pagination
              className="mt-[20px] sm:mt-10"
              currentPage={currentPaginationPage}
              totalPages={totalPages}
              onPageChange={setCurrentPaginationPage}
            />
          </>
        ) : (
          <div className="flex flex-1 justify-center min-h-screen">
            <div className="sm:w-80 inline-flex flex-col justify-start items-center gap-7 py-12 mt-[142px] sm:mt-[222px] md:mt-[191px]">
              <div className="w-24 h-24 relative">
                <Image src="/ic_no_order.svg" alt="주문 내역 없음" fill className="object-contain" />
              </div>
              <div className="self-stretch flex flex-col justify-start items-center gap-12">
                <div className="w-72 flex flex-col justify-start items-center gap-2.5">
                  <div className="self-stretch text-center text-neutral-800 text-2xl font-extrabold">
                    요청 내역이 없어요
                  </div>
                  <div className="self-stretch text-center text-neutral-700 text-base leading-relaxed">
                    상품 리스트를 둘러보고
                    <br />
                    상품을 담아보세요
                  </div>
                </div>
                <button
                  className="self-stretch h-16 px-4 py-3 bg-neutral-800 rounded-sm inline-flex justify-center items-center"
                  onClick={() => {}}
                >
                  <div className="text-white text-base font-bold">상품 리스트로 이동</div>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
