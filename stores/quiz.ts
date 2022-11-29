import create from 'zustand';
import type { Answer } from 'types/shared/quiz';

interface QuizState {
  answers: Map<string, Answer>;
}

interface QuizzesState {
  quizzes: Map<string, QuizState>;
  setAnswer: (quizSlug: string, key: string, answer: Answer) => void;
  setQuiz: (quizSlug: string, data: QuizState) => void;
}

const useQuizStore = create<QuizzesState>((set) => ({
  quizzes: new Map(),
  setQuiz: (quizSlug: string, data: QuizState) =>
    set((state) => {
      const quizzes = new Map(state.quizzes);
      quizzes.set(quizSlug, {
        ...(quizzes.get(quizSlug)
          ? { ...quizzes.get(quizSlug), ...data }
          : data),
      });
      return { quizzes };
    }),
  setAnswer: (quizSlug: string, key: string, answer: Answer) =>
    set((state) => {
      const quizzes = new Map(state.quizzes);
      const quiz = state.quizzes.get(quizSlug);
      if (!quiz?.answers) return state;

      const answers = new Map(quiz.answers);
      answers.set(key, answer);
      quiz.answers = answers;
      quizzes.set(quizSlug, quiz);

      return { quizzes };
    }),
}));

export default useQuizStore;
