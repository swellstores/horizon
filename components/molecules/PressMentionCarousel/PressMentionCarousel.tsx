import React, { useState, useCallback, useRef, useEffect } from 'react';
import type { PressMentionCardProps } from 'components/atoms/PressMentionCard';

import { useSwipeable } from 'react-swipeable';
import SlideNav from '../../atoms/SlideNav';
import PressMentionCard from 'components/atoms/PressMentionCard';
import type { PageSectionSpacing } from 'types/shared/sections';
import { SECTION_MARGIN_MAP } from 'lib/globals/sizings';

export interface PressMentionCarouselProps extends PageSectionSpacing {
  title: string;
  press_mentions: PressMentionCardProps[];
}

const getCardClassName = (
  index: number,
  currentSlide: number,
  length: number,
) => {
  const prevIndex = currentSlide - 1 >= 0 ? currentSlide - 1 : length - 1;
  const nextIndex = currentSlide + 1 <= length - 1 ? currentSlide + 1 : 0;

  if (index === currentSlide)
    return 'left-0 z-10 opacity-100 bg-background-primary';
  else if (index === prevIndex) return '-left-full opacity-0';
  else if (index === nextIndex) return 'left-full opacity-0';
};

// Min carousel height in pixels
const MIN_CAROUSEL_HEIGHT = 121;

const PressMentionCarousel: React.FC<PressMentionCarouselProps> = ({
  title,
  press_mentions,
  horizontal_spacing,
}) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [carouselHeight, setCarouselHeight] =
    useState<number>(MIN_CAROUSEL_HEIGHT);
  const virtualCards = useRef<HTMLDivElement[]>([]);

  const setPrevSlide = useCallback(
    () =>
      setCurrentSlide((prev) =>
        prev - 1 >= 0 ? prev - 1 : press_mentions.length - 1,
      ),
    [press_mentions.length],
  );

  const setNextSlide = useCallback(
    () =>
      setCurrentSlide((prev) =>
        prev + 1 <= press_mentions.length - 1 ? prev + 1 : 0,
      ),
    [press_mentions.length],
  );

  const handlers = useSwipeable({
    onSwipedLeft: setNextSlide,
    onSwipedRight: setPrevSlide,
    preventDefaultTouchmoveEvent: true,
  });

  useEffect(() => {
    // Calculate the height of the container based on largest card
    const calculateCarouselHeight = () => {
      const calculatedCarouselHeight = Math.max(
        ...virtualCards.current.map(({ offsetHeight }) => offsetHeight ?? 0),
        MIN_CAROUSEL_HEIGHT,
      );
      setCarouselHeight(calculatedCarouselHeight);
    };
    calculateCarouselHeight();

    document.addEventListener('resize', calculateCarouselHeight);
    return () =>
      document.removeEventListener('resize', calculateCarouselHeight);
  }, []);

  return (
    <section
      className={`${SECTION_MARGIN_MAP[horizontal_spacing]} relative flex flex-col items-center gap-y-10 bg-background-primary lg:gap-y-[76px] lg:py-18`}>
      <h2 className="text-center font-headings text-5xl font-semibold text-primary">
        {title}
      </h2>
      {/* Virtual cards hidden from the screen (used for calculating the height of the carousel) */}
      {press_mentions.map((pressMention) => (
        <PressMentionCard
          {...pressMention}
          key={`virtual-${pressMention.image.src.toString()}`}
          aria-hidden="true"
          tabIndex={-1}
          className="invisible absolute -translate-x-[9999px] opacity-0 lg:hidden"
          ref={(el) => {
            if (el) {
              virtualCards.current = [...virtualCards.current, el];
            }
          }}></PressMentionCard>
      ))}
      {/* Mobile carousel */}
      <div className="relative flex w-full flex-col items-center gap-y-14 lg:hidden">
        <div
          {...handlers}
          className="relative w-full overflow-hidden"
          style={{
            height: `${carouselHeight}px`,
          }}>
          {press_mentions.map((pressMention, i) => (
            <div
              key={pressMention.image.src.toString()}
              aria-hidden={i !== currentSlide ? 'true' : undefined}
              tabIndex={-1}
              className={`absolute flex h-full w-full items-start justify-center transition-all ${getCardClassName(
                i,
                currentSlide,
                press_mentions.length,
              )}`}>
              <PressMentionCard {...pressMention} />
            </div>
          ))}
        </div>
        <SlideNav
          className="mt-auto lg:hidden"
          quantity={press_mentions.length}
          value={currentSlide}
          disabled
        />
      </div>
      {/* Desktop */}
      <div className="hidden w-full lg:flex lg:flex-wrap lg:justify-between lg:gap-10">
        {press_mentions.map((pressMention) => (
          <PressMentionCard
            {...pressMention}
            key={`desktop-${pressMention.image.src.toString()}`}
          />
        ))}
      </div>
    </section>
  );
};

export default PressMentionCarousel;
