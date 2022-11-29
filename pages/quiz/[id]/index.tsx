import React, { useEffect } from 'react';
import Head from 'next/head';
import type {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsResult,
} from 'next';
import type { QuizEditorProps } from 'types/shared/quiz';
import type { NextPageWithLayout, ServerSideProps } from 'types/shared/pages';
import type { QuizItemStaticProps } from 'components/organisms/QuizItem';
import QuizItem from 'components/organisms/QuizItem';
import useQuiz, { TRANSITION_DIRECTION } from 'hooks/useQuiz';
import { AnimatePresence, LazyMotion, m, Variants } from 'framer-motion';
import QuizNavbar from 'components/molecules/QuizNavbar';
import { mapQuizProps } from 'lib/editor/quiz';
import useLiveEditorQuizUpdates from 'hooks/useLiveEditorQuizUpdates';
import QuizItemSkeleton from 'components/organisms/QuizItem/QuizItemSkeleton';
import { showQuizQuestionSkeleton, showQuizSkeleton } from 'utils/quiz';
import useLiveEditorQuizNavigation from 'hooks/useLiveEditorQuizNavigation';
import getGQLClient from 'lib/graphql/client';
import { useRouter } from 'next/router';
import { withMainLayout } from 'lib/utils/fetch_decorators';
import useSettingsStore from 'stores/settings';
import { fetchQuizData } from 'lib/rest/fetchStoreData';

const loadFeatures = () =>
  import('utils/framerFeatures').then((res) => res.default);

export type QuizPageProps = {
  id: string;
  totalQuestions: number;
  title: string;
  questions: QuizItemStaticProps[];
  originalQuiz: QuizEditorProps;
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

const propsCallback: GetStaticProps<QuizPageProps> = async (
  context,
): Promise<GetStaticPropsResult<QuizPageProps>> => {
  if (!context.params?.id || typeof context.params?.id !== 'string') {
    return {
      notFound: true,
    };
  }

  const {
    params: { id },
  } = context;

  const client = getGQLClient();
  const {
    data: { storeSettings },
  } = await client.getStoreSettings();

  const defaultLocale = storeSettings?.store?.locale;

  const locale = context.locale ?? defaultLocale ?? '';

  // TODO: Replace this REST call with GraphQL
  const quizData = (await fetchQuizData(id, locale)) as QuizEditorProps;

  if (!quizData) {
    return {
      notFound: true,
    };
  }

  const quizProps = mapQuizProps(quizData);

  return {
    props: quizProps,
  };
};

export const getStaticProps = withMainLayout(propsCallback);

const QuizPage: NextPageWithLayout<ServerSideProps<typeof getStaticProps>> = ({
  _layout: { settings },
  ...quiz
}) => {
  const router = useRouter();

  const liveQuiz = useLiveEditorQuizUpdates(quiz);
  const {
    activeIndex,
    activeQuestionIndex,
    transparent,
    transitionDirection,
    answers,
    onNext,
    onPrevious,
    onIndexChange,
  } = useQuiz(liveQuiz, router);

  useLiveEditorQuizNavigation(onIndexChange, quiz.id, router);

  const [setSettings, headerSettings] = useSettingsStore((state) => [
    state.setSettings,
    state.settings?.header,
  ]);

  // Stores settings retrieved server-side on the client-side store.
  useEffect(() => {
    if (settings) {
      setSettings(settings);
    }
  }, [setSettings, settings]);

  const transitionVariants: Variants = {
    hidden: (direction: TRANSITION_DIRECTION) => ({
      opacity: 0,
      x: direction === TRANSITION_DIRECTION.FORWARD ? 400 : -400,
    }),
    enter: { opacity: 1, x: 0 },
    exit: (direction: TRANSITION_DIRECTION) => ({
      opacity: 0,
      x: direction === TRANSITION_DIRECTION.FORWARD ? -600 : 600,
    }),
  };

  return (
    <>
      <Head>
        <title>{liveQuiz.title}</title>
      </Head>
      <QuizNavbar
        logo={headerSettings ? headerSettings.logo : null}
        logoHeight={headerSettings ? headerSettings.logoHeight : null}
        storeName={headerSettings ? headerSettings.storeName : null}
        questions={liveQuiz.totalQuestions || 1}
        currentQuestion={(activeQuestionIndex ?? 0) + 1}
        transparent={transparent}
        containerClassName="fixed top-0 left-0 w-full z-[10]"
        onClickPrevious={activeIndex > 0 ? onPrevious : undefined}
      />
      <main className="relative h-screen w-screen overflow-hidden">
        <LazyMotion features={loadFeatures} strict>
          <AnimatePresence
            exitBeforeEnter
            initial={false}
            custom={transitionDirection}>
            {showQuizSkeleton(liveQuiz) ? (
              <QuizItemSkeleton />
            ) : (
              liveQuiz.questions.map(
                (question, index) =>
                  activeIndex === index && (
                    <m.article
                      custom={transitionDirection}
                      variants={transitionVariants}
                      initial="hidden"
                      animate="enter"
                      exit="exit"
                      transition={{
                        type: 'tween',
                        ease: 'linear',
                        duration: 0.45,
                      }}
                      className="flex h-full w-full overflow-y-auto"
                      key={question.id}>
                      {showQuizQuestionSkeleton(question) ? (
                        <QuizItemSkeleton />
                      ) : (
                        <QuizItem
                          {...question}
                          activeQuestionIndex={activeQuestionIndex}
                          totalQuestions={liveQuiz.totalQuestions}
                          onNext={onNext}
                          savedAnswer={answers?.get(question.id)}
                        />
                      )}
                    </m.article>
                  ),
              )
            )}
          </AnimatePresence>
        </LazyMotion>
      </main>
    </>
  );
};

QuizPage.getLayout = (page) => <>{page}</>;

export default QuizPage;
