export type TUserRole = "USER" | "ADMIN";

export type Role = "USER" | "ADMIN" | "SUPER_ADMIN";

export type TInviteMemberModalProps = {
  onCancel?: () => void;
  onSubmit: (data: { name: string; email: string; role: TUserRole }) => void;
  mode?: "invite" | "edit";
  defaultValues?: {
    id: string;
    name: string;
    email: string;
    role: TUserRole;
  };
};
