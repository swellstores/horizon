import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import ProgressBar from './ProgressBar';

export default {
  title: 'Atoms/ProgressBar',
  component: ProgressBar,
  argType: {
    value: {
      control: {
        type: 'number',
        min: 0,
        max: 100,
      },
    },
  },
} as ComponentMeta<typeof ProgressBar>;

const Template: ComponentStory<typeof ProgressBar> = (args) => (
  <ProgressBar {...args} />
);

export const Default = Template.bind({});

Default.args = {
  value: 50,
};
