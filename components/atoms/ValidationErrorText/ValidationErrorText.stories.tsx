import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import ValidationErrorText from './ValidationErrorText';

export default {
  title: 'Atoms/ValidationErrorText',
  component: ValidationErrorText,
  argTypes: {
    children: { control: 'text', name: 'Text' },
  },
} as ComponentMeta<typeof ValidationErrorText>;

const Template: ComponentStory<typeof ValidationErrorText> = (args) => (
  <ValidationErrorText {...args} />
);

export const Default = Template.bind({});
Default.args = {
  children: 'Something went wrong!',
};
