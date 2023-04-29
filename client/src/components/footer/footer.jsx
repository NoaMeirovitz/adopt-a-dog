import React from "react";
import { Link } from "react-router-dom";
import "./footer.scss";
import { SocialIcon } from "react-social-icons";

function Footer() {
  return (
    <div id="footer">
      <div className="links">
        <div className="nav">
          <Link to={"/"}> Home</Link> <Link to={"/pets"}> Pets</Link>{" "}
          <Link to={"/about"}> About</Link>
        </div>
        <div className="copyright">
          Adopt a dog &copy; {new Date().getFullYear()}
          <div>054-625-6369</div>
          <div>Noa Meirovitz</div>
        </div>
        <div className="social">
          <SocialIcon
            style={{ width: "20px", height: "20px" }}
            url="https://twitter.com"
          />
          <SocialIcon
            style={{ width: "20px", height: "20px" }}
            url="https://whatsapp.com"
          />
          <SocialIcon
            style={{ width: "20px", height: "20px" }}
            url="https://facebook.com"
          />
          <SocialIcon
            style={{ width: "20px", height: "20px" }}
            url="https://youtube.com"
          />
        </div>
      </div>
    </div>
  );
}

export default Footer;
