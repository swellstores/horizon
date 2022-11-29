import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import TextBody from './TextBody';

export default {
  title: 'Atoms/TextBody',
  component: 'TextBody',
  argTypes: {
    content: { control: 'string' },
    size: { control: 'number' },
    rootEl: { control: 'string' },
  } as ComponentMeta<typeof TextBody>,
};

const Template: ComponentStory<typeof TextBody> = (args) => (
  <TextBody {...args} />
);

export const Default = Template.bind({});
Default.args = {
  content:
    'This is a <b>body</b> text, it should be longer and it will <i>probably</i> accompany a <b>headline</b> or <b>highlight</b>.',
  size: 1,
  rootEl: 'p',
};

export const Size2 = Template.bind({});
Size2.args = {
  content:
    'This is a <b>body</b> text, it should be longer and it will <i>probably</i> accompany a <b>headline</b> or <b>highlight</b>.',
  size: 2,
  rootEl: 'p',
};

export const Size3 = Template.bind({});
Size3.args = {
  content:
    'This is a <b>body</b> text, it should be longer and it will <i>probably</i> accompany a <b>headline</b> or <b>highlight</b>.',
  size: 3,
  rootEl: 'p',
};

export const Size4 = Template.bind({});
Size4.args = {
  content:
    '<p>This is a <b>body</b> text, it should be longer and it will <i>probably</i> accompany a <b>headline</b> or <b>highlight</b>.</p><p>This is a <b>body</b> text, it should be longer and it will <i>probably</i> accompany a <b>headline</b> or <b>highlight</b>.</p>',
  size: 4,
  rootEl: 'div',
};

export const Size5 = Template.bind({});
Size5.args = {
  content:
    '<p>This is a <b>body</b> text, it should be longer and it will <i>probably</i> accompany a <b>headline</b> or <b>highlight</b>.</p><p>This is a <b>body</b> text, it should be longer and it will <i>probably</i> accompany a <b>headline</b> or <b>highlight</b>.</p>',
  size: 5,
  rootEl: 'div',
};
