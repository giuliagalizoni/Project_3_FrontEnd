import { Link } from "react-router-dom";
import "../pages/auth/auth.css";
import { useContext } from "react";
import { AuthContext } from "../contexts/authContext";
import logo from "../assets/img/Logo_Option_1.png";
import home from "../assets/img/Home.png";
import add_task from "../assets/img/Add_task.png";

function Navbar() {
  
  const { handleLogout } = useContext(AuthContext);

  return (
    <nav>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img
            src={logo}
            alt="logo"
            width="60"
            height="48"
            className="d-inline-block "
          />
        </Link>
        <Link className="navbar-brand" to="/">
          <img
            src={home}
            alt="home"
            width="60"
            height="60"
            className="d-inline-block "
          />
        </Link>
        <Link className="navbar-brand" to="/create_task">
          <img
            src={add_task}
            alt="Add Task"
            width="60"
            height="60"
            className="d-inline-block "
          />
        </Link>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;
