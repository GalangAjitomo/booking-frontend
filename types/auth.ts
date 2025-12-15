// types/auth.ts
export interface LoginResponse {
  accessToken: string;
  expiresAt: string;
  tokenType: string;
  user: {
    id: string;
    userName: string;
    displayName: string;
    roles: string[];
  };
}
