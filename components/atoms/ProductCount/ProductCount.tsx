export interface ProductCountProps
  extends React.HTMLAttributes<HTMLDivElement> {
  count: number;
}

const ProductCount: React.FC<ProductCountProps> = ({
  count,
  className,
  ...props
}) => (
  <div
    {...props}
    className={['w-full text-2xs uppercase text-primary', className ?? ''].join(
      ' ',
    )}>
    {/* TODO: i8n */}
    All Products ({count})
  </div>
);

export default ProductCount;
