import React from 'react';
import ProductPreviewCard from './ProductPreviewCard';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'Atoms/ProductPreviewCard',
  component: ProductPreviewCard,
  argTypes: {
    product: { control: 'object' },
    loading: { control: 'boolean' },
  },
} as ComponentMeta<typeof ProductPreviewCard>;

const Template: ComponentStory<typeof ProductPreviewCard> = (args) => (
  <ProductPreviewCard {...args} />
);

export const Default = Template.bind({});
Default.args = {
  product: {
    id: '1',
    image: {
      src: '/images/product-preview-card-1.webp',
      alt: 'Vitamin D',
      width: 268,
      height: 387,
    },
    title: 'Vitamin D',
    description: 'Supplement for a healthy life.',
    price: 28,
    href: 'vitamin-d',
    productOptions: [],
    productVariants: [],
    purchaseOptions: {
      standard: {
        price: 28,
        sale: false,
        salePrice: null,
      },
      subscription: {
        active: null,
      },
    },
    hasQuickAdd: false,
  },
};

export const NoPrice = Template.bind({});
NoPrice.args = {
  product: {
    id: '2',
    image: {
      src: '/images/product-preview-card-2.webp',
      alt: 'Moisturizer SPF 15',
      width: 268,
      height: 387,
    },
    title: 'Moisturizer SPF 15',
    description: 'Daily boost of hydration.',
    href: 'spf-15',
    productOptions: [
      {
        id: '623ac0f1a8b2ba242cc95abe',
        attributeId: 'size',
        name: 'Size',
        inputType: 'select',
        active: true,
        required: true,
        values: [
          {
            id: '623ac0fca8b2ba242cc95abf',
            name: '30 ml / 1.0 fl. oz.',
          },
        ],
      },
    ],
    productVariants: [
      {
        name: '30 ml / 1.0 fl. oz.',
        price: 28,
        prices: null,
        images: null,
        optionValueIds: ['623ac0fca8b2ba242cc95abf'],
        purchaseOptions: null,
        stockLevel: null,
        currency: 'USD',
      },
    ],
    purchaseOptions: {
      standard: {
        price: 28,
        sale: false,
        salePrice: null,
      },
      subscription: {
        active: null,
      },
    },
    hasQuickAdd: false,
  },
};

export const QuickAdd = Template.bind({});
QuickAdd.args = {
  product: {
    id: '2',
    image: {
      src: '/images/product-preview-card-2.webp',
      alt: 'Moisturizer SPF 15',
      width: 268,
      height: 387,
    },
    title: 'Moisturizer SPF 15',
    description: 'Daily boost of hydration.',
    href: 'spf-15',
    productOptions: [
      {
        id: '623ac0f1a8b2ba242cc95abe',
        attributeId: 'size',
        name: 'Size',
        inputType: 'select',
        active: true,
        required: true,
        values: [
          {
            id: '623ac0fca8b2ba242cc95abf',
            name: '30 ml / 1.0 fl. oz.',
          },
        ],
      },
    ],
    productVariants: [
      {
        name: '30 ml / 1.0 fl. oz.',
        price: 28,
        prices: null,
        images: null,
        optionValueIds: ['623ac0fca8b2ba242cc95abf'],
        purchaseOptions: null,
        stockLevel: null,
        currency: 'USD',
      },
    ],
    purchaseOptions: {
      standard: {
        price: 28,
        sale: false,
        salePrice: null,
      },
    },
    hasQuickAdd: true,
  },
};

export const Skeleton = Template.bind({});
Skeleton.args = {
  loading: true,
  product: {
    id: '2',
    image: {
      src: '/images/product-preview-card-2.webp',
      alt: 'Moisturizer SPF 15',
      width: 268,
      height: 387,
    },
    title: 'Moisturizer SPF 15',
    description: 'Daily boost of hydration.',
    href: 'spf-15',
    productOptions: [
      {
        id: '623ac0f1a8b2ba242cc95abe',
        attributeId: 'size',
        name: 'Size',
        inputType: 'select',
        active: true,
        required: true,
        values: [
          {
            id: '623ac0fca8b2ba242cc95abf',
            name: '30 ml / 1.0 fl. oz.',
          },
        ],
      },
    ],
    productVariants: [
      {
        name: '30 ml / 1.0 fl. oz.',
        price: 28,
        prices: null,
        images: null,
        optionValueIds: ['623ac0fca8b2ba242cc95abf'],
        purchaseOptions: null,
        stockLevel: null,
        currency: 'USD',
      },
    ],
    purchaseOptions: {
      standard: {
        price: 28,
        sale: false,
        salePrice: null,
      },
    },
    hasQuickAdd: true,
  },
};
