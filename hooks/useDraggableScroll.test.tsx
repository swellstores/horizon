import { render, fireEvent } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import useDraggableScroll, { DRAGGING_CLASS } from './useDraggableScroll';

const CONTAINER_TEST_ID = 'container';

describe('useDraggableScroll', () => {
  it('should return the correct values', () => {
    const { result } = renderHook(() => useDraggableScroll());
    const { onMouseDown, onMouseLeave, onMouseUp, onMouseMove } =
      result.current;

    expect(onMouseDown).toBeInstanceOf(Function);
    expect(onMouseLeave).toBeInstanceOf(Function);
    expect(onMouseUp).toBeInstanceOf(Function);
    expect(onMouseMove).toBeInstanceOf(Function);
  });

  it('should handle mouse down', () => {
    const { result } = renderHook(() => useDraggableScroll());
    const { onMouseDown } = result.current;

    const { getByTestId } = render(
      <div data-testid={CONTAINER_TEST_ID} onMouseDown={onMouseDown} />,
    );

    const container = getByTestId(CONTAINER_TEST_ID);

    expect(container.classList.contains(DRAGGING_CLASS)).toBe(false);

    fireEvent.mouseDown(container);

    expect(container.classList.contains(DRAGGING_CLASS)).toBe(true);
  });

  it('should handle mouse leave', () => {
    const { result } = renderHook(() => useDraggableScroll());
    const { onMouseLeave } = result.current;

    const { getByTestId } = render(
      <div
        data-testid={CONTAINER_TEST_ID}
        className={DRAGGING_CLASS}
        onMouseLeave={onMouseLeave}
      />,
    );

    const container = getByTestId(CONTAINER_TEST_ID);

    fireEvent.mouseLeave(container);

    expect(container.classList.contains(DRAGGING_CLASS)).toBe(false);
  });

  it('should handle mouse up', () => {
    const { result } = renderHook(() => useDraggableScroll());
    const { onMouseUp } = result.current;

    const { getByTestId } = render(
      <div
        data-testid={CONTAINER_TEST_ID}
        className={DRAGGING_CLASS}
        onMouseUp={onMouseUp}
      />,
    );

    const container = getByTestId(CONTAINER_TEST_ID);

    fireEvent.mouseUp(container);

    expect(container.classList.contains(DRAGGING_CLASS)).toBe(false);
  });

  it('should not handle mouse move if the element is not scrollable', () => {
    const { result } = renderHook(() => useDraggableScroll());
    const { onMouseMove, onMouseDown } = result.current;

    const { getByTestId } = render(
      <div
        data-testid={CONTAINER_TEST_ID}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
      />,
    );

    const container = getByTestId(CONTAINER_TEST_ID);

    fireEvent.mouseDown(container);
    fireEvent.mouseMove(container);

    expect(container.classList.contains(DRAGGING_CLASS)).toBe(true);
  });

  it('should handle mouse move if the element is scrollable', () => {
    const { result } = renderHook(() => useDraggableScroll());
    const { onMouseMove, onMouseDown } = result.current;

    const { getByTestId } = render(
      <div
        data-testid={CONTAINER_TEST_ID}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
      />,
    );

    const container = getByTestId(CONTAINER_TEST_ID);

    fireEvent.mouseDown(container);

    // Set the clientWidth and scrollWidth properties to a value that makes the element scrollable
    Object.defineProperty(container, 'clientWidth', { value: 50 });
    Object.defineProperty(container, 'scrollWidth', { value: 100 });

    fireEvent.mouseMove(container);

    expect(container.classList.contains(DRAGGING_CLASS)).toBe(true);
  });
});
