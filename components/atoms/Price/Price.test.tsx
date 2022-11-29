import Price from './Price';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('Price', () => {
  it('should format the price correctly', () => {
    render(<Price price={10.5} />);
    expect(screen.getByText('$10.50')).toBeVisible();
  });

  it('should render the formatted sale price correctly', () => {
    render(<Price price={100} origPrice={200} />);
    expect(screen.getByText('$100.00')).toBeVisible();
    expect(screen.getByText('$200.00')).toBeVisible();
    expect(screen.getByText('$200.00')).toHaveClass('line-through');
  });

  it('should format the subscription price correctly', () => {
    render(
      <Price
        price={51.2}
        billingSchedule={{
          interval: 'monthly',
          intervalCount: 2,
        }}
      />,
    );
    expect(screen.getByText('$51.20/2mo')).toBeVisible();
  });

  it('should render the subscription sale price correctly', () => {
    render(
      <Price
        price={101.91}
        origPrice={204.02}
        billingSchedule={{
          interval: 'monthly',
          intervalCount: 2,
        }}
      />,
    );
    expect(screen.getByText('$101.91/2mo')).toBeVisible();
    expect(screen.getByText('$204.02/2mo')).toBeVisible();
    expect(screen.getByText('$204.02/2mo')).toHaveClass('line-through');
  });
});
