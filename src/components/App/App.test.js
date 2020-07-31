import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

const addEventListenerMock = jest.spyOn(document, 'addEventListener');
const removeEventListenerMock = jest.spyOn(document, 'removeEventListener');

jest.mock('../../constants', () => ({
  STATUS: {
    WON: 'won',
    LOST: 'lost',
    PLAYING: 'playing'
  }
}));

const blockers = {
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
};

describe('App', () => {
  describe('when it renders', () => {
    let wrapper;
    let instance;

    beforeAll(() => {
      wrapper = shallow(<App />);
      instance = wrapper.instance();
      wrapper.setState({});
    });

    it('should pass restart method to restart button', () => {
      const button = wrapper.find('.actions button');

      expect(button.props().onClick).toBe(instance.restart);
    });

    it('should pass rows, columns and blockers to Board', () => {
      const Board = wrapper.find('Board');

      expect(Board.props().rows).toBe(5);
      expect(Board.props().columns).toBe(5);
      expect(Board.props().blockers).toEqual(blockers);
    });

    it('should pass props to Slug', () => {
      const Slug = wrapper.find('Slug');

      expect(Slug.props()).toEqual({
        position: [0, 0],
        won: false
      });
    });

    it('should pass props to Info', () => {
      const Info = wrapper.find('Info');

      expect(Info.props()).toEqual({
        moves: 10,
        status: 'playing'
      });
    });
  });

  describe('methods', () => {
    let wrapper;
    let instance;

    beforeEach(() => {
      wrapper = shallow(<App />);
      instance = wrapper.instance();
      addEventListenerMock.mockReset();
      removeEventListenerMock.mockReset();
    });

    it('componentDidMount should bind handleMove method with keydown event', () => {
      instance.componentDidMount();

      expect(addEventListenerMock).toHaveBeenCalledWith(
        'keydown',
        instance.handleMove
      );
    });

    it('componentWillUnmount should unbind handleMove method with keydown event', () => {
      instance.componentWillUnmount();

      expect(removeEventListenerMock).toHaveBeenCalledWith(
        'keydown',
        instance.handleMove
      );
    });

    it('restart should set initial values for moves, position and status', () => {
      wrapper.setState({ moves: 0, position: [2, 2], status: 'lost' });
      instance.restart();

      expect(wrapper.state().moves).toBe(10);
      expect(wrapper.state().position).toEqual([0, 0]);
      expect(wrapper.state().status).toBe('playing');
    });

    it('willCrash should return true if the move is a blocker', () => {
      const position = [2, 3];
      expect(instance.willCrash(position)).toBe(true);
    });

    it('willCrash should return false if the move is not a blocker', () => {
      const position = [2, 2];
      expect(instance.willCrash(position)).toBe(false);
    });

    describe('handleMove method', () => {
      let wrapper;
      let instance;

      beforeEach(() => {
        wrapper = shallow(<App />);
        instance = wrapper.instance();
      });

      it('when status is not playing should not move', () => {
        wrapper.setState({ status: 'won' });
        const oldState = wrapper.state();
        instance.handleMove({});
        expect(wrapper.state()).toEqual(oldState);
      });

      it('when moves is 0 should not move', () => {
        wrapper.setState({ moves: 0 });
        const oldState = wrapper.state();
        instance.handleMove({});
        expect(wrapper.state()).toEqual(oldState);
      });

      it('when arrow left is pressed and is not next to the limit should move', () => {
        wrapper.setState({ position: [0, 2] });
        const oldState = wrapper.state();
        instance.handleMove({ code: 'ArrowLeft' });
        expect(wrapper.state()).toEqual({
          ...oldState,
          position: [0, 1],
          moves: 9
        });
      });

      it('when arrow left is pressed and is next to the limit should not move', () => {
        wrapper.setState({ position: [0, 0] });
        const oldState = wrapper.state();
        instance.handleMove({ code: 'ArrowLeft' });
        expect(wrapper.state()).toEqual(oldState);
      });

      it('when arrow right is pressed and is not next to the limit should move', () => {
        wrapper.setState({ position: [0, 3] });
        const oldState = wrapper.state();
        instance.handleMove({ code: 'ArrowRight' });
        expect(wrapper.state()).toEqual({
          ...oldState,
          position: [0, 4],
          moves: 9
        });
      });

      it('when arrow right is pressed and is next to the limit should not move', () => {
        wrapper.setState({ position: [0, 4] });
        const oldState = wrapper.state();
        instance.handleMove({ code: 'ArrowRight' });
        expect(wrapper.state()).toEqual(oldState);
      });

      it('when arrow up is pressed and is not next to the limit should move', () => {
        wrapper.setState({ position: [4, 2] });
        const oldState = wrapper.state();
        instance.handleMove({ code: 'ArrowUp' });
        expect(wrapper.state()).toEqual({
          ...oldState,
          position: [3, 2],
          moves: 9
        });
      });

      it('when arrow up is pressed and is next to the limit should not move', () => {
        wrapper.setState({ position: [0, 2] });
        const oldState = wrapper.state();
        instance.handleMove({ code: 'ArrowUp' });
        expect(wrapper.state()).toEqual(oldState);
      });

      it('when arrow down is pressed and is not next to the limit should move', () => {
        wrapper.setState({ position: [3, 2] });
        const oldState = wrapper.state();
        instance.handleMove({ code: 'ArrowDown' });
        expect(wrapper.state()).toEqual({
          ...oldState,
          position: [4, 2],
          moves: 9
        });
      });

      it('when arrow down is pressed and is next to the limit should not move', () => {
        wrapper.setState({ position: [4, 2] });
        const oldState = wrapper.state();
        instance.handleMove({ code: 'ArrowDown' });
        expect(wrapper.state()).toEqual(oldState);
      });

      it('when new move would crash should not move', () => {
        wrapper.setState({ position: [0, 0], blockers: { 1: { 0: true } } });
        const oldState = wrapper.state();
        instance.handleMove({ code: 'ArrowDown' });
        expect(wrapper.state()).toEqual(oldState);
      });

      it('when is the end should set status to won', () => {
        wrapper.setState({ position: [4, 3] });
        const oldState = wrapper.state();
        instance.handleMove({ code: 'ArrowRight' });
        expect(wrapper.state()).toEqual({
          ...oldState,
          position: [4, 4],
          status: 'won',
          moves: 9
        });
      });

      it('when it runs out of movements', () => {
        wrapper.setState({ position: [4, 2], moves: 1 });
        const oldState = wrapper.state();
        instance.handleMove({ code: 'ArrowRight' });
        expect(wrapper.state()).toEqual({
          ...oldState,
          position: [4, 3],
          status: 'lost',
          moves: 0
        });
      });
    });
  });
});
