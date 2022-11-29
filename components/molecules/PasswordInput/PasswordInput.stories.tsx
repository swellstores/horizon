import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import PasswordInput from './PasswordInput';

export default {
  title: 'molecules/PasswordInput',
  component: PasswordInput,
} as ComponentMeta<typeof PasswordInput>;

const Template: ComponentStory<typeof PasswordInput> = (args) => (
  <PasswordInput {...args} />
);

export const Default = Template.bind({});
Default.args = {};
