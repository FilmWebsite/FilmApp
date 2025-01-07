import React from 'react';
import { Collection } from '@film/photos-iso';
import '../styles/Admin.scss';

type EditCardProps = {
  card: Collection;
  onSelect: () => void;
};

const EditCard = ({ card, onSelect }: EditCardProps) => {
  return (
    <a
      className='relative h-[300px] w-full max-w-[300px] overflow-hidden cursor-pointer'
      onClick={onSelect}
    >
      <div className='group relative h-full w-full'>
        <img
          src={card.cover_image}
          alt={card.card_name}
          className='absolute inset-0 z-0 object-cover w-full h-full transition-transform duration-300 group-hover:scale-110'
          onError={(e) => {
            e.currentTarget.src = '/path/to/fallback-image.jpg';
          }}
        />
        <div className='absolute inset-0 z-10 grid place-content-center'>
          <p className='editCardTitle group-hover:bg-gradient-to-r group-hover:from-[#ff7f50] group-hover:via-[#fd5e53] group-hover:to-[#f94e63] group-hover:text-transparent group-hover:bg-clip-text group-hover:-webkit-background-clip-text transition-all duration-300'>
            {card.card_name}
          </p>
        </div>
      </div>
    </a>
  );
};

export { EditCard };
