// 작업 완료시 삭제 필수!!
// 해당 페이지에 본인이 작업한 공통 컴포넌트 넣어서 테스트하면 좋을거같아요!

"use client";

import { useState } from "react";
import TextArea from "@/components/common/TextArea";

export default function ComponentsTestPage() {
  const [requestMessage, setRequestMessage] = useState("");
  const [adminMessage, setAdminMessage] = useState("");

  return (
    <div className="p-10 space-y-10 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold">🧪 공통 컴포넌트 테스트</h1>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold">TextArea 컴포넌트</h2>
        <TextArea
          value={requestMessage}
          onChange={(e) => setRequestMessage(e.target.value)}
          placeholder="메시지를 입력해주세요"
        />
      </div>
    </div>
  );
}
