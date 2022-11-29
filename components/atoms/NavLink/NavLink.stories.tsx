import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import NavLink from './NavLink';

export default {
  title: 'Atoms/NavLink',
  component: NavLink,
  argTypes: {
    label: { control: 'text' },
    link: { control: 'text' },
  },
} as ComponentMeta<typeof NavLink>;

const Template: ComponentStory<typeof NavLink> = (args) => (
  <NavLink {...args} />
);

export const Default = Template.bind({});
Default.args = {
  label: 'shop',
  link: '/products',
};
