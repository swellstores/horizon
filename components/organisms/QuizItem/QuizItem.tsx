import type { QuizTransitionQuestionStaticProps } from 'components/molecules/QuizTransitionQuestion';
import type { QuizQuestionStaticProps } from 'components/molecules/QuizQuestion';
import dynamic from 'next/dynamic';
import { Answer, QUIZ_ITEM_TYPE } from 'types/shared/quiz';

const QuizQuestion = dynamic(() => import('components/molecules/QuizQuestion'));
const QuizTransitionQuestion = dynamic(
  () => import('components/molecules/QuizTransitionQuestion'),
);

export const QuestionWrapper: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => <div className="relative h-full w-full">{children}</div>;

interface QuizItemStatefulProps {
  totalQuestions: number;
  activeQuestionIndex: number;
  onNext: (key?: string, data?: string | string[]) => void;
  savedAnswer?: Answer;
}

export type QuizItemStaticProps =
  | QuizQuestionStaticProps
  | QuizTransitionQuestionStaticProps;

export type QuizItemProps = QuizItemStaticProps & QuizItemStatefulProps;

const QuizItem: React.FC<QuizItemProps> = (item) => {
  const { type, totalQuestions, activeQuestionIndex, onNext, savedAnswer } =
    item;

  switch (type) {
    case QUIZ_ITEM_TYPE.QUESTION:
      return (
        <QuestionWrapper>
          <QuizQuestion
            {...(item as QuizQuestionStaticProps)}
            totalQuestions={totalQuestions}
            currentQuestion={activeQuestionIndex + 1}
            onNext={onNext}
            savedAnswer={savedAnswer}
          />
        </QuestionWrapper>
      );
    case QUIZ_ITEM_TYPE.TRANSITION:
      return (
        <QuestionWrapper>
          <QuizTransitionQuestion
            {...(item as QuizTransitionQuestionStaticProps)}
            onNext={onNext}
          />
        </QuestionWrapper>
      );
    default:
      return null;
  }
};

export default QuizItem;
