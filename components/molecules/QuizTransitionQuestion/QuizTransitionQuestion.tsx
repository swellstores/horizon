import React from 'react';
import Image from 'components/atoms/SafeImage';
import useClassNames from 'hooks/useClassNames';
import Button from 'components/atoms/Button';
import RichText from 'components/atoms/RichText';
import type { MandatoryImageProps } from 'types/global';
import { BUTTON_TYPE } from 'types/shared/button';
import { layoutFillConfig } from 'lib/utils/image';
import {
  QUIZ_ITEM_TYPE,
  QUIZ_TRANSITION_LAYOUT_OPTION,
} from 'types/shared/quiz';
import type { Maybe } from 'lib/graphql/generated/sdk';

export interface QuizTransitionQuestionStaticProps {
  type: QUIZ_ITEM_TYPE.TRANSITION;
  id: string;
  /**
   * Image
   */
  image?: Maybe<MandatoryImageProps>;
  /**
   * Title
   */
  title: string;
  /**
   * Body text
   */
  bodyText: string;
  /**
   * Text of the button that triggers a step forward ('next' button)
   */
  nextButtonLabel: string;
  /**
   * Text of the button when is the last question
   */
  seeResultsLabel: string;
  /**
   * Is it the last question?
   */
  isLastQuestion: boolean;
  /**
   * Layout option
   */
  layoutOption?: Maybe<QUIZ_TRANSITION_LAYOUT_OPTION>;
}

export interface QuizTransitionQuestionProps
  extends QuizTransitionQuestionStaticProps {
  /**
   * Function that handles clicking on the 'next' button
   */
  onNext: () => void;
}

const QuizTransitionQuestion: React.FC<QuizTransitionQuestionProps> = ({
  id,
  image,
  title,
  bodyText,
  nextButtonLabel,
  seeResultsLabel,
  isLastQuestion = false,
  layoutOption,
  onNext,
}) => {
  return (
    <section
      className={useClassNames(
        'flex h-full flex-col overflow-y-auto pt-[61px] lg:pb-0 lg:pt-0',
        {
          'items-center justify-center': !image,
          'lg:flex-row-reverse':
            layoutOption === QUIZ_TRANSITION_LAYOUT_OPTION.IMAGE_RIGHT,
          'lg:flex-row':
            layoutOption === QUIZ_TRANSITION_LAYOUT_OPTION.IMAGE_LEFT,
        },
      )}>
      {image && layoutOption !== QUIZ_TRANSITION_LAYOUT_OPTION.NO_IMAGE && (
        <div className="relative h-[88vw] lg:h-full lg:w-1/2">
          <Image
            objectFit="cover"
            {...image}
            alt={image.alt}
            priority
            {...layoutFillConfig}
          />
        </div>
      )}
      <div
        className={useClassNames(
          'flex w-full flex-col items-center px-6 pt-10 pb-6 lg:px-14 lg:pt-30 lg:pb-10',
          {
            'lg:w-1/2': !!image,
          },
        )}>
        <div className="my-auto flex flex-col items-center">
          {title && (
            <h2 className="mx-0 mb-4 mt-0 text-center font-headings text-5xl font-semibold text-primary lg:mb-11">
              {title}
            </h2>
          )}
          {bodyText && (
            <RichText
              content={bodyText}
              className="rich-text-p-spacing-sm mb-6 text-center text-sm text-primary"
            />
          )}
        </div>
        <Button
          elType={BUTTON_TYPE.BUTTON}
          className="mt-auto w-full max-w-[342px] lg:absolute lg:bottom-8 lg:right-12 lg:w-auto lg:max-w-none"
          onClick={onNext}
          id={`button-${id}`}
          type="submit">
          {!isLastQuestion ? nextButtonLabel : seeResultsLabel}
        </Button>
      </div>
    </section>
  );
};

export default QuizTransitionQuestion;
