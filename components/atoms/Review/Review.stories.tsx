import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import Review from './Review';

export default {
  title: 'Atoms/Review',
  component: Review,
  argTypes: {
    initialRating: { control: 'number', table: { disable: true } },
    value: { control: 'number', table: { disable: true } },
    onChange: { table: { disable: true } },
    disabled: { control: 'boolean' },
  },
} as ComponentMeta<typeof Review>;

const Template: ComponentStory<typeof Review> = (args) => <Review {...args} />;

export const Default = Template.bind({});
Default.args = {
  initialRating: 3,
  disabled: false,
};

export const Disabled = Template.bind({});
Disabled.args = {
  initialRating: 5,
  disabled: true,
};
