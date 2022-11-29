import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import ActionModal from './ActionModal';
import { BUTTON_STYLE } from 'types/shared/button';

export default {
  title: 'molecules/ActionModal',
  component: ActionModal,
  argTypes: {
    title: { control: 'text' },
  },
} as ComponentMeta<typeof ActionModal>;

const Template: ComponentStory<typeof ActionModal> = (args) => (
  <ActionModal {...args} />
);

export const Default = Template.bind({});
Default.args = {
  title: 'Cancel subscription',
  body: 'Cancelling your subscription is permanent. Are you sure you want to proceed?',
  open: true,
  onClose: () => console.log('close'),
  actionButtons: [
    {
      label: 'Cancel subscription',
      onClick: () => console.log('clicked'),
    },
    {
      label: 'Cancel',
      onClick: () => console.log('clicked'),
      style: BUTTON_STYLE.SECONDARY,
    },
  ],
};
