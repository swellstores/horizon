import { SECTION_MARGIN_MAP, SPACING } from 'lib/globals/sizings';
import React from 'react';
import type { PageSectionSpacing } from 'types/shared/sections';

export interface QuoteProps extends Partial<PageSectionSpacing> {
  quote: string;
  citeURL?: string;
}

const BlockQuote: React.FC<QuoteProps> = ({
  quote,
  citeURL,
  horizontal_spacing: horizontalSpacing = SPACING.NONE,
}) => {
  const quoteSpanClasses = 'absolute text-[2.25rem]';

  return (
    <section
      className={`${SECTION_MARGIN_MAP[horizontalSpacing]} flex flex-col border-l-4 border-primary bg-background-primary pl-6 font-semibold text-primary lg:pl-10`}>
      <blockquote
        cite={citeURL}
        className="relative ml-1 pb-6 text-xl lg:ml-2 lg:pt-1.5">
        <span
          className={[quoteSpanClasses, '-left-2 top-0 lg:top-2'].join(' ')}>
          “
        </span>
        <br />
        {quote}
        <span
          className={[
            quoteSpanClasses,
            'bottom-2 ml-3 rotate-180 lg:bottom-3 lg:mr-0 lg:ml-5',
          ].join(' ')}>
          “
        </span>
      </blockquote>
    </section>
  );
};

export default BlockQuote;
