import React, { useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import api from "../../apis/api";
import logo from "../../assets/img/Logo_Option_1.png";

import "./auth.css";

import { AuthContext } from "../../contexts/authContext";

function Login(props) {
  const authContext = useContext(AuthContext);

  const [state, setState] = useState({ password: "", email: "" });
  const [errors, setErrors] = useState({
    email: null,
    password: null,
  });

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  function handleChange(event) {
    setState({
      ...state,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await api.post("/login", state);
      console.log(response);

      authContext.setLoggedInUser({ ...response.data });
      localStorage.setItem(
        "loggedInUser",
        JSON.stringify({ ...response.data })
      );
      setErrors({ password: "", email: "" });
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err.response);
      setErrors({ ...err.response.data.errors });
    }
  }

  return (
    <div className="container">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <form className="form" onSubmit={handleSubmit}>
        <div>
          {/* <label htmlFor="signupFormEmail">E-mail Address</label> */}
          <input
            className="input"
            placeholder="Email"
            type="email"
            name="email"
            id="signupFormEmail"
            value={state.email}
            error={errors.email}
            onChange={handleChange}
          />
        </div>

        <div>
          {/* <label htmlFor="signupFormPassword">Password</label> */}
          <input
            className="input"
            placeholder="Password"
            type="password"
            name="password"
            id="signupFormPassword"
            value={state.password}
            error={errors.password}
            onChange={handleChange}
          />
        </div>

        <div className="btn-container">
          <button className="btn-lg" type="submit">
            Login!
          </button>

          <div className="spam">
            Don't have an account?{" "}
            <Link to="/signup"> Click here to signup!</Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
