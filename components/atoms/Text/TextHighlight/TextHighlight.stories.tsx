import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import TextHighlight from './TextHighlight';

export default {
  title: 'Atoms/TextHighlight',
  component: 'TextHighlight',
  argTypes: {
    content: { control: 'string' },
    size: { control: 'number' },
    rootEl: { control: 'string' },
  } as ComponentMeta<typeof TextHighlight>,
};

const Template: ComponentStory<typeof TextHighlight> = (args) => (
  <TextHighlight {...args} />
);

export const Default = Template.bind({});
Default.args = {
  content: 'This is a <i>Highlight</i> with <b>Size 1</b>',
  size: 1,
  rootEl: 'h1',
};

export const Size2 = Template.bind({});
Size2.args = {
  content: 'This is a <i>Highlight</i> with <b>Size 2</b>',
  size: 2,
  rootEl: 'h2',
};

export const Size3 = Template.bind({});
Size3.args = {
  content: 'This is a <i>Highlight</i> with <b>Size 3</b>',
  size: 3,
  rootEl: 'h3',
};

export const Size4 = Template.bind({});
Size4.args = {
  content: 'This is a <i>Highlight</i> with <b>Size 4</b>',
  size: 4,
  rootEl: 'h4',
};

export const Size5 = Template.bind({});
Size5.args = {
  content: 'This is a <i>Highlight</i> with <b>Size 5</b>',
  size: 5,
  rootEl: 'h5',
};

export const Size6 = Template.bind({});
Size6.args = {
  content: 'This is a <i>Highlight</i> with <b>Size 6</b>',
  size: 6,
  rootEl: 'h6',
};

export const Size7 = Template.bind({});
Size7.args = {
  content: 'This is a <i>Highlight</i> with <b>Size 7</b>',
  size: 7,
  rootEl: 'h6',
};
