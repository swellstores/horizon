import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import TextSection from './TextSection';

export default {
  title: 'molecules/TextSection',
  component: TextSection,
  argTypes: {
    content: { control: { type: 'text' } },
  },
} as ComponentMeta<typeof TextSection>;

const Template: ComponentStory<typeof TextSection> = (args) => (
  <TextSection {...args} />
);

export const Default = Template.bind({});
Default.args = {
  content: 'TextSection',
};
