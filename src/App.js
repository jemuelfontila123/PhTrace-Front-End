import "./index.css";
import React, { useEffect, useState, useContext } from "react";
import UserContext from "./contexts/User/UserContext";
import RegisterForm from "./components/RegisterForm";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Scanner from "./components/Admin/Scanner";
import UserCard from "./components/User/UserCard";
import Admin from "./components/Admin/Admin";
// import Admin from './views/Admin/Admin'
import LoginForm from "./components/LoginForm";
import usersApi from "./services/usersApi";
import loginApi from "./services/loginApi";
import establishmentsApi from "./services/establishmentsApi";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "./components/Alert";
import { Switch, Route, Redirect } from "react-router-dom";
import textApi from "./services/textApi";
// React Admin
const App = () => {
  const userContext = useContext(UserContext);
  const [overflow, setOverFlow] = useState("");
  const [state, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
    message: "",
  });
  const { vertical, horizontal, open, message } = state;
  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setState({ ...state, open: false });
  };
  const [successfulRegister, setSuccessfulRegister] = useState(false);
  const setSuccessful = () => {
    setSuccessfulRegister(true);
    setState({
      ...state,
      open: true,
      message: "Account successfully created. You may login now",
    });
  };
  const run = async (id) => {
    const response = await establishmentsApi.getData(id);
    userContext.setUser(response.data);
  };
  const getUser = async (id) => {
    const response = await usersApi.getData(id);
    userContext.setUser(response.data);
  };
  const userLogin = async (user) => {
    try {
      const response = await loginApi.login(user);
      window.localStorage.setItem(
        "loggedInUser",
        JSON.stringify(response.data)
      );
      if (response.data.user) {
        userContext.setUser(response.data.user);
        usersApi.setToken(response.data.token);
      } else {
        establishmentsApi.setToken(response.data.token);
        if (response.data.establishment.role[0] === "admin")
          run(response.data.establishment.id);
        else userContext.setUser(response.data.establishment);
      }
    } catch (exception) {
      return false;
    }
    return true;
  };
  const userRegister = async (user) => {
    const array = [];
    try {
      await usersApi.register(user);
      return array;
    } catch (exception) {
      const response = exception.response.data.error;
      const error = JSON.stringify(response);
      if (error.indexOf("email") > 0) array.push("email");
      if (error.indexOf("contactNumber") > 0) array.push("contactNumber");
      return array;
    }
  };
  const establishmentRegister = async (establishment) => {
    const array = [];
    try {
      await establishmentsApi.register(establishment);
      return array;
    } catch (exception) {
      const response = exception.response.data.error;
      const error = JSON.stringify(response);
      if (error.indexOf("email") > 0) array.push("email");
      return array;
    }
  };
  useEffect(() => {
    const loggedInUser = window.localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      const parsedUser = JSON.parse(loggedInUser);
      if (parsedUser.user) {
        // userContext.setUser(parsedUser.user);
        usersApi.setToken(parsedUser.token);
        getUser(parsedUser.user.id);
      } else {
        establishmentsApi.setToken(parsedUser.token);
        run(parsedUser.establishment.id);
      }
    }
  }, []);
  useEffect(() => {
    document.body.style.overflow = "visible";
  }, []);
  return (
    <div>
      <Switch>
        <Route exact path="/">
          {!userContext.user ? (
            <>
              <Navbar />
              <Home />
            </>
          ) : userContext.user.role[0] === "user" ? (
            <Redirect to="/settings" />
          ) : userContext.user.role[0] === "admin" ? (
            <Redirect to="/dashboard" />
          ) : null}
        </Route>
        <Route path="/scan">
          {!userContext.user ? null : userContext.user.role[0] === "admin" ||
            userContext.user.role[0] === "employee" ? (
            <Scanner />
          ) : (
            <Redirect to="/" />
          )}
        </Route>
        <Route path="/register">
          {successfulRegister ? (
            <Redirect to="/login" />
          ) : (
            <>
              <RegisterForm
                userRegister={userRegister}
                establishmentRegister={establishmentRegister}
                setSuccessful={setSuccessful}
              />
            </>
          )}
        </Route>
        <Route path="/login">
          {userContext.user ? (
            <Redirect to="/dashboard" />
          ) : (
            <>
              <LoginForm
                userLogin={userLogin}
                setSuccessfulRegister={setSuccessfulRegister}
              />
            </>
          )}
        </Route>
        <Route path="/settings">
          {!userContext.user ? (
            <Redirect to="/" />
          ) : userContext.user.role[0] === "user" ? (
            <UserCard />
          ) : (
            <Redirect to="/" />
          )}
        </Route>
        <Route path="/dashboard">
          {!userContext.user ? null : userContext.user.role[0] === "admin" ? (
            <Admin run={run} />
          ) : (
            <Redirect to="/" />
          )}
        </Route>
      </Switch>
      <Snackbar
        autoHideDuration={3000}
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success">
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default App;
