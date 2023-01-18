import React from 'react';
import { render } from '@testing-library/react';
import Tile from './Tile';

describe('Tile Component', () => {
  test('it should match the snapshot', () => {
    const { asFragment } = render(<Tile />);
    expect(asFragment()).toMatchSnapshot();
  });
});
