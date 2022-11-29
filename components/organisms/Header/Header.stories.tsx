import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import Header from './Header';
import type { RootNavItem } from 'types/nav';

export default {
  title: 'Organisms/Header',
  component: Header,
  argTypes: {
    showAnnouncementBar: { control: 'boolean' },
    announcementText: { control: 'text' },
    storeName: { control: 'text' },
    menu: { control: 'array' },
    hideOnScroll: { control: 'boolean' },
  },
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args) => <Header {...args} />;

export const Default = Template.bind({});
Default.args = {
  storeName: 'Horizon',
  showAnnouncementBar: true,
  announcementText:
    '<i>End of winter sale! Get 30% off with every purchase you make with the code BYEWINTER.</i>',
  menu: [
    {
      name: 'Shop',
      type: 'product',
      items: [
        {
          type: 'column',
          items: [
            {
              name: 'Vitamins',
              type: 'category',
              value: {
                id: '623a4acf6899c0013dce9880',
                description: 'Get your health back on track',
                images: [
                  {
                    file: {
                      id: '623a4acb7d9c69013dbaecaf',
                      length: 653816,
                      md5: '73e76706544d7b9c8d7df230f909f12a',
                      filename: null,
                      metadata: null,
                      url: 'https://cdn.schema.io/horizon-demo/623a4acb7d9c69013dbaecaf/73e76706544d7b9c8d7df230f909f12a',
                      width: 736,
                      height: 820,
                    },
                  },
                ],
                name: 'Supplements',
                slug: 'supplements',
              },
            },
            {
              name: 'Hair',
              type: 'category',
              value: {
                id: '623a4aa5b43f97013d2f6a1f',
                description:
                  'Products that nurture and repair from within <br>',
                images: [
                  {
                    file: {
                      id: '623a4aa0b6f6ea013d88752b',
                      length: 605892,
                      md5: '38d41ea29a1096dcdef74ad01a7e654c',
                      filename: null,
                      metadata: null,
                      url: 'https://cdn.schema.io/horizon-demo/623a4aa0b6f6ea013d88752b/38d41ea29a1096dcdef74ad01a7e654c',
                      width: 736,
                      height: 820,
                    },
                  },
                ],
                name: 'Hair Essentials',
                slug: 'hair-essentials',
              },
            },
            {
              name: 'Skincare',
              type: 'category',
              value: {
                id: '6234b12cef1a170132ab7104',
                description:
                  'All the skincare essentials you need for a healthy skin',
                images: [
                  {
                    file: {
                      id: '623a4aba6899c0013dce028e',
                      length: 1022432,
                      md5: '1ff2a50143dd734f48a108202a2a165a',
                      filename: null,
                      metadata: null,
                      url: 'https://cdn.schema.io/horizon-demo/623a4aba6899c0013dce028e/1ff2a50143dd734f48a108202a2a165a',
                      width: 736,
                      height: 820,
                    },
                  },
                ],
                name: 'Skincare Essentials',
                slug: 'skincare-essentials',
              },
            },
          ],
        },
        {
          type: 'column',
          items: [
            {
              name: 'Supplements',
              type: 'category',
              value: {
                id: '623a4acf6899c0013dce9880',
                description: 'Get your health back on track',
                images: [
                  {
                    file: {
                      id: '623a4acb7d9c69013dbaecaf',
                      length: 653816,
                      md5: '73e76706544d7b9c8d7df230f909f12a',
                      filename: null,
                      metadata: null,
                      url: 'https://cdn.schema.io/horizon-demo/623a4acb7d9c69013dbaecaf/73e76706544d7b9c8d7df230f909f12a',
                      width: 736,
                      height: 820,
                    },
                  },
                ],
                name: 'Supplements',
                slug: 'supplements',
              },
            },
          ],
        },
      ],
      value: {},
    },
    {
      name: 'About Us',
      type: 'content',
      model: 'content/pages',
      value: {
        published: true,
        name: 'About us',
        slug: 'about-us',
        sections: [
          {
            id: '62fe3c89701c5e5cad000008',
            type: 'multiple_panels',
            panels: [
              {
                id: '62fe3c91701c5e5cad000009',
                type: 'text',
                title: '<strong>Feel good,<br>doing good.</strong><br>',
                description:
                  'Self-improvement doesn&#39;t have to come with the burden of questionable ingredients, environmental impact, or high prices.<br>',
                backgroundImage: null,
                imageScaling: 'fill',
                horizontalBackgroundAlignment: 'center',
                verticalBackgroundAlignment: 'center',
                backgroundColor: '#ffffff',
                overlayOpacity: 100,
              },
              {
                id: '62fe3c96701c5e5cad00000a',
                type: 'image',
                image: {
                  file: {
                    id: '62fe3ca38fd0550013ea3281',
                    length: 921076,
                    md5: '5ecf52bb62a453ecfd269deefa244333',
                    filename: null,
                    metadata: null,
                    url: 'https://cdn.schema.io/horizon-demo/62fe3ca38fd0550013ea3281/5ecf52bb62a453ecfd269deefa244333',
                    width: 960,
                    height: 780,
                    dateUploaded: '2022-08-18T13:20:35.406Z',
                    contentType: 'image/png',
                  },
                },
              },
            ],
            horizontalSpacing: 'medium',
            verticalSpacing: 'none',
            horizontalContentAlignment: 'left',
            verticalContentAlignment: 'center',
            backgroundColor: '#ffffff',
          },
          {
            id: '62fe3d3a701c5e5cad00000b',
            type: 'heading_with_text',
            label: 'OUR VALUES',
            title: '<strong>Affordable. Improved. Minimalist.</strong><br>',
            description:
              'At Horizon, we seek to provide an affordable solution for anyone interested in improving their overall health with simple, holistic products, with focus on sustainability and natural ingredients.',
            horizontalSpacing: 'medium',
            verticalSpacing: 'medium',
            titleAlignment: 'left',
            textAlignment: 'left',
            textLayout: 'dual_column',
            backgroundImage: null,
            horizontalBackgroundPosition: 'center',
            verticalBackgroundPosition: 'center',
            backgroundColor: '#f6f4ef',
            overlayOpacity: 100,
            textColor: '#1d0a43',
          },
          {
            id: '62fe3ed8c108d74fc8000001',
            type: 'multiple_features',
            title: null,
            description: null,
            features: [
              {
                id: '62fe41049bb244db6e000001',
                title: 'Curated products',
                description:
                  'Our wellness quiz suggests products that are right for you',
                image: {
                  file: {
                    id: '62fe4708fd6a5d0013027164',
                    length: 2084,
                    md5: 'd9bd9e68de08face533952465dc34e86',
                    filename: null,
                    metadata: null,
                    url: 'https://cdn.schema.io/horizon-demo/62fe4708fd6a5d0013027164/d9bd9e68de08face533952465dc34e86',
                    width: 180,
                    height: 180,
                    dateUploaded: '2022-08-18T14:04:56.076Z',
                    contentType: 'image/png',
                  },
                },
                contentAlignment: 'center',
              },
              {
                id: '62fe41439bb244db6e000002',
                title: 'Scientifically proven',
                description:
                  'Get access to products backed by the latest wellness research',
                image: {
                  file: {
                    id: '62fe47190f200e0012cc050d',
                    length: 7740,
                    md5: '493e331db148ce83a8dcdfd60f1ebe12',
                    filename: null,
                    metadata: null,
                    url: 'https://cdn.schema.io/horizon-demo/62fe47190f200e0012cc050d/493e331db148ce83a8dcdfd60f1ebe12',
                    width: 180,
                    height: 180,
                    dateUploaded: '2022-08-18T14:05:13.155Z',
                    contentType: 'image/png',
                  },
                },
                contentAlignment: 'center',
              },
              {
                id: '62fe41699bb244db6e000003',
                title: 'Inspired by nature',
                description:
                  'All of our products are made from 100% natural ingredients',
                image: {
                  file: {
                    id: '62fe4726bb94a00012a4df39',
                    length: 6600,
                    md5: '146202686d9c3e8a620c43f42a02e2c3',
                    filename: null,
                    metadata: null,
                    url: 'https://cdn.schema.io/horizon-demo/62fe4726bb94a00012a4df39/146202686d9c3e8a620c43f42a02e2c3',
                    width: 180,
                    height: 180,
                    dateUploaded: '2022-08-18T14:05:26.710Z',
                    contentType: 'image/png',
                  },
                },
                contentAlignment: 'center',
              },
            ],
            horizontalSpacing: 'medium',
            verticalSpacing: 'medium',
            horizontalContentAlignment: 'center',
            backgroundColor: '#ffffff',
          },
          {
            id: '62fe3f3add99005252000001',
            type: 'multiple_features',
            title: 'Our team',
            description: null,
            features: [
              {
                id: '62fe42e702dce01456000001',
                title: 'Mercy Humphrey',
                description: 'Head Director, Dermatology MD',
                image: {
                  file: {
                    id: '62fe4360bb94a00012a4def3',
                    length: 255164,
                    md5: 'c77467fff5df335429f473746bc8383d',
                    filename: null,
                    metadata: null,
                    url: 'https://cdn.schema.io/horizon-demo/62fe4360bb94a00012a4def3/c77467fff5df335429f473746bc8383d',
                    width: 360,
                    height: 360,
                    dateUploaded: '2022-08-18T13:49:20.979Z',
                    contentType: 'image/png',
                  },
                },
                contentAlignment: 'center',
              },
              {
                id: '62fe436702dce01456000002',
                title: 'Kailyan Dorha',
                description: 'Chief Operations Officer, Dermatology MD',
                image: {
                  file: {
                    id: '62fe43788fedb10013c66733',
                    length: 272044,
                    md5: '118f4a7525c2e2dacd9746724c875248',
                    filename: null,
                    metadata: null,
                    url: 'https://cdn.schema.io/horizon-demo/62fe43788fedb10013c66733/118f4a7525c2e2dacd9746724c875248',
                    width: 360,
                    height: 360,
                    dateUploaded: '2022-08-18T13:49:44.417Z',
                    contentType: 'image/png',
                  },
                },
                contentAlignment: 'center',
              },
              {
                id: '62fe43e702dce01456000003',
                title: 'Pedro Alvarez',
                description: 'Customer Support Specialist',
                image: {
                  file: {
                    id: '62fe45560f200e0012cc04f9',
                    length: 43040,
                    md5: '69487893fcfd3d5c21115b6b14bb5ab2',
                    filename: null,
                    metadata: null,
                    url: 'https://cdn.schema.io/horizon-demo/62fe45560f200e0012cc04f9/69487893fcfd3d5c21115b6b14bb5ab2',
                    width: 180,
                    height: 180,
                    dateUploaded: '2022-08-18T13:57:42.533Z',
                    contentType: 'image/png',
                  },
                },
                contentAlignment: 'center',
              },
            ],
            horizontalSpacing: 'small',
            verticalSpacing: 'medium',
            horizontalContentAlignment: 'center',
            backgroundColor: '#ffffff',
          },
        ],
        id: '62fe29986da30c00127e335a',
        metaTitle: null,
        metaDescription: null,
        dateCreated: '2022-08-18T11:59:20.831Z',
        dateUpdated: '2022-09-16T02:05:43.709Z',
      },
      items: [],
    },
    {
      name: 'Quiz',
      type: 'heading',
      items: [
        {
          type: 'column',
          items: [
            {
              name: 'Heading',
              type: 'heading',
              value: {},
            },
            {
              name: 'Products',
              type: 'product',
              value: {},
            },
            {
              name: 'Argan Oil',
              type: 'product',
              preview: true,
              value: {
                id: '6265917b80d838001976de30',
                currency: 'USD',
                description:
                  'Nourish dry skin and promote healthy hair growth with this deeply moisturizing scalp treatment. Natural argan oil works to smooth and fill gaps between skin cells to soften and protect leaving skin balanced and enriched.<br>',
                images: [
                  {
                    file: {
                      id: '6265900e80d838001973dc5c',
                      length: 2764352,
                      md5: 'b337bc20eb02b76c1d474ad8223542a1',
                      filename: null,
                      metadata: null,
                      url: 'https://cdn.schema.io/horizon-demo/6265900e80d838001973dc5c/b337bc20eb02b76c1d474ad8223542a1',
                      width: 1038,
                      height: 1552,
                    },
                  },
                  {
                    file: {
                      id: '62659010fcb3ba00199a2618',
                      length: 3542836,
                      md5: '69b820782c33bebce53dbe57db311c7e',
                      filename: null,
                      metadata: null,
                      url: 'https://cdn.schema.io/horizon-demo/62659010fcb3ba00199a2618/69b820782c33bebce53dbe57db311c7e',
                      width: 1036,
                      height: 1552,
                    },
                  },
                  {
                    file: {
                      id: '62659012fcb3ba00199a2e6c',
                      length: 4145160,
                      md5: 'b6825c22eb2ed8c22ae42eb8428c8ff7',
                      filename: null,
                      metadata: null,
                      url: 'https://cdn.schema.io/horizon-demo/62659012fcb3ba00199a2e6c/b6825c22eb2ed8c22ae42eb8428c8ff7',
                      width: 1036,
                      height: 1552,
                    },
                  },
                ],
                name: 'Argan Oil',
                price: 32,
                sale: true,
                slug: 'argan-oil',
                salePrice: 30,
              },
            },
          ],
        },
      ],
    },
    {
      name: 'Membership',
      type: 'content',
      model: 'content/pages',
      value: {
        published: true,
        name: 'About us',
        slug: 'about-us',
        sections: [
          {
            id: '62fe3c89701c5e5cad000008',
            type: 'multiple_panels',
            panels: [
              {
                id: '62fe3c91701c5e5cad000009',
                type: 'text',
                title: '<strong>Feel good,<br>doing good.</strong><br>',
                description:
                  'Self-improvement doesn&#39;t have to come with the burden of questionable ingredients, environmental impact, or high prices.<br>',
                backgroundImage: null,
                imageScaling: 'fill',
                horizontalBackgroundAlignment: 'center',
                verticalBackgroundAlignment: 'center',
                backgroundColor: '#ffffff',
                overlayOpacity: 100,
              },
              {
                id: '62fe3c96701c5e5cad00000a',
                type: 'image',
                image: {
                  file: {
                    id: '62fe3ca38fd0550013ea3281',
                    length: 921076,
                    md5: '5ecf52bb62a453ecfd269deefa244333',
                    filename: null,
                    metadata: null,
                    url: 'https://cdn.schema.io/horizon-demo/62fe3ca38fd0550013ea3281/5ecf52bb62a453ecfd269deefa244333',
                    width: 960,
                    height: 780,
                    dateUploaded: '2022-08-18T13:20:35.406Z',
                    contentType: 'image/png',
                  },
                },
              },
            ],
            horizontalSpacing: 'medium',
            verticalSpacing: 'none',
            horizontalContentAlignment: 'left',
            verticalContentAlignment: 'center',
            backgroundColor: '#ffffff',
          },
          {
            id: '62fe3d3a701c5e5cad00000b',
            type: 'heading_with_text',
            label: 'OUR VALUES',
            title: '<strong>Affordable. Improved. Minimalist.</strong><br>',
            description:
              'At Horizon, we seek to provide an affordable solution for anyone interested in improving their overall health with simple, holistic products, with focus on sustainability and natural ingredients.',
            horizontalSpacing: 'medium',
            verticalSpacing: 'medium',
            titleAlignment: 'left',
            textAlignment: 'left',
            textLayout: 'dual_column',
            backgroundImage: null,
            horizontalBackgroundPosition: 'center',
            verticalBackgroundPosition: 'center',
            backgroundColor: '#f6f4ef',
            overlayOpacity: 100,
            textColor: '#1d0a43',
          },
          {
            id: '62fe3ed8c108d74fc8000001',
            type: 'multiple_features',
            title: null,
            description: null,
            features: [
              {
                id: '62fe41049bb244db6e000001',
                title: 'Curated products',
                description:
                  'Our wellness quiz suggests products that are right for you',
                image: {
                  file: {
                    id: '62fe4708fd6a5d0013027164',
                    length: 2084,
                    md5: 'd9bd9e68de08face533952465dc34e86',
                    filename: null,
                    metadata: null,
                    url: 'https://cdn.schema.io/horizon-demo/62fe4708fd6a5d0013027164/d9bd9e68de08face533952465dc34e86',
                    width: 180,
                    height: 180,
                    dateUploaded: '2022-08-18T14:04:56.076Z',
                    contentType: 'image/png',
                  },
                },
                contentAlignment: 'center',
              },
              {
                id: '62fe41439bb244db6e000002',
                title: 'Scientifically proven',
                description:
                  'Get access to products backed by the latest wellness research',
                image: {
                  file: {
                    id: '62fe47190f200e0012cc050d',
                    length: 7740,
                    md5: '493e331db148ce83a8dcdfd60f1ebe12',
                    filename: null,
                    metadata: null,
                    url: 'https://cdn.schema.io/horizon-demo/62fe47190f200e0012cc050d/493e331db148ce83a8dcdfd60f1ebe12',
                    width: 180,
                    height: 180,
                    dateUploaded: '2022-08-18T14:05:13.155Z',
                    contentType: 'image/png',
                  },
                },
                contentAlignment: 'center',
              },
              {
                id: '62fe41699bb244db6e000003',
                title: 'Inspired by nature',
                description:
                  'All of our products are made from 100% natural ingredients',
                image: {
                  file: {
                    id: '62fe4726bb94a00012a4df39',
                    length: 6600,
                    md5: '146202686d9c3e8a620c43f42a02e2c3',
                    filename: null,
                    metadata: null,
                    url: 'https://cdn.schema.io/horizon-demo/62fe4726bb94a00012a4df39/146202686d9c3e8a620c43f42a02e2c3',
                    width: 180,
                    height: 180,
                    dateUploaded: '2022-08-18T14:05:26.710Z',
                    contentType: 'image/png',
                  },
                },
                contentAlignment: 'center',
              },
            ],
            horizontalSpacing: 'medium',
            verticalSpacing: 'medium',
            horizontalContentAlignment: 'center',
            backgroundColor: '#ffffff',
          },
          {
            id: '62fe3f3add99005252000001',
            type: 'multiple_features',
            title: 'Our team',
            description: null,
            features: [
              {
                id: '62fe42e702dce01456000001',
                title: 'Mercy Humphrey',
                description: 'Head Director, Dermatology MD',
                image: {
                  file: {
                    id: '62fe4360bb94a00012a4def3',
                    length: 255164,
                    md5: 'c77467fff5df335429f473746bc8383d',
                    filename: null,
                    metadata: null,
                    url: 'https://cdn.schema.io/horizon-demo/62fe4360bb94a00012a4def3/c77467fff5df335429f473746bc8383d',
                    width: 360,
                    height: 360,
                    dateUploaded: '2022-08-18T13:49:20.979Z',
                    contentType: 'image/png',
                  },
                },
                contentAlignment: 'center',
              },
              {
                id: '62fe436702dce01456000002',
                title: 'Kailyan Dorha',
                description: 'Chief Operations Officer, Dermatology MD',
                image: {
                  file: {
                    id: '62fe43788fedb10013c66733',
                    length: 272044,
                    md5: '118f4a7525c2e2dacd9746724c875248',
                    filename: null,
                    metadata: null,
                    url: 'https://cdn.schema.io/horizon-demo/62fe43788fedb10013c66733/118f4a7525c2e2dacd9746724c875248',
                    width: 360,
                    height: 360,
                    dateUploaded: '2022-08-18T13:49:44.417Z',
                    contentType: 'image/png',
                  },
                },
                contentAlignment: 'center',
              },
              {
                id: '62fe43e702dce01456000003',
                title: 'Pedro Alvarez',
                description: 'Customer Support Specialist',
                image: {
                  file: {
                    id: '62fe45560f200e0012cc04f9',
                    length: 43040,
                    md5: '69487893fcfd3d5c21115b6b14bb5ab2',
                    filename: null,
                    metadata: null,
                    url: 'https://cdn.schema.io/horizon-demo/62fe45560f200e0012cc04f9/69487893fcfd3d5c21115b6b14bb5ab2',
                    width: 180,
                    height: 180,
                    dateUploaded: '2022-08-18T13:57:42.533Z',
                    contentType: 'image/png',
                  },
                },
                contentAlignment: 'center',
              },
            ],
            horizontalSpacing: 'small',
            verticalSpacing: 'medium',
            horizontalContentAlignment: 'center',
            backgroundColor: '#ffffff',
          },
        ],
        id: '62fe29986da30c00127e335a',
        metaTitle: null,
        metaDescription: null,
        dateCreated: '2022-08-18T11:59:20.831Z',
        dateUpdated: '2022-09-16T02:05:43.709Z',
      },
    },
    {
      name: 'Shop',
      options: {
        target: 'blank',
      },
      type: 'url',
      value: 'http://www.swell.is/',
    },
    {
      name: 'Supplements',
      type: 'category',
      value: {
        id: '623a4acf6899c0013dce9880',
        description: 'Get your health back on track',
        images: [
          {
            file: {
              id: '623a4acb7d9c69013dbaecaf',
              length: 653816,
              md5: '73e76706544d7b9c8d7df230f909f12a',
              filename: null,
              metadata: null,
              url: 'https://cdn.schema.io/horizon-demo/623a4acb7d9c69013dbaecaf/73e76706544d7b9c8d7df230f909f12a',
              width: 736,
              height: 820,
            },
          },
        ],
        name: 'Supplements',
        slug: 'supplements',
      },
    },
    {
      name: 'Argan Oil',
      type: 'product',
      value: {
        id: '6265917b80d838001976de30',
        currency: 'USD',
        description:
          'Nourish dry skin and promote healthy hair growth with this deeply moisturizing scalp treatment. Natural argan oil works to smooth and fill gaps between skin cells to soften and protect leaving skin balanced and enriched.<br>',
        images: [
          {
            file: {
              id: '6265900e80d838001973dc5c',
              length: 2764352,
              md5: 'b337bc20eb02b76c1d474ad8223542a1',
              filename: null,
              metadata: null,
              url: 'https://cdn.schema.io/horizon-demo/6265900e80d838001973dc5c/b337bc20eb02b76c1d474ad8223542a1',
              width: 1038,
              height: 1552,
            },
          },
          {
            file: {
              id: '62659010fcb3ba00199a2618',
              length: 3542836,
              md5: '69b820782c33bebce53dbe57db311c7e',
              filename: null,
              metadata: null,
              url: 'https://cdn.schema.io/horizon-demo/62659010fcb3ba00199a2618/69b820782c33bebce53dbe57db311c7e',
              width: 1036,
              height: 1552,
            },
          },
          {
            file: {
              id: '62659012fcb3ba00199a2e6c',
              length: 4145160,
              md5: 'b6825c22eb2ed8c22ae42eb8428c8ff7',
              filename: null,
              metadata: null,
              url: 'https://cdn.schema.io/horizon-demo/62659012fcb3ba00199a2e6c/b6825c22eb2ed8c22ae42eb8428c8ff7',
              width: 1036,
              height: 1552,
            },
          },
        ],
        name: 'Argan Oil',
        price: 32,
        sale: true,
        slug: 'argan-oil',
        salePrice: 30,
      },
    },
  ] as RootNavItem[],
  hideOnScroll: true,
};
