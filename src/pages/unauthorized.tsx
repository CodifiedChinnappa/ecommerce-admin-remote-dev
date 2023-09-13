import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();
  return (
    <div className="h-screen flex justify-center items-center text-white ">
      <div className="">
        <h1>Access to this page is restricted</h1>
        <p>
          Please check with the site admin if you believe this is a mistake.
        </p>
        <button
          type="button"
          className="mt-3 p-3 text-lg rounded bg-black"
          onClick={() => {
            return navigate("/");
          }}
        >
          Go Home
        </button>
      </div>
    </div>
  );
};

export default Unauthorized;
