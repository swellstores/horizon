import useSettingsStore from 'stores/settings';
import { fallbackString, parseTextWithVariables } from 'utils/text';

export interface ProductCountProps
  extends React.HTMLAttributes<HTMLDivElement> {
  count: number;
}

const ProductCount: React.FC<ProductCountProps> = ({
  count,
  className,
  ...props
}) => {
  const lang = useSettingsStore((state) => state.settings?.lang);

  const productCountLabel = fallbackString(
    lang?.categories?.productCount,
    'All products ({count})',
  );
  const parsedProductCountLabel = parseTextWithVariables(productCountLabel, {
    count: count.toString(),
  });

  return (
    <div
      {...props}
      className={[
        'w-full text-2xs uppercase text-primary',
        className ?? '',
      ].join(' ')}>
      {parsedProductCountLabel}
    </div>
  );
};

export default ProductCount;
