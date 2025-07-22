"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/app/(preview)/components-preview/navigationLinks";
import { useEffect, useMemo, useRef, useState } from "react";

const roleColorMap: Record<string, string> = {
  "최고 관리자": "bg-red-600/80",
  관리자: "bg-green-600/80",
  일반유저: "bg-blue-600/80",
  비회원: "bg-gray-600/80",
};

const progressColorMap: Record<string, string> = {
  "시작 전": "bg-gray-200/70",
  "진행 중": "bg-blue-300/80",
  "리팩터링 중": "bg-violet-300/70",
  완성: "bg-lime-500/45",
  "QA 중": "bg-red-400/50",
};

const roles = ["최고 관리자", "관리자", "일반유저", "비회원"];
const progressStages = ["시작 전", "진행 중", "리팩터링 중", "완성", "QA 중"];

export default function DevNavBar() {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [selectedRole, setSelectedRole] = useState<string | undefined>(undefined);
  const [selectedProgress, setSelectedProgress] = useState<string | undefined>(undefined);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);

  const navRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();

  const normalizePath = (path: string) => path.replace(/:.*$/, "1");

  const handleDevTool = () => {
    setIsVisible((v) => !v);
  };

  // 단축키 Ctrl+X 또는 Cmd+X, esc, 바깥 클릭으로 열기/닫기
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "x") {
        e.preventDefault();
        setIsVisible((v) => !v);
      }

      if (e.key === "Escape") {
        setIsVisible(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;

      const clickedOutsideNav = navRef.current && !navRef.current.contains(target);
      const clickedOutsideButton = buttonRef.current && !buttonRef.current.contains(target);

      if (clickedOutsideNav && clickedOutsideButton) {
        setIsVisible(false);
      }
    };

    window.addEventListener("keydown", handler);
    window.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("keydown", handler);
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // 필터 기능
  const filteredNavLinks = useMemo(() => {
    return navLinks
      .filter((section) => {
        const matchCategory = !selectedCategory || section.category === selectedCategory;
        return matchCategory;
      })
      .map((section) => ({
        ...section,
        links: section.links.filter((link) => {
          const matchRole = !selectedRole || link.role === selectedRole;
          const matchProgress = !selectedProgress || link.progress === selectedProgress;
          return matchRole && matchProgress;
        }),
      }))
      .filter((section) => section.links.length > 0);
  }, [selectedCategory, selectedRole, selectedProgress]);

  // 진행바 기능
  const totalLinks = useMemo(() => {
    return navLinks.reduce((acc, section) => acc + section.links.length, 0);
  }, [navLinks]);

  const completedLinks = useMemo(() => {
    return navLinks.reduce((acc, section) => {
      return acc + section.links.filter((link) => link.progress === "완성").length;
    }, 0);
  }, [navLinks]);

  const completionPercentage = useMemo(() => {
    if (totalLinks === 0) return 0;
    return Math.round((completedLinks / totalLinks) * 100);
  }, [totalLinks, completedLinks]);

  const categories = useMemo(() => {
    return [...new Set(navLinks.map((section) => section.category))];
  }, []);

  return (
    <>
      <div
        ref={buttonRef}
        onClick={handleDevTool}
        className="z-100 flex justify-center items-center fixed bottom-5 right-4.5 w-9.5 h-9.5 rounded-full cursor-pointer font-extrabold text-[18px]/[24px] bg-indigo-700/60 shadow-lg"
      >
        👨🏻‍💻
      </div>

      {isVisible && (
        <nav
          ref={navRef} // ✅ ref 추가
          className="z-55 fixed bottom-16 right-5 w-85 max-h-[80vh] overflow-y-auto scrollbar-hide rounded-lg bg-white border border-primary-100 shadow-[0px_0px_40px_0px_rgba(0,0,0,0.12)] p-4 space-y-4"
        >
          <p className="font-bold text-[20px]/[24px] sm:text-[24px]/[24px]">🍪Snack 개발자 도구</p>

          {/* 완성 진행도 확인바 */}
          <div className="w-full mt-4">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-bold text-gray-700">전체 완료율</span>
              <span className="text-sm font-bold text-indigo-600 tracking-tighter">{completionPercentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-indigo-600 h-3 rounded-full transition-all duration-300 ease-in-out"
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>
          </div>

          {/* 역할 필터 버튼 */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold">🔑 역할 필터</h3>
            <div className="flex flex-wrap gap-2 py-1 rounded-lg">
              {roles.map((role) => (
                <button
                  key={role}
                  onClick={() => setSelectedRole(selectedRole === role ? undefined : role)}
                  className={`text-xs px-2 py-1 rounded font-semibold text-black cursor-pointer ${
                    selectedRole === role
                      ? `${roleColorMap[role]} text-white`
                      : "bg-white outline-2 outline-primary-100"
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>

          {/* 진행도 필터 버튼 */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold">🧩 진행도 필터</h3>
            <div className="flex flex-wrap gap-2 py-1 rounded-lg">
              {progressStages.map((stage) => (
                <button
                  key={stage}
                  onClick={() => setSelectedProgress(selectedProgress === stage ? undefined : stage)}
                  className={`text-xs px-2 py-1 rounded font-semibold text-black cursor-pointer ${
                    selectedProgress === stage ? `${progressColorMap[stage]}` : "bg-white outline-2 outline-primary-100"
                  }`}
                >
                  {stage}
                </button>
              ))}
            </div>
          </div>

          {/* 카테고리 필터 버튼 */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold">📂 카테고리 필터</h3>
            <div className="flex flex-wrap gap-2 py-1 rounded-lg">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(selectedCategory === category ? undefined : category)}
                  className={`text-xs px-2 py-1 rounded font-semibold text-black cursor-pointer ${
                    selectedCategory === category
                      ? "bg-yellow-200 text-black"
                      : "bg-white outline-2 outline-primary-100"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* 필터 초기화 */}
          <button
            onClick={() => {
              setSelectedRole(undefined);
              setSelectedProgress(undefined);
              setSelectedCategory(undefined);
            }}
            className="w-full text-xs px-2 py-1 rounded bg-red-200 text-black font-semibold cursor-pointer"
          >
            필터 초기화
          </button>
          <div className="border-b-1 border-primary-100"></div>

          {/* 필터링된 링크 목록 */}
          {filteredNavLinks.map((section) => (
            <div key={section.category}>
              <h3 className="text-base font-bold mb-2">{section.category}</h3>
              <div className="flex gap-2 items-center justify-start flex-wrap">
                {section.links.map((link) => {
                  const renderedPath = normalizePath(link.path);
                  const isActive = pathname === renderedPath;

                  const roleBadgeColor = roleColorMap[link.role] || "bg-black";
                  const progressBadgeColor = progressColorMap[link.progress ?? "시작 전"];

                  return (
                    <Link key={link.path} href={renderedPath}>
                      <div
                        onClick={() => setIsVisible(false)}
                        className={`flex items-center justify-start rounded px-2 py-1.5 gap-2 text-sm ${progressBadgeColor} ${
                          isActive ? "font-semibold shadow-lg outline-2 outline-gray-500" : ""
                        }`}
                      >
                        {link.name}
                        <span className={`text-xs px-2 py-0.5 rounded text-white ${roleBadgeColor}`}>{link.role}</span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      )}
    </>
  );
}
