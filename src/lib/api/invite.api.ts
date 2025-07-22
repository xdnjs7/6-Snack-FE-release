import { defaultFetch } from "./fetchClient.api";

export type TInviteInfo = {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "USER";
  expiresAt: string;
  isUsed: boolean;
};
// 초대 정보 조회
export const getInviteApi = async (inviteId: string) => {
  return defaultFetch(`/invite/${inviteId}`);
};
