import type { EditorImage } from 'types/editor';

export enum QUIZ_ITEM_TYPE {
  QUESTION = 'quiz_question',
  TRANSITION = 'quiz_transition',
}

export enum QUIZ_QUESTION_TYPE {
  TEXT = 'text',
  EMAIL = 'email',
  TEXTAREA = 'textarea',
  SINGLE_SELECT = 'single_select',
  MULTIPLE_SELECT = 'multiple_select',
}

export enum QUIZ_QUESTION_SELECT_TYPE {
  CARD = 'card',
  GRID = 'grid',
  STACK = 'stack',
  SLIDER = 'slider',
}

export interface SelectOption {
  label: string;
  id: string;
  selection?: Array<AnswerSelection>;
}

export type Answer = string | string[];

export enum QuizEditorLayoutType {
  SINGLE_PAGE = 'single_page',
  MULTIPLE_PAGE = 'multiple_page',
}

export interface EditorProductSelection {
  slug: string;
  _model: 'products' | 'categories';
}

export interface AnswerSelection {
  productSelection: Array<ProductSelection>;
  points: number;
}

export interface EditorAnswerSelection {
  product_selection: Array<EditorProductSelection>;
  points: number;
}

export interface QuizEditorAnswer {
  option: string;
  selection: Array<EditorAnswerSelection>;
}

export enum QUIZ_TRANSITION_LAYOUT_OPTION {
  IMAGE_LEFT = 'image_left_aligned',
  IMAGE_RIGHT = 'image_right_aligned',
  NO_IMAGE = 'no_image',
}

// the pairs of (layout_type_single_select and layout_type_multiple_select) & (answers and answers_card)
// are supposed to represent the same field, but due to limitations from the editor
// we need to have 2 fields conditionally rendering in the editor based on a value:
// - for layout_type_{x} we conditionally render them based on the value of question_type
// - for answers we conditionally render them based on the value of layout_type_{x}
// Limitations:
// - we can't conditionally render a set of options in a field, but rather we have to
// conditionally render the whole field. (for layout_type_{x})
// - we can't conditionally render the fields of a nested block based on fields that are outside of that block (for answers)
export interface QuizEditorQuestionPageProps {
  id: string;
  type?: QUIZ_ITEM_TYPE.QUESTION;
  question_type?: QUIZ_QUESTION_TYPE;
  layout_type_single_select?: QUIZ_QUESTION_SELECT_TYPE;
  layout_type_multiple_select?: Omit<
    QUIZ_QUESTION_SELECT_TYPE,
    QUIZ_QUESTION_SELECT_TYPE.SLIDER
  >;
  question_prompt?: string;
  question_description?: string;
  question_note?: string;
  placeholder?: string;
  max_chars?: number;
  columns?: number;
  required?: boolean;
  answers?: Array<QuizEditorAnswer>;
  answers_card?: Array<QuizEditorAnswer & { image: EditorImage }>;
  is_customer_name: boolean;
}

export interface QuizEditorTransitionPageProps {
  id: string;
  type?: QUIZ_ITEM_TYPE.TRANSITION;
  layout_option?: QUIZ_TRANSITION_LAYOUT_OPTION;
  image: EditorImage;
  title?: string;
  description?: string;
}

export interface QuizEditorResultsPage {
  id: string;
  title?: string;
  heading_section: unknown[];
  results_title?: string;
}

export interface QuizEditorProps {
  id: string;
  name?: string;
  layout: QuizEditorLayoutType.MULTIPLE_PAGE;
  questions?: Array<
    QuizEditorQuestionPageProps | QuizEditorTransitionPageProps
  >;
  next_button_label?: string;
  see_results_label?: string;
  results_page: QuizEditorResultsPage[];
}

export interface ProductSelection {
  slug: string;
  model: 'products' | 'categories';
}
export interface Selection {
  productSelection: Array<ProductSelection>;
  points: number;
}
export interface ResultsAnswer {
  selection: Array<Selection>;
}

export interface Ranking {
  [key: string]: number;
}

export enum ANSWER_TYPE {
  STRING = 'string',
  ARRAY = 'array',
}
