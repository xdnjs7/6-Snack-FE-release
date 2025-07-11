"use client";

// 작업 완료시 삭제 필수!!
// 해당 페이지에 본인이 작업한 공통 컴포넌트 넣어서 테스트하면 좋을거같아요!

import { useState } from "react";
import TextArea from "@/components/common/TextArea";
import MemberList from "@/components/common/MemberList";
import Dropdown from "@/components/common/DropDown";
import { TMemberItem } from "@/types/meberList.types";
import ProductList from "@/components/common/ProductList";

export default function ComponentsPreviewPage() {
  const [requestMessage, setRequestMessage] = useState("");
  const [categoryOption, setCategoryOption] = useState("다른거");

  const categoryOptions = ["음료", "과자", "아이스크림", "도시락", "라면", "사탕", "초콜릿", "떡볶이", "비빔밥"];

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

  return (
    <div className="p-10 space-y-10 bg-white min-h-screen">
      <h1 className="text-2xl font-bold">🧪 공통 컴포넌트 모음</h1>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold bg-blue-300">TextArea 컴포넌트</h2>
        <TextArea
          value={requestMessage}
          onChange={(e) => setRequestMessage(e.target.value)}
          placeholder="요청 메시지를 입력해주세요"
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold bg-blue-300">MemberList 컴포넌트</h2>
        {members.map((member) => (
          <MemberList key={member.id} {...member} onDeleteUser={handleDeleteUser} />
        ))}
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Dropdown 컴포넌트</h2>
        <Dropdown value={sort} onChange={setSort} />
        <Dropdown value={categoryOption} onChange={setCategoryOption} options={categoryOptions} />
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold bg-blue-300">Product list 컴포넌트</h2>
        <ProductList />
      </div>
    </div>
  );
}
