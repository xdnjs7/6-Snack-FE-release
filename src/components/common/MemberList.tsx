import { TMemberItem } from "@/types/meberList.types";

type MemberListProps = TMemberItem & {
  onDeleteUser?: (id: string) => void;
  onChangeRole?: (id: string, currentRole: TMemberItem["role"]) => void;
};

const MemberList = ({ id, name, email, role, onDeleteUser, onChangeRole }: MemberListProps) => {
  const isSuperAdmin = role === "SUPER_ADMIN";

  return (
    <div className="w-[960px] h-24 px-5 border-b border-neutral-200 inline-flex justify-start items-center gap-20">
      {/* 프로필 + 이름 */}
      <div className="flex justify-start items-center gap-5">
        <div className="w-8 h-8 relative bg-neutral-100 rounded-full overflow-hidden">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-black text-[10px] font-medium">
            {name.slice(0, 1).toUpperCase()}
          </div>
        </div>
        <div className="w-24 inline-flex flex-col justify-center items-start">
          <div className="text-neutral-800 text-base font-bold">{name}</div>
        </div>
      </div>

      {/* 이메일 */}
      <div className="flex-1 text-neutral-800 text-base">{email}</div>

      {/* 역할 뱃지 */}
      <div
        className={`w-16 h-7 px-2 py-1.5 rounded-full flex justify-center items-center ${
          role === "USER" ? "bg-white border border-neutral-300" : "bg-neutral-600"
        }`}
      >
        <div className={`text-sm font-bold ${role === "USER" ? "text-zinc-800" : "text-white"}`}>
          {role === "SUPER_ADMIN" ? "최고관리자" : role === "ADMIN" ? "관리자" : "일반"}
        </div>
      </div>

      {/* 액션 버튼 */}
      <div className="flex gap-2">
        {/* 권한 변경 버튼 (최고관리자는 제외) */}
        {!isSuperAdmin && (
          <div
            className="w-24 px-5 py-2.5 bg-white rounded-sm outline outline-1 outline-offset-[-1px] outline-zinc-400 flex justify-center items-center cursor-pointer"
            onClick={() => onChangeRole?.(id, role)}
          >
            <div className="text-center text-zinc-800 text-base whitespace-nowrap leading-none">권한 변경</div>
          </div>
        )}

        {/* 계정 탈퇴 버튼 */}
        <div
          className="w-24 px-5 py-2.5 bg-red-400 flex justify-center items-center rounded-sm cursor-pointer"
          onClick={() => onDeleteUser?.(id)}
        >
          <div className="text-white text-base whitespace-nowrap leading-none">계정 탈퇴</div>
        </div>
      </div>
    </div>
  );
};

export default MemberList;
