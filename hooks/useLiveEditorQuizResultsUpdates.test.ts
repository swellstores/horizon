import { renderHook } from '@testing-library/react-hooks';
import { fireEvent, waitFor } from '@testing-library/react';
import { enableEditor } from 'utils/test/editor';
import useLiveEditorQuizResultsUpdates from './useLiveEditorQuizResultsUpdates';
import type { QuizResultsPageProps } from 'pages/quiz/[id]/results';

const quizResultsPage = {
  id: '634d33836d90829278000003',
  title: 'Test quiz results',
  headingSection: {
    id: '634d33936d90829278000004',
    type: 'multiple_panels',
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
  },
  resultsTitle: 'Your products',
  originalQuizResults: {
    id: '634d33836d90829278000003',
    title: 'Results page',
    results_title: 'Your products',
    heading_section: [
      {
        id: '634d33936d90829278000004',
        type: 'multiple_panels',
        horizontal_spacing: 'none',
        vertical_spacing: 'small',
        horizontal_content_alignment: 'center',
        vertical_content_alignment: 'center',
        panels: [
          {
            id: '634ea8a24276c1e7cd000001',
            type: 'text',
            title: 'These are your results, {customerName}',
            description: 'Panel one descss',
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
    ],
  },
};

describe('useLiveEditorQuizResultsUpdates', () => {
  enableEditor();

  it('returns correct initial state', () => {
    const { result } = renderHook(() =>
      useLiveEditorQuizResultsUpdates(
        quizResultsPage as Omit<QuizResultsPageProps, 'quizId'>,
      ),
    );

    expect(result.current).toStrictEqual(quizResultsPage);
  });

  it('returns correct data after a content.updated message event on nested path', () => {
    const { result } = renderHook(() =>
      useLiveEditorQuizResultsUpdates(
        quizResultsPage as Omit<QuizResultsPageProps, 'quizId'>,
      ),
    );

    // First panel's description has changed
    fireEvent(
      window,
      new MessageEvent('message', {
        data: {
          details: {
            id: '630ddaa582a31b003ec13429',
            model: 'content/quizzes',
            path: 'results_page.0.heading_section.0.panels.0',
            value: {
              id: '634ea8a24276c1e7cd000001',
              type: 'text',
              title: 'These are your results, {customerName}',
              description: 'Panel one changed description',
              background_image: '',
              image_scaling: 'fill',
              horizontal_background_alignment: 'center',
              vertical_background_alignment: 'center',
              horizontal_spacing: 'small',
              vertical_spacing: 'small',
              content_gap: 'small',
              background_color: '#705dd6',
            },
          },
          id: 1,
          type: 'content.updated',
        },
      }),
    );

    waitFor(() => {
      expect(result.current).toStrictEqual({
        id: '634d33836d90829278000003',
        headingSection: {
          id: '634d33936d90829278000004',
          type: 'multiple_panels',
          horizontal_spacing: 'none',
          vertical_spacing: 'small',
          horizontal_content_alignment: 'center',
          vertical_content_alignment: 'center',
          panels: [
            {
              id: '634ea8a24276c1e7cd000001',
              type: 'text',
              title: 'These are your results, {customerName}',
              description: 'Panel one changed description',
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
                description: 'Panel one changed description',
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
        },
        resultsTitle: 'Your products',
        originalQuizResults: {
          id: '634d33836d90829278000003',
          title: 'Results page',
          results_title: 'Your products',
          heading_section: [
            {
              id: '634d33936d90829278000004',
              type: 'multiple_panels',
              horizontal_spacing: 'none',
              vertical_spacing: 'small',
              horizontal_content_alignment: 'center',
              vertical_content_alignment: 'center',
              panels: [
                {
                  id: '634ea8a24276c1e7cd000001',
                  type: 'text',
                  title: 'These are your results, {customerName}',
                  description: 'Panel one changed description',
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
          ],
        },
      });
    });
  });

  it('returns correct data after a content.updated message event at the quiz results root path', () => {
    const { result } = renderHook(() =>
      useLiveEditorQuizResultsUpdates(
        quizResultsPage as Omit<QuizResultsPageProps, 'quizId'>,
      ),
    );

    fireEvent(
      window,
      new MessageEvent('message', {
        data: {
          details: {
            id: '630ddaa582a31b003ec13429',
            model: 'content/quizzes',
            path: 'results_page.0',
            value: {
              ...quizResultsPage.originalQuizResults,
              results_title: 'Results title changed',
            },
          },
          id: 1,
          type: 'content.updated',
        },
      }),
    );

    waitFor(() => {
      expect(result.current).toStrictEqual({
        ...quizResultsPage,
        resultsTitle: 'Results title changed',
        originalQuizResults: {
          ...quizResultsPage.originalQuizResults,
          results_title: 'Results title changed',
        },
      });
    });
  });
});
