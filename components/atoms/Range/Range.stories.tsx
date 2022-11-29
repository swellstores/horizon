import React, { useState } from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import Range from './Range';

export default {
  title: 'atoms/Range',
  component: Range,
} as ComponentMeta<typeof Range>;

const Template: ComponentStory<typeof Range> = (args) => {
  const [value, setValue] = useState(args.value);

  return (
    <Range {...args} value={value} onChange={(value) => setValue(value)} />
  );
};

export const Default = Template.bind({});
Default.args = {
  min: 24,
  max: 99,
  value: [24, 99],
};
