import React, { useContext, useState, useEffect } from "react";
import UserContext from "../../contexts/User/UserContext";
import download from "../../images/Download.svg";
import logo from "../../images/Logo.svg";
import PublishIcon from "@material-ui/icons/Publish";
import UserUpload from "./UserUpload";
import UserQr from "./UserQr";
import UserSettings from "./UserSettings";
import Button from "@material-ui/core/Button";
import SettingsIcon from "@material-ui/icons/Settings";
import CropFreeIcon from "@material-ui/icons/CropFree";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "../Alert";
const imgStyle = {
  maxHeight: "15rem",
  borderRadius: "16px",
};
const UserCard = () => {
  const userContext = useContext(UserContext);
  const [updateProfile, setUpdateProfile] = useState(false);
  const [privacyPolicy, setPrivacyPolicy] = useState(false);
  const [page, setPage] = useState(1);
  const baseUrl = "http://localhost:3001";
  const [state, setState] = useState({
    vertical: "top",
    horizontal: "center",
    successMessage: "You have successfully uploaded your ID!",
  });
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [successUpdate, setSuccessUpdate] = useState(false);
  const [isBlank, setBlank] = useState(false);
  const { vertical, horizontal, successMessage } = state;
  useEffect(() => {
    document.body.style.overflow = "hidden";
  }, []);
  return (
    <>
      <div className="container section-grid user-section">
        <div className="img">
          <img src={download} alt="Your QR Code" />
        </div>
        <div className="container settings">
          <div className="title-logo">
            <img src={logo} alt="logo" />
            <h1>PHTrace</h1>
          </div>
          {page === 1 && (
            <div className="settings-body">
              {userContext ? (
                <>
                  <div className="identification">
                    <img
                      src={`${baseUrl}/${userContext.user.img}`}
                      alt="identification-card"
                      style={imgStyle}
                    />
                  </div>
                </>
              ) : null}
            </div>
          )}
          {page === 2 && (
            <UserSettings
              setPage={setPage}
              setBlank={setBlank}
              setSuccessUpdate={setSuccessUpdate}
            />
          )}
          <div className="settings-choices">
            {page === 1 && (
              <>
                <div onClick={() => setUpdateProfile(true)}>
                  <Button variant="contained" color="primary" className="but">
                    <PublishIcon />
                    <span>Upload Your ID</span>
                  </Button>
                </div>
                <div>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => setPrivacyPolicy(true)}
                    className="but"
                  >
                    <CropFreeIcon />
                    <span>Get Your QR Code</span>
                  </Button>
                </div>
                <div>
                  <Button
                    variant="outlined"
                    color="primary"
                    className="but"
                    onClick={() => setPage(2)}
                  >
                    <SettingsIcon />
                    <span>Change your profile </span>
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
        <UserUpload
          open={updateProfile}
          setOpen={setUpdateProfile}
          id={userContext.user.id}
          setSuccess={setSuccess}
          setFailure={setFailure}
        />
        <UserQr
          open={privacyPolicy}
          setOpen={setPrivacyPolicy}
          id={userContext.user.id}
        />
      </div>
      <Snackbar
        autoHideDuration={3000}
        anchorOrigin={{ vertical, horizontal }}
        open={success}
        onClose={() => setSuccess(!success)}
      >
        <Alert onClose={() => setSuccess(!success)} severity="success">
          {successMessage}
        </Alert>
      </Snackbar>
      <Snackbar
        autoHideDuration={3000}
        anchorOrigin={{ vertical, horizontal }}
        open={successUpdate}
        onClose={() => setSuccessUpdate(false)}
      >
        <Alert onClose={() => setSuccessUpdate(false)} severity="success">
          Profile has been updated successfully!;
        </Alert>
      </Snackbar>
      <Snackbar
        autoHideDuration={5000}
        anchorOrigin={{ vertical, horizontal }}
        open={failure}
        onClose={() => setFailure(!failure)}
      >
        <Alert onClose={() => setFailure(!failure)} severity="warning">
          You must upload jpeg/png file. Word documents, pdf and other file is
          not supported. Make sure you click choose file before uploading
        </Alert>
      </Snackbar>
      <Snackbar
        autoHideDuration={4000}
        anchorOrigin={{ vertical, horizontal }}
        open={isBlank}
        onClose={() => setBlank(!isBlank)}
      >
        <Alert onClose={() => setBlank(!isBlank)} severity="warning">
          You either did not enter your password or the password is incorrect.
          Entering your password is required to change your information
        </Alert>
      </Snackbar>
    </>
  );
};

export default UserCard;
