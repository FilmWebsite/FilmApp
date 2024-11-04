import { useEffect } from 'react';

import './styles/header.scss';

const Header = ({
  album,
  textColor,
  shadowColor,
}: {
  album: string;
  textColor: any;
  shadowColor: any;
}) => {
  useEffect(() => {
    const text = document.getElementById('text');

    let shadow = '';
    for (let i = 0; i < 12; i += 1) {
      shadow += `${shadow ? ',' : ''}${-i * 1 + 'px'} ${
        i * 1 + 'px'
      } 0 ${shadowColor}`;
    }
    //   @ts-ignore
    text.style.textShadow = shadow;
    //   @ts-ignore
    text.style.color = textColor;
  }, [album, textColor, shadowColor]);

  useEffect(() => {
    const text = document.getElementById('text');
    //   @ts-ignore
    const dataText = text.getAttribute('data-text'); // Get the value of data-text attribute
    //   @ts-ignore
    text.dataset.text = dataText; // Set the value of data-text attribute to dataset.text
  }, []);

  return (
    <div className='textBody'>
      <div id='text'>{album}</div>
    </div>
  );
};

export { Header };
