import { ThreeDots } from 'react-loader-spinner';

import './styles/Loading.scss';
import { useEffect, useState } from 'react';

function Loading() {
  const [text, setText] = useState('Just One Sec');

  useEffect(() => {
    // Set a timer to change the text after 5 seconds
    const timer = setTimeout(() => {
      setText('You may need to refresh');
    }, 5000);

    // Cleanup the timer if the component is unmounted before the timer finishes
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className='loading-screen'>
      <ThreeDots
        visible={true}
        height='80'
        width='80'
        color='#f94e63'
        radius='9'
        ariaLabel='three-dots-loading'
        wrapperStyle={{}}
        wrapperClass=''
      />
      <p className='loaderText'>{text}</p>
    </div>
  );
}

export { Loading };
