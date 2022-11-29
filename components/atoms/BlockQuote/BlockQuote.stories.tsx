import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import BlockQuote from './BlockQuote';

export default {
  title: 'atoms/BlockQuote',
  component: BlockQuote,
} as ComponentMeta<typeof BlockQuote>;

const Template: ComponentStory<typeof BlockQuote> = (args) => (
  <BlockQuote {...args} />
);

export const Default = Template.bind({});
Default.args = {
  quote:
    'Let’s take a moment to thank 90s & 00s, and reinnascense art for unrealistic, pre-pubescent body ideals. ',
};
