/**
 * Gets a random number from the given range or a random element of the given array.
 *
 * Examples:
 * random(5, 10);
 * random([5, 10]);
 */
const random = (minOrArray, max) => {
  if (Array.isArray(minOrArray)) {
    return minOrArray[Math.floor(Math.random() * minOrArray.length)];
  } else {
    return Math.floor(Math.random() * (max - minOrArray) + minOrArray);
  }
};
