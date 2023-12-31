import { useRef, useState, useEffect, FormEvent } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { setCredentials } from "../features/auth/authSlice";
import { useLoginMutation } from "../features/auth/authApiSlice";
import "./index.scss";
import { useAppDispatch } from "../hooks/useReduxHooks";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const userRef = useRef<HTMLInputElement | null>(null);
  const errRef = useRef<HTMLInputElement | null>(null);

  const [username, setUsername] = useState<string>("");
  const [password, setPwd] = useState<string>("");
  const [errMsg, setErrMsg] = useState("");

  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    userRef?.current?.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const userData = await login({ username, password }).unwrap();
      dispatch(setCredentials({ ...userData, username }));
      setUsername("");
      setPwd("");
      navigate(from, { replace: true });
    } catch (err) {
      setErrMsg("username/password is incorrect");
      errRef?.current?.focus();
    }
  };

  const content = isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <section className="login">
      <div className="login__container">
        <div className="login__text-container">
          <div className="logo">
            <img
              src=""
              width={80}
              style={{ objectFit: "contain" }}
              alt="seller"
            />
          </div>
        </div>
        <div className="login__form-container">
          <h1 className="">Sign In</h1>
          <form onSubmit={handleSubmit}>
            <div className="login__input-container">
              <span> Username:</span>

              <input
                className="login__input"
                type="text"
                id="username"
                ref={userRef}
                autoComplete="off"
                onChange={e => {
                  return setUsername(e.target.value);
                }}
                value={username}
                required
              />
            </div>
            <div className="login__input-container">
              <span> Password:</span>
              <input
                className="login__input"
                type="password"
                id="password"
                autoComplete="off"
                onChange={e => {
                  return setPwd(e.target.value);
                }}
                value={password}
                required
              />
            </div>
            {/* <div className="my-2">
              <input
                type="checkbox"
                id="persist"
                onChange={toggle}
                checked={check}
              />
              <p className="pl-2">Trust This Device</p>
            </div> */}
            <p
              ref={errRef}
              className={errMsg ? "login__error" : "login__error-hide"}
            >
              {errMsg}
            </p>
            <button type="submit" className="login__button">
              Sign In
            </button>
          </form>
        </div>
      </div>
    </section>
  );

  return content;
};

export default Login;
