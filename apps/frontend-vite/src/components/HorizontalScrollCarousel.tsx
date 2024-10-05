import { useEffect, useState, useRef } from 'react';
import { motion, useTransform, useScroll } from 'framer-motion';
import { CollectionCard } from '.';

type ScrollProps = {
  collections: any[];
};

const HorizontalScrollCarousel = (props: ScrollProps) => {
  const targetRef = useRef(null);
  const scrollContainerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const [dynamicOffset, setDynamicOffset] = useState('-2%');
  const [scrollLimit, setScrollLimit] = useState('-2%');

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      const containerWidth = scrollContainerRef.current
        ? scrollContainerRef.current.scrollWidth
        : 0;
      const calculatedOffset = screenWidth > 1200 ? '-100%' : '-80%';
      setDynamicOffset(calculatedOffset);

      // Calculate how much to scroll based on container width and screen width
      const limit = screenWidth - containerWidth;
      setScrollLimit(`${limit}px`);
    };

    // Initial calculation
    handleResize();

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, [props.collections]);

  // Adjust scroll end point using scrollLimit
  const x = useTransform(scrollYProgress, [0, 1], ['1%', scrollLimit]);

  return (
    <div>
      <section ref={targetRef} className='relative h-[250vh]'>
        <div className='sticky top-0 flex h-screen items-center overflow-hidden'>
          <motion.div
            // @ts-ignore
            ref={scrollContainerRef}
            style={{ x }}
            className='flex gap-4 mt-[-80px]'
          >
            {props.collections.map((card) => {
              return <CollectionCard key={card.id} card={card} />;
            })}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export { HorizontalScrollCarousel };
