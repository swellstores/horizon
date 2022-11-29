import type { EditorAnswerSelection } from 'types/shared/quiz';
import { mapSelection } from './quiz';

describe('quiz utils', () => {
  describe('#mapSelection', () => {
    it('returns an empty array when the selection is undefined', () => {
      const selection = undefined;

      expect(mapSelection(selection)).toStrictEqual([]);
    });

    it('returns an empty array when the selection is null', () => {
      const selection = null;

      expect(mapSelection(selection)).toStrictEqual([]);
    });

    it('returns correct array of mapped selections when selectios are filled in completely', () => {
      const selection: EditorAnswerSelection[] = [
        {
          product_selection: [
            {
              slug: 'item-slug-1',
              _model: 'products',
            },
          ],
          points: 50,
        },
        {
          product_selection: [
            {
              slug: 'item-slug-2',
              _model: 'categories',
            },
          ],
          points: 20,
        },
      ];

      expect(mapSelection(selection)).toStrictEqual([
        {
          points: 50,
          productSelection: [{ slug: 'item-slug-1', model: 'products' }],
        },
        {
          points: 20,
          productSelection: [{ slug: 'item-slug-2', model: 'categories' }],
        },
      ]);
    });

    it('returns correct array of mapped selections excluding the ones without points or product_selection', () => {
      const selection = [
        {
          product_selection: [
            {
              slug: 'item-slug-1',
              _model: 'products',
            },
          ],
          points: 50,
        },
        {
          product_selection: [
            {
              slug: 'item-slug-2',
              _model: 'categories',
            },
          ],
          points: null,
        },
        {
          product_selection: [],
          points: 20,
        },
      ];

      expect(mapSelection(selection as EditorAnswerSelection[])).toStrictEqual([
        {
          points: 50,
          productSelection: [{ slug: 'item-slug-1', model: 'products' }],
        },
      ]);
    });
  });
});
