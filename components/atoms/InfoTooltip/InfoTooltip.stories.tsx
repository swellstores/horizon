import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import InfoTooltip from './InfoTooltip';

export default {
  title: 'atoms/InfoTooltip',
  component: InfoTooltip,
} as ComponentMeta<typeof InfoTooltip>;

const Template: ComponentStory<typeof InfoTooltip> = (args) => (
  <InfoTooltip {...args} />
);

export const Default = Template.bind({});
Default.args = {
  text: 'Something that can be used for multiple things and to help users.',
};
