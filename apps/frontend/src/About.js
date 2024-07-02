import React, { useState } from 'react';
import './css/About.css';
import ImageRow from './comps/ImageRow';

import { IoChevronBackOutline } from 'react-icons/io5';
import huFourteen from './howardPics/huFourteen.JPG';
import { FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';
import { IoCameraOutline } from 'react-icons/io5';

function About() {
  return (
    <div className='about-container'>
      <a href='/'>
        <IoChevronBackOutline className='icon' />
      </a>
      {/* <div className="titleBox">
        <IoCameraOutline className="rotatedIcon" />
        <p className="title">ddot studio</p>
      </div> */}
      <div className='content'>
        <div
          className='picture'
          style={{ backgroundImage: `url(${huFourteen})` }}
        />
        <div className='textBox'>
          <div className='line' />
          <h1 className='Name'>Doron Reid</h1>
          <h2 className='subHeader'>Howard University Alum '24</h2>
          <p className='aboutContent'>
            A description of a Howard University alumnus could vary greatly
            depending on the individual's accomplishments, field of study, and
            career trajectory. However, I can provide a general description: "A
            Howard University alumnus is someone who has graduated from Howard
            University, a prestigious historically black university located in
            Washington, D.C. Howard University has a rich history of producing
            influential leaders, scholars, and professionals across various
            fields, including politics, law, medicine, business, and the arts.
          </p>
          <div className='socialsBox'>
            <a
              href='https://www.instagram.com/d.dot._?igsh=MzRlODBiNWFlZA=='
              target='_blank'
              rel='noreferrer'
            >
              <FaInstagram size={25} className='socialMedia' id='Insta' />
            </a>
            <a
              href='https://www.linkedin.com/in/doron-reid-1030221b5'
              target='_blank'
              rel='noreferrer'
            >
              <FaLinkedin size={25} className='socialMedia' id='LinkedIn' />
            </a>
            <a
              href='https://github.com/doronr18'
              target='_blank'
              rel='noreferrer'
            >
              <FaGithub size={25} className='socialMedia' id='GitHub' />
            </a>
          </div>
          <div className='requestSection'>
            <p className='requestQuestion'>
              Do you want photos from the website?
            </p>
            <a href='/request-photos' className='requestButton'>
              Request Photos
            </a>
          </div>
        </div>
      </div>

      {/* <div className="pictureFrame">
        <div
          className="picture"
          style={{ backgroundImage: `url(${huFourteen})` }}
        ></div>
      </div> */}
    </div>
  );
}

export default About;
