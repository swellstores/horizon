import React, { LegacyRef } from 'react';
import styles from './RichText.module.css';

type HeadingElement = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
type DivElement = 'div';
type ParagraphElement = 'p';

export type RootElement = HeadingElement | DivElement | ParagraphElement;

interface BaseProps {
  /** The rich text component's content. Can be HTML format */
  content: string;
}

interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    BaseProps {
  rootEl?: HeadingElement;
}

interface DivProps extends React.HTMLAttributes<HTMLDivElement>, BaseProps {
  rootEl?: DivElement;
}

interface ParagraphProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    BaseProps {
  rootEl?: ParagraphElement;
}

export type RichTextProps = HeadingProps | DivProps | ParagraphProps;

const RichText = React.forwardRef<HTMLElement, RichTextProps>(
  ({ content, rootEl: RootElement = 'div', ...props }, ref) => {
    return (
      <RootElement
        {...props}
        ref={ref as LegacyRef<HTMLHeadingElement>}
        className={[styles['rich-text'], props.className].join(' ')}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  },
);

RichText.displayName = 'RichText';

export default RichText;
