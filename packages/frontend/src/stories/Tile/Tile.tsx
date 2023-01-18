import classNames from 'classnames';
import React from 'react';
import './Tile.scss';

export type TileProps = {
  children?: any;
  className?: string;
};

const Tile = (props) => {
  return <div className={classNames('m-tile', props.className)}>{props.children}</div>;
};

export default Tile;
