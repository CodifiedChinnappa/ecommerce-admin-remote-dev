export interface User {
  userName: string;
  email: string;
  role: string;
  isEmailVerified: boolean;
  isActive: boolean;
  id: string;
  isLoggedIn: boolean;
}

export interface AuthData {
  user: User | null;
  accessToken: string | null;
}
