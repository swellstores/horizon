import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { ProductOption, OPTION_INPUT_TYPE } from 'types/shared/products';
import ProductOptions from './ProductOptions';
import { useState } from 'react';
import { Action, ACTIONS } from 'hooks/useProductSelection';
import '@testing-library/jest-dom/extend-expect';

const selectOption = [
  {
    id: '1',
    attributeId: '1',
    inputType: OPTION_INPUT_TYPE.SELECT,
    name: 'Color',
    values: [
      {
        id: '1',
        name: 'Red',
      },
      {
        id: '2',
        name: 'Green',
      },
      {
        id: '3',
        name: 'Blue',
      },
    ],
    active: true,
    required: true,
  },
];

const toggleOption = [
  {
    id: '2',
    attributeId: 'toggle_options_test',
    inputType: OPTION_INPUT_TYPE.TOGGLE,
    name: 'Gift wrapping?',
    values: [
      {
        id: '10',
        name: 'Gift wrapping?',
        price: 5,
      },
    ],
    active: true,
    required: false,
  },
];

const shortTextOption = [
  {
    id: '3',
    attributeId: '3',
    inputType: OPTION_INPUT_TYPE.SHORT_TEXT,
    name: 'Gift message',
    placeholder: 'Enter your message',
    required: true,
    active: true,
  },
];

const longTextOption = [
  {
    id: '4',
    attributeId: '4',
    inputType: OPTION_INPUT_TYPE.LONG_TEXT,
    name: 'Notes',
    placeholder: 'Enter your message',
    required: false,
    active: true,
  },
];

const Wrapper: React.FC<{
  options: ProductOption[];
  defaultOptions?: [string, string][];
}> = ({ options, defaultOptions }) => {
  const [selectedOptions, setSelectedOptions] = useState(
    new Map<string, string>(defaultOptions),
  );
  function setValue({ payload, type }: Action) {
    const newMap = new Map(selectedOptions);
    switch (type) {
      case ACTIONS.SET_SELECTED_PRODUCT_OPTIONS: {
        const { optionId, valueId } = payload;
        newMap.set(optionId, valueId);
        setSelectedOptions(newMap);
        return;
      }
      case ACTIONS.TOGGLE_PURCHASE_OPTION: {
        const { optionId, valueId } = payload;
        const inMap = newMap.get(optionId);
        if (inMap) {
          newMap.delete(optionId);
        } else {
          newMap.set(optionId, valueId);
          setSelectedOptions(newMap);
        }
        return;
      }
    }
  }
  return (
    <ProductOptions
      options={options}
      selectedOptions={selectedOptions}
      onChange={setValue}
    />
  );
};

describe('ProductOptions', () => {
  it('should render the select type', () => {
    render(<Wrapper options={selectOption} />);
    expect(screen.getByRole('heading', { name: 'Color' })).toBeVisible();
  });

  it('should display all the select options', () => {
    render(<Wrapper options={selectOption} />);
    ['Red', 'Green', 'Blue'].forEach((option) => {
      expect(screen.getByRole('radio', { name: option })).toBeVisible();
    });
  });

  it('should have the default value selected', () => {
    render(<Wrapper options={selectOption} defaultOptions={[['1', '2']]} />);
    expect(screen.getByRole('radio', { name: 'Green' })).toBeChecked();
  });

  it('can change value', () => {
    render(<Wrapper options={selectOption} defaultOptions={[['1', '1']]} />);
    expect(screen.getByRole('radio', { name: 'Red' })).toBeChecked();
    act(() => {
      fireEvent.click(screen.getByLabelText('Green'));
    });
    expect(screen.getByRole('radio', { name: 'Green' })).toBeChecked();
  });

  it('should render toggle option', async () => {
    render(<Wrapper options={toggleOption} />);
    // wait needed since the Toggle component is loaded lazily
    await waitFor(() => expect(screen.getByLabelText('Gift wrapping?')));
  });

  it('should not be checked by default', () => {
    render(<Wrapper options={toggleOption} />);
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  it('can select toggle option', () => {
    render(<Wrapper options={toggleOption} />);
    expect(screen.getByRole('checkbox')).not.toBeChecked();
    act(() => {
      fireEvent.click(screen.getByRole('checkbox'));
    });
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('should render short text', () => {
    render(<Wrapper options={shortTextOption} />);
    expect(screen.getByRole('heading', { name: 'Gift message' })).toBeVisible();
  });

  it('should render long text', () => {
    render(<Wrapper options={longTextOption} />);
    expect(screen.getByRole('heading', { name: 'Notes' })).toBeVisible();
  });
});
