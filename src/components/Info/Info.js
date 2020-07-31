import React from 'react';
import { number, string } from 'prop-types';
import './Info.scss';
import { STATUS } from '../../constants';

const Info = ({ moves, status }) => {
  return (
    <div className="info">
      <div className="result">
        {status === STATUS.WON && <span className="won">You won</span>}
        {status === STATUS.LOST && <span className="lost">You lost</span>}
      </div>
      <div className="moves">moves left {moves}</div>
    </div>
  );
};

Info.propTypes = {
  moves: number.isRequired,
  status: string.isRequired
};

export default Info;
