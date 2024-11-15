import { useEffect, useRef } from 'react';
import { IoChevronBackOutline } from 'react-icons/io5';
import { FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';
import { IoIosArrowDown } from 'react-icons/io';

import './styles/about.css';
import { usePhotos } from '@film/photos-web';

function About() {
  const { aboutMedia } = usePhotos();

  const getAboutMediaViaPrefix = (name: string) => {
    // Filter the media array to find a photo where metadata.name includes the passed in name
    const foundMedia = aboutMedia.find((media) =>
      media.metadata.name.includes(name)
    );

    // Return the found media, or null if no match is found
    return foundMedia || null;
  };

  useEffect(() => {
    const pictures = document.querySelectorAll('.picture');
    const headerImage = document.querySelector('.headerImage');
    const loader = document.querySelector('.loader');

    // Observer for pictures
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          } else {
            entry.target.classList.remove('visible');
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
    headerImage?.classList.add('light');

    const hideLoader = setTimeout(() => {
      loader?.classList.add('hide');
      // Change the opacity of the header image to dark after the loader hides
      headerImage?.classList.remove('light');
      headerImage?.classList.add('dark');
    }, 4500);

    return () => {
      pictures.forEach((picture) => {
        observer.unobserve(picture);
      });
      clearTimeout(hideLoader);
    };
  }, []);

  const containersRef = useRef<(HTMLDivElement | null)[]>([]);
  const techContainersRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Observer for the first set of containers
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('fade-in');
              entry.target.classList.remove('fade-out');
            }, index * 500); // Delay for each container's fade-in
          } else {
            entry.target.classList.remove('fade-in');
            entry.target.classList.add('fade-out');
          }
        });
      },
      {
        threshold: 0.1, // Trigger fade-in when 10% of the container is visible
      }
    );

    // Observe each container in containersRef
    containersRef.current.forEach((container) => {
      if (container) observer.observe(container);
    });

    // Cleanup: unobserve all containers on component unmount
    return () => {
      containersRef.current.forEach((container) => {
        if (container) observer.unobserve(container);
      });
    };
  }, []);

  useEffect(() => {
    // Observer for the techContainersRef with random delay on entry
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const randomDelay = Math.random() * 1100; // Random delay up to 1.1 seconds
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('fadeIn');
              entry.target.classList.remove('fadeOut');
            }, randomDelay);
          } else {
            setTimeout(() => {
              entry.target.classList.add('fadeOut');
              entry.target.classList.remove('fadeIn');
            }, randomDelay);
          }
        });
      },
      {
        threshold: 0.1, // Trigger fade-in when 10% of the container is visible
      }
    );

    // Observe each container in techContainersRef
    techContainersRef.current.forEach((container) => {
      if (container) observer.observe(container);
    });

    // Cleanup: unobserve all containers on component unmount
    return () => {
      techContainersRef.current.forEach((container) => {
        if (container) observer.unobserve(container);
      });
    };
  }, []);

  return (
    <div className='about-container'>
      <div
        className='headerImage'
        style={{
          backgroundImage: `url(${getAboutMediaViaPrefix('DD.JPG')?.url})`,
        }}
      >
        <a href='/' className='icon'>
          <IoChevronBackOutline size={20} color='white' />
        </a>
        <div className='wordContainer'>
          <div className='loader'>
            <span>Christians,</span>
            <span>Bisons,</span>
            <span>Engineers.</span>
          </div>
          <div className='headerWordsContainer'>
            <h1 className='pageHeader'>About</h1>
            <p className='headerWords'>
              Welcome to the collaborative journey of two software engineers and
              proud Howard University alumni. Dive into the creative vision of
              Doron Reid, a passionate film photographer, and discover how he
              and Deontae Smith combined their technical expertise to craft this
              platform. Join us in celebrating the fusion of art and technology
              delivered through their collaborative efforts.
            </p>
          </div>
          <div className='arrowContainer-about'>
            <p className='arrowDownText-about'>Scroll to Learn More</p>
            <IoIosArrowDown className='arrowDown-about' />
          </div>
        </div>
      </div>

      <div className='content'>
        <div
          className='picture'
          style={{
            backgroundImage: `url(${
              getAboutMediaViaPrefix('huFourteen')?.url
            })`,
          }}
        />
        <div className='textBox'>
          <div className='line' />
          <h1 className='Name'>Doron Reid</h1>
          <h2 className='subHeader'>Chief Photographer & Frontend Lead</h2>
          <p className='aboutContent'>
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
          <div className='socialsBox'>
            <a
              href='https://www.instagram.com/d.dot._?igsh=MzRlODBiNWFlZA=='
              target='_blank'
              rel='noreferrer'
            >
              <FaInstagram size={25} className='socialMedia' />
            </a>
            <a
              href='https://www.linkedin.com/in/doron-reid-1030221b5'
              target='_blank'
              rel='noreferrer'
            >
              <FaLinkedin size={25} className='socialMedia' />
            </a>
            <a
              href='https://github.com/doronr18'
              target='_blank'
              rel='noreferrer'
            >
              <FaGithub size={25} className='socialMedia' />
            </a>
          </div>
        </div>
      </div>

      <div className='contentTwo'>
        <div className='textBoxTwo'>
          <div className='lineTwo' />
          <h1 className='Name'>Deontae Smith</h1>
          <h2 className='subHeaderTwo'>Data Architect & Backend Lead</h2>
          <p className='aboutContent'>
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
          <div className='socialsBox'>
            <a
              href='https://www.instagram.com/dxontxe/'
              target='_blank'
              rel='noreferrer'
            >
              <FaInstagram size={25} className='socialMediaTwo' />
            </a>
            <a
              href='https://www.linkedin.com/in/deontae-smith-4112a41b6/'
              target='_blank'
              rel='noreferrer'
            >
              <FaLinkedin size={25} className='socialMediaTwo' />
            </a>
            <a
              href='https://github.com/deontae-smith'
              target='_blank'
              rel='noreferrer'
            >
              <FaGithub size={25} className='socialMediaTwo' />
            </a>
          </div>
        </div>
        <div
          className='picture'
          style={{
            backgroundImage: `url(${getAboutMediaViaPrefix('Dee.JPG')?.url})`,
          }}
        />
      </div>

      <div className='filmIntro'>
        <h1>What Film was used?</h1>
        <p className='aboutDescriptions'>
          Film photography offers a unique and nostalgic experience, capturing
          moments with a distinct quality and character that digital photography
          often lacks. Each type of film brings its own set of characteristics,
          from the vibrant colors of Kodak Portra 400 to the classic tones of
          Fujifilm QuickSnap.
        </p>
        <div className='filmContainer'>
          <div
            className='imageContainer'
            ref={(el) => (containersRef.current[0] = el)}
          >
            <div
              className='aboutFilm'
              style={{
                backgroundImage: `url(${
                  getAboutMediaViaPrefix('two.JPG')?.url
                })`,
              }}
            />
            <p className='caption' id='filmTwo'>
              Fujifilm QuickSnap Flash Disposable
            </p>
          </div>
          <div
            className='imageContainer'
            ref={(el) => (containersRef.current[1] = el)}
          >
            <div
              className='aboutFilm'
              style={{
                backgroundImage: `url(${
                  getAboutMediaViaPrefix('three.JPG')?.url
                })`,
              }}
            />
            <p className='caption' id='filmThree'>
              Kodak Portra 400
            </p>
          </div>
          <div
            className='imageContainer'
            ref={(el) => (containersRef.current[2] = el)}
          >
            <div
              className='aboutFilm'
              style={{
                backgroundImage: `url(${
                  getAboutMediaViaPrefix('five.JPG')?.url
                })`,
              }}
            />
            <p className='caption' id='filmFour'>
              Kodak Ultramax 400
            </p>
          </div>
          <div
            className='imageContainer'
            ref={(el) => (containersRef.current[3] = el)}
          >
            <div
              className='aboutFilm'
              style={{
                backgroundImage: `url(${
                  getAboutMediaViaPrefix('four.JPG')?.url
                })`,
              }}
            />
            <p className='caption' id='filmFive'>
              Fujifilm 135 film
            </p>
          </div>
        </div>
      </div>

      <div className='techInfo'>
        <h1>Website Technologies</h1>
        <p className='aboutDescriptions'>
          Highlighting the modern web development tools and frameworks utilized
          in building this site. It covers key technologies such as React, CSS3,
          JavaScript, and backend solutions like Node.js and MongoDB, detailing
          their roles in creating a responsive, dynamic, and efficient user
          experience.
        </p>
        <div className='techLogoContainer'>
          <div
            className='techContainer'
            style={{ top: '10%', left: '10%' }}
            ref={(el) => (techContainersRef.current[0] = el)}
          >
            <div
              style={{
                backgroundImage: `url(${getAboutMediaViaPrefix('css')?.url})`,
              }}
              className='techLogos'
            />
            <div className='techCaption' id='front-end'>
              CSS
            </div>
          </div>
          <div
            className='techContainer'
            style={{ top: '10%', left: '35%' }}
            ref={(el) => (techContainersRef.current[1] = el)}
          >
            <div
              style={{
                backgroundImage: `url(${
                  getAboutMediaViaPrefix('express')?.url
                })`,
              }}
              className='techLogos'
            />
            <div className='techCaption' id='back-end'>
              Express
            </div>
          </div>
          <div
            className='techContainer'
            style={{ top: '10%', left: '58%' }}
            ref={(el) => (techContainersRef.current[2] = el)}
          >
            <div
              style={{
                backgroundImage: `url(${
                  getAboutMediaViaPrefix('graphql')?.url
                })`,
              }}
              className='techLogos'
            />
            <div className='techCaption' id='back-end'>
              GraphQL
            </div>
          </div>
          <div
            className='techContainer'
            style={{ top: '10%', left: '80%' }}
            ref={(el) => (techContainersRef.current[3] = el)}
          >
            <div
              style={{
                backgroundImage: `url(${getAboutMediaViaPrefix('js')?.url})`,
              }}
              className='techLogos'
            />
            <div className='techCaption' id='front-end'>
              JavaScript
            </div>
          </div>
          <div
            className='techContainer'
            style={{ top: '55%', left: '70%' }}
            ref={(el) => (techContainersRef.current[4] = el)}
          >
            <div
              style={{
                backgroundImage: `url(${getAboutMediaViaPrefix('node')?.url})`,
              }}
              className='techLogos'
            />
            <div className='techCaption' id='back-end'>
              Node.js
            </div>
          </div>
          <div
            className='techContainer'
            style={{ top: '55%', left: '47%' }}
            ref={(el) => (techContainersRef.current[5] = el)}
          >
            <div
              style={{
                backgroundImage: `url(${getAboutMediaViaPrefix('react')?.url})`,
              }}
              className='techLogos'
            />
            <div className='techCaption' id='front-end'>
              React
            </div>
          </div>
          <div
            className='techContainer'
            style={{ top: '55%', left: '20%' }}
            ref={(el) => (techContainersRef.current[6] = el)}
          >
            <div
              style={{
                backgroundImage: `url(${getAboutMediaViaPrefix('ts')?.url})`,
              }}
              className='techLogos'
            />
            <div className='techCaption' id='front-end'>
              TypeScript
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export { About };
