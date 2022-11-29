import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import SlideNav from './SlideNav';

export default {
  title: 'atoms/SlideNav',
  component: SlideNav,
  argTypes: {
    quantity: { control: { type: 'number' } },
    defaultValue: { control: { type: 'number' } },
    value: { control: { type: 'number' }, table: { disable: true } },
    onChange: { table: { disable: true } },
    disabled: { control: { type: 'boolean' } },
  },
} as ComponentMeta<typeof SlideNav>;

const Template: ComponentStory<typeof SlideNav> = (args) => {
  return <SlideNav {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  quantity: 4,
  defaultValue: 0,
  disabled: false,
};

export const Disabled = Template.bind({});
Disabled.args = {
  quantity: 4,
  defaultValue: 2,
  disabled: true,
};
