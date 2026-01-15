import { useEffect, useState, useRef } from 'react';
import { motion, useTransform, useScroll } from 'framer-motion';
import { CollectionCard } from '.';

type ScrollProps = {
  collections: any[];
};

const HorizontalScrollCarousel = (props: ScrollProps) => {

  return (
    <div>
      <div className="grid grid-cols-3 gap-8 px-4 justify-center mt-10 mb-10">
            {props.collections.map((card) => {
              return <CollectionCard key={card.id} card={card} />;
            })}
      </div>
    </div>
  );
};

export { HorizontalScrollCarousel };
