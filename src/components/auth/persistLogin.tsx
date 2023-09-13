import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

// Import custom hooks with their types
import useAuth from "../../hooks/useAuth"; // Replace with your actual path
import useRefreshToken from "../../hooks/useRefreshToken"; // Replace with your actual path

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const refresh = useRefreshToken();
  const { persist, auth } = useAuth();
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

    // Avoids unwanted call to verifyRefreshToken
    if (!auth?.accessToken && persist) {
      verifyRefreshToken();
    } else {
      setIsLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, []);

  if (true) {
    if (isLoading) {
      return <p>Loading...</p>;
    }
    if (auth?.user?.role?.includes("seller")) {
      return <Outlet />;
    }

    if (auth?.user?.role) {
      return <Navigate to="/unauthorized" state={{ from: location }} replace />;
    }
  }
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PersistLogin;
