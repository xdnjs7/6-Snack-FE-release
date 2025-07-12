// types/button.types.ts
export type ButtonType =
  | 'primary'
  | 'secondary'
  | 'dark'
  | 'light-outline'
  | 'gray'
  | 'disabled'
  | 'mini-default'
  | 'mini-active'
  | 'mini-disabled';

export type ButtonSize = 'lg' | 'sm';

export type TButtonProps = {
  type: ButtonType;
  label?: string;
  onClick?: () => void;
};
