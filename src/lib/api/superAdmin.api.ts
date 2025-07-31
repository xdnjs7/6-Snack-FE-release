import { cookieFetch } from "@/lib/api/fetchClient.api";

type TDeleteUserResponse = {
  message: string;
};

export const deleteUserById = async (userId: string): Promise<TDeleteUserResponse> => {
  const res = await cookieFetch<TDeleteUserResponse>(`/super-admin/users/${userId}`, {
    method: "DELETE",
  });
  return res;
};

export const superAdminSignUpApi = async (data: {
  email: string;
  name: string;
  companyName: string;
  bizNumber: string;
  password: string;
  passwordConfirm: string;
}) => {
  return await cookieFetch("/auth/signup", {
    method: "POST",
    body: JSON.stringify(data),
  });
};
