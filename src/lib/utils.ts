/**
 * Returns a random number between min (inclusive) and max (exclusive).
 * @param {number} min - Minimum value (inclusive)
 * @param {number} max - Maximum value (exclusive)
 * @returns {number}
 */
export const getRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min) + min);
};
