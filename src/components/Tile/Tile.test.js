import React from 'react';
import Tile from './Tile';
import { shallow } from 'enzyme';
import classNames from 'classnames';

jest.mock('classnames', () => jest.fn());

jest.mock('../../constants', () => ({
  TILE_SIZE: 5,
  TILE_SIZE_UNIT: 'rem'
}));

const props = {
  blocker: false,
  end: true,
  start: false
};

describe('Tile', () => {
  describe('when it renders', () => {
    let wrapper;
    const classNameResult = Symbol('className');

    beforeAll(() => {
      classNames.mockReset();
      classNames.mockReturnValue(classNameResult);
      wrapper = shallow(<Tile {...props} />);
    });

    it('should call classNames with the right parameters', () => {
      const { blocker, start, end } = props;
      expect(classNames).toHaveBeenCalledWith('tile', { blocker, start, end });
    });

    it('should pass classNames result as a prop', () => {
      const { className } = wrapper.find('div').props();

      expect(className).toBe(classNameResult);
    });

    it('should pass style prop', () => {
      const { style } = wrapper.find('div').props();

      expect(style).toEqual({ width: '5rem', height: '5rem' });
    });
  });
});
