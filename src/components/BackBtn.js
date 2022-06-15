import { useNavigate } from "react-router-dom";
import back from "../assets/img/icons/back.svg";
import "./backBtn.css";

function BackBtn() {
  const navigate = useNavigate();

  return (
    <button className="back-btn nav-btns" onClick={() => navigate(-1)}>
      <img src={back} alt="back" />
    </button>
  );
}

export default BackBtn;
