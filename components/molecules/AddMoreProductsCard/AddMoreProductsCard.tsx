import AddCircle from 'components/atoms/AddCircle';
import useI18n from 'hooks/useI18n';
import Link from 'next/link';
import React from 'react';

export interface AddMoreProductsCardProps {
  empty?: boolean;
}

const AddMoreProductsCard: React.FC<AddMoreProductsCardProps> = ({ empty }) => {
  const i18n = useI18n();
  const addFirstProductLabel = i18n('cart.add_first_product');
  const addMoreProductsLabel = i18n('cart.add_more_products');

  return (
    <Link href="/products">
      <a>
        <div className="rounded-2xl border border-dashed border-accent px-10 py-8">
          <div className="flex items-center gap-10">
            <AddCircle className="my-4" />
            <div className="flex flex-col gap-2">
              <div className="font-headings text-sm font-semibold text-primary">
                {empty
                  ? addFirstProductLabel ?? addMoreProductsLabel
                  : addMoreProductsLabel}
              </div>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default AddMoreProductsCard;
