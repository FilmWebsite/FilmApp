import React, { useEffect } from 'react';
import './scss/FindMe.css';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

type Props = {};

const FindMeResults: React.FC<Props> = (props: Props) => {
  const location = useLocation();
  const navigate = useNavigate();

  const { results } = location.state || {};

  console.log(results, ' hello');

  useEffect(() => {
    if (!results) {
      navigate('/detections');
    }
  }, [results, navigate]);

  return (
    <div className='page'>
      <div className='page-child-results'>
        <div className='detection-results'>
          {results.matchedUrls.length > 0 && (
            <>
              <h3 className='pics-found-text'>Hey You've Been Spotted</h3>
              <div className='desc'>
                <p>
                  <div>
                    <p className='false-postive-message'>
                      Please Note: Some images may be incorrectly identified
                      (false positives), or incorrectly skipped (false
                      negatives).
                    </p>

                    <p className='desc'>
                      {' '}
                      Download individual pictures or all of them below
                    </p>
                  </div>
                </p>
              </div>
              <div className='rightSide-results'>
                {/* @ts-ignore */}
                {results.matchedUrls.map((pic, index) => (
                  <div
                    key={index} // Added a key prop for each mapped element
                    className='picContainer'
                  >
                    <div
                      style={{ backgroundImage: `url(${pic})` }}
                      className='picImage'
                    />
                  </div>
                ))}
              </div>
            </>
          )}

          {results.matchedUrls.length === 0 && (
            <>
              <h3 className='pics-found-text'>We cant seem to find you ....</h3>
              <div className='desc'>
                <p>
                  <div>
                    <p className='no-image-message'>
                      Please Note Some images may be incorrectly bypassed due to
                      lighting and other factors
                    </p>

                    <p className='desc'>
                      If you think pictures should have been found, please try
                      again with a diffrent selfie!
                    </p>
                  </div>
                </p>
              </div>
              <div>
                <button className='upload-bttn'>
                  Attempt to Find Me Again
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export { FindMeResults };
