import React, { useState, useEffect } from "react";
import UserSelect from "components/Form/UserSelect";
import reg from "images/Register.svg";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import logo from "images/Logo.svg";
import { Link } from "react-router-dom";

const eye = <FontAwesomeIcon icon={faEye} />;
const RegisterForm = ({
  userRegister,
  establishmentRegister,
  setSuccessful,
}) => {
  const { register, handleSubmit, errors } = useForm();
  const [user, setUser] = useState("User");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [isSame, setIsSame] = useState(null);
  const [isVisible, setVisible] = useState(false);
  const handleVisibility = () => setVisible(!isVisible);
  const [emailError, setEmailError] = useState("");
  const [emailVisible, setEmailVisible] = useState(false);
  const showEmail = { display: emailVisible ? "" : "none" };
  const handleRePassword = (event) => setRePassword(event.target.value);
  const comparePassword = () => {
    if (rePassword == "") setIsSame(null);
    else if (password == rePassword) setIsSame(true);
    else setIsSame(false);
  };
  const handleUser = async (data, e) => {
    if (isSame) {
      const newUser = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
      };
      const isSuccessful = await userRegister(newUser);
      const emailFound = isSuccessful.find((element) => element === "email");
      if (emailFound) {
        setEmailError(data.email);
        setEmailVisible(true);
      }
      if (isSuccessful.length === 0) {
        e.target.reset();
        setSuccessful();
      }
    }
  };
  const handleEstablishment = async (data, e) => {
    if (isSame) {
      const establishment = {
        name: data.establishmentName,
        contactPerson: data.contactPerson,
        email: data.email,
        password: data.password,
      };
      const isSuccessful = await establishmentRegister(establishment);
      console.log(isSuccessful.length);
      const emailFound = isSuccessful.find((element) => element === "email");
      if (emailFound) {
        setEmailError(data.email);
        setEmailVisible(true);
      }
      if (isSuccessful.length === 0) {
        e.target.reset();
        setSuccessful();
      }
    }
  };
  useEffect(() => {
    document.body.style.overflow = "visible";
  }, []);
  console.log(isSame);
  return (
    <div className="container section-grid register-form">
      <div className="img">
        <img src={reg} alt="Register Icon" />
      </div>
      <div className="main-form">
        <div className="title-logo">
          <Link to="/">
            <img src={logo} alt="logo" />
            <h1>PHTrace</h1>
          </Link>
        </div>
        <form
          className="frm frm-register"
          onSubmit={handleSubmit(
            user === "User" ? handleUser : handleEstablishment
          )}
        >
          <div className="frm-title">
            <h2>Sign Up</h2>
            <h6>Enter your details to create your account</h6>
          </div>
          <UserSelect
            description={"Register as..."}
            user={user}
            setUser={setUser}
          />
          {user === "User" ? (
            <>
              <div>
                <label>First Name</label>
                <input
                  name="firstName"
                  ref={register({ required: true })}
                  placeholder="First name"
                />
                {errors.firstName && <p>First Name is required</p>}
              </div>
              <div>
                <label>Last Name</label>
                <input
                  name="lastName"
                  ref={register({ required: true })}
                  placeholder="Last name"
                />
                {errors.lastName && <p>Last Name is required</p>}
              </div>
            </>
          ) : (
            <>
              <div>
                <label>Contact Person</label>
                <input
                  name="contactPerson"
                  ref={register({ required: true })}
                  placeholder="Contact Person"
                />
                {errors.contactPerson && <p>Contact Person is required</p>}
              </div>
              <div>
                <label>Establishment Name</label>
                <input
                  name="establishmentName"
                  ref={register({ required: true })}
                  placeholder="Establishment name"
                />
                {errors.establishmentName && (
                  <p>Establishment name is required</p>
                )}
              </div>
            </>
          )}
          <div>
            <label>Email</label>
            <input
              name="email"
              type="email"
              ref={register({ required: true })}
              placeholder="Email"
              onChange={() => setEmailVisible(false)}
            />
            <p style={showEmail} className="error">
              {emailError} already exists{" "}
            </p>
            {errors.email && <p>Email is required</p>}
          </div>
          <div>
            <label>Password</label>
            <div className="pass-wrapper">
              <input
                name="password"
                type={isVisible ? "text" : "password"}
                placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                ref={register({
                  required: true,
                  minLength: 8,
                  pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/i,
                })}
                maxLength="36"
              />
              <i onClick={handleVisibility}>{eye}</i>
            </div>
            <div className="frm-helper">
              {errors.password && errors.password.type === "minLength" && (
                <p>The password must be at least 8 characters</p>
              )}
              {errors.password && errors.password.type === "pattern" && (
                <p>
                  Your password must contain at least one number and one
                  uppercase
                </p>
              )}
              <small>Your password should be at least 8 characters</small>
              <small>
                Your password must contain at least one number and one uppercase
              </small>
            </div>
          </div>
          <div>
            <label>Confirm password</label>
            <div className="pass-wrapper">
              <input
                name="password"
                type="password"
                onChange={handleRePassword}
                onKeyUp={comparePassword}
                placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                minLength="8"
                maxLength="36"
                required
              />
            </div>
            <div className="frm-helper">
              {isSame === false && <p>It does not match with your password</p>}
            </div>
          </div>
          <div>
            <button className="btn">Register</button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default RegisterForm;
