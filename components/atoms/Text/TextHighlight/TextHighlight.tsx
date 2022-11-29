import React from 'react';
import RichText from 'components/atoms/RichText';
import type { RootElement } from 'components/atoms/RichText';

export interface TextHighlightProps {
  content: string;
  size?: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  rootEl?: RootElement;
}

const SIZE_CLASS_MAPPINGS = {
  1: 'text-2xl',
  2: 'text-xl',
  3: 'text-lg',
  4: 'text-md',
  5: 'text-sm',
  6: 'text-2xs',
  7: 'text-3xs',
};

const TextHighlight: React.FC<TextHighlightProps> = ({
  content,
  size = 1,
  rootEl,
}) => {
  const classNames = SIZE_CLASS_MAPPINGS[size];
  return <RichText content={content} className={classNames} rootEl={rootEl} />;
};

export default TextHighlight;
