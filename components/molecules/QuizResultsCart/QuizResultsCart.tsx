import React from 'react';
import QuizResults from 'components/molecules/QuizResults';

import type { QuizResultsGroup } from 'components/molecules/QuizResults';

export interface QuizResultsCartProps {
  resultsGroups: Array<QuizResultsGroup>;
  selectedProducts: Map<string, number>;
}

const QuizResultsCart: React.FC<QuizResultsCartProps> = ({
  resultsGroups,
  selectedProducts,
}) => {
  return (
    <section className="bg-background-primary px-6 py-12">
      <div className="mx-auto max-w-[964px]">
        <QuizResults
          resultsGroups={resultsGroups}
          selectedProducts={selectedProducts}
        />
      </div>
    </section>
  );
};

export default QuizResultsCart;
