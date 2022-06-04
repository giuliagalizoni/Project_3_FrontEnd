import { Link } from "react-router-dom";
import "../pages/auth/auth.css";
import logo from "../assets/img/Logo_Option_1.png";

function Navbar() {
  return (
    <nav>
      <Link  to="/"><img src={logo} alt="logo"/>
        Organize.me
      </Link>
    </nav>
  );
}

export default Navbar;
