import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import ListSection from './ListSection';

export default {
  title: 'molecules/ListSection',
  component: ListSection,
} as ComponentMeta<typeof ListSection>;

const Template: ComponentStory<typeof ListSection> = (args) => (
  <ListSection {...args} />
);

export const Default = Template.bind({});
Default.args = {
  title: '<b>List Section</b>',
  items: [
    {
      id: '1',
      content: 'Item 1',
    },
    {
      id: '2',
      content: 'Item 2',
    },
    {
      id: '3',
      content: 'Item 3',
    },
    {
      id: '4',
      content: 'Item 4',
    },
  ],
};
