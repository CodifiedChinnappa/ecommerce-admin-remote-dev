import axios from "../api/axios";
// import { useSelector } from "react-redux";
const useLogout = () => {
  // const authState = useSelector((state) => state);
  const logout = async () => {
    try {
      await axios("auth/logout", {
        withCredentials: true,
      });
    } catch (err) {
      console.error(err);
    }
  };

  return logout;
};

export default useLogout;
