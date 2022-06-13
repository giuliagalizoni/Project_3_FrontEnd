import { Link } from "react-router-dom";
import "../pages/auth/auth.css";
import { useContext } from "react";
import { AuthContext } from "../contexts/authContext";

import logo from "../assets/img/Logo_Option_1.png";
import home from "../assets/img/icons/home.svg";
import addtask from "../assets/img/icons/addtask.svg";
import logout from "../assets/img/icons/logout.svg";

function Navbar() {
  const { handleLogout } = useContext(AuthContext);

  return (
    <nav className="nav">
      <Link to="/">
        <img src={logo} alt="logo" width="60" height="48" />
      </Link>
      <div className="center-btns">
        <Link to="/" className="nav-btns">
          <img src={home} alt="home" />
        </Link>
        <Link to="/create_task" className="nav-btns">
          <img src={addtask} alt="Add Task" />
        </Link>
      </div>
      <button className="nav-btns" onClick={handleLogout}>
        <img src={logout} alt="Logout button" />
      </button>
    </nav>
  );
}

export default Navbar;
