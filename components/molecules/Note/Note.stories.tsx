import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import Note from './Note';

export default {
  title: 'Molecules/Note',
  component: Note,
  argTypes: {
    text: { control: 'text' },
  },
} as ComponentMeta<typeof Note>;

const Template: ComponentStory<typeof Note> = (args) => <Note {...args} />;

export const Default = Template.bind({});
Default.args = {
  text: 'Our bodies change over time. This helps us assess your needs better.',
};
