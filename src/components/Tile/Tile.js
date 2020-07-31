import React from 'react';
import { bool } from 'prop-types';
import classNames from 'classnames';
import { TILE_SIZE, TILE_SIZE_UNIT } from '../../constants';
import './Tile.scss';

const Tile = ({ blocker, start, end }) => {
  const tileClassNames = classNames('tile', { start, end, blocker });
  const style = {
    width: `${TILE_SIZE}${TILE_SIZE_UNIT}`,
    height: `${TILE_SIZE}${TILE_SIZE_UNIT}`
  };

  return <div className={tileClassNames} style={style} />;
};

Tile.propTypes = {
  blocker: bool,
  start: bool,
  end: bool
};

export default Tile;
