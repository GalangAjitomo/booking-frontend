export type User = {
  id: string;
  userName: string;
  displayName: string;
};

export type UserFormDto = {
  userName: string;
  displayName: string;
  password?: string; // hanya untuk create
  isAdmin?: boolean;
};
