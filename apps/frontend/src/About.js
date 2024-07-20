import React, { useEffect, useRef } from "react";
import "./css/About.css";
import { IoChevronBackOutline } from "react-icons/io5";
import huFourteen from "./howardPics/huFourteen.JPG";
import DD from "./howardPics/DD.JPG";
import Dee from "./howardPics/Dee.JPG";
import one from "./howardPics/one.JPG";
import two from "./howardPics/two.JPG";
import three from "./howardPics/three.JPG";
import four from "./howardPics/four.JPG";
import five from "./howardPics/five.JPG";
import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";

function About() {
  useEffect(() => {
    const pictures = document.querySelectorAll(".picture");
    const headerImage = document.querySelector(".headerImage");
    const loader = document.querySelector(".loader");

    // Observer for pictures
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          } else {
            entry.target.classList.remove("visible");
          }
        });
      },
      {
        threshold: 0.85, // Adjust this value as needed
      }
    );

    pictures.forEach((picture) => {
      observer.observe(picture);
    });

    // Initially make the header image lighter
    headerImage.classList.add("light");

    const hideLoader = setTimeout(() => {
      loader.classList.add("hide");
      // Change the opacity of the header image to dark after the loader hides
      headerImage.classList.remove("light");
      headerImage.classList.add("dark");
    }, 4500);

    return () => {
      pictures.forEach((picture) => {
        observer.unobserve(picture);
      });
      clearTimeout(hideLoader);
    };
  }, []);

  //What Film was used? Functions
  const containersRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("fade-in");
              entry.target.classList.remove("fade-out");
            }, index * 500); // Adjust the delay as needed
          } else {
            entry.target.classList.remove("fade-in");
            entry.target.classList.add("fade-out");
          }
        });
      },
      {
        threshold: 0.1, // Adjust based on when you want the fade-in to trigger
      }
    );

    containersRef.current.forEach((container) => {
      if (container) observer.observe(container);
    });

    return () => {
      if (containersRef.current) {
        containersRef.current.forEach((container) => {
          observer.unobserve(container);
        });
      }
    };
  }, []);

  return (
    <div className="about-container">
      <div className="headerImage" style={{ backgroundImage: `url(${DD})` }}>
        <a href="/" className="icon">
          <IoChevronBackOutline size={20} color="white" />
        </a>
        <div className="wordContainer">
          <div className="loader">
            <span>Christians,</span>
            <span>Bisons,</span>
            <span>Engineers.</span>
          </div>
          <div className="headerWordsContainer">
            <h1 className="pageHeader">About</h1>
            <p className="headerWords">
              Welcome to the collaborative journey of two software engineers and
              proud Howard University alumni. Dive into the creative vision of
              Doron Reid, a passionate film photographer, and discover how he
              and Deontae Smith combined their technical expertise to craft this
              platform. Join us in celebrating the fusion of art and technology
              delivered through their collaborative efforts.
            </p>
          </div>
          <div className="arrowContainer-about">
            <p className="arrowDownText-about">Scroll to Learn More</p>
            <IoIosArrowDown className="arrowDown-about" />
          </div>
        </div>
      </div>

      <div className="content">
        <div
          className="picture"
          style={{ backgroundImage: `url(${huFourteen})` }}
        />
        <div className="textBox">
          <div className="line" />
          <h1 className="Name">Doron Reid</h1>
          <h2 className="subHeader">Photographer/Frontend Engineer</h2>
          <p className="aboutContent">
            Doron Reid is a native of Brooklyn, New York, and a Howard
            University alum with a degree in computer science. He has interned
            at prestigious companies such as MITRE and Cisco, where he worked on
            cybersecurity projects. Doron found a strong interest in film
            photography, starting with Kodak and Fuji Film before transitioning
            to a Minolta point-and-shoot camera. To further develop his skills
            and explore his interest in front-end development, he had the idea
            of displaying his film pictures on a unique, self-made platform.
            Doron is now preparing to pursue a PhD in computer science at Howard
            University with a concentration in natural language processing,
            continuing his academic journey while sharing his passion for film
            photography through his work.
          </p>
          <div className="socialsBox">
            <a
              href="https://www.instagram.com/d.dot._?igsh=MzRlODBiNWFlZA=="
              target="_blank"
              rel="noreferrer"
            >
              <FaInstagram size={25} className="socialMedia" />
            </a>
            <a
              href="https://www.linkedin.com/in/doron-reid-1030221b5"
              target="_blank"
              rel="noreferrer"
            >
              <FaLinkedin size={25} className="socialMedia" />
            </a>
            <a
              href="https://github.com/doronr18"
              target="_blank"
              rel="noreferrer"
            >
              <FaGithub size={25} className="socialMedia" />
            </a>
          </div>
        </div>
      </div>

      <div className="contentTwo">
        <div className="textBoxTwo">
          <div className="lineTwo" />
          <h1 className="Name">Deontae Smith</h1>
          <h2 className="subHeaderTwo">Backend/Full Stack Engineer</h2>
          <p className="aboutContent">
            Deontae Smith, hailing from Baton Rouge, Louisiana, is a Howard
            University alum with a degree in computer science. He has gained
            valuable experience through internships at notable companies such as
            Google and Ironclad. With a strong passion for backend programming,
            Deontae joined forces with Doron to launch this platform. He has
            been instrumental in developing its functionalities, features, and
            dev-ops, serving as the backbone of the website. Deontae continues
            to make strides in the software engineering industry, leveraging his
            expertise to drive innovation and excellence.
          </p>
          <div className="socialsBox">
            <a
              href="https://www.instagram.com/dxontxe/"
              target="_blank"
              rel="noreferrer"
            >
              <FaInstagram size={25} className="socialMediaTwo" />
            </a>
            <a
              href="https://www.linkedin.com/in/deontae-smith-4112a41b6/"
              target="_blank"
              rel="noreferrer"
            >
              <FaLinkedin size={25} className="socialMediaTwo" />
            </a>
            <a
              href="https://github.com/deontae-smith"
              target="_blank"
              rel="noreferrer"
            >
              <FaGithub size={25} className="socialMediaTwo" />
            </a>
          </div>
        </div>
        <div className="picture" style={{ backgroundImage: `url(${Dee})` }} />
      </div>

      <div className="filmIntro">
        <h1>What Film was used?</h1>
        <p className="aboutDescriptions">
          Film photography offers a unique and nostalgic experience, capturing
          moments with a distinct quality and character that digital photography
          often lacks. Each type of film brings its own set of characteristics,
          from the vibrant colors of Kodak Portra 400 to the classic tones of
          Fujifilm QuickSnap.
        </p>
        <div className="filmContainer">
          <div
            className="imageContainer"
            ref={(el) => (containersRef.current[0] = el)}
          >
            <div
              className="aboutFilm"
              style={{ backgroundImage: `url(${two})` }}
            />
            <p className="caption" id="filmTwo">
              Fujifilm QuickSnap Flash Disposable
            </p>
          </div>
          <div
            className="imageContainer"
            ref={(el) => (containersRef.current[1] = el)}
          >
            <div
              className="aboutFilm"
              style={{ backgroundImage: `url(${three})` }}
            />
            <p className="caption" id="filmThree">
              Kodak Portra 400
            </p>
          </div>
          <div
            className="imageContainer"
            ref={(el) => (containersRef.current[2] = el)}
          >
            <div
              className="aboutFilm"
              style={{ backgroundImage: `url(${five})` }}
            />
            <p className="caption" id="filmFour">
              Kodak Ultramax 400
            </p>
          </div>
          <div
            className="imageContainer"
            ref={(el) => (containersRef.current[3] = el)}
          >
            <div
              className="aboutFilm"
              style={{ backgroundImage: `url(${four})` }}
            />
            <p className="caption" id="filmFive">
              Fujifilm 135 film
            </p>
          </div>
        </div>
      </div>

      <div className="techInfo">
        <h1>Website Technologies</h1>
        <p className="aboutDescriptions">
          Highlighting the modern web development tools and frameworks utilized in
          building this site. It covers key technologies such as React, CSS3,
          JavaScript, and backend solutions like Node.js and MongoDB, detailing
          their roles in creating a responsive, dynamic, and efficient user
          experience.
        </p>
      </div>
    </div>
  );
}

export default About;

{
  /* <div className="imageContainer">
            <div
              className="aboutFilm"
              style={{ backgroundImage: `url(${one})` }}
            />
            <p className="caption" id="filmOne">
              Kodak Film Disposable
            </p>
          </div> */
}
