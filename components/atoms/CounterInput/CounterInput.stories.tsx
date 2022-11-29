import React, { useEffect, useState } from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import CounterInput from './CounterInput';

export default {
  title: 'atoms/CounterInput',
  component: CounterInput,
  argTypes: {
    value: {
      control: { type: 'number' },
    },
    defaultValue: { control: { type: 'number' }, table: { disable: true } },
    onChange: { table: { disable: true } },
  },
} as ComponentMeta<typeof CounterInput>;

const Template: ComponentStory<typeof CounterInput> = (args) => {
  const [value, setValue] = useState(args.value);

  useEffect(() => {
    setValue(args.value);
  }, [args.value]);

  return <CounterInput {...args} value={value} onChange={setValue} />;
};

export const Default = Template.bind({});
Default.args = {
  value: 1,
  min: 0,
  max: 999,
};
