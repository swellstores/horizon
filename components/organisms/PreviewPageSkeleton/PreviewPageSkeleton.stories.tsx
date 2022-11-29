import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';
import PreviewPageSkeleton from './PreviewPageSkeleton';

export default {
  title: 'Organisms/PreviewPageSkeleton',
  component: PreviewPageSkeleton,
  argTypes: {},
} as ComponentMeta<typeof PreviewPageSkeleton>;

const Template: ComponentStory<typeof PreviewPageSkeleton> = () => (
  <PreviewPageSkeleton />
);

export const Default = Template.bind({});
