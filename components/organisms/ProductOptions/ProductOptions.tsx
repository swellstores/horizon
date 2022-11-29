import React, { useCallback, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { OPTION_INPUT_TYPE, ProductOption } from 'types/shared/products';
import { Action, ACTIONS } from 'hooks/useProductSelection';
import ProductOptionContainer from 'components/molecules/ProductOptionContainer';
const OptionSelectItem = dynamic(
  () => import('components/atoms/OptionSelect/OptionSelectItem'),
);
const Input = dynamic(() => import('components/atoms/Input'));
const Textarea = dynamic(() => import('components/atoms/Textarea'));
const Toggle = dynamic(() => import('components/molecules/Toggle'));

export interface ProductOptionsProps {
  options: ProductOption[];
  selectedOptions: Map<string, string>;
  isGiftCard?: boolean;
  onChange?: (payload: Action) => void;
  priceFormatter?: (price: number) => string;
}

const calculateOptionVisibility = (
  option: ProductOption,
  productOptions: ProductOption[],
  selectedOptions: Map<string, string>,
) => {
  //  If the option has no parent, it's always visible
  if (!option.parentId) return true;

  const parentOption = productOptions.find((o) => o.id === option.parentId);

  // If the parent option is not found, hide the option
  if (!parentOption) return false;

  const parentIsVisible = calculateOptionVisibility(
    parentOption,
    productOptions,
    selectedOptions,
  );

  // If the parent option is not visible, hide the option
  if (!parentIsVisible) return false;

  // If the parent option is not selected, hide the option
  if (!selectedOptions.has(option.parentId)) return false;

  switch (parentOption.inputType) {
    // If the parent is a toggle, show the option if it's selected
    case OPTION_INPUT_TYPE.TOGGLE: {
      return true;
    }
    // If the parent is a select, show the option only if the correct value is selected
    case OPTION_INPUT_TYPE.SELECT: {
      if (!option.parentValueIds?.length) return false;

      for (const parentValueId of option.parentValueIds) {
        if (selectedOptions.get(parentOption.id) === parentValueId) return true;
      }
    }
  }

  return false;
};

const ProductOptions: React.FC<ProductOptionsProps> = ({
  options,
  selectedOptions,
  isGiftCard,
  onChange,
  priceFormatter,
}) => {
  const filteredOptions = useMemo(
    () =>
      options.filter((option) =>
        calculateOptionVisibility(option, options, selectedOptions),
      ),
    [options, selectedOptions],
  );

  const selectOption = useCallback(
    (productOption: ProductOption) =>
      productOption.values?.map(({ id, name }) => (
        <OptionSelectItem
          key={id}
          name={productOption.name || productOption.attributeId}
          value={id}
          label={name}
          onChange={(valueId) =>
            onChange?.({
              type: ACTIONS.SET_SELECTED_PRODUCT_OPTIONS,
              payload: { optionId: productOption.id, valueId },
            })
          }
          active={selectedOptions.get(productOption.id) === id}
        />
      )),
    [onChange, selectedOptions],
  );

  const renderOption = useCallback(
    (productOption: ProductOption) => {
      if (isGiftCard) {
        return selectOption(productOption);
      }

      switch (productOption.inputType) {
        case OPTION_INPUT_TYPE.SELECT: {
          return selectOption(productOption);
        }
        case OPTION_INPUT_TYPE.TOGGLE: {
          return productOption.values?.map((value) => (
            <Toggle
              key={value.id}
              name={productOption.name}
              description={productOption.description}
              checked={selectedOptions.has(productOption.id)}
              priceDifference={value.price}
              priceFormatter={priceFormatter}
              onChange={() => {
                onChange?.({
                  type: ACTIONS.TOGGLE_PURCHASE_OPTION,
                  payload: {
                    optionId: productOption.id,
                    valueId: value.id,
                  },
                });
              }}
            />
          ));
        }
        case OPTION_INPUT_TYPE.SHORT_TEXT: {
          return (
            <Input
              className="w-full"
              placeholder={productOption.placeholder}
              required={productOption.required}
              onChange={(e) => {
                onChange?.({
                  type: ACTIONS.SET_TEXT_PRODUCT_OPTION,
                  payload: {
                    optionId: productOption.id,
                    value: e.target.value,
                  },
                });
              }}
            />
          );
        }
        case OPTION_INPUT_TYPE.LONG_TEXT: {
          return (
            <Textarea
              placeholder={productOption.placeholder}
              className="w-full"
              style={{ maxWidth: '100%', width: '100%' }}
              required={productOption.required}
              onChange={(e) => {
                onChange?.({
                  type: ACTIONS.SET_TEXT_PRODUCT_OPTION,
                  payload: {
                    optionId: productOption.id,
                    value: e.target.value,
                  },
                });
              }}
            />
          );
        }
      }
    },
    [isGiftCard, onChange, priceFormatter, selectOption, selectedOptions],
  );

  return (
    <div className="mt-5 flex flex-col gap-5">
      {filteredOptions.map((productOption) => {
        // Don't wrap the toggle in a container
        if (productOption.inputType === OPTION_INPUT_TYPE.TOGGLE) {
          return renderOption(productOption);
        }

        return (
          <ProductOptionContainer
            key={productOption.id}
            name={productOption.name}
            description={productOption.description}>
            {renderOption(productOption)}
          </ProductOptionContainer>
        );
      })}
    </div>
  );
};

export default ProductOptions;
