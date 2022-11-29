import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import TextImageBlock, { DESKTOP_ALIGNMENT } from './TextImageBlock';
import { SPACING } from 'lib/globals/sizings';

export default {
  title: 'Molecules/TextImageBlock',
  component: TextImageBlock,
  argTypes: {
    image: { control: 'object' },
    text: { control: 'text' },
    desktopAllignment: {
      control: 'select',
      options: Object.values(DESKTOP_ALIGNMENT),
    },
  },
  decorators: [
    (Story) => (
      <div className="px-6">
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof TextImageBlock>;

const Template: ComponentStory<typeof TextImageBlock> = (args) => (
  <TextImageBlock {...args} />
);

export const ImageLeft = Template.bind({});
ImageLeft.args = {
  horizontal_spacing: SPACING.NONE,
  image: {
    alt: 'Woman back',
    src: '/images/woman-back.jpg',
    height: 557,
    width: 460,
  },
  text: '“Now I shave occasionally,” she says, “if I feel like it”—a laissez-faire attitude that is resonating with young stars such as Paris Jackson, Amandla Stenberg, and Lourdes Leon.',
  desktopAllignment: DESKTOP_ALIGNMENT.IMAGE_LEFT,
};

export const ImageRight = Template.bind({});
ImageRight.args = {
  horizontal_spacing: SPACING.NONE,
  image: {
    alt: 'Woman back',
    src: '/images/woman-back.jpg',
    height: 557,
    width: 460,
  },
  text: '“By 1964,” Herzig writes in Plucked: A History of Hair Removal, “surveys indicated that 98 percent of all American women aged fifteen to forty-four were routinely shaving their legs.”',
  desktopAllignment: DESKTOP_ALIGNMENT.IMAGE_RIGHT,
};
