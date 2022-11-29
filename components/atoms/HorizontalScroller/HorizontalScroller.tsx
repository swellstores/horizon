import useClassNames from 'hooks/useClassNames';
import useDraggableScroll from 'hooks/useDraggableScroll';
import React, { useRef, useEffect, useCallback } from 'react';

export interface HorizontalScrollerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * If true, the right padding will be applied to the end of the scrollable area.
   * This is necessary because browsers will ignore the right padding when
   * calculating the scrollWidth of the element.
   *
   * `Default: true`
   */
  applyRightPaddingOnScroll?: boolean;
}

const HorizontalScroller: React.FC<HorizontalScrollerProps> = ({
  children,
  applyRightPaddingOnScroll = true,
  ...props
}) => {
  const handlers = useDraggableScroll();
  const ref = useRef<HTMLDivElement>(null);

  const setVariables = useCallback((element: HTMLDivElement) => {
    element.style.removeProperty('padding-right');
    element.style.removeProperty('--scroll-width');

    requestAnimationFrame(() => {
      const rightPadding = parseFloat(
        window.getComputedStyle(element).paddingRight,
      );

      element.style.paddingRight = '0';
      element.style.setProperty('--after-width', `${rightPadding}px`);
      element.style.setProperty('--scroll-width', `${element.scrollWidth}px`);
    });
  }, []);

  useEffect(() => {
    if (!applyRightPaddingOnScroll) return;

    const element = ref.current;
    if (!element) return;

    setVariables(element);

    const handler = () => {
      setVariables(element);
    };

    window.addEventListener('resize', handler);

    return () => window.removeEventListener('resize', handler);
  }, [setVariables, applyRightPaddingOnScroll, children]);

  return (
    <div
      ref={ref}
      {...props}
      className={useClassNames(
        'scrollbar-hidden relative snap-mandatory scroll-px-6 overflow-x-auto touch:snap-x',
        props.className ?? '',
        {
          'after:absolute after:left-[var(--scroll-width)] after:block after:h-1 after:w-[var(--after-width)]':
            applyRightPaddingOnScroll,
        },
      )}
      {...handlers}>
      {children}
    </div>
  );
};

export default HorizontalScroller;
