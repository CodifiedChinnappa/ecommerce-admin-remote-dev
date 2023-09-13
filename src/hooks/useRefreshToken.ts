import { axiosPrivate } from "../api/axios";
import { AuthData } from "../types";
import useAuth from "./useAuth";

const useRefreshToken = (): (() => Promise<string>) => {
  const { setAuth } = useAuth();
  const refresh = async (): Promise<string> => {
    const { data } = await axiosPrivate.get("/auth/refresh-tokens");
    setAuth((prev: AuthData | null) => {
      if (prev === null) {
        return prev; // Return null if previous state is null
      }

      return {
        ...prev,
        user: {
          ...prev.user,
          ...data?.user,
        },
        accessToken: data.accessToken,
      };
    });
    return data.accessToken;
  };

  return refresh;
};

export default useRefreshToken;
