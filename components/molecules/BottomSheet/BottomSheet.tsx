import React, { useState, useEffect, ReactNode, useRef } from 'react';
import useClassNames from 'hooks/useClassNames';
import { useSwipeable } from 'react-swipeable';

interface BottomSheetProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  children: ({
    isOpen,
    isSticked,
  }: {
    isOpen?: boolean;
    isSticked?: boolean;
  }) => ReactNode;
}

const BottomSheet: React.FC<BottomSheetProps> = ({ children, ...props }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [wrapperHeight, setWrapperHeight] = useState<number | null>(null);
  const [isSticked, setIsSticked] = useState<boolean>(true);
  const ref = useRef<HTMLDivElement | null>(null);

  function onClose() {
    setIsOpen(false);
  }

  function onOpen() {
    setIsOpen(true);
  }

  // TODO: Add better body-lock/unlock solution
  function lockBody() {
    if (!document.body.classList.contains('overflow-hidden')) {
      document.body.classList.add('overflow-hidden');
    }
  }

  function unlockBody() {
    if (document.body.classList.contains('overflow-hidden')) {
      document.body.classList.remove('overflow-hidden');
    }
  }

  function onSwipedUp() {
    lockBody();
    onOpen();
  }

  function onSwipedDown() {
    onClose();
    setTimeout(unlockBody, 500);
  }

  const handlers = useSwipeable({
    onSwipedUp: isSticked || isOpen ? onSwipedUp : undefined,
    onSwipedDown: isSticked || isOpen ? onSwipedDown : undefined,
    preventDefaultTouchmoveEvent: false,
  });

  const setRefs = (el: HTMLDivElement) => {
    ref.current = el;
    handlers.ref(el);
  };

  useEffect(() => {
    const wrapper = ref.current;
    if (!wrapper) return;

    let prevWrapperTop = wrapper.getBoundingClientRect().top;
    let prevIsSticked = true;

    function calculateHeight() {
      const height = wrapper?.offsetHeight ?? 0;
      setWrapperHeight(height);
    }

    function checkIfSticked() {
      prevWrapperTop = wrapper?.getBoundingClientRect().top || prevWrapperTop;

      const windowHeight = window.innerHeight;

      if (prevWrapperTop > windowHeight - 100 && !prevIsSticked) {
        window.requestAnimationFrame(() => {
          setIsSticked(true);
          prevIsSticked = true;
        });
      }

      if (prevWrapperTop <= windowHeight - 100 && prevIsSticked) {
        window.requestAnimationFrame(() => {
          setIsSticked(false);
          prevIsSticked = false;
        });
      }
    }

    calculateHeight();
    checkIfSticked();

    if (wrapper) {
      window.addEventListener('resize', calculateHeight);
      window.addEventListener('scroll', checkIfSticked);
    }

    return () => {
      if (wrapper) {
        window.removeEventListener('resize', calculateHeight);
        window.removeEventListener('scroll', checkIfSticked);
      }
    };
  }, [ref]);

  const wrapperClasses = useClassNames(
    'sticky inset-x-0 w-full transition-[bottom] duration-500 ease-in-out',
    'lg:hidden',
    {
      'translate-y-full opacity-0': !wrapperHeight,
      'z-0': !isSticked && !isOpen,
      'z-modal': isSticked || isOpen,
    },
    props.className,
  );

  return (
    <div
      {...handlers}
      {...(!isSticked && { role: 'dialog' })}
      ref={setRefs}
      className={wrapperClasses}
      style={{
        ...props?.style,
        bottom: isOpen
          ? '0'
          : wrapperHeight
          ? `calc(86px - ${wrapperHeight}px)`
          : '-306px',
      }}>
      {/* Line  */}
      <div
        className={useClassNames(
          'absolute top-[5px] left-1/2 h-1 w-[72px] -translate-x-1/2 rounded-3xl bg-background-secondary',
          {
            hidden: !isSticked && !isOpen,
            block: isSticked || isOpen,
          },
        )}
      />
      {/* Content */}
      {children({ isOpen, isSticked })}
    </div>
  );
};

export default BottomSheet;
