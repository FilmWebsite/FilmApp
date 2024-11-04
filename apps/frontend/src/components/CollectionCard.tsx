import { Collection, CollectionType, Photo } from '@film/photos-iso';

const CollectionCard = ({ card }: { card: Collection }) => {
  return (
    <a href={`/collections/${card.ref}`} className='group'>
      <div className='group relative h-[450px] w-[450px] overflow-hidden bg-neutral-200'>
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
          <p className='cardtitle'>{card.card_name}</p>
        </div>
      </div>
    </a>
  );
};

export { CollectionCard };
