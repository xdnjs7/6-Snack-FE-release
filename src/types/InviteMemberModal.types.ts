export enum Role {
  USER = "USER",
  ADMIN = "ADMIN", 
  SUPER_ADMIN = "SUPER_ADMIN"
}

export type TInviteMemberModalProps = {
  onCancel?: () => void;
  onSubmit?: (data: { name: string; email: string; role: Role }) => void;
}; 