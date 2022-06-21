import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../apis/api';

import colaborative from '../../assets/img/colaborative.svg';

import './auth.css';

function Signup(props) {
  const [state, setState] = useState({ name: '', password: '', email: '' });
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
      const response = await api.post('/signup', state);
      setErrors({ name: '', password: '', email: '' });
      navigate('/login');
    } catch (err) {
      if (err.response) {
        console.error(err.response);
        return setErrors({ ...err.response.data.errors });
      }

      console.error(err);
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
          'Your password must have at least 8 characters including one number and one special character',
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
        <h1>Hey! Do you know that Organize.me is colaborative?</h1>
        <p>
          Bring your professional help, a friend or other people to help you,
          send and invite of your task or share your calendar.{' '}
        </p>
      </div>

      <div className='login-side side'>
        <h1>Signup</h1>
        <form className='form' onSubmit={handleSubmit}>
          <div className='input-auth-group'>
            <input
              className='input-auth'
              // placeholder="Name"
              type='text'
              name='name'
              id='signupFormName'
              value={state.name}
              error={errors.name}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            <label className='auth-label' htmlFor='signupFormName'>
              Name
            </label>
          </div>

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
              Email
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
              Signup!
            </button>

            <div className='spam'>
              Already have an account{' '}
              <Link to='/login'>Click here to login.</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
