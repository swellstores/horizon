import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import AnnouncementBar from './AnnouncementBar';

export default {
  title: 'Atoms/AnnouncementBar',
  component: AnnouncementBar,
  argTypes: {
    content: { control: 'text' },
  },
} as ComponentMeta<typeof AnnouncementBar>;

const Template: ComponentStory<typeof AnnouncementBar> = (args) => (
  <AnnouncementBar {...args} />
);

export const Default = Template.bind({});
Default.args = {
  content:
    '<i>End of winter sale! Get 30% off with every purchase you make with the code BYEWINTER.</i>',
};
