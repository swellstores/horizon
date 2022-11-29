import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';
import Breadcrumb from './Breadcrumb';

export default {
  title: 'Atoms/Breadcrumb',
  component: Breadcrumb,
  argTypes: {
    customText: { control: 'text' },
    className: { table: { disabled: true } },
  },
} as ComponentMeta<typeof Breadcrumb>;

const Template: ComponentStory<typeof Breadcrumb> = (args) => (
  <Breadcrumb {...args} />
);

export const Default = Template.bind({});
Default.args = {
  customText: 'Shop / All products',
};
