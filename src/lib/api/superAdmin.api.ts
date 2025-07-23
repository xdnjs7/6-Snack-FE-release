import { cookieFetch } from "@/lib/api/fetchClient.api";

export const deleteUserById = async (userId: string): Promise<{ message: string }> => {
  const res = await cookieFetch(`/super-admin/users/${userId}`, {
    method: "DELETE",
  });
  return res;
};
