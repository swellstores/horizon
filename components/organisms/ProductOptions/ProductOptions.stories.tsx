import React, { useState } from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import ProductOptions from './ProductOptions';
import { Action, ACTIONS } from 'hooks/useProductSelection';

export default {
  title: 'organisms/ProductOptions',
  component: ProductOptions,
  argTypes: {
    label: { control: { type: 'text' } },
  },
} as ComponentMeta<typeof ProductOptions>;

const Template: ComponentStory<typeof ProductOptions> = (args) => {
  const [selectedOptions, setSelectedOptions] = useState(
    new Map<string, string>([
      ['62659cd3e628c74b83c67847', '62659d9fe628c74b83c6713e'],
    ]),
  );
  function setValue({ payload, type }: Action) {
    if (type !== ACTIONS.SET_SELECTED_PRODUCT_OPTIONS) return;
    const { optionId, valueId } = payload;
    const newMap = new Map(selectedOptions);
    newMap.set(optionId, valueId);
    setSelectedOptions(newMap);
  }

  return (
    <ProductOptions
      {...args}
      selectedOptions={selectedOptions}
      onChange={setValue}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  options: [
    {
      id: '62659cd3e628c74b83c67847',
      attributeId: 'size',
      name: 'Size',
      inputType: 'select',
      active: true,
      required: true,
      values: [
        {
          id: '62659d9fe628c74b83c6784d',
          name: '250ml / 8.4oz',
          price: 0,
        },
        {
          id: '62659d9fe628c74b83c6713e',
          name: '500ml / 16.8oz',
          price: 10,
        },
      ],
    },
    {
      id: '628728c18f2e6d1c31981f04',
      attributeId: '',
      name: 'Name',
      inputType: 'short_text',
      active: true,
      required: true,
      values: [],
    },
    {
      id: '6285b700c5f5cb2f3f5fa877',
      attributeId: 'toggle_option_test',
      name: 'Extra Toppings',
      inputType: 'toggle',
      active: true,
      required: false,
      values: [
        {
          id: '6285b748c5f5cb2f3f5fa878',
          name: 'Extra Toppings',
          price: 5,
        },
      ],
    },
    {
      id: '6287359d8f2e6d1c31981f05',
      attributeId: '',
      name: 'Dedication letter',
      inputType: 'long_text',
      active: true,
      required: false,
      values: [],
    },
  ],
};
