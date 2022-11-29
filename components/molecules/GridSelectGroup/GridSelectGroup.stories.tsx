import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import GridSelectGroup from './GridSelectGroup';

export default {
  title: 'Molecules/GridSelectGroup',
  component: GridSelectGroup,
  argTypes: {
    options: { control: 'array' },
    columns: { control: { type: 'number', min: 2, max: 4, step: 1 } },
  },
  decorators: [
    (Story) => (
      <div className="lg:m-16">
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof GridSelectGroup>;

const Template: ComponentStory<typeof GridSelectGroup> = (args) => (
  <GridSelectGroup {...args} />
);

export const SingleGridSelectGroup = Template.bind({});

SingleGridSelectGroup.args = {
  options: [
    { label: '< 20', id: '1' },
    { label: '20-30', id: '2' },
    { label: '30-40', id: '3' },
    { label: '40-50', id: '4' },
    { label: '50-60', id: '5' },
    { label: '60 >', id: '6' },
  ],
  columns: 3,
};

export const MultipleGridSelectGroup = Template.bind({});

MultipleGridSelectGroup.args = {
  options: [
    { label: '< 20', id: '1' },
    { label: '20-30', id: '2' },
    { label: '30-40', id: '3' },
    { label: '40-50', id: '4' },
    { label: '50-60', id: '5' },
    { label: '60 >', id: '6' },
  ],
  columns: 3,
};
