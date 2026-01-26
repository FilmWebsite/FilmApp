import React, { useEffect } from "react";
import { IoChevronBackOutline } from 'react-icons/io5';
import "./styles/Dedication.scss";


function Dedication() {
  return (
    <div className="dedicationPage">
      <a href="/" className="icon">
        <IoChevronBackOutline size={20} color="white" />
      </a>
      <div className="dedicationPageContent">
        <div className="dedicationLetterContainer">
          <p className="dedicationLetterHeader">Dedicated to you all,</p>
          <div className="dedicationLetter">
            <p>
              As an only child, I found that friends were more than just
              companions; they became my family. Growing up without siblings, I
              often turned to my friends for the camaraderie and support that
              others might find at home. Your presence in my life has filled it
              with laughter, adventure, and countless cherished memories.
              Without you, my journey would have been vastly different and far
              less vibrant.
            </p>
            <p>
              From my brothers back home in New York to my extended family at
              Howard, each of you has played a crucial role in shaping who I am
              today. The bonds we've formed over the years have been my anchor,
              providing me with a sense of belonging and purpose. Whether it was
              a shoulder to lean on during tough times or someone to celebrate
              with during moments of triumph, you have all contributed to my
              growth in immeasurable ways. I am eternally grateful for the
              support and love that has surrounded me.
            </p>
            <p>
              This website is dedicated to all of you. It's a tribute to the
              countless moments we've shared, the memories we've created, and
              the support we've given each other. Through this platform, I hope
              to honor the friendships and connections that have been my
              lifeline. It is a small token of appreciation for the profound
              impact you have had on my life.
            </p>
            <p>
              I am grateful for every friend who took the time to pose and help
              craft these nostalgic pictures. Each photograph is more than just
              an image; it captures a moment in time, a memory that I hold dear
              and one that you can always revisit. Your willingness to
              participate and your patience in helping me capture these moments
              have made this project possible. Together, we have created a
              visual diary of our shared experiences.
            </p>
            <p>
              Every moment captured is a moment I remember vividly. This
              collection is not just for me, but for all of us to look back on
              and cherish. Each picture tells a story of friendship, growth, and
              the unique journey we have embarked upon together. It serves as a
              reminder of the beautiful times we've shared and the bonds that
              continue to strengthen.
            </p>
            <p>
              Sincerely,
              <br />
              <span className="signatureText">Doron Reid</span>
            </p>
          </div>
        </div>

        <div className="dedicationVideoContainer">
          <div className="dedicationVideo"></div>
        </div>
      </div>
    </div>
  );
}

export default Dedication;
