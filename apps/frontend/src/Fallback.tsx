import { Radio } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';

import './components/styles/Loading.scss';

function Fallback() {
  const navigate = useNavigate();
  const text = 'Oops! An unexpected error has occurred. Click to retry.';

  return (
    <div className='loading-screen justify-center'>
      <Radio
        visible={true}
        height='80'
        width='80'
        colors={['#f94e63', '#f94e63', '#f94e63']}
        ariaLabel='three-dots-loading'
        wrapperClass=''
      />
      <p className='loaderText'>{text}</p>

      <button
        className='download-button'
        onClick={() => {
          navigate('/');
        }}
      >
        Refresh
      </button>
    </div>
  );
}

export default Fallback;
