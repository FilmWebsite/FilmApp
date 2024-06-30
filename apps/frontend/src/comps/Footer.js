import React from "react";
import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
import { IoCameraOutline } from "react-icons/io5";
import "../css/Footer.css";

function Footer() {
  return (
    <div className="footer">
      {/* <div className="footerSignature">
        <div className="footerTitleBox">
          <IoCameraOutline className="footerRotatedIcon" />
          <p className="footTitle">ddot studio</p>
        </div>
        <text className="copyright">Copyright © 2024 DDot Studio</text>
      </div> */}

      <div className="usefulLinks">
        <h1 className="footerHeaders">Useful Links</h1>
        <div className="links">
          <a href="/about" className="footerLink">
            About
          </a>
          <a href="/request-photos" className="footerLink">
            Request Photos
          </a>
          <a href="/albums-login" className="footerLink">
            Owner
          </a>
        </div>
      </div>

      <div className="socialLinks">
        <h1 className="footerHeaders">Socials</h1>

        <div className="socials">
          <a
            href="https://www.instagram.com/d.dot._?igsh=MzRlODBiNWFlZA=="
            target="_blank"
            rel="noreferrer"
          >
            <FaInstagram size={25} className="social" id="Insta" />
          </a>
          <a
            href="https://www.linkedin.com/in/doron-reid-1030221b5"
            target="_blank"
            rel="noreferrer"
          >
            <FaLinkedin size={25} className="social" id="LinkedIn" />
          </a>
          <a
            href="https://github.com/doronr18"
            target="_blank"
            rel="noreferrer"
          >
            <FaGithub size={25} className="social" id="GitHub" />
          </a>
        </div>
      </div>

      <text className="copyright">Copyright © 2024 DDot Studio</text>
    </div>
  );
}

export default Footer;

{
  /* <div className="divider"></div> */
}
