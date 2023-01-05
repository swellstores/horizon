import AddCircle from 'components/atoms/AddCircle';
import Link from 'next/link';
import React from 'react';
import useSettingsStore from 'stores/settings';
import { fallbackString } from 'utils/text';

export interface AddMoreProductsCardProps {
  empty?: boolean;
}

const AddMoreProductsCard: React.FC<AddMoreProductsCardProps> = ({ empty }) => {
  const lang = useSettingsStore((state) => state.settings?.lang);
  const addFirstProductLabel = fallbackString(
    lang?.cart?.addFirstProduct,
    'Add your first product',
  );
  const addMoreProductsLabel = fallbackString(
    lang?.cart?.addMoreProducts,
    'Add more products',
  );

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
