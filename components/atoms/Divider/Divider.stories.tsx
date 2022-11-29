import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import Divider, { DIVIDER_HEIGHT } from './Divider';

export default {
  title: 'atoms/Divider',
  component: Divider,
  argTypes: {
    vertical_spacing: {
      control: {
        type: 'select',
        options: Object.keys(DIVIDER_HEIGHT),
      },
    },
  },
} as ComponentMeta<typeof Divider>;

const Template: ComponentStory<typeof Divider> = (args) => (
  <Divider {...args} />
);

export const Default = Template.bind({});
Default.args = {
  vertical_spacing: DIVIDER_HEIGHT.SMALL,
};

export const WithBackgroundColor = Template.bind({});
WithBackgroundColor.args = {
  vertical_spacing: DIVIDER_HEIGHT.SMALL,
  background_color: 'red',
};
