"use client";

import { useState } from "react";
import Pagination from "./Pagination";

const PaginationExample = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 4;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    console.log("페이지 변경:", page);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h2 className="text-2xl font-bold mb-6">페이지네이션 예시</h2>
      
      {/* Responsive Pagination */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">반응형 페이지네이션</h3>
        <p className="text-sm text-gray-600 mb-4">
          • 모바일/태블릿 미만: 작은 크기<br/>
          • 태블릿 이상: 큰 크기
        </p>
        <div className="w-full">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
        <p className="text-sm text-gray-600 mt-2">
          현재 페이지: {currentPage} / {totalPages}
        </p>
      </div>



      {/* Test Controls */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">테스트 컨트롤</h3>
        <div className="space-y-2">
          <div>
            <label className="block text-sm font-medium mb-1">페이지 변경:</label>
            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 rounded text-sm ${
                    currentPage === page
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Usage Instructions */}
      <div className="mt-8 bg-blue-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">사용법</h3>
        <ul className="text-sm space-y-1">
          <li>• <code>currentPage</code>: 현재 페이지 번호 (필수)</li>
          <li>• <code>totalPages</code>: 전체 페이지 수 (필수)</li>
          <li>• <code>onPageChange</code>: 페이지 변경 시 호출되는 콜백 함수 (필수)</li>
          <li>• <code>onPrevPage</code>: 이전 페이지로 이동 시 호출되는 콜백 함수 (선택사항)</li>
          <li>• <code>onNextPage</code>: 다음 페이지로 이동 시 호출되는 콜백 함수 (선택사항)</li>
          <li>• <code>className</code>: 추가 CSS 클래스 (선택사항)</li>
          <li>• 첫 페이지에서는 Prev 버튼이 비활성화됩니다</li>
          <li>• 마지막 페이지에서는 Next 버튼이 비활성화됩니다</li>
          <li>• <strong>반응형:</strong> 태블릿 이상(744px+)에서는 큰 크기, 그 아래에서는 작은 크기</li>
          <li>• onPrevPage, onNextPage가 제공되지 않으면 onPageChange를 사용합니다</li>
        </ul>
      </div>
    </div>
  );
};

export default PaginationExample; 