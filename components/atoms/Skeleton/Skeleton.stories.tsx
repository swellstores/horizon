import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import Skeleton from './Skeleton';

export default {
  title: 'atoms/Skeleton',
  component: Skeleton,
  argTypes: {
    label: { control: { type: 'text' } },
  },
} as ComponentMeta<typeof Skeleton>;

const Template: ComponentStory<typeof Skeleton> = (args) => (
  <Skeleton {...args} />
);

export const Default = Template.bind({});
