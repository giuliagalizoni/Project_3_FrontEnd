import { Link } from "react-router-dom";
import logo2 from "../assets/img/logo-2.svg";

function Error() {
  return (
    <div className="web-container">
      <div className="container">
        <Link to={"/"}>
          <img src={logo2} alt="Organize.me" style={{ width: "180px" }} />
        </Link>
        <div style={{ marginBottom: "200px" }}>
          <h1
            style={{
              fontFamily: "Roboto, sans-serif",
            }}
          >
            404: page not found
          </h1>
          <p
            style={{
              color: "#6c757d",
              fontFamily: "Roboto, sans-serif",
              fontWeight: "400",
              fontSize: "16px",
              lineHeight: "155.69%",
              letterSpacing: "0.025em",
            }}
          >
            It looks like this page doesn't exist :(
          </p>
        </div>
      </div>
    </div>
  );
}

export default Error;
