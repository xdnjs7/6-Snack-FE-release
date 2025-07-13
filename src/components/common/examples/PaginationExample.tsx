"use client";

import { useState } from "react";
import Pagination from "../Pagination";

const PaginationExample = () => {
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
};

export default PaginationExample; 