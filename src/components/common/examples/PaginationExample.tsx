"use client";

import { useState } from "react";
import Pagination from "../Pagination";

/**
 * Pagination 컴포넌트 사용 예시
 * 
 * @description
 * 페이지네이션 컴포넌트의 기본적인 사용법을 보여주는 예시입니다.
 */

export default function PaginationExample() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  return (
    <div className="flex flex-col items-center gap-4">
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
      <div>현재 페이지: {currentPage}</div>
    </div>
  );
} 