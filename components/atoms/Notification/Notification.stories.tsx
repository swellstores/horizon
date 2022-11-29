import React from 'react';
import { Provider, Viewport } from '@radix-ui/react-toast';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import Notification from './Notification';
import { NOTIFICATION_TYPE } from 'types/shared/notification';

export default {
  title: 'atoms/Notification',
  component: Notification,
} as ComponentMeta<typeof Notification>;

const Template: ComponentStory<typeof Notification> = (args) => (
  <Provider>
    <Notification {...args} />
    <Viewport />
  </Provider>
);

export const Default = Template.bind({});
Default.args = {
  message: 'Default payment method updated.',
  type: NOTIFICATION_TYPE.INFO,
  timeout: 1000000,
};

export const Success = Template.bind({});
Success.args = {
  message: 'Default payment method updated.',
  type: NOTIFICATION_TYPE.SUCCESS,
  timeout: 1000000,
};

export const Warning = Template.bind({});
Warning.args = {
  message: 'Please review your information.',
  type: NOTIFICATION_TYPE.WARNING,
  timeout: 1000000,
};

export const Error = Template.bind({});
Error.args = {
  message: 'Something went wrong. Please try again.',
  type: NOTIFICATION_TYPE.ERROR,
  timeout: 1000000,
};
