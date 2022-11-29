import React, { useRef, useState, useEffect, useCallback } from 'react';
import useClassNames from 'hooks/useClassNames';
import { joinClasses } from 'utils/className';
import type { SelectOption } from 'types/shared/quiz';

export interface LevelSliderInputConfigProps {
  /**
   * Slider options
   */
  options: Array<SelectOption>;
  /**
   * Default option
   */
  defaultOption: SelectOption;
}
export interface LevelSliderProps extends LevelSliderInputConfigProps {
  /**
   * Class names for the component container
   */
  containerClassName?: string;
  /**
   * Input value
   */
  value: string;
  /**
   * Input change handler
   */
  onChange: (newAnswer: string) => void;
  /**
   * Slider name
   */
  name: string;
}

interface TrackOption extends SelectOption {
  /**
   * Distance(in px) between left side of parent to the middle of the option element
   */
  positionLeft: number;
}

const offsetToNumber = (offset: number | undefined) => offset ?? 0;
const getThumbLeftPosition = (
  trackOption: TrackOption,
  thumb: HTMLDivElement | null,
): number =>
  thumb ? trackOption.positionLeft - offsetToNumber(thumb.offsetWidth) / 2 : 0;

const LevelSlider: React.FC<LevelSliderProps> = ({
  options,
  defaultOption,
  containerClassName,
  onChange,
  name,
  value,
}) => {
  const [leftPosition, setLeftPosition] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [trackOptions, setTrackOptions] = useState<Array<TrackOption>>([]);
  const [selectedOption, setSelectedOption] = useState<string>(
    value ?? defaultOption?.id,
  );
  const [isDefaultValueSet, setIsDefaultValueSet] = useState<boolean>(false);

  const trackRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<Array<HTMLInputElement | null>>([]);

  /**
   * Function for handling on mouse down event in slider.
   * Sets `isDragging` state to `true`
   */
  const onMouseDown = () => {
    setIsDragging(true);
  };

  /**
   * Function for handling slider option selection
   */
  const onOptionSelect = useCallback(
    (id: string) => {
      const trackOption = trackOptions.find((opt) => opt.id === id);

      if (trackOption) {
        setLeftPosition(getThumbLeftPosition(trackOption, thumbRef.current));
        onChange(trackOption.id);
        setSelectedOption(trackOption.id);
      }
    },
    [trackOptions, onChange],
  );

  /**
   * Function for handling on mouse up event in slider.
   * It finds the nearest option & slide to that option.
   * The middle of the points (and thumb) represent their position.
   */
  const onMouseUp = useCallback(
    (e: MouseEvent | TouchEvent | React.TouchEvent) => {
      e.stopPropagation();
      if (isDragging) {
        setIsDragging(false);

        if (trackRef.current && typeof window !== 'undefined') {
          const thumbMiddlePosition =
            leftPosition + offsetToNumber(thumbRef.current?.offsetWidth) / 2;

          const lowerPointReducer = (point: TrackOption, el: TrackOption) =>
            el.positionLeft < leftPosition &&
            el.positionLeft > point.positionLeft
              ? el
              : point;
          const nearestLowerPoint = trackOptions.reduce(
            lowerPointReducer,
            trackOptions[0],
          );
          const upperPointReducer = (point: TrackOption, el: TrackOption) =>
            el.positionLeft > leftPosition &&
            el.positionLeft < point.positionLeft
              ? el
              : point;
          const nearestUpperPoint = trackOptions.reduce(
            upperPointReducer,
            trackOptions[trackOptions.length - 1],
          );

          if (
            thumbMiddlePosition - nearestLowerPoint.positionLeft <=
            nearestUpperPoint.positionLeft - thumbMiddlePosition
          ) {
            onOptionSelect(nearestLowerPoint.id);
          } else if (
            thumbMiddlePosition - nearestLowerPoint.positionLeft >
            nearestUpperPoint.positionLeft - thumbMiddlePosition
          ) {
            onOptionSelect(nearestUpperPoint.id);
          }
        }
      }
    },
    [isDragging, leftPosition, onOptionSelect, trackOptions],
  );

  /**
   * Function for handling on mouse move event in slider.
   * It tracks the position of the mouse and changes `leftPosition` state accordingly
   */
  const onMouseMove = useCallback(
    (e: MouseEvent): void => {
      e.stopPropagation();
      if (isDragging) {
        const screenLeft = e.clientX;
        const trackLeft = trackRef.current?.getBoundingClientRect().left || 0;
        const newPosition =
          screenLeft -
          trackLeft -
          offsetToNumber(thumbRef.current?.offsetWidth) / 2;

        if (Math.abs(newPosition - leftPosition) > 1) {
          setLeftPosition(() => {
            // On mouse move, prevent the thumb from going outside the slider boundaries
            // Add movementX to previous position if it's between boundaries
            const lowerBoundLimit = getThumbLeftPosition(
              trackOptions[0],
              thumbRef.current,
            );
            if (newPosition < lowerBoundLimit) {
              return lowerBoundLimit;
            }

            const upperBoundLimit = getThumbLeftPosition(
              trackOptions[trackOptions.length - 1],
              thumbRef.current,
            );
            if (newPosition > upperBoundLimit) {
              return upperBoundLimit;
            }

            return newPosition;
          });
        }
      }
    },
    [isDragging, leftPosition, trackOptions],
  );

  /**
   * Function for handling on touch move event in slider.
   * It tracks the position of the touch and changes `leftPosition` state accordingly
   */
  const onTouchMove = (e: React.TouchEvent): void => {
    e.stopPropagation();
    if (isDragging) {
      const screenLeft = e.changedTouches[0].clientX;
      const trackLeft = trackRef.current?.getBoundingClientRect().left || 0;
      const newPosition =
        screenLeft -
        trackLeft -
        offsetToNumber(thumbRef.current?.offsetWidth) / 2;

      if (Math.abs(newPosition - leftPosition) > 1) {
        setLeftPosition(() => {
          const lowerBoundLimit = getThumbLeftPosition(
            trackOptions[0],
            thumbRef.current,
          );
          if (newPosition < lowerBoundLimit) {
            return lowerBoundLimit;
          }

          const upperBoundLimit = getThumbLeftPosition(
            trackOptions[trackOptions.length - 1],
            thumbRef.current,
          );
          if (newPosition > upperBoundLimit) {
            return upperBoundLimit;
          }

          return newPosition;
        });
      }
    }
  };

  useEffect(() => {
    /**
     * Function for mapping input radio DOM elements to `trackOptions`
     * that hold position of the elements relative to the slider
     */
    const calculatePositions = () => {
      if (!!options.length && !!optionsRef.current.length) {
        const trackOptionsMap = optionsRef.current
          .filter(Boolean)
          .map((el, i) => ({
            ...options[i],
            positionLeft:
              offsetToNumber(el?.offsetLeft) +
              offsetToNumber(el?.offsetWidth) / 2,
          }));
        setTrackOptions(trackOptionsMap);
      }
    };
    calculatePositions();

    // Recalculate the position of the elements on resize
    window.addEventListener('resize', calculatePositions);
    return () => {
      window.removeEventListener('resize', calculatePositions);
    };
  }, [options, optionsRef.current.length, defaultOption]);

  // Set default value if none is already set
  // Previously selected value takes precendence over default option
  useEffect(() => {
    if (
      !!trackOptions.length &&
      defaultOption &&
      thumbRef.current &&
      !isDefaultValueSet
    ) {
      const defaultValue = value || defaultOption.id;

      setLeftPosition(
        getThumbLeftPosition(
          trackOptions.find(({ id }) => id === defaultValue) || trackOptions[0],
          thumbRef.current,
        ),
      );

      setIsDefaultValueSet(true);
    }
  }, [trackOptions, defaultOption, thumbRef, isDefaultValueSet, value]);

  // Add mouseup & mousemove listeners to the document for catching
  // the events outside the thumb
  useEffect(() => {
    const isDesktop = window?.innerWidth && window.innerWidth >= 1024;
    if (isDesktop) {
      document.addEventListener('mouseup', onMouseUp);
      document.addEventListener('mousemove', onMouseMove);
    }

    return () => {
      if (isDesktop) {
        document.removeEventListener('mouseup', onMouseUp);
        document.removeEventListener('mousemove', onMouseMove);
      }
    };
  }, [onMouseMove, onMouseUp]);

  const trackFillClasses = useClassNames(
    'absolute top-0 left-0 h-full rounded-l-[0.75rem] bg-primary',
    {
      'transition-[width] duration-700': !isDragging,
      'transition-none': isDragging,
    },
  );
  const thumbClasses = useClassNames(
    'absolute top-1/2 flex h-8 w-8 items-center justify-center rounded-full border-4 border-background-primary bg-primary shadow-[0_0_0_1px] shadow-primary',
    {
      'cursor-grabbing transition-none': isDragging,
      'cursor-grab transition-transform duration-700': !isDragging,
    },
  );
  const optionLabelClasses = joinClasses(
    'absolute top-0 -translate-x-1/2 cursor-pointer text-center text-2xs',
    'after:content-[""] after:absolute after:-inset-2 after:h-8 lg:after:-inset-4 lg:after:h-12', // Increased touch/click area
    'first:static first:translate-x-0',
    'last:static last:translate-x-0',
    'lg:bottom-0 lg:first:absolute lg:first:-translate-x-1/2 lg:last:absolute lg:last:-translate-x-1/2',
  );

  return (
    <div
      className={joinClasses(
        'flex w-full max-w-[342px] flex-col',
        'lg:max-w-[574px] lg:flex-col-reverse',
        containerClassName ?? '',
      )}>
      <div className="relative my-[38px] flex w-full justify-between">
        {/* Labels coresponding with the inputs */}
        {trackOptions.map(({ label, id, positionLeft }) => (
          <label
            htmlFor={id}
            key={`${id}-label`}
            className={optionLabelClasses}
            style={{
              left: `${positionLeft}px`,
            }}>
            {label}
          </label>
        ))}
      </div>
      <div
        className="relative flex h-4 w-full justify-between rounded-[0.75rem] bg-input-standard py-[3px] px-1"
        ref={trackRef}>
        {/* Track filling */}
        <div
          style={{
            width: `${
              leftPosition + offsetToNumber(thumbRef.current?.offsetWidth) / 2
            }px`,
          }}
          className={trackFillClasses}
          role="radiogroup"
          aria-labelledby={`slider-${name}`}
        />
        {/* Options (circle) on the track */}
        {options?.map(({ id }, i) => (
          <input
            type="radio"
            className={joinClasses(
              'relative h-[10px] w-[10px] cursor-pointer appearance-none rounded-full bg-background-primary opacity-30',
              'after:absolute after:-inset-2 after:h-6 after:content-[""]', // Increased touch/click area
            )}
            key={id}
            id={id}
            name={name}
            ref={(optionRef: HTMLInputElement): void => {
              optionsRef.current[i] = optionRef;
            }}
            checked={id === selectedOption}
            onChange={() => onOptionSelect(id)}
          />
        ))}
        {/* Thumb */}
        <div
          onMouseDown={onMouseDown}
          onTouchStart={onMouseDown}
          onTouchMove={onTouchMove}
          onTouchEnd={onMouseUp}
          style={{
            transform: `translate(${leftPosition}px, -50%)`,
          }}
          ref={thumbRef}
          className={thumbClasses}
        />
      </div>
      <div className="sr-only" id={`slider-${name}`}>
        {name}
      </div>
    </div>
  );
};

export default LevelSlider;
