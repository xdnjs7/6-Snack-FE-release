import React, { useState } from "react";
import ArrowIconSvg from "@/components/svg/ArrowIconSvg";
import { TInviteMemberModalProps, Role, UserRole } from "@/types/InviteMemberModal.types";

const roleLabels: Record<UserRole, string> = {
  USER: "유저",
  ADMIN: "관리자",
};

export default function InviteMemberModal({
  onCancel,
  onSubmit,
  mode = "invite",
  defaultValues,
}: TInviteMemberModalProps) {
  const [name, setName] = useState(defaultValues?.name ?? "");
  const [email, setEmail] = useState(defaultValues?.email ?? "");
  const [selectedRole, setSelectedRole] = useState<UserRole>(defaultValues?.role ?? "USER");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

const handleSubmit = async () => {
  if (mode === "edit") {
    try {
      // defaultValues가 존재할 때만 진행
      if (!defaultValues) return;

      const res = await fetch(`/super-admin/users/${defaultValues.id}/role`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", 
        body: JSON.stringify({ role: selectedRole }),
      });

      if (!res.ok) throw new Error("권한 수정 실패");

      const data = await res.json();
      alert(data.message || "권한이 성공적으로 변경되었습니다.");
      onSubmit?.({ name, email, role: selectedRole });
    } catch (err: any) {
      alert(err.message || "권한 수정 중 오류 발생");
    }
  } else {
    onSubmit?.({ name, email, role: selectedRole }); 
  }
};


  return (
    <>
      {/* Desktop Layout */}
      <div className="hidden sm:flex items-center justify-center min-h-screen">
        <div className="w-[600px] px-14 py-10 bg-white rounded-sm shadow-[0px_0px_40px_0px_rgba(0,0,0,0.1)] inline-flex flex-col justify-start items-center gap-8 relative overflow-visible">
          <div className="flex flex-col justify-start items-start gap-2.5">
            <div className="justify-center text-stone-900 text-lg font-bold font-['SUIT']">
              {mode === "edit" ? "권한 수정" : "회원 초대"}
            </div>
          </div>
          <div className="self-stretch flex flex-col justify-start items-start gap-9">
            <div className="self-stretch flex flex-col justify-start items-start gap-7">
              <div className="self-stretch flex flex-col justify-start items-start gap-5">
                <div className="self-stretch flex flex-col justify-start items-start gap-5">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="이름을 입력해주세요"
                    readOnly={mode === "edit"}
                    className={`self-stretch h-14 px-1 py-2 border-b border-stone-500 inline-flex justify-between items-center overflow-hidden bg-transparent outline-none text-base font-normal font-['SUIT'] placeholder:text-zinc-500 ${mode === "edit" ? "text-gray-400" : "text-stone-900"}`}
                  />

                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="이메일을 입력해주세요"
                    readOnly={mode === "edit"}
                    className={`self-stretch h-14 px-1 py-2 border-b border-stone-500 inline-flex justify-between items-center overflow-hidden bg-transparent outline-none text-base font-normal font-['SUIT'] placeholder:text-zinc-500 ${mode === "edit" ? "text-gray-400" : "text-stone-900"}`}
                  />
                </div>
              </div>
              <div className="self-stretch flex flex-col justify-center items-start gap-3">
                <div className="justify-center text-neutral-800 text-base font-bold font-['SUIT']">권한</div>
                <div className="relative">
                  <div
                    data-active={isDropdownOpen ? "on" : "off"}
                    className="w-[480px] h-11 px-4 py-2.5 bg-white outline outline-1 outline-offset-[-1px] outline-neutral-200 inline-flex justify-between items-center cursor-pointer"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    <div className="justify-start text-neutral-800 text-base font-normal font-['SUIT']">
                      {roleLabels[selectedRole]}
                    </div>
                    <div className="w-[6px] h-[6px] flex items-center justify-center">
                      <ArrowIconSvg direction={isDropdownOpen ? "up" : "down"} className="text-neutral-800" />
                    </div>
                  </div>

                  {isDropdownOpen && (
                    <div className="absolute top-full left-0 w-[480px] bg-white border border-neutral-200 z-50">
                      {Object.entries(roleLabels).map(([role, label]) => (
                        <div
                          key={role}
                          className="px-4 py-2.5 hover:bg-gray-50 cursor-pointer text-neutral-800 text-base font-normal font-['SUIT']"
                          onClick={() => {
                            setSelectedRole(role as UserRole);
                            setIsDropdownOpen(false);
                          }}
                        >
                          {label}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="self-stretch inline-flex justify-start items-center gap-5">
              <button
                data-size="Default"
                data-state="normal"
                data-type="line"
                className="flex-1 h-16 px-4 py-3 bg-white rounded-sm outline outline-1 outline-offset-[-1px] outline-zinc-400 flex justify-center items-center cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={onCancel}
              >
                <div className="text-center justify-center text-neutral-800 text-base font-bold font-['SUIT']">
                  취소
                </div>
              </button>
              <button
                data-size="Default"
                data-state="normal"
                data-type="filled"
                className="flex-1 h-16 px-4 py-3 bg-neutral-800 rounded-sm flex justify-center items-center cursor-pointer hover:bg-neutral-700 transition-colors"
                onClick={handleSubmit}
              >
                <div className="text-center justify-center text-white text-base font-bold font-['SUIT']">등록하기</div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="block md:hidden w-full h-screen relative bg-white overflow-hidden">
        <div className="w-full px-2 py-4 left-0 top-0 absolute inline-flex justify-center items-center gap-2">
          <div className="justify-center text-stone-900 text-lg font-bold font-['SUIT']">회원 초대</div>
        </div>
        <div className="w-full px-6 left-0 top-[80px] absolute inline-flex flex-col justify-start items-start gap-7">
          <div className="self-stretch flex flex-col justify-start items-start gap-5">
            <div
              data-show-eye="false"
              data-show-floating-label="true"
              data-size="sm"
              data-state={name ? "completed" : "normal"}
              className="self-stretch h-14 px-1 py-2 border-b border-stone-500 inline-flex justify-start items-end gap-1"
            >
              <div className="flex-1 inline-flex flex-col justify-start items-start gap-[5px]">
                <div className="self-stretch justify-center text-neutral-400 text-xs font-normal font-['SUIT']">
                  이름
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="이름을 입력해주세요"
                  className={`self-stretch justify-center text-base font-normal font-['SUIT'] bg-transparent outline-none ${mode === "edit" ? "text-gray-400" : "text-neutral-600"}`}
                />
              </div>
            </div>
            <div
              data-show-eye="false"
              data-show-floating-label="true"
              data-size="sm"
              data-state={email ? "completed" : "normal"}
              className="self-stretch h-14 px-1 py-2 border-b border-stone-500 inline-flex justify-start items-end gap-1"
            >
              <div className="flex-1 inline-flex flex-col justify-start items-start gap-[5px]">
                <div className="self-stretch justify-center text-neutral-400 text-xs font-normal font-['SUIT']">
                  이메일
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="이메일을 입력해주세요"
                  className={`self-stretch justify-center text-base font-normal font-['SUIT'] bg-transparent outline-none ${mode === "edit" ? "text-gray-400" : "text-neutral-600"}`}
                />
              </div>
            </div>
          </div>
          <div className="self-stretch flex flex-col justify-center items-start gap-3">
            <div className="justify-center text-neutral-800 text-base font-bold font-['SUIT']">권한</div>
            <div className="self-stretch flex flex-col justify-start items-start">
              <div
                data-active={isDropdownOpen ? "on" : "off"}
                className="self-stretch h-11 px-4 py-2.5 bg-white outline outline-1 outline-offset-[-1px] outline-neutral-200 inline-flex justify-between items-center cursor-pointer"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <div className="justify-start text-neutral-800 text-base font-normal font-['SUIT']">
                  {roleLabels[selectedRole]}
                </div>
                <div className="w-4 h-4 flex items-center justify-center">
                  <ArrowIconSvg direction={isDropdownOpen ? "up" : "down"} className="text-neutral-800" />
                </div>
              </div>
              {isDropdownOpen && (
                <div
                  data-height-type="auto"
                  className="w-full bg-white border-l border-r border-b border-neutral-200 flex flex-col justify-center items-start overflow-hidden"
                >
                  {Object.entries(roleLabels).map(([role, label]) => (
                    <div
                      key={role}
                      className="self-stretch h-12 pl-4 pr-5 py-2 inline-flex justify-start items-center gap-1 cursor-pointer hover:bg-gray-50"
                      onClick={() => {
                        setSelectedRole(role as UserRole);
                        setIsDropdownOpen(false);
                      }}
                    >
                      <div className="text-center justify-center text-neutral-800 text-base font-normal">{label}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="w-full p-6 left-0 bottom-0 absolute bg-white inline-flex flex-col justify-start items-start gap-2">
          <div className="self-stretch inline-flex justify-start items-center gap-4">
            <button
              data-size="Default"
              data-state="normal"
              data-type="line"
              className="flex-1 h-16 px-4 py-3 bg-white rounded-sm outline outline-1 outline-offset-[-1px] outline-zinc-400 flex justify-center items-center cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={onCancel}
            >
              <div className="text-center justify-center text-neutral-800 text-base font-bold font-['SUIT']">취소</div>
            </button>
            <button
              data-size="Default"
              data-state="normal"
              data-type="filled"
              className="flex-1 h-16 px-4 py-3 bg-neutral-800 rounded-sm flex justify-center items-center cursor-pointer hover:bg-neutral-700 transition-colors sm:hidden"
              onClick={handleSubmit}
            >
              <div className="text-center justify-center text-white text-base font-bold font-['SUIT']">
                {mode === "edit" ? "권한 수정" : "초대하기"}
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
