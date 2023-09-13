import { useNavigate, useLocation } from "react-router-dom";
import { MdArrowBackIosNew } from "react-icons/md";
import "./backbutton.scss";

const BackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const goBack = () => {
    if (location.pathname !== "/") {
      navigate(-1);
    } else {
      // Handle logic for staying at the root page if needed
    }
  };
  return (
    <button type="button" className="back-button" onClick={goBack}>
      <MdArrowBackIosNew />
    </button>
  );
};

export default BackButton;
