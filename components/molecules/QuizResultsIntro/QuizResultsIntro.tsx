import React from 'react';
import Image from 'components/atoms/SafeImage';
import RichText from 'components/atoms/RichText';

import type { MandatoryImageProps } from 'types/global';
import { layoutFillConfig } from 'lib/utils/image';

export interface QuizResultsIntroProps {
  /**
   * The static part of the heading preceding the name
   */
  headingBasis: string;
  /**
   * Customer name (added dynamically in heading)
   */
  customerName?: string;
  /**
   * Description text
   */
  description: string;
  /**
   * Background
   */
  background: MandatoryImageProps;
}

const QuizResultsIntro: React.FC<QuizResultsIntroProps> = ({
  headingBasis,
  customerName,
  description,
  background,
}) => {
  const formattedName = customerName ? `,<br/>${customerName}` : '';
  const headingContent = `<span>${headingBasis}${formattedName}</span>`;
  const classNames = 'relative w-full lg:grid lg:grid-cols-2';

  return (
    <section className={classNames}>
      <Image
        {...background}
        {...layoutFillConfig}
        alt={background.alt}
        className="absolute inset-0 object-cover object-right-top lg:object-center"
      />
      <div className="relative box-content flex max-w-[496px] flex-col px-6 pt-14 pb-[137px] text-primary lg:py-[122.5px] lg:px-[72px]">
        <RichText
          content={headingContent}
          className="mb-2 flex flex-col text-5xl font-semibold tracking-wide lg:mb-8 lg:text-7xl"
        />
        <RichText
          content={description}
          className="text-lg leading-[1.5] lg:text-2xl"
        />
      </div>
    </section>
  );
};

export default QuizResultsIntro;
