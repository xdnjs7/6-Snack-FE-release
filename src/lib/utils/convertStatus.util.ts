export const convertStatus = (raw: string): "대기중" | "요청완료" | "요청반려" | "요청취소" => {
  switch (raw) {
    case "PENDING":
      return "대기중";
    case "APPROVED":
    case "INSTANT_APPROVED":
      return "요청완료";
    case "REJECTED":
      return "요청반려";
    case "CANCELED":
      return "요청취소";
    default:
      return "대기중";
  }
};
