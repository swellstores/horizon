import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import CurrencySelect from './CurrencySelect';

export default {
  title: 'atoms/CurrencySelect',
  component: CurrencySelect,
  argTypes: {
    currencies: { control: { type: 'array' } },
    value: { control: { type: 'string' } },
  },
} as ComponentMeta<typeof CurrencySelect>;

const Template: ComponentStory<typeof CurrencySelect> = (args) => {
  return <CurrencySelect {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  className: 'p-4',
};
