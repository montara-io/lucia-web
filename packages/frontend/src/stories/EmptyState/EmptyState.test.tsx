import React from 'react';
import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import EmptyState from './EmptyState';

describe('Test EmptyState Component', () => {
  afterEach(cleanup);

  it('Snapshot renders correctly', () => {
    const wrapper = render(<EmptyState />);
    expect(wrapper).toMatchSnapshot();
  });
});
