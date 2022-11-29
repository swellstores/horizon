import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import PlanSelect from './PlanSelect';
import { INTERVAL } from 'types/shared/products';

export default {
  title: 'Atoms/PlanSelect',
  component: PlanSelect,
  argTypes: {
    value: { control: 'object' },
    onChange: { control: 'func' },
    quantity: { control: 'number' },
    plans: { control: 'array' },
  },
} as ComponentMeta<typeof PlanSelect>;

const Template: ComponentStory<typeof PlanSelect> = (args) => (
  <PlanSelect {...args} />
);

export const Default = Template.bind({});
Default.args = {
  value: {
    id: '623d05bf19dea3013248a16b',
    price: 24,
    billingSchedule: {
      interval: INTERVAL.Monthly,
      intervalCount: 1,
    },
  },
  plans: [
    {
      id: '623d05bf19dea3013248a16b',
      price: 24,
      billingSchedule: {
        interval: INTERVAL.Monthly,
        intervalCount: 1,
      },
    },
    {
      id: '623d05bf19dea3013248a16c',
      price: 22,
      billingSchedule: {
        interval: INTERVAL.Weekly,
        intervalCount: 2,
      },
    },
  ],
};
