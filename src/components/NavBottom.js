import { Link } from "react-router-dom";

import home from "../assets/img/icons/home.svg";
import addtask from "../assets/img/icons/addtask.svg";

function NavBottom() {
  return (
    <nav className="nav-bottom">
      <Link to="/" className="nav-btns">
        <img src={home} alt="home" />
      </Link>
      <Link to="/create_task" className="nav-btns">
        <img src={addtask} alt="Add Task" />
      </Link>
    </nav>
  );
}

export default NavBottom;
