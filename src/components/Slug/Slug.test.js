import React from 'react';
import Slug from './Slug';
import { shallow } from 'enzyme';
import classNames from 'classnames';

jest.mock('classnames', () => jest.fn());

jest.mock('../../constants', () => ({
  TILE_SIZE: 5,
  TILE_SIZE_UNIT: 'rem'
}));

const props = {
  position: [2, 3],
  won: false
};

describe('Slug', () => {
  describe('when it renders', () => {
    let wrapper;
    const classNameResult = Symbol('className');

    beforeAll(() => {
      classNames.mockReset();
      classNames.mockReturnValue(classNameResult);
      wrapper = shallow(<Slug {...props} />);
    });

    it('should call classNames with the right parameters', () => {
      const { won } = props;
      expect(classNames).toHaveBeenCalledWith('slug', { won });
    });

    it('should pass classNames result as a prop', () => {
      const { className } = wrapper.find('div').props();

      expect(className).toBe(classNameResult);
    });

    it('should pass style prop', () => {
      const { style } = wrapper.find('div').props();

      expect(style).toEqual({ top: '10rem', left: '15rem' });
    });
  });
});
