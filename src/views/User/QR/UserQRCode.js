import React, { useState, useEffect } from "react";
import usersApi from "../../../services/usersApi";
const UserQRCode = ({ user }) => {
  const [qr, setQR] = useState([]);
  useEffect(() => {
    const getQR = async (user) => {
      const response = await usersApi.getQR(user);
      setQR(response.data);
    };
    getQR(user);
  }, []);
  return (
    <div>
      <div className="img">
        <img src={qr}></img>
      </div>
      <div className="icon">
        <a href={qr} download>
          <button className="btn btn-main">Download QR Code</button>
        </a>
      </div>
    </div>
  );
};

export default UserQRCode;
