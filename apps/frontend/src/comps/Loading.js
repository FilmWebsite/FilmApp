import React from 'react';
import '../css/Loading.css';
import { ThreeDots, InfinitySpin } from 'react-loader-spinner';

function Loading() {
  return (
    <div className='loading-screen'>
      {/* <InfinitySpin
        visible={true}
        width="200"
        color="#f94e63"
        ariaLabel="infinity-spin-loading"
      /> */}

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
      <p className='loaderText'>Just One Sec</p>
    </div>
  );
}

export default Loading;
