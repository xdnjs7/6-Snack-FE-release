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

// 초대를 통한 회원가입
// export const signUpWithInviteApi = async (inviteId: string, password: string) => {
//   return cookieFetch(`/auth/signup/${inviteId}`, {
//     method: "POST",
//     // api 명세 확인하고 body content 수정하기
//     body: JSON.stringify({ password }),
//   });
// };
