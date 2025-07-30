/**
 * 회사명 입력값을 정제하는 함수
 * @param value - 원본 입력값
 * @returns 정제된 회사명 (특수문자, 공백 제거, 20글자 제한)
 */
export const sanitizeCompanyName = (value: string): string => {
  return value.replace(/[^a-zA-Z0-9가-힣ㄱ-ㅎㅏ-ㅣ]/g, "").slice(0, 20);
};
