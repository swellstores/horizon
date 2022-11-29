import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import BannerInfo, { BANNER_INFO_STYLE } from './BannerInfo';
import { TEXT_ALIGNMENT } from 'types/shared/alignment';

export default {
  title: 'atoms/BannerInfo',
  component: BannerInfo,
  argTypes: {
    children: { control: 'text', name: 'label' },
    bannerStyle: {
      control: 'select',
      options: Object.values(BANNER_INFO_STYLE),
    },
    textAlignment: {
      control: 'select',
      options: Object.values(TEXT_ALIGNMENT),
    },
  },
} as ComponentMeta<typeof BannerInfo>;

const Template: ComponentStory<typeof BannerInfo> = (args) => (
  <BannerInfo {...args} />
);

export const Default = Template.bind({});
Default.args = {
  children: 'BannerInfo',
};

export const Info = Template.bind({});
Info.args = {
  children: 'BannerInfo',
  bannerStyle: BANNER_INFO_STYLE.INFO,
};

export const Error = Template.bind({});
Error.args = {
  children: 'BannerInfo',
  bannerStyle: BANNER_INFO_STYLE.ERROR,
};

export const Success = Template.bind({});
Success.args = {
  children: 'BannerInfo',
  bannerStyle: BANNER_INFO_STYLE.SUCCESS,
};

export const Warning = Template.bind({});
Warning.args = {
  children: 'BannerInfo',
  bannerStyle: BANNER_INFO_STYLE.WARNING,
};

export const Center = Template.bind({});
Center.args = {
  children: 'BannerInfo',
  textAlignment: TEXT_ALIGNMENT.CENTER,
};

export const Right = Template.bind({});
Right.args = {
  children: 'BannerInfo',
  textAlignment: TEXT_ALIGNMENT.RIGHT,
};

export const Left = Template.bind({});
Left.args = {
  children: 'BannerInfo',
  textAlignment: TEXT_ALIGNMENT.LEFT,
};

export const Justify = Template.bind({});
Left.args = {
  children: 'BannerInfo',
  textAlignment: TEXT_ALIGNMENT.JUSTIFY,
};
