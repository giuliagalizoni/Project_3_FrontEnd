import { Link } from "react-router-dom";

import home from "../assets/img/icons/Home.png";
import add_task from "../assets/img/icons/Add_task.png";

function NavBottom() {
  return (
    <nav className="nav-bottom">
      <Link to="/">
        <img src={home} alt="home" width="60" height="60" />
      </Link>
      <Link to="/create_task">
        <img src={add_task} alt="Add Task" width="60" height="60" />
      </Link>
    </nav>
  );
}

export default NavBottom;
