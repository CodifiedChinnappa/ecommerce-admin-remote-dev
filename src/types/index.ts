import React from "react";

// Define the type for the authentication data
export interface AuthData {
  user: {
    name: string;
    email: string;
    role: string;
    isEmailVerified: boolean;
    isActive: boolean;
    id: string;
    isLoggedIn: true;
  };
  accessToken: string;
}

// Define the AuthProvider component
export interface AuthProviderProps {
  children: React.ReactNode;
}

// Define the shape of the context value
export interface AuthContextType {
  auth: AuthData | null;
  setAuth: React.Dispatch<React.SetStateAction<AuthData | null>>;
  persist: boolean;
  setPersist: React.Dispatch<React.SetStateAction<boolean>>;
}
