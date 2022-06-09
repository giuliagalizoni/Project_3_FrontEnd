import { Link } from "react-router-dom";
import "../pages/auth/auth.css";
import { useContext } from "react";
import { AuthContext } from "../contexts/authContext";
import logo from "../assets/img/Logo_Option_1.png";
import home from "../assets/img/icons/Home.png";
import add_task from "../assets/img/icons/Add_task.png";

function Navbar() {
  const { handleLogout } = useContext(AuthContext);

  return (
    <nav>
      <Link to="/">
        <img src={logo} alt="logo" width="60" height="48" />
      </Link>
      <div>
        <Link to="/">
          <img src={home} alt="home" width="60" height="60" />
        </Link>
        <Link to="/create_task">
          <img src={add_task} alt="Add Task" width="60" height="60" />
        </Link>
      </div>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
}

export default Navbar;
