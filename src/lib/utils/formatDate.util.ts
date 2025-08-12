import { formatInTimeZone } from "date-fns-tz";

export const formatDate = (date: string) => {
  return formatInTimeZone(date, "Asia/Seoul", "yyyy.MM.dd");
};
