import { TMemberItem } from "@/types/meberList.types";

type TMemberListProps = TMemberItem & {
  onClickChangeRole?: (id: string, currentRole: TMemberItem["role"]) => void;
  onClickDeleteUser?: (id: string) => void;
};

const MemberList = ({ id, name, email, role, onClickChangeRole, onClickDeleteUser }: TMemberListProps) => {
  const roleLabel = role === "ADMIN" ? "관리자" : "일반";
  const roleBadgeClass = role === "USER" ? "bg-primary-50 text-primary-500" : "bg-primary-700 text-white";

  return (
    <>
      {/* 모바일 전용 레이아웃 */}
      <div className="sm:hidden w-80 px-5 py-4 border-b border-[#e6e6e6] flex gap-3">
        <div className="w-12 h-12 bg-primary-50 rounded-full flex justify-center items-center text-black text-sm font-medium">
          {name.slice(0, 1).toUpperCase()}
        </div>
        <div className="flex flex-col justify-between">
          <div className="flex items-center gap-2">
            <div className="text-primary-950 text-base font-bold">{name}</div>
            <div className={`px-2.5 py-1 rounded-full flex justify-center items-center ${roleBadgeClass}`}>
              <span className="text-xs font-bold">{roleLabel}</span>
            </div>
          </div>
          <div className="text-primary-950 text-base">{email}</div>
        </div>
      </div>

      {/* 데스크탑 & 태블릿 레이아웃 */}
      <div className="hidden sm:inline-flex w-[696px] lg:w-[960px] h-24 px-5 border-b border-[#e6e6e6] justify-start items-center gap-8 lg:gap-20">
        <div className="flex justify-start items-center gap-5">
          <div className="w-8 h-8 relative bg-primary-50 rounded-full overflow-hidden">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-black text-[10px] font-medium">
              {name.slice(0, 1).toUpperCase()}
            </div>
          </div>
          <div className="w-24 inline-flex flex-col justify-center items-start">
            <div className="text-primary-950 text-base font-bold">{name}</div>
          </div>
        </div>

        <div className="flex-1 text-primary-950 text-base">{email}</div>

        <div
          className={`w-16 h-7 px-2 py-1.5 rounded-full flex justify-center items-center ${
            role === "USER" ? "bg-primary-50 border-none" : "bg-primary-700"
          }`}
        >
          <div className={`text-sm font-bold ${role === "USER" ? "text-primary-500" : "text-white"}`}>{roleLabel}</div>
        </div>

        <div className="flex gap-2">
          <div
            className="w-24 px-5 py-2.5 bg-white rounded-sm outline outline-1 outline-offset-[-1px] outline-primary-300 flex justify-center items-center cursor-pointer"
            onClick={() => onClickChangeRole?.(id, role)}
          >
            <div className="text-center text-primary-900 text-base whitespace-nowrap leading-none">권한 변경</div>
          </div>
          <div
            className="w-24 px-5 py-2.5 bg-red flex justify-center items-center rounded-sm cursor-pointer"
            onClick={() => onClickDeleteUser?.(id)}
          >
            <div className="text-white text-base whitespace-nowrap leading-none">계정 탈퇴</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MemberList;
