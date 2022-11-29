import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import PerksAccordion from './PerksAccordion';

export default {
  title: 'molecules/PerksAccordion',
  component: PerksAccordion,
  argTypes: {
    revealLabel: { control: { type: 'text' } },
    hideLabel: { control: { type: 'text' } },
    perks: { control: 'array' },
  },
} as ComponentMeta<typeof PerksAccordion>;

const Template: ComponentStory<typeof PerksAccordion> = (args) => (
  <PerksAccordion {...args} />
);

export const Default = Template.bind({});
Default.args = {
  revealLabel: 'View details',
  hideLabel: 'Hide details',
  perks: [
    'Trial for 30 days',
    'Discounts on delivery',
    'Gives a magazine',
    'Try products before launch',
    'Monthly mystery box',
  ],
};
