import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import AccountDetails from './AccountDetails';

export default {
  title: 'atoms/AccountDetails',
  component: AccountDetails,
  argTypes: {
    name: { control: { type: 'text' } },
    email: { control: { type: 'text' } },
  },
} as ComponentMeta<typeof AccountDetails>;

const Template: ComponentStory<typeof AccountDetails> = (args) => (
  <AccountDetails {...args} />
);

export const Default = Template.bind({});
Default.args = {
  name: 'Dohn Joe',
  email: 'dohnjoe@dj.com',
};
