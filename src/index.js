import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import UserContextProvider from 'contexts/User/UserContextProvider'
ReactDOM.render(
  <Router>
    <UserContextProvider>
      <App />
      {/* <Wow/> */}
    </UserContextProvider>
  </Router>,
  document.getElementById("root")
);
