import React from 'react';
import {
  HORIZONTAL_ALIGNMENT,
  OBJECT_FIT,
  VERTICAL_ALIGNMENT,
} from 'types/shared/alignment';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import Panel, { PANEL_TYPE } from './Panel';
import { SPACING } from 'lib/globals/sizings';

export default {
  title: 'Atoms/Panel',
  component: Panel,
  argTypes: {
    image: { control: 'object' },
    title: { control: 'text' },
    description: { control: 'text' },
    verticalAlignment: {
      options: Object.values(VERTICAL_ALIGNMENT),
      control: { type: 'inline-radio' },
    },
    horizontalAlignment: {
      options: Object.values(HORIZONTAL_ALIGNMENT),
      control: { type: 'inline-radio' },
    },
    horizontal_background_alignment: {
      options: Object.values(HORIZONTAL_ALIGNMENT),
      control: { type: 'inline-radio' },
    },
    vertical_background_alignment: {
      options: Object.values(VERTICAL_ALIGNMENT),
      control: { type: 'inline-radio' },
    },
    horizontal_spacing: {
      options: Object.values(SPACING),
      control: { type: 'inline-radio' },
    },
    image_scaling: {
      options: Object.values(OBJECT_FIT),
    },
    links: { control: 'array' },
  },
} as ComponentMeta<typeof Panel>;

const Template: ComponentStory<typeof Panel> = (args) => <Panel {...args} />;

export const Image = Template.bind({});
Image.args = {
  image: {
    src: '/images/multiple-panels.png',
    alt: 'Young man wearing a blue shirt, with his face in focus.',
    width: 572,
    height: 714,
  },
  type: PANEL_TYPE.IMAGE,
};

export const TextPanel = Template.bind({});
TextPanel.args = {
  title: '<b>Caring for you</b>',
  description:
    "<p>Different bodies, different needs. That's why every subscription is catered to your needs. Because we all need someone to care for us.</p>",
  type: PANEL_TYPE.TEXT,
};

export const TextPanelWithLink = Template.bind({});
TextPanelWithLink.args = {
  title: '<b>Caring for you</b>',
  description:
    "<p>Different bodies, different needs. That's why every subscription is catered to your needs. Because we all need someone to care for us.</p>",
  type: PANEL_TYPE.TEXT,
  links: [
    {
      id: '1',
      label: 'Click here',
      link: '#',
    },
  ],
};
