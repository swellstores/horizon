import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import TheSidebar from './Sidebar';

export default {
  title: 'organisms/Sidebar',
  component: TheSidebar,
  argTypes: {
    links: { control: { type: 'array' } },
  },
} as ComponentMeta<typeof TheSidebar>;

const Template: ComponentStory<typeof TheSidebar> = (args) => (
  <TheSidebar {...args} />
);

export const Default = Template.bind({});
Default.args = {
  links: [
    {
      label: 'Orders & Returns',
      link: '#',
    },
    {
      label: 'Subscriptions',
      link: '#',
    },
  ],
};
