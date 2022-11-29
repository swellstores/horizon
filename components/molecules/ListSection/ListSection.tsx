import RichText from 'components/atoms/RichText';
import { SECTION_MARGIN_MAP } from 'lib/globals/sizings';
import React from 'react';
import type { PageSectionSpacing } from 'types/shared/sections';
import styles from './ListSection.module.css';

export interface TextSectionProps extends PageSectionSpacing {
  title?: string;
  items: {
    id: string;
    content: string;
  }[];
}

const TextSection: React.FC<TextSectionProps> = ({
  title,
  items = [],
  horizontal_spacing: horizontalSpacing,
}) => (
  <section
    className={`${SECTION_MARGIN_MAP[horizontalSpacing]} flex flex-col gap-8 text-md text-primary lg:text-lg`}>
    {title && (
      <RichText
        className="text-center font-headings text-5xl"
        content={title}
      />
    )}
    <ul className={styles.list}>
      {items.map((item) => (
        <li key={item.id} className="flex">
          <RichText content={item.content} />
        </li>
      ))}
    </ul>
  </section>
);

export default TextSection;
