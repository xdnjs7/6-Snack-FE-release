export type TUser = {
  id: string;
  name: string;
  email: string;
  role?: string;
  company?: {
    name: string;
  };
};

export type TAuthContextType = {
  user: TUser | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
};
