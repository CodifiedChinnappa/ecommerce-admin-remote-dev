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

//login
export interface LoginCredentials {
  username: string;
  password: string;
}

// Define RootState by combining all slice states
export interface RootState {
  persisted: {
    auth: AuthData;
  };
  // other: OtherState;
}

//category
export interface Category {
  _id: string;
  title: string;
  children?: Category[];
  parentId?: string | null;
}

export interface Product {
  title: string;
  hsn: string;
  description: string;
  brand: string | null;
  categories?: (string | null)[];
}
