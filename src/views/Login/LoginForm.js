import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import login from "images/Login.png";
import logo from "images/Logo.svg";
import { Link } from "react-router-dom";
const LoginForm = ({ userLogin, setSuccessfulRegister }) => {
  const [error, setError] = useState(false);
  const { register, handleSubmit, errors, setValue } = useForm();
  const handleLogin = async (data, e) => {
    const user = {
      email: data.email,
      password: data.password,
    };
    const isSuccessful = await userLogin(user);
    if (!isSuccessful) {
      setError(true);
      setValue("password", "");
    }
  };
  useEffect(() => {
    document.body.style.overflow = "hidden";
    setSuccessfulRegister(false);
  }, []);
  return (
    <div className="container section-grid login-form">
      <div id="login-image">
        <img src={login} alt="Login Icon" />
      </div>
      <div className="main-form">
        <div
          className="title-logo"
          onClick={() => (document.body.style.overflow = "visible")}
        >
          <Link to="/">
            <img src={logo} alt="logo" />
            <h1>PHTrace</h1>
          </Link>
        </div>
        <form className="frm frm-login" onSubmit={handleSubmit(handleLogin)}>
          <div className="frm-title">
            <h2>Login</h2>
            <h6>Enter your details below to gain access</h6>
          </div>
          {error && <p>Invalid email or password</p>}
          <div>
            <label> Email</label>
            <input
              name="email"
              placeholder="Email"
              ref={register({ required: true })}
              type="email"
              onChange={() => setError(false)}
            />
            {errors.email && <p>Email is required</p>}
          </div>
          <div>
            <label> Password</label>
            <input
              type="password"
              name="password"
              placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
              ref={register({ required: true })}
              onChange={() => setError(false)}
            />
            {errors.password && <p>Password is required</p>}
          </div>
          <div className="column">
            <button className="btn btn-main">Sign In</button>
            <Link to="/register">
              <small>Don't have an account ? Register Now</small>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
