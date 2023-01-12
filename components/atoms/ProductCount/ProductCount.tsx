import useI18n from 'hooks/useI18n';

export interface ProductCountProps
  extends React.HTMLAttributes<HTMLDivElement> {
  count: number;
}

const ProductCount: React.FC<ProductCountProps> = ({
  count,
  className,
  ...props
}) => {
  const i18n = useI18n();
  const productCountLabel = i18n('categories.product_count', {
    count: count.toString(),
  });

  return (
    <div
      {...props}
      className={[
        'w-full text-2xs uppercase text-primary',
        className ?? '',
      ].join(' ')}>
      {productCountLabel}
    </div>
  );
};

export default ProductCount;
