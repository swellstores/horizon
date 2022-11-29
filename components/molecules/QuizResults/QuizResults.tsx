import React from 'react';

import type { QuizResultCardProps } from 'components/atoms/QuizResultCard';
import QuizResultCard from 'components/atoms/QuizResultCard';

export type QuizResultsProducts = Array<
  Omit<QuizResultCardProps, 'addToSelection' | 'selectedProducts'>
>;
export interface QuizResultsGroup {
  /**
   * Title of the section
   */
  title: string;
  /**
   * Cross sell products
   */
  products: QuizResultsProducts;
}

interface QuizResultsProps {
  resultsGroups: Array<QuizResultsGroup>;
  selectedProducts: Map<string, number>;
}

const QuizResults: React.FC<QuizResultsProps> = ({
  resultsGroups,
  selectedProducts,
}) => {
  return (
    <section className="flex flex-col gap-y-10">
      {resultsGroups.map(({ title, products }) => (
        <div key={title}>
          <h3 className="font-headings text-2xl font-semibold text-primary lg:text-5xl">
            {title}
          </h3>
          <div className="mt-8 flex flex-col gap-y-8 lg:mt-10">
            {products.map((product, i) => (
              <QuizResultCard
                {...product}
                key={`${product.title}${i}`}
                selectedProducts={selectedProducts}
              />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
};

export default QuizResults;
