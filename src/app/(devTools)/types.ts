// types.ts
export type UserRole = "최고 관리자" | "관리자" | "일반유저" | "비회원";

export interface DevNavPage {
  name: string;
  path: string;
  role: UserRole;
}

export interface DevNavCategory {
  category: string;
  pages: DevNavPage[];
}
