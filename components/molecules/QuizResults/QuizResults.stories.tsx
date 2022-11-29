import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import QuizResults from './QuizResults';

export default {
  title: 'Molecules/QuizResults',
  component: QuizResults,
  argTypes: {
    resultsGroups: { control: 'array' },
  },
} as ComponentMeta<typeof QuizResults>;

const Template: ComponentStory<typeof QuizResults> = (args) => (
  <QuizResults {...args} />
);

export const Default = Template.bind({});

Default.args = {
  resultsGroups: [
    {
      title: 'Your products',
      products: [
        {
          image: {
            src: '/images/foaming-cleanser-thumbnail.jpg',
            alt: 'Foaming cleanser flacon',
            width: 200,
            height: 200,
          },
          title: 'Foaming cleanser',
          description:
            'Use our foaming cleanser to clean away all the pollution and makeup from the day.',
          purchaseOptions: {
            standard: {
              price: 32,
              sale: false,
              salePrice: null,
            },
            subscription: {
              plans: [
                {
                  id: '623adce7e75dd3013d4b3215',
                  name: 'Monthly',
                  price: 28,
                  billingSchedule: {
                    interval: 'monthly',
                    intervalCount: 1,
                  },
                },
                {
                  id: '624777425dc3440132421f30',
                  name: 'Daily',
                  price: 15.5,
                  billingSchedule: {
                    interval: 'daily',
                    intervalCount: 1,
                  },
                },
              ],
            },
          },
          href: '',
          hrefCta: 'See product details',
          addLabel: 'Add to bag',
          addedLabel: 'Added',
          subscriptionOnlyText: 'This is a subscription product',
          productId: '123455678',
          productOptions: [
            {
              id: '623ad76e6724f9528a9c5b00',
              attributeId: 'size',
              name: 'Size',
              inputType: 'select',
              active: true,
              required: true,
              values: [
                {
                  id: '623adce66724f9528a9c5b04',
                  name: '120ml',
                },
                {
                  id: '624c47ecd38e68cff130abe8',
                  name: '360ml',
                },
              ],
            },
            {
              id: '624cb3c5fc6e8fa8467bfe05',
              attributeId: 'type',
              name: 'Type',
              inputType: 'select',
              active: true,
              required: true,
              values: [
                {
                  id: '624cb413d18b4c5e76b30649',
                  name: 'Hydrating',
                },
                {
                  id: '624cb413d18b4c5e76b3064a',
                  name: 'Sensitive',
                },
                {
                  id: '624cb413d18b4c5e76b3064b',
                  name: 'SPF',
                },
              ],
            },
          ],
          productVariants: [
            {
              name: '360ml',
              price: 33,
              prices: null,
              images: null,
              optionValueIds: [
                '624c47ecd38e68cff130abe8',
                '624cb413d18b4c5e76b3064b',
              ],
              purchaseOptions: null,
              stockLevel: null,
              currency: 'USD',
            },
            {
              name: '360ml',
              price: 32,
              prices: null,
              images: null,
              optionValueIds: [
                '624c47ecd38e68cff130abe8',
                '624cb413d18b4c5e76b3064a',
              ],
              purchaseOptions: null,
              stockLevel: null,
              currency: 'USD',
            },
            {
              name: '360ml, Hydrating',
              price: 32,
              prices: null,
              images: null,
              optionValueIds: [
                '624c47ecd38e68cff130abe8',
                '624cb413d18b4c5e76b30649',
              ],
              purchaseOptions: {
                standard: {
                  price: 32,
                  sale: false,
                  salePrice: null,
                  prices: null,
                },
              },
              stockLevel: null,
              currency: 'USD',
            },
            {
              name: '120ml, SPF',
              price: 27,
              prices: null,
              images: null,
              optionValueIds: [
                '623adce66724f9528a9c5b04',
                '624cb413d18b4c5e76b3064b',
              ],
              purchaseOptions: {
                standard: {
                  price: 27,
                  sale: true,
                  salePrice: 27,
                  prices: null,
                },
              },
              stockLevel: null,
              currency: 'USD',
            },
            {
              name: '120ml, Sensitive',
              price: 27,
              prices: null,
              images: null,
              optionValueIds: [
                '623adce66724f9528a9c5b04',
                '624cb413d18b4c5e76b3064a',
              ],
              purchaseOptions: null,
              stockLevel: null,
              currency: 'USD',
            },
            {
              name: '120ml, Hydrating',
              price: 28,
              prices: null,
              images: null,
              optionValueIds: [
                '623adce66724f9528a9c5b04',
                '624cb413d18b4c5e76b30649',
              ],
              purchaseOptions: {
                standard: {
                  price: 28,
                  sale: false,
                  salePrice: null,
                  prices: null,
                },
              },
              stockLevel: null,
              currency: 'USD',
            },
          ],
        },
        {
          image: {
            src: '/images/daily-moisturizer-thumbnail.jpg',
            alt: 'Moisturizer flacon',
            width: 200,
            height: 200,
          },
          title: 'Daily moisturizer SPF15',
          description:
            'Locks the moisture in while working as a barrier to the outside pollution and sun damage.',
          purchaseOptions: {
            standard: null,
            subscription: {
              plans: [
                {
                  id: '623adce7e75dd3013d4b3215',
                  name: 'Monthly',
                  price: 24,
                  billingSchedule: {
                    interval: 'monthly',
                    intervalCount: 1,
                  },
                },
              ],
            },
          },
          href: '',
          hrefCta: 'See product details',
          addLabel: 'Add to bag',
          addedLabel: 'Added',
          subscriptionOnlyText: 'This is a subscription product',
          productId: '123455678',
          productOptions: [
            {
              id: '623ad76e6724f9528a9c5b00',
              attributeId: 'size',
              name: 'Size',
              inputType: 'select',
              active: true,
              required: true,
              values: [
                {
                  id: '623adce66724f9528a9c5b04',
                  name: '120ml',
                },
                {
                  id: '624c47ecd38e68cff130abe8',
                  name: '360ml',
                },
              ],
            },
            {
              id: '624cb3c5fc6e8fa8467bfe05',
              attributeId: 'type',
              name: 'Type',
              inputType: 'select',
              active: true,
              required: true,
              values: [
                {
                  id: '624cb413d18b4c5e76b30649',
                  name: 'Hydrating',
                },
                {
                  id: '624cb413d18b4c5e76b3064a',
                  name: 'Sensitive',
                },
                {
                  id: '624cb413d18b4c5e76b3064b',
                  name: 'SPF',
                },
              ],
            },
          ],
          productVariants: [
            {
              name: '360ml',
              price: 33,
              prices: null,
              images: null,
              optionValueIds: [
                '624c47ecd38e68cff130abe8',
                '624cb413d18b4c5e76b3064b',
              ],
              purchaseOptions: null,
              stockLevel: null,
              currency: 'USD',
            },
            {
              name: '360ml',
              price: 32,
              prices: null,
              images: null,
              optionValueIds: [
                '624c47ecd38e68cff130abe8',
                '624cb413d18b4c5e76b3064a',
              ],
              purchaseOptions: null,
              stockLevel: null,
              currency: 'USD',
            },
            {
              name: '360ml, Hydrating',
              price: 32,
              prices: null,
              images: null,
              optionValueIds: [
                '624c47ecd38e68cff130abe8',
                '624cb413d18b4c5e76b30649',
              ],
              purchaseOptions: {
                standard: {
                  price: 32,
                  sale: false,
                  salePrice: null,
                  prices: null,
                },
              },
              stockLevel: null,
              currency: 'USD',
            },
            {
              name: '120ml, SPF',
              price: 27,
              prices: null,
              images: null,
              optionValueIds: [
                '623adce66724f9528a9c5b04',
                '624cb413d18b4c5e76b3064b',
              ],
              purchaseOptions: {
                standard: {
                  price: 27,
                  sale: true,
                  salePrice: 27,
                  prices: null,
                },
              },
              stockLevel: null,
              currency: 'USD',
            },
            {
              name: '120ml, Sensitive',
              price: 27,
              prices: null,
              images: null,
              optionValueIds: [
                '623adce66724f9528a9c5b04',
                '624cb413d18b4c5e76b3064a',
              ],
              purchaseOptions: null,
              stockLevel: null,
              currency: 'USD',
            },
            {
              name: '120ml, Hydrating',
              price: 28,
              prices: null,
              images: null,
              optionValueIds: [
                '623adce66724f9528a9c5b04',
                '624cb413d18b4c5e76b30649',
              ],
              purchaseOptions: {
                standard: {
                  price: 28,
                  sale: false,
                  salePrice: null,
                  prices: null,
                },
              },
              stockLevel: null,
              currency: 'USD',
            },
          ],
        },
        {
          image: {
            src: '/images/liposomal-serum-thumbnail.jpg',
            alt: 'Liposomal serum flacon',
            width: 200,
            height: 200,
          },
          title: 'Liposomal serum',
          description:
            'Use our foaming cleanser to clean away all the pollution and makeup from the day.',
          purchaseOptions: {
            standard: {
              price: 39,
              sale: false,
              salePrice: null,
            },
          },
          href: '',
          hrefCta: 'See product details',
          addLabel: 'Add to bag',
          addedLabel: 'Added',
          subscriptionOnlyText: 'This is a subscription product',
          productId: '123455678',
          productOptions: [
            {
              id: '623ad76e6724f9528a9c5b00',
              attributeId: 'size',
              name: 'Size',
              inputType: 'select',
              active: true,
              required: true,
              values: [
                {
                  id: '623adce66724f9528a9c5b04',
                  name: '120ml',
                },
                {
                  id: '624c47ecd38e68cff130abe8',
                  name: '360ml',
                },
              ],
            },
            {
              id: '624cb3c5fc6e8fa8467bfe05',
              attributeId: 'type',
              name: 'Type',
              inputType: 'select',
              active: true,
              required: true,
              values: [
                {
                  id: '624cb413d18b4c5e76b30649',
                  name: 'Hydrating',
                },
                {
                  id: '624cb413d18b4c5e76b3064a',
                  name: 'Sensitive',
                },
                {
                  id: '624cb413d18b4c5e76b3064b',
                  name: 'SPF',
                },
              ],
            },
          ],
          productVariants: [
            {
              name: '360ml',
              price: 33,
              prices: null,
              images: null,
              optionValueIds: [
                '624c47ecd38e68cff130abe8',
                '624cb413d18b4c5e76b3064b',
              ],
              purchaseOptions: null,
              stockLevel: null,
              currency: 'USD',
            },
            {
              name: '360ml',
              price: 32,
              prices: null,
              images: null,
              optionValueIds: [
                '624c47ecd38e68cff130abe8',
                '624cb413d18b4c5e76b3064a',
              ],
              purchaseOptions: null,
              stockLevel: null,
              currency: 'USD',
            },
            {
              name: '360ml, Hydrating',
              price: 32,
              prices: null,
              images: null,
              optionValueIds: [
                '624c47ecd38e68cff130abe8',
                '624cb413d18b4c5e76b30649',
              ],
              purchaseOptions: {
                standard: {
                  price: 32,
                  sale: false,
                  salePrice: null,
                  prices: null,
                },
              },
              stockLevel: null,
              currency: 'USD',
            },
            {
              name: '120ml, SPF',
              price: 27,
              prices: null,
              images: null,
              optionValueIds: [
                '623adce66724f9528a9c5b04',
                '624cb413d18b4c5e76b3064b',
              ],
              purchaseOptions: {
                standard: {
                  price: 27,
                  sale: true,
                  salePrice: 27,
                  prices: null,
                },
              },
              stockLevel: null,
              currency: 'USD',
            },
            {
              name: '120ml, Sensitive',
              price: 27,
              prices: null,
              images: null,
              optionValueIds: [
                '623adce66724f9528a9c5b04',
                '624cb413d18b4c5e76b3064a',
              ],
              purchaseOptions: null,
              stockLevel: null,
              currency: 'USD',
            },
            {
              name: '120ml, Hydrating',
              price: 28,
              prices: null,
              images: null,
              optionValueIds: [
                '623adce66724f9528a9c5b04',
                '624cb413d18b4c5e76b30649',
              ],
              purchaseOptions: {
                standard: {
                  price: 28,
                  sale: false,
                  salePrice: null,
                  prices: null,
                },
              },
              stockLevel: null,
              currency: 'USD',
            },
          ],
        },
      ],
    },
  ],
};
