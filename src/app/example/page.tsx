import SubCategoryMenuExamples from "@/components/common/examples/SubCategoryMenuExamples";
import SideMenuExample from "@/components/common/examples/SideMenuExample";
import PaginationExample from "@/components/common/examples/PaginationExample";

export default function ExamplePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <div className="bg-white border-b border-gray-200 p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">컴포넌트 예시 모음</h1>
          <p className="text-gray-600">다양한 공통 컴포넌트들의 사용법을 확인할 수 있습니다.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* SubCategoryMenu 예시 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-900">SubCategoryMenu</h2>
            <p className="text-gray-600 mt-2">서브카테고리 메뉴 컴포넌트</p>
          </div>
          <SubCategoryMenuExamples />
        </div>

        {/* SideMenu 예시 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-900">SideMenu</h2>
            <p className="text-gray-600 mt-2">모달 형태의 사이드 메뉴 컴포넌트</p>
          </div>
          <SideMenuExample />
        </div>

        {/* Pagination 예시 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-900">Pagination</h2>
            <p className="text-gray-600 mt-2">페이지네이션 컴포넌트</p>
          </div>
          <PaginationExample />
        </div>
      </div>
    </div>
  );
} 