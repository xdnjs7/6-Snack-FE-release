export enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
  SUPER_ADMIN = "SUPER_ADMIN",
}

export async function getUserInfo() {
  const res = await fetch("http://localhost:8080/users/me", {
    method: "GET",
    credentials: "include",
  });
  if (!res.ok) throw new Error("유저 정보를 불러오지 못했습니다.");
  const { user } = await res.json();
  return user;
}

export async function updateSuper(userId: string, company: string, password: string) {
  const res = await fetch(`http://localhost:8080/super-admin/users/${userId}/company`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      companyName: company,
      passwordData: {
        newPassword: password,
        newPasswordConfirm: password,
      },
    }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "회사 정보 업데이트 실패");
  }

  return await res.json();
}

export async function updatePassword(userId: string, password: string) {
  const res = await fetch(`http://localhost:8080/users/${userId}/password`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      newPassword: password,
      newPasswordConfirm: password,
    }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "비밀번호 변경 실패");
  }

  return await res.json();
}