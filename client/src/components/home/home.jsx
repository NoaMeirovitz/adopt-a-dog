import React from "react";
import Logo from "../../images/logo-white-bg.png";
import "./home.scss";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div id="home">
      <div className="hero">
        <div className="innerDiv">
          <h1>
            <strong>Adopt a Pet</strong>
          </h1>
          <h3>Get yourself a pet!</h3>
          <img className="logo" src={Logo} alt="logo" />
          <Link to={"/signup"} className="sign-up-link">
            Sign Up Here!
          </Link>

          <h4>
            Welcome to Adopt a Dog, where you can find your new best friend and
            change a life forever! Our platform connects you with lovable pups
            in need of a forever home. We make the adoption process easy and
            fun, so you can focus on the joy of finding your perfect match. By
            adopting a dog, you're not just gaining a companion, you're giving a
            deserving pup a second chance at a happy life. So come on in, browse
            our furry friends, and let's make some tails wag!
          </h4>
          <div className="signuplink"></div>
        </div>
      </div>
    </div>
  );
};

export default Home;
