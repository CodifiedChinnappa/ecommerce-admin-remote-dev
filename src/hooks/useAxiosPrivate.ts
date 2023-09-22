import { useEffect } from "react";
import { axiosPrivate } from "../api/axios";
// eslint-disable-next-line import/no-cycle
import useRefreshToken from "./useRefreshToken";
import { useAppSelector } from "./useReduxHooks";

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const { userDetails } = useAppSelector(state => {
    return state.auth;
  });

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      config => {
        const modifiedConfig = { ...config };
        if (!modifiedConfig.headers.authorization) {
          modifiedConfig.headers.authorization = `Bearer ${userDetails?.accessToken}`;
        }
        return modifiedConfig;
      },
      error => {
        return Promise.reject(error);
      }
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      response => {
        return response;
      },
      async error => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers.authorization = `Bearer ${newAccessToken}`;
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      // Eject the interceptors
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [userDetails, refresh]);

  return axiosPrivate;
};

export default useAxiosPrivate;
