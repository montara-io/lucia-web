import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ActionButton, { ActionButtonProps } from './ActionButton';

describe('ActionButton Component', () => {
  let props: ActionButtonProps;
  const btnTestId = 'action-button';

  beforeEach(() => {
    props = {
      id: 'buttonId',
      label: 'click me',
    };
  });
  it('should display text inside the button', () => {
    const { getByText } = render(<ActionButton {...props} />);
    expect(getByText('click me')).toBeInTheDocument();
  });
  it('should fire event on click', () => {
    const handleClick = jest.fn();
    const { getByTestId } = render(<ActionButton {...props} onClick={handleClick} />);
    expect(getByTestId(btnTestId)).toBeInTheDocument();
    const toggleBtn = getByTestId(btnTestId);
    expect(handleClick).toHaveBeenCalledTimes(0);
    fireEvent.click(toggleBtn);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
  it('should fire event on mouse enter', () => {
    const handleMouseEnter = jest.fn();
    const { getByTestId } = render(<ActionButton {...props} onMouseEnter={handleMouseEnter} />);
    expect(getByTestId(btnTestId)).toBeInTheDocument();
    const toggleBtn = getByTestId(btnTestId);
    expect(handleMouseEnter).toHaveBeenCalledTimes(0);
    fireEvent.mouseEnter(toggleBtn);
    expect(handleMouseEnter).toHaveBeenCalledTimes(1);
  });
  it('Snapshot renders correctly', () => {
    const wrapper = render(<ActionButton {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
