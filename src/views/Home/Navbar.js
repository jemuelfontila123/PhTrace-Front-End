import { Link } from "react-router-dom";
import React, { useContext } from "react";
import UserContext from "contexts/User/UserContext";
import logo from "images/Logo.svg";
import HorizontalSplitIcon from "@material-ui/icons/HorizontalSplit";
import HomeIcon from "@material-ui/icons/Home";
import EditIcon from "@material-ui/icons/Edit";
import PersonIcon from "@material-ui/icons/Person";
import DashboardIcon from "@material-ui/icons/Dashboard";
import GetAppIcon from "@material-ui/icons/GetApp";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
const Navbar = () => {
  const userContext = useContext(UserContext);
  return (
    <nav className="container section-grid top-nav">
      <div className="logo-title">
        <img className="logo" src={logo} alt="PHTrace Logo" />
        <h1 className="name">PHTrace</h1>
      </div>
      <div id="icon">
        <HorizontalSplitIcon />
      </div>
      <ul>
        <li className="icon">
          <HomeIcon />
          <Link to="/">Home</Link>
        </li>
        {userContext.user ? (
          <>
            <li className="icon">
              {userContext.user.role[0] === "user" ? (
                <>
                  <GetAppIcon />
                  <Link to="/settings">Get QR Code</Link>
                </>
              ) : (
                <>
                  <PhotoCameraIcon />
                  <Link to="/scan">Scan</Link>
                </>
              )}
            </li>
            {userContext.user.role[0] === "admin" ? (
              <li className="icon">
                <>
                  <DashboardIcon />
                  <Link to="/dashboard"> Dashboard </Link>
                </>
              </li>
            ) : null}
            <li className="icon">
              <ExitToAppIcon />
              <Link to="/" onClick={() => userContext.logOut()}>
                Log Out
              </Link>
            </li>
          </>
        ) : (
          <>
            <li className="icon">
              <EditIcon />
              <Link to="/register">Register</Link>
            </li>
            <li className="icon">
              <PersonIcon />
              <Link to="/login">Login</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
