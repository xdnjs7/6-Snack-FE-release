import { cookieFetch } from "./fetchClient.api";

// 초대 정보 타입
export type InviteInfo = {
  id: string;
  email: string;
  name: string;
  role: string;
  companyId: number;
  company: {
    id: number;
    name: string;
  };
  expiresAt: string;
  isUsed: boolean;
};

// 초대 생성
export const createInviteApi = async (inviteData: {
  email: string;
  name: string;
  role: string;
  companyId: number;
  invitedById: string;
  expiresInDays?: number;
}) => {
  return cookieFetch("/invites", {
    method: "POST",
    body: JSON.stringify(inviteData),
  });
};

// 초대 정보 조회
export const getInviteApi = async (inviteId: string) => {
  return cookieFetch(`/invites/${inviteId}`);
};

// 초대를 통한 회원가입
export const signUpWithInviteApi = async (inviteId: string, password: string) => {
  return cookieFetch(`/auth/signup/${inviteId}`, {
    method: "POST",
    body: JSON.stringify({ password }),
  });
};
