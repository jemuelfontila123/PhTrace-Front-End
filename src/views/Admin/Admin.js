import React, { useState, useEffect, useContext } from "react";
import UserContext from "contexts/User/UserContext";
import logo from "images/Logo.svg";
import { Link } from "react-router-dom";
import AdminVisitors from "./Visitors/AdminVisitors";
import AdminEmployees from "./Employees/AdminEmployees";
import AdminDashboard from "./Dashboard/AdminDashboard";
import AdminProfile from "./Profile/AdminProfile";
import AdminNotification from "./Notifications/AdminNotification";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "components/Alert";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import EmailIcon from "@material-ui/icons/Email";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import PeopleIcon from "@material-ui/icons/People";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import HomeIcon from "@material-ui/icons/Home";
import DashboardIcon from "@material-ui/icons/Dashboard";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import establishmentsApi from "services/establishmentsApi";
// import Link from '@material-ui/core/Link';
const Admin = ({ run }) => {
  const active = {
    color: "#3BCCFF",
  };
  const [sideNav, setSideNav] = useState("Dashboard");
  const userContext = useContext(UserContext);
  const [state, setState] = useState({
    success: false,
    reset: false,
    addSuccess: false,
    notifications: false,
    sms: false,
    updated: false,
    errUpdated: false,
    vertical: "top",
    horizontal: "center",
    message: "Successfully filtered the table.",
    addMessage: "Successfully added new employee",
    resetMessage: "Successfully reset",
    smsMessage: "Successfuly sent an sms",
    updatedMessage: "Succesfully updated your profile",
    errUpdatedMessage: "You have entered a wrong password",
  });
  const {
    vertical,
    horizontal,
    success,
    message,
    reset,
    resetMessage,
    addSuccess,
    addMessage,
    notifications,
    sms,
    smsMessage,
    updated,
    updatedMessage,
    errUpdated,
    errUpdatedMessage,
  } = state;
  const handleSuccess = () => setState({ ...state, success: true });
  const handleResetMessage = () => setState({ ...state, reset: true });
  const handleUpdateMessage = () => setState({ ...state, updated: true });
  const handleErrUpdateMessage = () => setState({ ...state, errUpdated: true });
  const handleSmsMessage = () => setState({ ...state, sms: true });
  const employeeSuccess = () => setState({ ...state, addSuccess: true });
  const update = async (id) => {
    try {
      await establishmentsApi.addNotification();
    } catch (exception) {
      console.log("error");
    }
  };
  useEffect(() => {
    update(userContext.user.id);
    if (userContext.user.notifications.length > 0) {
      setState({ ...state, notifications: true });
    }
  }, []);
  return (
    <>
      <div className="section-grid admin">
        <div className="side container">
          <div className="logo">
            <img src={logo} alt="PhTrace logo" />
            <h1>PHTrace</h1>
          </div>
          <div className="menu">
            <div
              className={sideNav === "Dashboard" ? "active" : null}
              onClick={() => setSideNav("Dashboard")}
            >
              <DashboardIcon />
              <span>Dashboard</span>
            </div>
            <div
              className={sideNav === "Visitors" ? "active" : null}
              onClick={() => setSideNav("Visitors")}
            >
              <PeopleIcon />
              <span>Visitors</span>
            </div>
            <div
              className={sideNav === "Employees" ? "active" : null}
              onClick={() => setSideNav("Employees")}
            >
              <SupervisedUserCircleIcon />
              <span>Employees</span>
            </div>
            <div>
              <PhotoCameraIcon />
              <Link to="/scan">Scan</Link>
            </div>
            <div
              className={sideNav === "Profile" ? "active" : null}
              onClick={() => setSideNav("Profile")}
            >
              <AccountBoxIcon />
              <span>Profile</span>
            </div>
            <div
              className={sideNav === "Notifications" ? "active" : null}
              onClick={() => setSideNav("Notifications")}
            >
              <NotificationsActiveIcon />
              <span>Notifications</span>
            </div>
            <div>
              <ExitToAppIcon />
              <Link to="/" onClick={() => userContext.logOut()}>
                Log Out
              </Link>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="content-header">
            <div className="content-title">
              <div className="content-user">
                <div className="icon">
                  <SupervisorAccountIcon />
                  <h4>
                    {userContext.user.role[0] === "admin" && "Administrator"}
                  </h4>
                </div>
                <div className="icon">
                  <EmailIcon />
                  <h4>{userContext.user.email}</h4>
                </div>
              </div>
              <div>
                <Breadcrumbs
                  separator={<NavigateNextIcon fontSize="small" />}
                  aria-label="breadcrumb"
                >
                  <span
                    className="icon"
                    style={sideNav === "Dashboard" ? active : null}
                    onClick={() => setSideNav("Dashboard")}
                  >
                    <DashboardIcon />
                    Dashboard
                  </span>
                  <span
                    className="icon"
                    style={sideNav === "Visitors" ? active : null}
                    onClick={() => setSideNav("Visitors")}
                  >
                    <PeopleIcon />
                    Visitors
                  </span>
                  <span
                    className="icon"
                    style={sideNav === "Employees" ? active : null}
                    onClick={() => setSideNav("Employees")}
                  >
                    <SupervisedUserCircleIcon />
                    Employees
                  </span>
                  <span
                    className="icon"
                    style={sideNav === "Profile" ? active : null}
                    onClick={() => setSideNav("Profile")}
                  >
                    <AccountBoxIcon />
                    Profile
                  </span>
                  <span
                    className="icon"
                    style={sideNav === "Notifications" ? active : null}
                    onClick={() => setSideNav("Notifications")}
                  >
                    <NotificationsActiveIcon />
                    Notifications
                  </span>
                </Breadcrumbs>
              </div>
            </div>
          </div>
          {/* setSms is temporarily unavailable for visitors */}
          {sideNav === "Dashboard" && <AdminDashboard />}
          {sideNav === "Visitors" && userContext.user && (
            <AdminVisitors
              handleSuccess={handleSuccess}
              handleResetMessage={handleResetMessage}
              handleSmsMessage={handleSmsMessage}
            />
          )}
          {sideNav === "Employees" && userContext.user && (
            <AdminEmployees
              employeeSuccess={employeeSuccess}
              handleSmsMessage={handleSmsMessage}
            />
          )}
          {sideNav === "Profile" && userContext.user && (
            <AdminProfile
              user={userContext.user}
              handleUpdateMessage={handleUpdateMessage}
              handleErrUpdateMessage={handleErrUpdateMessage}
            />
          )}
          {sideNav === "Notifications" && userContext.user && (
            <AdminNotification userContext={userContext} />
          )}
        </div>
      </div>
      <Snackbar
        autoHideDuration={3000}
        anchorOrigin={{ vertical, horizontal }}
        open={success}
        onClose={() => setState({ ...state, success: false })}
      >
        <Alert
          onClose={() => setState({ ...state, success: false })}
          severity="success"
        >
          {message}
        </Alert>
      </Snackbar>
      <Snackbar
        autoHideDuration={3000}
        anchorOrigin={{ vertical, horizontal }}
        open={reset}
        onClose={() => setState({ ...state, reset: false })}
      >
        <Alert
          onClose={() => setState({ ...state, reset: false })}
          severity="success"
        >
          {resetMessage}
        </Alert>
      </Snackbar>
      <Snackbar
        autoHideDuration={3000}
        anchorOrigin={{ vertical, horizontal }}
        open={addSuccess}
        onClose={() => setState({ ...state, addSuccess: false })}
      >
        <Alert
          onClose={() => setState({ ...state, addSuccess: false })}
          severity="success"
        >
          {addMessage}
        </Alert>
      </Snackbar>
      <Snackbar
        autoHideDuration={7000}
        anchorOrigin={{ vertical, horizontal }}
        open={notifications}
        onClose={() => setState({ ...state, notifications: false })}
      >
        <Alert
          onClose={() => setState({ ...state, notifications: false })}
          severity="success"
        >
          {`You have ${userContext.user.notifications.length} ${
            userContext.user.notifications.length === 1
              ? "notification"
              : "notifications"
          }`}
        </Alert>
      </Snackbar>
      <Snackbar
        autoHideDuration={7000}
        anchorOrigin={{ vertical, horizontal }}
        open={sms}
        onClose={() => setState({ ...state, sms: false })}
      >
        <Alert
          onClose={() => setState({ ...state, sms: false })}
          severity="success"
        >
          {smsMessage}
        </Alert>
      </Snackbar>
      <Snackbar
        autoHideDuration={7000}
        anchorOrigin={{ vertical, horizontal }}
        open={updated}
        onClose={() => setState({ ...state, updated: false })}
      >
        <Alert
          onClose={() => setState({ ...state, updated: false })}
          severity="success"
        >
          {updatedMessage}
        </Alert>
      </Snackbar>
      <Snackbar
        autoHideDuration={7000}
        anchorOrigin={{ vertical, horizontal }}
        open={errUpdated}
        onClose={() => setState({ ...state, errUpdated: false })}
      >
        <Alert
          onClose={() => setState({ ...state, errUpdated: false })}
          severity="error"
        >
          {errUpdatedMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Admin;
