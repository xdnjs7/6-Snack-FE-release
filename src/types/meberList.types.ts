export type UserRole = "USER" | "ADMIN" | "SUPER_ADMIN";

export type TMemberItem = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  onChangeRole?: (id: string) => void;
  onDeleteUser?: (id: string) => void;
};
