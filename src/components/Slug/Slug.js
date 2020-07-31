import React from 'react';
import classNames from 'classnames';
import { arrayOf, bool, number } from 'prop-types';
import './Slug.scss';
import { TILE_SIZE, TILE_SIZE_UNIT } from '../../constants';

const Slug = ({ position, won }) => {
  const style = {
    top: `${position[0] * TILE_SIZE}${TILE_SIZE_UNIT}`,
    left: `${position[1] * TILE_SIZE}${TILE_SIZE_UNIT}`
  };
  return <div className={classNames('slug', { won })} style={style} />;
};

Slug.propTypes = {
  position: arrayOf(number).isRequired,
  won: bool
};

export default Slug;
