import React, { useState, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import api from '../../apis/api';

import logo from '../../assets/img/Logo_Option_1.png';
import colaborative from '../../assets/img/colaborative.svg';

import './auth.css';

import { AuthContext } from '../../contexts/authContext';

function Login(props) {
  const authContext = useContext(AuthContext);

  const [state, setState] = useState({ password: '', email: '' });
  const [errors, setErrors] = useState({
    email: null,
    password: null,
  });

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  function handleChange(event) {
    setState({
      ...state,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await api.post('/login', state);
      authContext.setLoggedInUser({ ...response.data });
      localStorage.setItem(
        'loggedInUser',
        JSON.stringify({ ...response.data })
      );
      setErrors({ password: '', email: '' });
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err.response);
      setErrors({ ...err.response.data.errors });
    }
  }

  function validateEmail() {
    if (!state.email.match(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/gm)) {
      setErrors({ ...errors, email: 'Please type a valid email adress' });
    } else {
      setErrors({ ...errors, email: null });
    }
  }

  function validatePassword() {
    if (
      !state.password.match(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/gm
      )
    ) {
      setErrors({
        ...errors,
        password:
          'Your password must have at least 8 characters including one upper case letter, one number and one special character',
      });
    } else {
      setErrors({ ...errors, password: null });
    }
  }

  function handleBlur(event) {
    if (event.target.name === 'email') {
      validateEmail();
    }

    if (event.target.name === 'password') {
      validatePassword();
    }
  }

  return (
    <div className='web-container'>
      <div className='carousel'>
        <img className='img' src={colaborative} alt='' />
        <h1>
          Create your tasks, organize your deadlines and define your priorities.
          It's simple!
        </h1>
        <p>
          We're more than a notepad. We can help you to organize your tasks in
          steps and support you on your journey.
        </p>
      </div>

      <div className='login-side side'>
        <div className='logo'>
          <img src={logo} alt='logo' />
        </div>
        <form className='form' onSubmit={handleSubmit}>
          <div className='input-auth-group'>
            <input
              className='input-auth'
              // placeholder="Email"
              type='email'
              name='email'
              id='signupFormEmail'
              value={state.email}
              error={errors.email}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            <label className='auth-label' htmlFor='signupFormEmail'>
              Email{' '}
            </label>
            {errors.email && <small className='errors'>{errors.email}</small>}
          </div>

          <div className='input-auth-group'>
            <input
              className='input-auth'
              // placeholder="Password"
              type='password'
              name='password'
              id='signupFormPassword'
              value={state.password}
              error={errors.password}
              maxLength='25'
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            <label className='auth-label' htmlFor='signupFormPassword'>
              Password
            </label>
            {errors.password && (
              <small className='errors'>{errors.password}</small>
            )}
          </div>

          <div className='btn-container'>
            <button className='btn-lg' type='submit'>
              Login!
            </button>

            <div className='spam'>
              Don't have an account?{' '}
              <Link to='/signup'> Click here to signup!</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
