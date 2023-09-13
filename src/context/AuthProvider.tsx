import React, { createContext, useState, useMemo, ReactNode } from "react";
import { AuthContextType, AuthData, AuthProviderProps } from "../types";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderPropsWithChildren extends AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderPropsWithChildren> = ({
  children,
}) => {
  const [auth, setAuth] = useState<AuthData | null>(null);

  const [persist, setPersist] = useState<boolean>(
    JSON.parse(localStorage.getItem("persist") || "false")
  );

  const contextValue = useMemo(() => {
    return { auth, setAuth, persist, setPersist };
  }, [auth, setAuth, persist, setPersist]);

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
