// eslint-disable-next-line import/no-cycle
import { setAuth } from "../features/auth.slice";
import { useAppDispatch } from "./useReduxHooks";
// eslint-disable-next-line import/no-cycle
import useAxiosPrivate from "./useAxiosPrivate";


const useRefreshToken = (): (() => Promise<string>) => {
  const dispatch = useAppDispatch();
  const axiosPrivate = useAxiosPrivate();
  const refresh = async (): Promise<string> => {
    const { data } = await axiosPrivate.get("/auth/refresh-tokens");
    dispatch(setAuth(data));
    return data.accessToken;
  };

  return refresh;
};

export default useRefreshToken;
