import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import TextHeading from './TextHeading';

export default {
  title: 'Atoms/TextHeading',
  component: 'TextHeading',
  argTypes: {
    content: { control: 'string' },
    size: { control: 'number' },
    rootEl: { control: 'string' },
  } as ComponentMeta<typeof TextHeading>,
};

const Template: ComponentStory<typeof TextHeading> = (args) => (
  <TextHeading {...args} />
);

export const Default = Template.bind({});
Default.args = {
  content: 'This is a <i>Heading</i> with <b>Size 1</b>',
  size: 1,
  rootEl: 'h1',
};

export const Size2 = Template.bind({});
Size2.args = {
  content: 'This is a <i>Heading</i> with <b>Size 2</b>',
  size: 2,
  rootEl: 'h2',
};
