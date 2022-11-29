import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import ScheduleLabel from './ScheduleLabel';

export default {
  title: 'atoms/ScheduleLabel',
  component: ScheduleLabel,
  argTypes: {
    type: { control: 'radio', options: ['order', 'billing'] },
    schedule: { control: { type: 'object' } },
    icon: { control: { type: 'boolean' } },
    textClasses: { control: { type: 'text' } },
    iconClasses: { control: { type: 'text' } },
    className: { control: { type: 'text' } },
  },
} as ComponentMeta<typeof ScheduleLabel>;

const Template: ComponentStory<typeof ScheduleLabel> = (args) => (
  <ScheduleLabel {...args} />
);

export const Default = Template.bind({});
Default.args = {
  type: 'billing',
  base: 'Pay',
  schedule: {
    interval: 'weekly',
    intervalCount: 1,
    trialDays: 30,
  },
  icon: true,
  textClasses: 'text-sm text-primary',
  iconClasses: 'w-4',
};

export const Order = Template.bind({});
Order.args = {
  type: 'order',
  base: 'Receive it',
  schedule: {
    interval: 'weekly',
    intervalCount: 1,
    trialDays: 30,
  },
  icon: true,
  textClasses: 'text-sm text-primary',
  iconClasses: 'w-4',
};

export const NoIcon = Template.bind({});
NoIcon.args = {
  type: 'order',
  base: 'Receive it',
  schedule: {
    interval: 'weekly',
    intervalCount: 1,
    trialDays: 30,
  },
  textClasses: 'text-sm text-primary',
};
