import { cookieFetch } from "@/lib/api/fetchClient.api";
import { TMemberItem } from "@/types/meberList.types";

export const fetchAllCompanyUsers = async (name?: string): Promise<TMemberItem[]> => {
  const query = name ? `?name=${encodeURIComponent(name)}` : "";
  const res = await cookieFetch(`/super-admin/users${query}`);
  return res.users;
};
