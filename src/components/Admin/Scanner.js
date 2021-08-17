import React, { useState, useContext, useEffect } from "react";
import UserContext from "../../contexts/UserContext";
import QrReader from "react-qr-scanner";
import scanner from "../../images/scanner.jpg";
import logo from "../../images/Logo.svg";
import { Link } from "react-router-dom";
import UserForm from "./UserForm";
import DialogForm from "../DialogForm";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "../Alert";
const camStyle = {
  height: 450,
};
const Scanner = () => {
  const [success, setSuccess] = useState(false);
  const [state, setState] = useState({
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal } = state;
  const [qr, setQR] = useState([]);
  const [open, setOpen] = useState(false);
  const userContext = useContext(UserContext);
  const handleError = (err) => null;
  const handleScan = async (data) => {
    if (data) {
      const array = JSON.parse(data);
      setQR(array);
      setOpen(true);
    }
  };
  useEffect(() => {
    document.body.style.overflow = "hidden";
  }, []);
  return (
    <>
      <div className="container scan section-grid" id="scanner-container">
        <div className="image">
          <div
            className="title-logo"
            onClick={() => (document.body.style.overflow = "visible")}
          >
            <Link to="/">
              <img src={logo} alt="logo" />
              <h1>PHTrace</h1>
            </Link>
          </div>
          <div>
            <img src={scanner} />
          </div>
        </div>
        <div className="scanner">
          <h1>Hold QR Steady and Clear To Scan</h1>
          <QrReader
            delay={1000}
            style={camStyle}
            onError={handleError}
            onScan={handleScan}
          />
        </div>
      </div>
      <div>
        <DialogForm
          open={open}
          setOpen={setOpen}
          title={"Verifying New Visitor"}
          content={"Personal Information of the User"}
        >
          <UserForm
            qr={qr}
            setSuccess={setSuccess}
            setOpen={setOpen}
            userContext={userContext}
          />
        </DialogForm>
      </div>
      <Snackbar
        autoHideDuration={3000}
        anchorOrigin={{ vertical, horizontal }}
        open={success}
        onClose={() => setSuccess(!success)}
      >
        <Alert onClose={() => setSuccess(!success)} severity="success">
          Successfully added
        </Alert>
      </Snackbar>
    </>
  );
};
export default Scanner;
