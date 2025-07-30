export type TInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  type?: "text" | "email" | "password" | "number" | "tel" | "url";
  showPasswordToggle?: boolean;
  containerClassName?: string;
  isCompanyName?: boolean;
  isBizNumber?: boolean;
  inputRef?: React.Ref<HTMLInputElement>;
};
