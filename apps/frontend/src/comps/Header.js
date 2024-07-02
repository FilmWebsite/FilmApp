import React, { useEffect } from 'react';
import '../css/Header.css'; // Import CSS file

const Header = ({ album, textColor, shadowColor }) => {
  useEffect(() => {
    const text = document.getElementById('text');

    let shadow = '';
    for (let i = 0; i < 12; i += 1) {
      shadow += `${shadow ? ',' : ''}${-i * 1 + 'px'} ${
        i * 1 + 'px'
      } 0 ${shadowColor}`;
    }
    text.style.textShadow = shadow;
    text.style.color = textColor;
  }, [album, textColor, shadowColor]);

  useEffect(() => {
    const text = document.getElementById('text');
    const dataText = text.getAttribute('data-text'); // Get the value of data-text attribute
    text.dataset.text = dataText; // Set the value of data-text attribute to dataset.text
  }, []);

  return (
    <div className='textBody'>
      <div id='text'>{album}</div>
    </div>
  );
};

export { Header };
