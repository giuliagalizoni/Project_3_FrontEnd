import { useNavigate } from "react-router-dom";
import back from "../assets/img/icons/back.svg";
import "./backBtn.css";

function BackBtn() {
  const navigate = useNavigate();

  return (
    <button className="back-btn" onClick={() => navigate(-1)}>
      <img src={back} />
    </button>
  );
}

export default BackBtn;
