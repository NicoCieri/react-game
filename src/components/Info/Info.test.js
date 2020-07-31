import React from 'react';
import Info from './Info';
import { shallow } from 'enzyme';

jest.mock('../../constants', () => ({
  STATUS: {
    WON: 'won',
    LOST: 'lost'
  }
}));

describe('Info', () => {
  describe('when is playing', () => {
    let wrapper;
    const props = {
      moves: 4,
      status: 'playing'
    };

    beforeAll(() => {
      wrapper = shallow(<Info {...props} />);
    });

    it('should not render any result message', () => {
      const resultMessage = wrapper.find('.result').children();
      expect(resultMessage.length).toBe(0);
    });

    it('should render moves left', () => {
      const movesMessage = wrapper.find('.moves');
      expect(movesMessage.text()).toBe('moves left 4');
    });
  });

  describe('when have won', () => {
    let wrapper;
    const props = {
      moves: 1,
      status: 'won'
    };

    beforeAll(() => {
      wrapper = shallow(<Info {...props} />);
    });

    it('should render the winner message', () => {
      const resultMessage = wrapper.find('.result .won');

      expect(resultMessage.text()).toBe('You won');
    });

    it('should render moves left', () => {
      const movesMessage = wrapper.find('.moves');
      expect(movesMessage.text()).toBe('moves left 1');
    });
  });

  describe('when have lost', () => {
    let wrapper;
    const props = {
      moves: 0,
      status: 'lost'
    };

    beforeAll(() => {
      wrapper = shallow(<Info {...props} />);
    });

    it('should render the looser message', () => {
      const resultMessage = wrapper.find('.result .lost');

      expect(resultMessage.text()).toBe('You lost');
    });

    it('should render moves left', () => {
      const movesMessage = wrapper.find('.moves');
      expect(movesMessage.text()).toBe('moves left 0');
    });
  });
});
