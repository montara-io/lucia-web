import { arrayAverage } from '.';

describe('array utils', () => {
  it('should calculate the average of an array of numbers', () => {
    expect(arrayAverage([1, 2, 3])).toEqual(2);
  });
});
