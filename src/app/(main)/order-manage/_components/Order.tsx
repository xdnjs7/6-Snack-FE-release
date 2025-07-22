"use client";
import React, { useState } from "react";
import Dropdown from "@/components/common/DropDown";
import Pagination from "@/components/common/Pagination";
import RequestList from "@/components/common/RequestList";
import useOrderVisibleCount from "@/hooks/useOrderVisibleCount";
import OrderManageModal from "@/components/common/OrderManageModal";
import { useModal } from "@/providers/ModalProvider";
import { orderRequests } from "@/app/(preview)/components-preview/PreviewMockData";

function Order() {
  const [sort, setSort] = useState("");
  const [currentPaginationPage, setCurrentPaginationPage] = useState(1);
  const { openModal } = useModal();

  const { visibleCount } = useOrderVisibleCount();

  const dummyRequests = Array.from({ length: 50 }, (_, i) => i + 1);
  const startIdx = (currentPaginationPage - 1) * visibleCount;
  const visibleRequests = dummyRequests.slice(startIdx, startIdx + visibleCount);
  const totalPages = Math.ceil(dummyRequests.length / visibleCount);

  return (
    <div className="pt-[30px] w-full relative">
      <div className="w-full flex justify-between items-center">
        <div className="text-black text-base font-bold">구매 요청 관리</div>
        <Dropdown value={sort} onChange={setSort} />
      </div>
      <div className="space-y-4 mb-4 flex flex-col ">
        {visibleRequests.length > 0 ? (
          <>
            {visibleRequests.map((id) => (
              <RequestList
                key={id}
                orderRequests={orderRequests}
                onClickReject={() => openModal(<OrderManageModal />)}
                onClickApprove={() => openModal(<OrderManageModal />)}
              />
            ))}
            <Pagination
              currentPage={currentPaginationPage}
              totalPages={totalPages}
              onPageChange={setCurrentPaginationPage}
            />
          </>
        ) : (
          <div className="w-80 inline-flex flex-col justify-start items-center gap-7 py-12">
            <div className="w-24 h-24 relative bg-neutral-50 rounded-full overflow-hidden" />
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
        )}
      </div>
    </div>
  );
}

export default Order;
