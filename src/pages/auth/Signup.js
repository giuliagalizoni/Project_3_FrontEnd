import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../apis/api";

import "./auth.css";

function Signup(props) {
  const [state, setState] = useState({ name: "", password: "", email: "" });
  const [errors, setErrors] = useState({
    name: null,
    email: null,
    password: null,
  });

  const navigate = useNavigate();

  function handleChange(event) {
    setState({
      ...state,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await api.post("/signup", state);
      setErrors({ name: "", password: "", email: "" });
      navigate("/login");
    } catch (err) {
      if (err.response) {
        console.error(err.response);
        return setErrors({ ...err.response.data.errors });
      }

      console.error(err);
    }
  }

  return (
    <div className="container">
      <h1>Signup</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div>
          {/* <label htmlFor="signupFormName">Name</label> */}
          <input
            className="input"
            placeholder="Name"
            type="text"
            name="name"
            id="signupFormName"
            value={state.name}
            error={errors.name}
            onChange={handleChange}
          />
        </div>

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
            Signup!
          </button>

          <div className="spam">
            Already have an account{" "}
            <Link to="/login">Click here to login.</Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Signup;
