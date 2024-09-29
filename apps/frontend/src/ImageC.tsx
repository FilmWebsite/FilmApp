import React from 'react';

const ImageC = ({ url }: { url: string }) => {
  return (
    <div
      style={{
        backgroundImage: `url(${url})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      className='absolute inset-0 z-0 transition-transform duration-300 group-hover:scale-110'
    ></div>
  );
};

export { ImageC };
