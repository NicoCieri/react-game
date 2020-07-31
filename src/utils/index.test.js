import { isArrayEqual } from './';

describe('Utils', () => {
  describe('isArrayEqual', () => {
    describe('when arrays are equal', () => {
      const a = [1, 2];
      const b = [1, 2];
      const result = isArrayEqual(a, b);

      it('should return true', () => {
        expect(result).toBe(true);
      });
    });

    describe('when arrays are not equal', () => {
      const a = [1, 2];
      const b = [1, 4];
      const result = isArrayEqual(a, b);

      it('should return false', () => {
        expect(result).toBe(false);
      });
    });
  });
});
