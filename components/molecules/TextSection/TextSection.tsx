import RichText from 'components/atoms/RichText';
import { SECTION_MARGIN_MAP } from 'lib/globals/sizings';
import React from 'react';
import { TEXT_ALIGNMENT } from 'types/shared/alignment';
import type { PageSectionSpacing } from 'types/shared/sections';
import { TEXT_ALIGNMENT_MAP } from 'utils/classMappings';

export interface TextSectionProps extends PageSectionSpacing {
  title?: string;
  subtitle?: string;
  content: string;
  text_alignment?: TEXT_ALIGNMENT;
}

const TextSection: React.FC<TextSectionProps> = ({
  title,
  subtitle,
  content,
  text_alignment = TEXT_ALIGNMENT.LEFT,
  horizontal_spacing,
}) => (
  <section
    className={`${TEXT_ALIGNMENT_MAP[text_alignment]} ${SECTION_MARGIN_MAP[horizontal_spacing]} flex flex-col gap-8 text-md text-primary lg:text-lg`}>
    {title && (
      <RichText
        className="text-center font-headings text-5xl"
        content={title}
      />
    )}
    {subtitle && (
      <RichText
        className="text-center font-headings text-2xl"
        content={subtitle}
      />
    )}
    <RichText className="text-body" content={content} />
  </section>
);

export default TextSection;
