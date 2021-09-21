import React, { useContext } from "react";
import qr from "images/QR.png";
import tracing from "images/Tracing.svg";
import privacy from "images/Privacy.svg";
import { Link } from "react-router-dom";
import Navbar from './Navbar'
const Home = () => {
  return (
    <>
      <Navbar/>
      <section className="container section-grid section1">
        <div className="grid-one">
          <h1>We make filling in forms easy for you</h1>
          <p>
            Filling in forms has never been that much easier. As a user, you
            will not need to experience such inconvenience every time you enter
            a establishment as you only need to show your QR Code.In light of
            this, establishments can now easily trace people who go in and out
            of their buildings
          </p>
          <Link to="/register">
            <button className="btn btn-section-main">Get Started</button>
          </Link>
        </div>
        <div className="grid-two">
          <img src={qr} alt="Contact Tracing" alt="qr code" />
        </div>
      </section>
      <section className="container section-grid section2">
        <div className="grid-one">
          <h1>Easier Tracing</h1>
          <p>
            It does not replace manual tracing, but rather aid it. It complement
            and scale up the work done by human teams. It can automate the way
            it filter out those at risk and it lessens the time in investigating
            genuine cases
          </p>
        </div>
        <div className="grid-two">
          <img src={tracing} alt="Scanning QR Code" />
        </div>
      </section>
      <section className="container section-grid section3">
        <div className="grid-one">
          <h1>Data Privacy</h1>
          <p>
            Organizations who deal with your personal details, whereabouts, and
            preferences are dutybound to observe and respect your data privacy
            rights.If you feel that your personal data has been misused,
            maliciously disclosed, or improperly disposed, or if any of the
            rights discussed here have been violated, the data subject has a
            right to file a complaint with us.
          </p>
        </div>
        <div className="grid-two">
          <img src={privacy} alt="Privacy"></img>
        </div>
      </section>
    </>
  );
};

export default Home;
