import React from 'react';
import RichText from 'components/atoms/RichText';
import type { RootElement } from 'components/atoms/RichText';

export interface TextHeadingProps {
  content: string;
  size?: 1 | 2;
  rootEl?: RootElement;
}

const SIZE_CLASS_MAPPINGS = {
  1: 'text-7xl',
  2: 'text-5xl',
};

const TextHeading: React.FC<TextHeadingProps> = ({
  content,
  size = 1,
  rootEl,
}) => {
  const classNames = SIZE_CLASS_MAPPINGS[size];
  return <RichText content={content} className={classNames} rootEl={rootEl} />;
};

export default TextHeading;
