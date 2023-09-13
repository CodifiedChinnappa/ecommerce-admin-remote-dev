import { useNavigate } from "react-router-dom";

const Error404 = () => {
  const navigate = useNavigate();
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center ">
      <div className="h-2/4 relative flex justify-center">
        <div className=" text-slate-300  text-9xl font-bold absolute -bottom-3 animate-marquee">
          404
        </div>
      </div>

      <div className="h-2/4 w-full bg-slate-300 flex flex-col justify-center items-center">
        <h3 className="text-5xl font-semibold mb-5">Sorry, Page Not Found</h3>

        <p className="text-xl">The page you requested could not be found.</p>

        <button
          type="button"
          className="mt-3 p-3 text-white text-2xl rounded bg-black w-2/12"
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

export default Error404;
