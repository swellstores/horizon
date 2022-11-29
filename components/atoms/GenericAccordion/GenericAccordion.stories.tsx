import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import GenericAccordion from './GenericAccordion';

export default {
  title: 'atoms/GenericAccordion',
  component: GenericAccordion,
  argTypes: {
    onChange: { table: { disable: true } },
  },
} as ComponentMeta<typeof GenericAccordion>;

const Template: ComponentStory<typeof GenericAccordion> = (args) => (
  <GenericAccordion {...args} />
);

export const Default = Template.bind({});

Default.args = {
  defaultOpen: false,
  name: 'Filter',
  children: (
    <ul>
      <li>Option</li>
      <li>Option</li>
      <li>Option</li>
      <li>Option</li>
      <li>Option</li>
    </ul>
  ),
};
