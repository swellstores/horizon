import React, { useState } from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import OptionSelect from './OptionSelect';

export default {
  title: 'atoms/OptionSelect',
  component: OptionSelect,
  argTypes: {
    attributeId: { control: { type: 'string' } },
    name: { control: { type: 'string' } },
    active: { control: { type: 'boolean' } },
    required: { control: { type: 'boolean' } },
    values: { control: { type: 'array' } },
    value: { control: { type: 'string' } },
    onChange: { control: { type: 'func' } },
  },
} as ComponentMeta<typeof OptionSelect>;

const values = [
  {
    id: '623adce66724f9528a9c5b04',
    name: '120ml',
  },
  {
    id: '624c47ecd38e68cff130abe8',
    name: '360ml',
  },
];

const Template: ComponentStory<typeof OptionSelect> = (args) => {
  const [value, setValue] = useState(values[0].id);
  return <OptionSelect {...args} value={value} onChange={setValue} />;
};

export const Default = Template.bind({});
Default.args = {
  attributeId: 'size',
  name: 'Size',
  active: true,
  values,
};
