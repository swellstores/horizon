import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import BottomSheet from './BottomSheet';

export default {
  title: 'Molecules/BottomSheet',
  component: BottomSheet,
  argTypes: {
    checkout: { control: 'object' },
  },
  decorators: [
    (Story) => (
      <div className="pt-6">
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof BottomSheet>;

const Template: ComponentStory<typeof BottomSheet> = (args) => (
  <BottomSheet {...args} />
);

export const Default = Template.bind({});

Default.args = {
  children: () => <div></div>,
};
