export type TButtonType = "primary" | "secondary" | "dark" | "light-outline" | "gray" | "disabled";

export type TButtonProps = {
  type: TButtonType;
  label?: string;
  onClick?: () => void;
};

export type TButtonStyle = {
  bg: string;
  textColor?: string;
  padding: string;
  outline?: string;
  font?: string;
  size?: string;
};
