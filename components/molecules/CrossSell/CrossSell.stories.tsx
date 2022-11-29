import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import CrossSell from './CrossSell';

export default {
  title: 'molecules/CrossSell',
  component: CrossSell,
  argTypes: {
    item: { control: { type: 'object' } },
    tag: { control: { type: 'text' } },
    onClick: { table: { disable: true } },
    buttonText: { control: { type: 'object' } },
  },
} as ComponentMeta<typeof CrossSell>;

const Template: ComponentStory<typeof CrossSell> = (args) => (
  <CrossSell {...args} />
);

export const Default = Template.bind({});
Default.args = {
  buttonText: { desktop: 'Add to bag', mobile: 'Add' },
  item: {
    id: 'ultimate-skin-pack',
    title: 'Ultimate Skin Pack',
    price: 50,
    originalPrice: 62,
    image: {
      src: '/images/upsell.jpg',
      alt: 'Ultimate Skin Pack',
      width: 824,
      height: 824,
    },
    href: 'ultimate-skin-pack',
  },
};

export const NoDiscount = Template.bind({});
NoDiscount.args = {
  buttonText: { desktop: 'Add to bag', mobile: 'Add' },
  item: {
    id: 'ultimate-skin-pack',
    title: 'Ultimate Skin Pack',
    price: 50,
    image: {
      src: '/images/upsell.jpg',
      alt: 'Ultimate Skin Pack',
      width: 824,
      height: 824,
    },
    href: 'ultimate-skin-pack',
  },
};
