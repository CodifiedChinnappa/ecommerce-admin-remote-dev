import { useLocation, useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const from = location.state?.from?.pathname || "/login";
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="">
        <h1 className="text-black">Access to this page is restricted</h1>
        <p className="text-black">
          Please check with the site admin if you believe this is a mistake.
        </p>
        <button
          type="button"
          className="mt-3 p-3 text-lg rounded bg-black text-white"
          onClick={() => {
            return navigate(from, { replace: true });
          }}
        >
          Go back
        </button>
      </div>
    </div>
  );
};

export default Unauthorized;
