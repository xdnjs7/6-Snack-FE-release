"use client";

import React from "react";

interface BudgetFormUIProps {
  currentMonthBudget: string;
  nextMonthBudget: string;
  onChange: (field: "currentMonthBudget" | "nextMonthBudget", value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
  success: boolean;
  errors?: {
    currentMonthBudget?: string;
    nextMonthBudget?: string;
  };
}

const BudgetFormUI: React.FC<BudgetFormUIProps> = ({
  currentMonthBudget,
  nextMonthBudget,
  onChange,
  onSubmit,
  loading,
  success,
  errors,
}) => {
  return (
    <div className="flex flex-1 flex-col justify-center sm:flex-row">
      <div className="w-full sm:w-1/2">
        <form onSubmit={onSubmit} className="w-full flex flex-col gap-20 mt-[20px]">
          <div className="self-stretch flex flex-col justify-start items-start gap-12">
            <div className="self-stretch flex flex-col justify-start items-start gap-2">
              <div className="self-stretch text-black text-lg md:text-2xl font-bold font-suit">예산 관리</div>
              <div className="self-stretch text-zinc-500 text-sm md:text-base font-normal font-suit">
                이번 달 예산을 정해서 지출을 관리해보세요
              </div>
            </div>
            <div className="self-stretch flex flex-col justify-center items-start gap-16">
              {/* 이번 달 예산 */}
              <div className="self-stretch flex flex-col justify-center items-start gap-3">
                <div className="self-stretch text-neutral-800 text-sm md:text-base font-bold font-suit">이번 달</div>
                <div className="self-stretch pb-3 border-b-2 border-neutral-700 inline-flex justify-center items-center gap-1 overflow-x-auto">
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    style={currentMonthBudget ? { color: '#222222' } : {}}
                    className={
                      `flex-1 min-w-0 bg-transparent outline-none border-none` +
                      (currentMonthBudget
                        ? ' text-[#222222] font-suit font-extrabold text-[20px] max-[900px]:text-[18px] sm:text-[32px] md:text-[40px] leading-[100%] align-middle tracking-[-0.025em]'
                        : ' text-neutral-300 text-xl max-[900px]:text-lg sm:text-3xl md:text-3xl font-bold font-suit placeholder:text-neutral-300 placeholder:font-suit placeholder:font-bold placeholder:text-[18px] max-[900px]:placeholder:text-[16px] sm:placeholder:text-[32px] md:placeholder:text-[32px] placeholder:leading-[100%] placeholder:align-middle placeholder:tracking-[-0.025em]')
                    }
                    placeholder="예산을 입력해주세요"
                    value={currentMonthBudget === undefined || currentMonthBudget === null || currentMonthBudget === "" ? "" : currentMonthBudget}
                    onChange={(e) => {
                      const onlyNums = e.target.value.replace(/[^0-9]/g, "");
                      onChange("currentMonthBudget", onlyNums);
                    }}
                    disabled={loading}
                  />
                  <div className="text-neutral-800 text-xl max-[900px]:text-lg sm:text-3xl md:text-4xl font-extrabold font-suit">원</div>
                </div>
                {errors?.currentMonthBudget && (
                  <p className="text-red-500 text-xs mt-1 ml-2">{errors.currentMonthBudget}</p>
                )}
                <div className="self-stretch text-zinc-500 text-sm md:text-base font-bold font-suit">0원</div>
              </div>
              {/* 다음 달 예산 */}
              <div className="self-stretch flex flex-col justify-center items-start gap-3">
                <div className="self-stretch text-neutral-800 text-sm md:text-base font-bold font-suit">매달 시작</div>
                <div className="self-stretch pb-3 border-b-2 border-neutral-700 inline-flex justify-center items-center gap-1 overflow-x-auto">
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    style={nextMonthBudget ? { color: '#222222' } : {}}
                    className={
                      `flex-1 min-w-0 bg-transparent outline-none border-none` +
                      (nextMonthBudget
                        ? ' text-[#222222] font-suit font-extrabold text-[20px] max-[900px]:text-[18px] sm:text-[32px] md:text-[40px] leading-[100%] align-middle tracking-[-0.025em]'
                        : ' text-neutral-300 text-xl max-[900px]:text-lg sm:text-3xl md:text-3xl font-bold font-suit placeholder:text-neutral-300 placeholder:font-suit placeholder:font-bold placeholder:text-[18px] max-[900px]:placeholder:text-[16px] sm:placeholder:text-[32px] md:placeholder:text-[32px] placeholder:leading-[100%] placeholder:align-middle placeholder:tracking-[-0.025em]')
                    }
                    placeholder="예산을 입력해주세요"
                    value={nextMonthBudget === undefined || nextMonthBudget === null || nextMonthBudget === "" ? "" : nextMonthBudget}
                    onChange={(e) => {
                      const onlyNums = e.target.value.replace(/[^0-9]/g, "");
                      onChange("nextMonthBudget", onlyNums);
                    }}
                    disabled={loading}
                  />
                  <div className="text-neutral-800 text-xl max-[900px]:text-lg sm:text-3xl md:text-4xl font-extrabold font-suit">원</div>
                </div>
                {errors?.nextMonthBudget && <p className="text-red-500 text-xs mt-1 ml-2">{errors.nextMonthBudget}</p>}
                <div className="self-stretch text-zinc-500 text-sm md:text-base font-bold font-suit">0원</div>
              </div>
            </div>
          </div>
          <div className="self-stretch h-16 px-4 py-3 bg-neutral-800 rounded-sm inline-flex justify-center items-center mt-8">
            <button
              type="submit"
              className="w-full h-full text-center text-white text-base font-bold font-suit"
              disabled={loading}
            >
              {loading ? "저장 중..." : "수정하기"}
            </button>
          </div>
          {success && <p className="text-green-600 mt-2">예산이 성공적으로 수정되었습니다.</p>}
        </form>
      </div>
      <div className="hidden sm:block w-1/2" />
    </div>
  );
};

export default BudgetFormUI;
