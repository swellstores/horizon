import { useCallback, useMemo, useRef } from 'react';

const FRICTION = 5;
const MINIMUM_SCROLL = 0.5;
const ACCELERATION = 2;
export const DRAGGING_CLASS = 'dragging';

interface Options {
  /**
   * The friction applied to the momentum of the scroll.
   * Higher values will result in a faster stop.
   *
   * `Default: 5`
   */
  friction?: number;
  /**
   * The acceleration applied to the momentum of the scroll.
   * Higher values will result in a faster scroll.
   */
  acceleration?: number;
}

/**
 * Allows a horizontally scrollable container to be dragged using the mouse, imitating touch behavior.
 * @param options Options for the hook.
 * @returns An object containing the event handlers to be applied to the container.
 */
const useDraggableScroll = (options?: Options) => {
  const isDragging = useRef(false);
  const initialX = useRef(0);
  const initialScrollLeft = useRef(0);
  const velX = useRef(0);
  const animationFrameRef = useRef(0);

  const { friction = FRICTION, acceleration = ACCELERATION } = useMemo(
    () => options ?? {},
    [options],
  );

  const stopMomentum = useCallback(() => {
    cancelAnimationFrame(animationFrameRef.current);
  }, []);

  const applyMomentum = useCallback(
    (element: Element) => {
      // Add the velocity to the scroll position.
      element.scrollLeft += velX.current * acceleration;

      // Apply the friction to the velocity.
      velX.current *= 1 - friction / 100;

      // If the velocity is above the minimum scroll, continue the animation.
      if (Math.abs(velX.current) > MINIMUM_SCROLL) {
        animationFrameRef.current = requestAnimationFrame(() =>
          applyMomentum(element),
        );
      }
    },
    [acceleration, friction],
  );

  const startMomentum = useCallback(
    (element: Element) => {
      // Stop any existing momentum animation.
      stopMomentum();

      // Start a new momentum animation.
      animationFrameRef.current = requestAnimationFrame(() =>
        applyMomentum(element),
      );
    },
    [applyMomentum, stopMomentum],
  );

  const onMouseDown = useCallback<React.MouseEventHandler<HTMLElement>>(
    (e) => {
      e.preventDefault();

      const element = e.currentTarget;
      isDragging.current = true;
      element.classList.add(DRAGGING_CLASS);
      initialX.current = e.pageX - element.offsetLeft;
      initialScrollLeft.current = element.scrollLeft;

      stopMomentum();
    },
    [stopMomentum],
  );

  const onMouseLeave = useCallback<React.MouseEventHandler>((e) => {
    const element = e.currentTarget;
    isDragging.current = false;

    element.classList.remove(DRAGGING_CLASS);
    element.classList.remove('cursor-grabbing');
    element.classList.remove('select-none');
    element.classList.remove('[&>*]:pointer-events-none');
  }, []);

  const onMouseUp = useCallback<React.MouseEventHandler>(
    (e) => {
      const element = e.currentTarget;
      isDragging.current = false;

      element.classList.remove(DRAGGING_CLASS);
      element.classList.remove('cursor-grabbing');
      element.classList.remove('select-none');
      element.classList.remove('[&>*]:pointer-events-none');

      startMomentum(e.currentTarget);
    },
    [startMomentum],
  );

  const onMouseMove = useCallback<React.MouseEventHandler<HTMLElement>>((e) => {
    if (!isDragging.current) return;

    const element = e.currentTarget;
    const canScroll = element.scrollWidth > element.clientWidth;

    if (!canScroll) return;

    e.preventDefault();
    e.stopPropagation();
    element.classList.add('cursor-grabbing');
    element.classList.add('select-none');
    element.classList.add('[&>*]:pointer-events-none');

    const x = e.pageX - element.offsetLeft;
    const delta = x - initialX.current;
    const prevScrollLeft = element.scrollLeft;

    element.scrollLeft = initialScrollLeft.current - delta;
    velX.current = element.scrollLeft - prevScrollLeft;
  }, []);

  return {
    onMouseDown,
    onMouseLeave,
    onMouseUp,
    onMouseMove,
  };
};

export default useDraggableScroll;
