import React from 'react';
import Tile from './Tile';

export default {
  title: 'Components/Tile',
  component: Tile,
};

export const Basic = (args) => <Tile {...args}/>;

Basic.args = {};

Basic.parameters= {
  jest: ['Tile.test.tsx']
}
