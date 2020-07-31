import React from 'react';
import { shallow } from 'enzyme';
import Board from './Board';

const props = {
  rows: 3,
  columns: 5,
  startPosition: [0, 0],
  endPosition: [2, 4],
  blockers: {
    1: {
      1: true,
      2: true
    },
    3: {
      4: true
    }
  },
  children: <div className="child" />
};

describe('Board', () => {
  describe('when it renders', () => {
    let wrapper;
    let rows;

    beforeAll(() => {
      wrapper = shallow(<Board {...props} />);
      rows = wrapper.find('.row');
    });

    it('should render 3 columns', () => {
      expect(rows.length).toBe(3);
    });

    it('should render 5 Tiles on each row', () => {
      const tiles = rows.at(0).find('Tile');
      expect(tiles.length).toBe(5);
    });

    it('should pass props to the start Tile', () => {
      const startTile = rows.at(0).find('Tile').at(0);
      expect(startTile.props()).toEqual({
        start: true,
        end: false,
        blocker: false
      });
    });

    it('should pass props to the end Tile', () => {
      const endTile = rows.at(2).find('Tile').at(4);
      expect(endTile.props()).toEqual({
        start: false,
        end: true,
        blocker: false
      });
    });

    it('should pass props to a blocker Tile', () => {
      const blockerTile = rows.at(1).find('Tile').at(2);
      expect(blockerTile.props()).toEqual({
        start: false,
        end: false,
        blocker: true
      });
    });

    it('should pass props to a non blocker Tile', () => {
      const blockerTile = rows.at(2).find('Tile').at(3);
      expect(blockerTile.props()).toEqual({
        start: false,
        end: false,
        blocker: false
      });
    });

    it('should render children', () => {
      const children = wrapper.find('.child');
      expect(children.length).toBe(1);
    });
  });
});
