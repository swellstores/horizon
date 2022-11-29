import React from 'react';
import ProductBenefit, {
  ProductBenefitProps,
} from 'components/atoms/ProductBenefit';

export interface ProductBenefitsProps {
  benefits: ProductBenefitProps[];
  className?: string;
}

const ProductBenefits: React.FC<ProductBenefitsProps> = ({
  benefits,
  className,
}) => (
  <div
    className={`grid w-full grid-cols-[repeat(auto-fit,minmax(4.5rem,1fr))] items-center gap-5 ${
      className ?? ''
    }`}>
    {benefits.map((benefit) => (
      <ProductBenefit
        key={benefit.id}
        label={benefit.label}
        icon={benefit.icon}
        customIcon={benefit.customIcon}
      />
    ))}
  </div>
);

export default ProductBenefits;
