import { useEffect, useState, useRef } from 'react';
import { motion, useTransform, useScroll } from 'framer-motion';
import { CollectionCard } from '.';
import { Collection } from '@film/photos-iso';
import { EditCard } from './EditCard';

type ScrollProps = {
  collections: any[];
};

const EditAlbumCard = (props: ScrollProps) => {

  return (
    <div>
      <div className="grid grid-cols-3 gap-8 px-10 justify-center mt-10 mb-10">
            {props.collections.map((card) => {
              return <EditCard key={card.id} card={card} />;
            })}
      </div>
    </div>
  );
};

export { EditAlbumCard };
