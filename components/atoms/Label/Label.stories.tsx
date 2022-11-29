import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import Label from './Label';

export default {
  title: 'Atoms/Label',
  component: Label,
  argTypes: {
    text: { control: 'text' },
  },
} as ComponentMeta<typeof Label>;

const Template: ComponentStory<typeof Label> = (args) => <Label {...args} />;

export const Default = Template.bind({});
Default.args = {
  text: 'First name',
};
