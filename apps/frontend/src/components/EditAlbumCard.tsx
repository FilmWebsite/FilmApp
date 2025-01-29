import { Collection } from '@film/photos-iso';
import { EditCard } from './EditCard';
import '../styles/Admin.scss';
import { IoMdAdd } from 'react-icons/io';

type EditAlbumCardProps = {
  collections: Collection[];
  onSelectCard: (card: Collection) => void;
};

const EditAlbumCard = ({ collections, onSelectCard }: EditAlbumCardProps) => {
  return (
    <div>
      <div className='grid grid-cols-4 gap-8 justify-center'>
        {collections?.map((card) => (
          <EditCard
            key={card.id}
            card={card}
            onSelect={() => onSelectCard(card)}
          />
        ))}
        <div className='relative h-[300px] w-full max-w-[300px] overflow-hidden glass-effect flex items-center justify-center'>
          <IoMdAdd className='addAlbumIcon' />
        </div>
      </div>
    </div>
  );
};

export { EditAlbumCard };
