import React from 'react';
import QuizCrossSellCard from 'components/atoms/QuizCrossSellCard';

import type { QuizCrossSellCardProps } from 'components/atoms/QuizCrossSellCard';

export interface QuizCrossSellProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Title of the section
   */
  title: string;
  /**
   * Cross sell products
   */
  products: Array<QuizCrossSellCardProps>;
}

const QuizCrossSell: React.FC<QuizCrossSellProps> = ({
  title,
  products,
  ...props
}) => {
  return (
    <section
      className={[
        'flex w-full flex-col items-center justify-center gap-y-10 bg-background-secondary py-14 lg:gap-y-14 lg:py-[72px]',
        props.className ?? '',
      ].join(' ')}>
      <h2 className="text-center font-headings text-2xl font-semibold leading-[1.5] text-primary lg:text-5xl">
        {title}
      </h2>
      <div className="flex max-w-[342px] flex-col justify-center gap-y-10 lg:max-w-[calc(556px*2+56px)] lg:flex-row lg:flex-wrap lg:gap-14">
        {products.map((product) => (
          <QuizCrossSellCard
            key={product.id}
            {...product}
            className="self-stretch lg:w-[556px]"
          />
        ))}
      </div>
    </section>
  );
};

export default QuizCrossSell;
