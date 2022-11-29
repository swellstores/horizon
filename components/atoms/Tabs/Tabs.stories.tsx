import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import Tabs from './Tabs';

export default {
  title: 'Atoms/Tabs',
  component: Tabs,
  argTypes: {
    tabs: { control: 'array' },
  },
} as ComponentMeta<typeof Tabs>;

const Template: ComponentStory<typeof Tabs> = (args) => <Tabs {...args} />;

export const Default = Template.bind({});
Default.args = {
  tabs: [
    {
      label: 'Tab 1',
      value: 'tab1',
      content: <p>Tab 1 content</p>,
    },
    {
      label: 'Tab 2',
      value: 'tab2',
      content: <p>Tab 2 content</p>,
    },
  ],
};
