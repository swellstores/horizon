import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import SearchMenu from './SearchMenu';

export default {
  title: 'molecules/SearchMenu',
  component: SearchMenu,
  argTypes: {},
} as ComponentMeta<typeof SearchMenu>;

const Template: ComponentStory<typeof SearchMenu> = () => (
  <SearchMenu
    closeMenu={() => {
      console.log('hello');
    }}
    show={true}
    openDelay={undefined}
  />
);

export const Default = Template.bind({});
Default.args = {};
