import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import LocaleSelect from './LocaleSelect';

export default {
  title: 'atoms/LocaleSelect',
  component: LocaleSelect,
  argTypes: {},
} as ComponentMeta<typeof LocaleSelect>;

const Template: ComponentStory<typeof LocaleSelect> = (args) => (
  <LocaleSelect {...args} />
);

export const Default = Template.bind({});
Default.args = {};
