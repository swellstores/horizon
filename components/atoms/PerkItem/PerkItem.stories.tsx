import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import PerkItem from './PerkItem';

export default {
  title: 'Atoms/PerkItem',
  component: PerkItem,
  argTypes: {
    text: { control: 'text' },
  },
  decorators: [
    (Story) => (
      <div className="p-6">
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof PerkItem>;

const Template: ComponentStory<typeof PerkItem> = (args) => (
  <PerkItem {...args} />
);

export const Default = Template.bind({});

Default.args = {
  text: 'Trial for 30 days',
};
