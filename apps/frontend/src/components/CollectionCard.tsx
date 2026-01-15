import { Collection } from '@film/photos-iso';

const CollectionCard = ({ card }: { card: Collection }) => {
  return (
    <a href={`/collections/${card.ref}`} className='relative h-[350px] w-full max-w-[350px] mx-auto overflow-hidden bg-neutral-200'>
      <div className='group relative h-full w-full'>
        {/* Use img tag for better debugging */}
        <img
          src={card.cover_image}
          alt={card.card_name}
          className='absolute inset-0 z-0 object-cover w-full h-full transition-transform duration-300 group-hover:scale-110'
          onError={(e) => {
            // Handle image load error (fallback)
            e.currentTarget.src = '/path/to/fallback-image.jpg';
          }}
        />
        <div className='absolute inset-0 z-10 grid place-content-center'>
          <p className='cardtitle group-hover:bg-gradient-to-r group-hover:from-[#ff7f50] group-hover:via-[#fd5e53] group-hover:to-[#f94e63] group-hover:text-transparent group-hover:bg-clip-text group-hover:-webkit-background-clip-text transition-all duration-300'>
            {card.card_name}
          </p>
        </div>
      </div>
    </a>
  );
};

export { CollectionCard };
