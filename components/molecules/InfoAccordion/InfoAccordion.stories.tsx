import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import InfoAccordion from './InfoAccordion';

export default {
  title: 'molecules/InfoAccordion',
  component: InfoAccordion,
  argTypes: {
    label: { control: { type: 'text' } },
    content: { control: { type: 'text' } },
    className: { control: 'text', table: { disable: true } },
    accordionStyle: {
      control: 'select',
      options: ['default', 'secondary'],
    },
  },
} as ComponentMeta<typeof InfoAccordion>;

const Template: ComponentStory<typeof InfoAccordion> = (args) => (
  <InfoAccordion {...args} />
);

export const Default = Template.bind({});
Default.args = {
  label: 'How to use',
  content: `<b>Step 1:</b> Gently massage in circular motion two pumps into wet skin for a minute—this allows ingredients to fully activate on skin and enter the pores.
  <br /><br />
  <b>Step 2</b>: Rinse with damp water and pat dry (be careful not to rub to avoid damage on your skin).`,
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: 'How to use',
  content: `<b>Step 1:</b> Gently massage in circular motion two pumps into wet skin for a minute—this allows ingredients to fully activate on skin and enter the pores.
  <br /><br />
  <b>Step 2</b>: Rinse with damp water and pat dry (be careful not to rub to avoid damage on your skin).`,
  accordionStyle: 'secondary',
};
