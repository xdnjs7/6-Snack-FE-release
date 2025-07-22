export type UserRole = "USER" | "ADMIN";
export enum Role {
  USER = "USER",
  ADMIN = "ADMIN", 
  SUPER_ADMIN = "SUPER_ADMIN"
}

export interface TInviteMemberModalProps {
  onCancel: () => void;
  onSubmit: (data: { name: string; email: string; role: UserRole }) => void;  
  mode?: "invite" | "edit"; 
  defaultValues?: {
    name: string;
    email: string;
    role: UserRole;
  };
}
