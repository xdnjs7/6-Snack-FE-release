"use client";

// 작업 완료시 삭제 필수!!
// 해당 페이지에 본인이 작업한 공통 컴포넌트 넣어서 테스트하면 좋을거같아요!

import { useState } from "react";
import TextArea from "@/components/common/TextArea";
import MemberList from "@/components/common/MemberList";
import Dropdown from "@/components/common/DropDown";
import { TMemberItem } from "@/types/meberList.types";
import ProductList from "@/components/common/ProductList";
import Toast from "@/components/common/Toast";
import Button from "@/components/ui/Button";
import RequestList from "@/components/common/RequestList";
import GlobalHeader from "@/components/layout/GlobalHeader";
import SubCategoryItem from "@/components/common/SubCategoryItem";
import Card from "@/components/ui/Card";
import img_coke_zero from "@/assets/images/img_coke_zero.webp";
import SearchBar from "@/components/ui/SearchBar";
import Badge from "@/components/ui/Badge";
import SubCategoryMenu from "@/components/common/SubCategoryMenu";
import SideMenu from "@/components/common/SideMenu";
import Pagination from "@/components/common/Pagination";
import { TCategoryItem } from "@/types/subCategoryMenu.types";
import { TSideMenuItem } from "@/types/sideMenu.types";
import Menu from "@/components/common/Menu";
import TabMenu from "@/components/common/TabMenu";

export default function ComponentsPreviewPage() {
  const [requestMessage, setRequestMessage] = useState("");
  const [categoryOption, setCategoryOption] = useState("다른거");
  const [budget] = useState(60000);
  const categoryOptions = ["음료", "과자", "아이스크림", "도시락", "라면", "사탕", "초콜릿", "떡볶이", "비빔밥"];
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [currentPaginationPage, setCurrentPaginationPage] = useState(1);

  const [members, setMembers] = useState<TMemberItem[]>([
    {
      id: "1",
      name: "김스낵",
      email: "sn@codeit.com",
      role: "ADMIN",
    },
    {
      id: "2",
      name: "이유저",
      email: "user@example.com",
      role: "USER",
    },
  ]);

  const handleDeleteUser = (id: string) => {
    setMembers((prev) => prev.filter((member) => member.id !== id));
  };

  const [sort, setSort] = useState("");

  const handleShowToast = () => {
    setIsToastVisible(true);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  // 모달을 여는 함수
  const handleOpenModal = () => {
    setIsModalOpen(true); // isModalOpen 상태를 true로 변경하여 모달을 엽니다.
    // 필요하다면 여기에서 setProductNameToDelete('새로운 상품명') 등으로 상품명을 동적으로 설정할 수 있습니다.
  };

  return (
    <div className="max-w-[1440px] p-6 pb-[60px] space-y-6 bg-white min-h-screen">
      <h1 className="text-2xl font-bold">🧪 공통 컴포넌트 모음</h1>

      <p className="mb-4 font-bold text-xl bg-violet-100">조성빈</p>
      <div className="rounded-lg shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] p-6">
        <div className="space-y-4 mb-4">
          <h2 className="text-lg font-semibold bg-blue-100">TextArea 컴포넌트</h2>
          <TextArea
            value={requestMessage}
            onChange={(e) => setRequestMessage(e.target.value)}
            placeholder="요청 메시지를 입력해주세요"
          />
        </div>

        <div className="space-y-4 mb-4">
          <h2 className="text-lg font-semibold bg-blue-100">MemberList 컴포넌트</h2>
          {members.map((member) => (
            <MemberList key={member.id} {...member} onClickDeleteUser={handleDeleteUser} />
          ))}
        </div>

        <div className="space-y-4 mb-4">
          <h2 className="text-lg font-semibold bg-blue-100">Dropdown 컴포넌트</h2>
          <Dropdown value={sort} onChange={setSort} />
          <Dropdown value={categoryOption} onChange={setCategoryOption} options={categoryOptions} />
        </div>

        <div className="space-y-4 mb-4">
          <h2 className="text-lg font-semibold bg-blue-100">Toast 컴포넌트</h2>
          <button
            onClick={handleShowToast}
            className="px-6 py-2 bg-black text-white rounded hover:bg-neutral-800 transition"
          >
            토스트 띄우기
          </button>

          {isToastVisible && (
            <Toast text="예산이 부족합니다." budget={budget} onClose={() => setIsToastVisible(false)} />
          )}
        </div>
      </div>

      <p className="mb-4 font-bold text-xl bg-violet-100">이태빈</p>
      <div className="rounded-lg shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] p-6">
        <div className="space-y-4 mb-4">
          <h2 className="text-lg font-semibold bg-blue-100">SubCategoryItem 컴포넌트</h2>
          <SubCategoryItem />
        </div>

        <div className="space-y-4 mb-4">
          <h2 className="text-lg font-semibold bg-blue-100">ProductList 컴포넌트</h2>
          <ProductList />
        </div>

        <div className="space-y-4 mb-4">
          <h2 className="text-lg font-semibold bg-blue-100">RequestList 컴포넌트</h2>
          <RequestList />
        </div>
      </div>

      <p className="mb-4 font-bold text-xl bg-violet-100">김우주</p>
      <div className="rounded-lg shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] p-6">
        <div className="space-y-4 mb-4">
          <h2 className="text-lg font-semibold bg-blue-100">Card 컴포넌트</h2>
          <Card name="코카콜라 제로" purchaseCount={29} price={3000} imageUrl={img_coke_zero} />
        </div>

        <div className="space-y-4 mb-4">
          <h2 className="text-lg font-semibold bg-blue-100">SearchBar 컴포넌트</h2>
          <SearchBar />
        </div>

        <div className="space-y-4 mb-4">
          <h2 className="text-lg font-semibold bg-blue-100">Badge 컴포넌트</h2>
          <div className="flex">
            <div className="w-18">
              <Badge type="request" />
            </div>
            <div className="w-19">
              <Badge type="rejected" />
              <Badge type="approved" />
              <Badge type="pending" />
            </div>
            <div className="w-18">
              <Badge type="admin" />
              <Badge type="user" />
            </div>
          </div>
        </div>

        <div className="space-y-4 mb-4">
          <h2 className="text-lg font-semibold bg-blue-100">Button 컴포넌트</h2>
          <div className="flex gap-5">
            <div className="flex flex-col w-96 gap-1">
              <Button type="black" label="Black 버튼" />
              <Button type="primary" label="Primary 버튼" />
              <Button type="lightDisabled" label="LightDisabled 버튼" />
            </div>
            <div className="flex flex-col w-96 gap-1">
              <Button type="whiteOutline" label="White Outline 버튼" />
              <Button type="light" label="Light 버튼" />
              <Button type="whiteDisabled" label="whiteDisabled 버튼" />
            </div>
            <Button
              type="primary"
              label="Primary textClassName"
              textClassName="text-lg font-semibold w-24 h-10 flex items-center justify-center"
            />
          </div>
        </div>
      </div>

      <p className="mb-4 font-bold text-xl bg-violet-100">이지수</p>
      <div className="rounded-lg shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] p-6">
        <div className="space-y-4 mb-4">
          <h2 className="text-lg font-semibold bg-blue-100">[컴포넌트 이름] 컴포넌트</h2>
          {/* 아래 예시처럼 본인 컴포넌트 불러오기 */}
          {/* <SearchBar /> */}
        </div>

        <div className="space-y-4 mb-4">
          <h2 className="text-lg font-semibold bg-blue-100">[컴포넌트 이름] 컴포넌트</h2>
          {/* 아래 예시처럼 본인 컴포넌트 불러오기 */}
          {/* <SearchBar /> */}
        </div>

        <div className="space-y-4 mb-4">
          <h2 className="text-lg font-semibold bg-blue-100">[컴포넌트 이름] 컴포넌트</h2>
          {/* 아래 예시처럼 본인 컴포넌트 불러오기 */}
          {/* <SearchBar /> */}
          <div className="flex flex-col gap-2">
            <h2>Menu - 메뉴 컴포넌트 (예산관리/회원관리 페이지 )</h2>
            <Menu icon="user" text="회원관리" isActive={false} />
            <Menu icon="user" text="회원관리" isActive={true} />
            <Menu icon="budget" text="예산관리" isActive={false} />
            <Menu icon="budget" text="예산관리" isActive={true} />
          </div>
          <div className="flex flex-col gap-2">
            <h2>TabMenu - 탭 메뉴 컴포넌트</h2>
            <TabMenu isUserTabActive={true} />
            <TabMenu isUserTabActive={false} />
          </div>
        </div>
      </div>

      <p className="mb-4 font-bold text-xl bg-violet-100">김홍섭</p>
      <div className="rounded-lg shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] p-6">
        <div className="space-y-4 mb-4">
          <h2 className="text-lg font-semibold bg-blue-100">[상품 수정 모달]</h2>
          <ProductEditForm />
          <h2 className="text-lg font-semibold bg-blue-100">[상품 등록 모달]</h2>
          <ProductRegistrationForm />
          <h2 className="text-lg font-semibold bg-blue-100">[My Request List(요청 취소 가능)]</h2>
          <RequestListItem
            requestDate="2024. 07. 04"
            productName="코카콜라 제로"
            price={1900}
            status="대기중"
            onRequestCancel={() => {}}
          />
          <h2 className="text-lg font-semibold bg-blue-100">[Input]</h2>
          <div>
            <Input value={inputValue} onChange={setInputValue} unit="원" label="floating label" />
            <p>현재 입력된 값: {inputValue}</p>
          </div>
          <h2 className="text-lg font-semibold bg-blue-100">
            [삭제 확인 모달] Props 전달로 모달 메시지, 버튼 텍스트 변경 가능
          </h2>
          {/* 이 버튼을 클릭하면 isModalOpen 상태가 true로 바뀌어 모달이 열립니다. */}
          <button
            onClick={handleOpenModal}
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              cursor: "pointer",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "5px",
            }}
          >
            상품 삭제 모달 열기
          </button>
          <ConfirmationModal isOpen={isModalOpen} productName="예시 상품" onCancel={() => {}} onDelete={() => {}} />
          <h2 className="text-lg font-semibold bg-blue-100">
            [구매 요청 취소 모달] Props 전달로 모달 메시지, 버튼 텍스트 변경 가능
          </h2>
          {/* 이 버튼을 클릭하면 isModalOpen 상태가 true로 바뀌어 모달이 열립니다. */}
          <button
            onClick={handleOpenModal}
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              cursor: "pointer",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "5px",
            }}
          >
            구매 요청 취소 모달 열기
          </button>
          <ConfirmationModal
            isOpen={isModalOpen}
            productName="예시 상품"
            onCancel={() => {}}
            onDelete={() => {}}
            modalTitle="구매 요청을 취소하시겠어요?"
            modalDescription="구매 요청 취소 후에는 복구할 수 없습니다."
            confirmButtonText="요청 취소"
          />
        </div>
      </div>

      <p className="mb-4 font-bold text-xl bg-violet-100">장원빈</p>
      <div className="rounded-lg shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] p-6">
        <div className="space-y-4 mb-4">
          <h2 className="text-lg font-semibold bg-blue-100">SubCategoryMenu 컴포넌트</h2>
          <div className="h-96 border border-gray-200 rounded-lg overflow-hidden">
            <SubCategoryMenu
              categories={[
                {
                  id: 1,
                  name: "스낵",
                  children: [
                    { id: 11, name: "과자", parentId: 1, href: "/products/snack/cookies" },
                    { id: 12, name: "쿠키", parentId: 1, href: "/products/snack/cookies" },
                    { id: 13, name: "파이", parentId: 1, href: "/products/snack/pie" },
                  ],
                },
                {
                  id: 2,
                  name: "음료",
                  children: [
                    { id: 21, name: "청량/탄산음료", parentId: 2, href: "/products/beverage/soda" },
                    { id: 22, name: "과즙음료", parentId: 2, href: "/products/beverage/juice" },
                  ],
                },
              ]}
              currentPath="/preview"
              onItemClick={(item) => console.log("Clicked:", item)}
            />
          </div>
        </div>

        <div className="space-y-4 mb-4">
          <h2 className="text-lg font-semibold bg-blue-100">SideMenu 컴포넌트</h2>
          <div className="relative">
            <button
              onClick={() => setIsSideMenuOpen(true)}
              className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
            >
              사이드 메뉴 열기
            </button>
            <SideMenu
              items={[
                { id: "product-list", label: "상품 리스트", href: "/products" },
                { id: "purchase-requests", label: "구매 요청 내역", href: "/purchase-requests" },
                { id: "mypage", label: "마이페이지", href: "/mypage" },
              ]}
              isOpen={isSideMenuOpen}
              currentPath="/products"
              onItemClick={(item) => console.log("Clicked:", item)}
              onClose={() => setIsSideMenuOpen(false)}
            />
          </div>
        </div>

        <div className="space-y-4 mb-4">
          <h2 className="text-lg font-semibold bg-blue-100">Pagination 컴포넌트</h2>
          <div className="flex flex-col items-center gap-4">
            <Pagination currentPage={currentPaginationPage} totalPages={10} onPageChange={setCurrentPaginationPage} />
            <div>현재 페이지: {currentPaginationPage}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
