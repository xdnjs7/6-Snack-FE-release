// 주문 상태 텍스트 매핑
export const getStatusText = (status: string): string => {
  const statusTextMap: { [key: string]: string } = {
    PENDING: "승인 대기",
    APPROVED: "구매 승인",
    REJECTED: "구매 반려",
  };

  return statusTextMap[status] || status;
};

// 날짜 포맷팅 함수
export const formatDate = (dateString: string | undefined | null): string => {
  if (!dateString) return "-";
  try {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}.${month}.${day}`;
  } catch (error) {
    console.error("Date formatting error:", error);
    return "-";
  }
}; 