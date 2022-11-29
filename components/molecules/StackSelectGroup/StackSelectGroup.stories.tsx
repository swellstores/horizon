import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import StackSelectGroup from './StackSelectGroup';

export default {
  title: 'Molecules/StackSelectGroup',
  component: StackSelectGroup,
  argTypes: {
    options: { control: 'array' },
  },
  decorators: [
    (Story) => (
      <div className="lg:m-16">
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof StackSelectGroup>;

const Template: ComponentStory<typeof StackSelectGroup> = (args) => (
  <StackSelectGroup {...args} />
);

export const SingleStackSelectGroup = Template.bind({});

SingleStackSelectGroup.args = {
  options: [
    { label: 'Face', id: '1' },
    { label: 'Body', id: '2' },
    { label: 'Gut', id: '3' },
  ],
};

export const MultipleStackSelectGroup = Template.bind({});

MultipleStackSelectGroup.args = {
  options: [
    { label: 'Face', id: '1' },
    { label: 'Body', id: '2' },
    { label: 'Gut', id: '3' },
  ],
};
