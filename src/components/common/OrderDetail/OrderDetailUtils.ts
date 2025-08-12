// 주문 상태 텍스트 매핑
export const getStatusText = (status: string): string => {
  const statusMap: Record<string, string> = {
    PENDING: "대기중",
    APPROVED: "승인",
    INSTANT_APPROVED: "즉시 구매",
    REJECTED: "거절",
    CANCELED: "취소",
  };
  return statusMap[status] || status;
};

// 기존 formatDate 함수를 래핑하여 타입 호환성 맞춤
import { formatDate as originalFormatDate } from "@/lib/utils/formatDate.util";

export const formatDate = (dateString: string | undefined | null): string => {
  if (!dateString) return "-";
  try {
    return originalFormatDate(dateString);
  } catch (error) {
    console.error("Date formatting error:", error);
    return "-";
  }
}; 