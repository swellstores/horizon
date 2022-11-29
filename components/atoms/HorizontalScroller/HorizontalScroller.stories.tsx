import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import HorizontalScroller from './HorizontalScroller';

export default {
  title: 'atoms/HorizontalScroller',
  component: HorizontalScroller,
  argTypes: {},
} as ComponentMeta<typeof HorizontalScroller>;

const Template: ComponentStory<typeof HorizontalScroller> = (args) => (
  <HorizontalScroller {...args} />
);

export const Default = Template.bind({});
Default.args = {};
