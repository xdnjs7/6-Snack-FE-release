"use client";
import Dropdown from "@/components/common/DropDown";
import Pagination from "@/components/common/Pagination";
import RequestList from "@/components/common/RequestList";
import useOrderVisibleCount from "@/hooks/useOrderVisibleCount";
import React, { useState } from "react";

function Order() {
  const [sort, setSort] = useState("");
  const [currentPaginationPage, setCurrentPaginationPage] = useState(1);
  const visibleCount = useOrderVisibleCount();

  const dummyRequests = Array.from({ length: 20 }, (_, i) => i + 1);
  const startIdx = (currentPaginationPage - 1) * visibleCount;
  const visibleRequests = dummyRequests.slice(startIdx, startIdx + visibleCount);
  const totalPages = Math.ceil(dummyRequests.length / visibleCount);

  return (
    <div className="pt-[30px] w-full">
      <div className="w-full flex justify-between items-center">
        <div className=" justify-center text-black text-base font-bold">구매 요청 관리</div>
        <Dropdown value={sort} onChange={setSort} />
      </div>
      <div className="space-y-4 mb-4 flex flex-col justify-between items-center">
        {visibleRequests.map((id) => (
          <RequestList key={id} />
        ))}
      </div>
      <Pagination currentPage={currentPaginationPage} totalPages={totalPages} onPageChange={setCurrentPaginationPage} />
    </div>
  );
}

export default Order;
