import React, { useMemo } from 'react';
import { number, shape, element } from 'prop-types';
import Tile from '../Tile';
import { isArrayEqual } from '../../utils';
import './Board.scss';

const Board = ({
  rows,
  columns,
  blockers,
  children,
  startPosition,
  endPosition
}) => {
  const renderRows = useMemo(
    () =>
      [...Array(rows)].map((_, i) => (
        <div className="row" key={i}>
          {[...Array(columns)].map((_, j) => {
            const blocker = !!blockers[i]?.[j];
            const start = isArrayEqual([i, j], startPosition);
            const end = isArrayEqual([i, j], endPosition);

            return <Tile key={j} start={start} end={end} blocker={blocker} />;
          })}
        </div>
      )),
    [rows, columns, blockers, startPosition, endPosition]
  );

  return (
    <div className="board">
      {renderRows}
      {children}
    </div>
  );
};

Board.propTypes = {
  rows: number.isRequired,
  columns: number.isRequired,
  blockers: shape({}),
  children: element
};

export default Board;
