import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import TrialLabel from './TrialLabel';

export default {
  title: 'atoms/TrialLabel',
  component: TrialLabel,
  argTypes: {
    trialDays: { control: { type: 'number' } },
    price: { control: { type: 'number' } },
  },
} as ComponentMeta<typeof TrialLabel>;

const Template: ComponentStory<typeof TrialLabel> = (args) => (
  <TrialLabel {...args} />
);

export const Default = Template.bind({});
Default.args = {
  trialDays: 30,
  price: 9.99,
};
