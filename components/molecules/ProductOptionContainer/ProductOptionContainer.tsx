import InfoTooltip from 'components/atoms/InfoTooltip';
import React from 'react';

export interface ProductOptionContainerProps {
  name: string;
  description?: string;
}

const ProductOptionContainer: React.FC<ProductOptionContainerProps> = ({
  name,
  description,
  children,
}) => (
  <div className="text-primary">
    <div className="flex gap-2">
      <h3 className="font-headings text-sm font-semibold uppercase">{name}</h3>
      {description && <InfoTooltip text={description} />}
    </div>
    {!!children && (
      <div className="mt-2 flex items-center justify-start gap-2">
        {children}
      </div>
    )}
  </div>
);

export default ProductOptionContainer;
