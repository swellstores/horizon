import { render, screen, waitFor } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { PAGE_SECTION_COMPONENT } from 'lib/editor/sections';
import useQuizHeadingSection from './useQuizHeadingSection';

const headingSectionData = {
  id: '634d33936d90829278000004',
  type: PAGE_SECTION_COMPONENT.MULTIPLE_PANELS,
  horizontal_spacing: 'none',
  vertical_spacing: 'small',
  horizontal_content_alignment: 'center',
  vertical_content_alignment: 'center',
  panels: [
    {
      id: '634ea8a24276c1e7cd000001',
      type: 'text',
      title: 'These are your results, {customerName}',
      description: 'Panel one',
      background_image: {
        alt: '',
        height: 0,
        width: 0,
        src: '',
      },
      image_scaling: 'fill',
      horizontal_background_alignment: 'center',
      vertical_background_alignment: 'center',
      horizontal_spacing: 'small',
      vertical_spacing: 'small',
      content_gap: 'small',
      background_color: '#705dd6',
    },
    {
      id: '634fe00bb049f4bbb1000001',
      type: 'image',
      image: {
        alt: '',
        height: 2000,
        width: 3000,
        url: 'https://test.image.cdn/1',
      },
    },
  ],
  background_color: '#ffffff',
  _originalProps: {
    horizontal_spacing: 'none',
    vertical_spacing: 'small',
    horizontal_content_alignment: 'center',
    vertical_content_alignment: 'center',
    panels: [
      {
        id: '634ea8a24276c1e7cd000001',
        type: 'text',
        title: 'These are your results, {customerName}',
        description: 'Panel one',
        background_image: null,
        image_scaling: 'fill',
        horizontal_background_alignment: 'center',
        vertical_background_alignment: 'center',
        horizontal_spacing: 'small',
        vertical_spacing: 'small',
        content_gap: 'small',
        background_color: '#705dd6',
      },
      {
        id: '634fe00bb049f4bbb1000001',
        type: 'image',
        image: {
          file: {
            id: '634fe02a05388100281eccf8',
            date_uploaded: '2022-10-19T11:31:54.842Z',
            length: 319544,
            md5: '50ac0f79588a058a0823ac4be61f2aff',
            filename: null,
            content_type: 'image/webp',
            metadata: null,
            url: 'https://test.image.cdn/1',
            width: 3000,
            height: 2000,
          },
        },
      },
    ],
    background_color: '#ffffff',
  },
};

describe('useQuizHeadingSection', () => {
  it('returns nothing if there is no headingSection provided', () => {
    const { result } = renderHook(() => useQuizHeadingSection(null, {}));

    expect(result.current).toBe(null);
  });

  it('renders the section with enriched content based on quiz variables', async () => {
    const quizVariables = {
      customerName: 'Test',
    };
    const { result } = renderHook(() =>
      useQuizHeadingSection(headingSectionData, quizVariables),
    );

    if (result.current) {
      render(result.current);
    }

    // We expect the variable in this section's title to be replaced with the customerName variable
    waitFor(async () => {
      const title = await screen.findByText('These are your results, Test');

      expect(title).toBeVisible();
    });
  });
});
