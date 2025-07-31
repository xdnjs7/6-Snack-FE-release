export type TBadgeType = "request" | "pending" | "approved" | "rejected" | "admin" | "user";

export type TBadgeProps = {
  type: TBadgeType;
};
