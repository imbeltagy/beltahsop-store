export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface AuthReducers {
  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => Promise<void>;
  init: (user: User | null) => void;
}

export type AuthStore = AuthState & AuthReducers;

export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  email: string;
  fullName: string;
  password: string;
  role: string;
};

export interface User {
  id: string;
  fullName: string;
  email: string | null;
  confirmed: boolean;
  role: UserRole;
  provider: "email" | "github";
}
export type LoginResponse = User & {
  accessToken: string;
  accessTokenExpireDate: string;
  refreshToken: string;
  refreshTokenExpireDate: string;
};

export interface GithubSession {
  providerId: string;
  fullName: string;
  provider: string;
}

export const enum UserRole {
  ADMIN = "admin",
  EMPLOYEE = "employee",
  CLIENT = "client",
}

export const enum OTPPurpose {
  EmailConfirmation = "email_confirmation",
  ResetPassword = "reset_password",
}
