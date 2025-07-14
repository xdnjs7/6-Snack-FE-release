"use client";

import React, { useEffect, useState, KeyboardEvent, useCallback } from "react";
import Image from "next/image";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import IcSearch from "@/assets/icons/ic_search.svg";
import { TSearchBarProps } from "@/types/serchBar.types";

export const SearchBar: React.FC<TSearchBarProps> = ({ placeholder = "이름으로 검색하세요", initialValue = "" }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchText, setSearchText] = useState<string>(initialValue);

  useEffect(() => {
    const q = searchParams.get("q");
    if (q && !initialValue) {
      setSearchText(q);
    }
  }, [searchParams, initialValue]);

  const handleSearch = useCallback(() => {
    const searchTerm = searchText.trim();
    const params = new URLSearchParams(searchParams.toString());

    if (!searchTerm) {
      params.delete("q");
    } else {
      params.set("q", searchTerm);
    }

    router.push(`${pathname}?${params.toString()}`);
  }, [searchText, searchParams, router, pathname]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        handleSearch();
      }
    },
    [handleSearch],
  );

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  }, []);

  return (
    <div className="w-full max-w-[696px] sm:py-2 sm:py-3 border-b border-zinc-800 flex items-center gap-2 sm:gap-3">
      <button onClick={handleSearch} aria-label="검색" type="button" className="w-5 h-5 relative sm:w-6 sm:h-6">
        <Image src={IcSearch} alt="검색 아이콘" fill style={{ objectFit: "contain" }} />
      </button>
      <input
        type="text"
        placeholder={placeholder}
        className="flex-1 bg-transparent outline-none text-base sm:text-lg text-primary-900 font-normal font-suit placeholder-primary-400"
        value={searchText}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};
