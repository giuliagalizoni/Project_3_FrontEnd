import { Route, Routes } from "react-router-dom";
import { AuthContextComponent } from "../contexts/authContext";
// import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/styles/index.css";

import Home from "../pages/Home";
import Signup from "../pages/auth/Signup";
import Login from "../pages/auth/Login";
import ProtectedRoute from "../pages/auth/ProtectedRoute";
import CreateTask from "../pages/CreateTask";
import EditTask from "../pages/EditTask";

function App() {
  return (
    <div>
      <AuthContextComponent>
        <Routes>
          <Route path="/" element={<ProtectedRoute component={Home} />} />
          <Route
            path="/create_task"
            element={<ProtectedRoute component={CreateTask} />}
          />
          <Route
            path="/edit_task/:id"
            element={<ProtectedRoute component={EditTask} />}
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </AuthContextComponent>
    </div>
  );
}

export default App;
