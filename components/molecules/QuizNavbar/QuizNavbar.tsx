import React from 'react';
import useClassNames from 'hooks/useClassNames';
import ProgressBar from 'components/atoms/ProgressBar';
import Close from 'assets/icons/close.svg';
import ArrowLeft from 'assets/icons/arrow-left.svg';
import { joinClasses } from 'utils/className';
import Link from 'next/link';
import Logo, { LogoProps } from 'components/atoms/Logo';

interface QuizNavbarProps
  extends Omit<
    LogoProps,
    'className' | 'wrapperElementTag' | 'href' | 'onClick'
  > {
  /**
   * Total number of questions (used to calculate the progress value)
   */
  questions: number;
  /**
   * Current question number (used to calculate the progress value)
   */
  currentQuestion: number;
  /**
   * Is the background transparent?
   */
  transparent: boolean;
  /**
   * Additional classes to be added to the container
   */
  containerClassName: string;
  /**
   * Action for clicking the previous button
   */
  onClickPrevious?: () => void;
}

const QuizNavbar: React.FC<QuizNavbarProps> = ({
  logo,
  logoHeight,
  storeName,
  questions = 1,
  currentQuestion,
  transparent = false,
  containerClassName = '',
  onClickPrevious,
}) => {
  return (
    <nav
      className={useClassNames(
        'flex h-[61px] flex-col border-b-[0.8px] transition duration-1800 ease-in-out',
        'lg:h-30',
        containerClassName,
        {
          'border-dividers bg-background-primary': !transparent,
          [joinClasses(
            'border-dividers bg-background-primary',
            'lg:border-transparent lg:bg-transparent',
          )]: transparent,
        },
      )}>
      <ProgressBar value={(currentQuestion / questions) * 100} />
      <div className="relative flex h-[56px] w-full items-center p-[18px] lg:h-[115px] lg:py-[42px] lg:px-[58px]">
        {onClickPrevious && (
          <button type="button" onClick={onClickPrevious}>
            <ArrowLeft className="w-5" />
          </button>
        )}

        <Logo
          storeName={storeName}
          logo={logo}
          logoHeight={logoHeight}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />

        <Link href="/">
          <a className="ml-auto">
            <Close className="h-5 w-5 text-primary" />
          </a>
        </Link>
      </div>
    </nav>
  );
};

export default QuizNavbar;
