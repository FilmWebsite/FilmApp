import React from 'react';
import { FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';
import { IoCameraOutline } from 'react-icons/io5';
import './styles/Footer.css';
import { useFooterState } from './providers/FooterProvider';

function Footer() {
  const { showFooter } = useFooterState(); // Manage footer visibility globally

  return (
    <div className={showFooter ? 'footer' : 'footer-none'}>
      <div className='usefulLinks'>
        <h1 className='footerHeaders'>Useful Links</h1>
        <div className='links'>
          <a href='/' className='footerLink'>
            Home
          </a>
          <a href='/about' className='footerLink'>
            About
          </a>
          <a href='/downloads' className='footerLink'>
            Downloads
          </a>
          <a href='/dedication' className='footerLink'>
            Dedication
          </a>
        </div>
      </div>

      {/* <div className="socialLinks">
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
      </div> */}

      <a href='/albums-login' className='copyright'>
        Copyright © 2024 DDot Studio
      </a>
    </div>
  );
}

export default Footer;

{
  /* <div className="divider"></div> */
}
