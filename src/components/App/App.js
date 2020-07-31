import React, { Component } from 'react';
import Board from '../Board';
import Slug from '../Slug';
import Info from '../Info';
import { STATUS } from '../../constants';
import { isArrayEqual } from '../../utils';
import './App.scss';

class App extends Component {
  state = {
    rows: 5,
    columns: 5,
    blockers: {
      1: {
        0: true,
        1: true,
        3: true,
        4: true
      },
      2: {
        0: true,
        1: true,
        3: true,
        4: true
      },
      3: {
        3: true,
        4: true
      },
      4: {
        0: true,
        1: true
      }
    },
    maxMoves: 10,
    moves: 10,
    position: [0, 0],
    startPosition: [0, 0],
    endPosition: [4, 4],
    status: STATUS.PLAYING
  };

  componentDidMount() {
    document.addEventListener('keydown', this.handleMove);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleMove);
  }

  restart = () => {
    this.setState({
      moves: 10,
      position: [0, 0],
      status: STATUS.PLAYING
    });
  };

  willCrash = position => {
    const { blockers } = this.state;
    const [row, column] = position;

    return !!blockers[row]?.[column];
  };

  handleMove = e => {
    const { moves, status, position, rows, columns, endPosition } = this.state;

    if (status !== STATUS.PLAYING || moves <= 0) {
      return;
    }

    let newPosition = [...position];

    switch (e.code) {
      case 'ArrowLeft':
        position[1] !== 0 && newPosition[1]--;
        break;
      case 'ArrowRight':
        position[1] !== columns - 1 && newPosition[1]++;
        break;
      case 'ArrowUp':
        position[0] !== 0 && newPosition[0]--;
        break;
      case 'ArrowDown':
        position[0] !== rows - 1 && newPosition[0]++;
        break;
      default:
        return;
    }

    if (isArrayEqual(position, newPosition)) {
      return;
    }

    if (this.willCrash(newPosition)) {
      return;
    }

    const newStatus = isArrayEqual(newPosition, endPosition)
      ? STATUS.WON
      : moves - 1 === 0
      ? STATUS.LOST
      : status;

    this.setState({
      position: newPosition,
      moves: moves - 1,
      status: newStatus
    });
  };

  render() {
    const {
      rows,
      columns,
      blockers,
      moves,
      position,
      status,
      startPosition,
      endPosition
    } = this.state;

    return (
      <div className="app">
        <div className="container">
          <div>
            <div className="actions">
              <button onClick={this.restart}>Restart</button>
            </div>
            <Board
              rows={rows}
              columns={columns}
              blockers={blockers}
              startPosition={startPosition}
              endPosition={endPosition}
            >
              <Slug position={position} won={status === STATUS.WON} />
            </Board>
            <Info moves={moves} status={status} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
