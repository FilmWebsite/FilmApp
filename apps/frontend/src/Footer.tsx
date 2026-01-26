import React from "react";
import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
import { IoCameraOutline } from "react-icons/io5";
import "./styles/Footer.scss";
import { useFooterState } from "./providers/FooterProvider";
import { SignInButton, SignOutButton, useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

function Footer() {
  const { showFooter } = useFooterState(); // Manage footer visibility globally
  // const { user } = useUser(); //

  return (
    <div className={showFooter ? "footer" : "footer-none"}>
      <div className="usefulLinks">
        <h1 className="footerHeaders">Links</h1>

        <div className="links">
          <a href="/" className="footerLink">
            Home
          </a>
          <a href="/about" className="footerLink">
            About
          </a>
          <a href="/downloads" className="footerLink">
            Downloads
          </a>
          <a href="/dedication" className="footerLink">
            Dedication
          </a>

          <a
            href="https://www.instagram.com/ddot_filmz?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
            className="footerLink"
            target="_blank"
            rel="noreferrer"
          >
            Instagram
          </a>
        </div>
      </div>
      <p className="copyright">Copyright © 2024 DDot Studio</p>
    </div>
  );
}

export default Footer;

{
  /* <div className="divider"></div> */
}
