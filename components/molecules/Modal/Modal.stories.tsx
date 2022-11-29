import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import Modal from './Modal';

export default {
  title: 'molecules/Modal',
  component: Modal,
  argTypes: {
    title: { control: 'text' },
    body: { control: 'text' },
    open: { control: 'boolean' },
  },
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args) => <Modal {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: 'Returning an item',
  body: 'To initiate a partial or complete return of an order, please contact us at <a href="mailto:returns@horizon.com">returns@horizon.com</a> so we can start the return process. Don’t forget to include the order number and the reason for returning.',
  open: true,
  onClose: () => console.log('close'),
};
