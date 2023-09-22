import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

// Import custom hooks with their types
import useRefreshToken from "../../hooks/useRefreshToken"; // Replace with your actual path
import { useAppSelector } from "../../hooks/useReduxHooks";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const refresh = useRefreshToken();
  const { userDetails } = useAppSelector(state => {
    return state.auth;
  });
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };
    const persist = true;
    // Avoids unwanted call to verifyRefreshToken
    if (!userDetails?.accessToken && persist) {
      verifyRefreshToken();
    } else {
      setIsLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, [refresh]);

  if (true) {
    if (isLoading) {
      return <p>Loading...</p>;
    }
    if (userDetails?.user?.role?.includes("seller")) {
      return <Outlet />;
    }

    if (userDetails?.user?.role) {
      return <Navigate to="/unauthorized" state={{ from: location }} replace />;
    }
  }
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PersistLogin;
