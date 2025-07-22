import { formatInTimeZone } from "date-fns-tz";

export default function DateFormat(date: string) {
  return formatInTimeZone(date, "Asia/Seoul", "yyyy. MM. dd");
}
