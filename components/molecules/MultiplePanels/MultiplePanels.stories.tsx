import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import MultiplePanels from 'components/molecules/MultiplePanels';
import { PANEL_TYPE } from 'components/atoms/Panel/Panel';
import { SPACING } from 'lib/globals/sizings';

export default {
  title: 'Molecules/MultiplePanels',
  component: MultiplePanels,
  argTypes: {
    panels: {
      control: 'array',
    },
  },
} as ComponentMeta<typeof MultiplePanels>;

const Template: ComponentStory<typeof MultiplePanels> = (args) => (
  <MultiplePanels {...args} />
);

export const Default = Template.bind({});
Default.args = {
  horizontal_spacing: SPACING.NONE,
  panels: [
    {
      id: '1',
      image: {
        src: '/images/multiple-panels.png',
        alt: 'Young man wearing a blue shirt, with his face in focus.',
        width: 572,
        height: 714,
      },
      type: PANEL_TYPE.IMAGE,
    },
    {
      id: '2',
      title: '<b>Caring for you</b>',
      description:
        '<p>Different bodies, different needs. That’s why every subscription is catered to your needs. Because we all need someone to care for us.</p>',
      type: PANEL_TYPE.TEXT,
    },
  ],
};

export const Reversed = Template.bind({});
Reversed.args = {
  horizontal_spacing: SPACING.NONE,
  panels: [
    {
      id: '2',
      title: '<b>Caring for you</b>',
      description:
        '<p>Different bodies, different needs. That’s why every subscription is catered to your needs. Because we all need someone to care for us.</p>',
      type: PANEL_TYPE.TEXT,
    },
    {
      id: '1',
      image: {
        src: '/images/multiple-panels.png',
        alt: 'Young man wearing a blue shirt, with his face in focus.',
        width: 572,
        height: 714,
      },
      type: PANEL_TYPE.IMAGE,
    },
  ],
};
