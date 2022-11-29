import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import LevelSlider from './LevelSlider';

export default {
  title: 'Atoms/LevelSlider',
  component: LevelSlider,
  argTypes: {
    options: { control: 'array' },
    defaultOption: { control: 'object' },
    name: { control: 'text' },
  },
  decorators: [
    (Story) => (
      <div className="lg:m-16">
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof LevelSlider>;

const Template: ComponentStory<typeof LevelSlider> = (args) => (
  <LevelSlider {...args} />
);

export const Default = Template.bind({});

Default.args = {
  options: [
    {
      label: 'Low',
      id: 'low',
    },
    {
      label: 'Slight',
      id: 'slight',
    },
    {
      label: 'Mild',
      id: 'mild',
    },
    {
      label: 'High',
      id: 'high',
    },
    {
      label: 'Extreme',
      id: 'extreme',
    },
  ],
  name: 'Level',
  defaultOption: { label: 'Low', id: 'low' },
};

export const DefaultDuplicateLabel = Template.bind({});

DefaultDuplicateLabel.args = {
  options: [
    {
      label: 'Low',
      id: 'low',
    },
    {
      label: 'Slight',
      id: 'slight-duplicate',
    },
    {
      label: 'Slight',
      id: 'slight',
    },
    {
      label: 'High',
      id: 'high',
    },
    {
      label: 'Extreme',
      id: 'extreme',
    },
  ],
  name: 'Level',
  defaultOption: { label: 'Slight', id: 'slight' },
};

export const PreviouslySelected = Template.bind({});

PreviouslySelected.args = {
  options: [
    {
      label: 'Low',
      id: 'low',
    },
    {
      label: 'Slight',
      id: 'slight',
    },
    {
      label: 'Mild',
      id: 'mild',
    },
    {
      label: 'High',
      id: 'high',
    },
    {
      label: 'Extreme',
      id: 'extreme',
    },
  ],
  name: 'Level',
  defaultOption: { label: 'Low', id: 'low' },
  value: 'mild',
};

export const PreviouslySelectedDuplicateLabel = Template.bind({});

PreviouslySelectedDuplicateLabel.args = {
  options: [
    {
      label: 'Low',
      id: 'low',
    },
    {
      label: 'Slight',
      id: 'slight',
    },
    {
      label: 'Mild',
      id: 'mild-duplicate',
    },
    {
      label: 'Mild',
      id: 'mild',
    },
    {
      label: 'Extreme',
      id: 'extreme',
    },
  ],
  name: 'Level',
  defaultOption: { label: 'Low', id: 'low' },
  value: 'mild',
};
